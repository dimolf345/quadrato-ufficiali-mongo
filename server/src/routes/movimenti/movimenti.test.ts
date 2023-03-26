/* eslint-disable no-undef */
import { connectDB, disconnectDB } from '../../mongoDB'
import app from '../../app'
import { agent as request } from 'supertest'
import movimentoSchema from '../../models/schemas/movimento.schema'
import ufficialeSchema from '../../models/schemas/ufficiale.schema'
import { StatusCodes } from 'http-status-codes'
import { ErrorResponse, SuccessResponse, SuccessResponseWithBalance } from '../../models/types/response'
import fondoSchema from '../../models/schemas/fondo.schema'
import { inizializzaFondo } from '../fondo/fondo.controller'
import { movimentoSenzaErrori, listaMovimenti } from './testdata'
import { Movimento } from '../../models/types/movimento'
import { Ufficiale } from '../../models/types/ufficiale'

describe('Testing /movimenti endpoint', () => {
  const API_BASE_PATH = '/api/v1/movimenti'
  beforeAll(async () => {
    await connectDB('test')
    await inizializzaFondo()
  })

  afterAll(async () => {
    await movimentoSchema.deleteMany()
    await fondoSchema.findOneAndUpdate({
      saldo: 0
    })
    await disconnectDB()
  })
  // eslint-disable-next-line no-unused-expressions
  describe('POST /movimenti', () => {
    afterEach(async () => {
      await movimentoSchema.deleteMany()
      await fondoSchema.findOneAndUpdate({
        saldo: 0
      })
    })
    test('Crea un movimento e verifica che il fondo sia aggiornato', async () => {
      const ufficiale = await ufficialeSchema.findOne()
      const response = await request(app).post(API_BASE_PATH).send({
        ...movimentoSenzaErrori,
        creato_da: ufficiale?.id
      })
      const resBody = response.body as SuccessResponseWithBalance
      expect(response.status).toBe(StatusCodes.CREATED)
      const fondo = await fondoSchema.findOne()
      expect(resBody.data.movimento).toMatchObject({
        ...movimentoSenzaErrori,
        data_movimento: movimentoSenzaErrori.data_movimento?.toISOString()
      })
      expect(fondo?.saldo).toBe(resBody.data.movimento.importo)
    })

    test('Restituisce un errore se mancano i campi obbligatori', async () => {
      const ufficiale = await ufficialeSchema.findOne()
      const fondo = await fondoSchema.findOne()
      const response = await request(app).post(API_BASE_PATH).send(movimentoSenzaErrori)
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(fondo?.saldo).toBe(0)
      const resBody = response.body as ErrorResponse
      expect(resBody).toHaveProperty('error')
      expect(resBody).not.toHaveProperty('data')

      const response1 = await request(app).post(API_BASE_PATH).send({
        ...movimentoSenzaErrori,
        creato_da: ufficiale?._id,
        importo: null
      })
      expect(response1.status).toBe(StatusCodes.BAD_REQUEST)
      expect(fondo?.saldo).toBe(0)
      const resBody1 = response.body as ErrorResponse
      expect(resBody1).toHaveProperty('error')
      expect(resBody1).not.toHaveProperty('data')
    })

    test('Restituisce un errore se la data del movimento non è valida', async () => {
      const ufficiale = await ufficialeSchema.findOne()
      const fondo = await fondoSchema.findOne()
      const domani = new Date().setDate(new Date().getDate() + 1)
      const response = await request(app).post(API_BASE_PATH).send({
        ...movimentoSenzaErrori,
        creato_da: ufficiale?._id,
        data_movimento: domani
      })
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(fondo?.saldo).toBe(0)
      const resBody1 = response.body as ErrorResponse
      expect(resBody1).toHaveProperty('error')
      expect(resBody1).not.toHaveProperty('data')
    })
  })
  describe('GET /movimenti', () => {
    beforeAll(async () => {
      await movimentoSchema.deleteMany()
      await fondoSchema.findOneAndUpdate({
        saldo: 0
      })
    })
    test('Scarica la lista dei movimenti', async () => {
      const ufficiale = await ufficialeSchema.findOne<Ufficiale>()
      const movimenti = listaMovimenti.map((mov) => ({
        ...mov,
        creato_da: ufficiale?._id
      }))
      movimenti.forEach(async (movimento) => {
        await request(app).post(API_BASE_PATH).send(movimento)
      })
      const response = await request(app).get(API_BASE_PATH)
      expect(response.status).toBe(StatusCodes.OK)
      const resBody = response.body as SuccessResponse<Movimento[]>
      expect(resBody.data).toHaveLength(movimenti.length)
    })
  })
  describe('PUT /movimenti', () => {
    test('aggiorna correttamente un movimento', async () => {
      const fondo = await fondoSchema.findOne()
      const movimento = await movimentoSchema.findOne()
      const response = await request(app).put(`${API_BASE_PATH}/${movimento?._id}`).send({
        importo: 0
      })
      console.log(response.body)
      expect(response.status).toBe(StatusCodes.OK)
      const resBody = response.body as SuccessResponseWithBalance
      expect(resBody.data.movimento).toMatchObject({
        importo: 0,
        data_creazione: movimento!.data_creazione.toISOString(),
        data_movimento: movimento!.data_movimento.toISOString()
      })
      expect(resBody.data.nuovoSaldo).toBe(fondo!.saldo - movimento!.importo)
    })
  })
})
