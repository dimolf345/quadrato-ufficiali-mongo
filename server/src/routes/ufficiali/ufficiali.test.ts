/* eslint-disable no-undef */
import { connectDB, disconnectDB } from '../../mongoDB'
import app from '../../app'
import { agent as request } from 'supertest'
import { ErrorResponse, SuccessResponse } from '../../models/types/response'
import ufficialeSchema from '../../models/schemas/ufficiale.schema'
import { StatusCodes } from 'http-status-codes'
import { ufficialeConErrori, ufficialeSenzaErrori, ufficialiTest } from './testdata'
import { Ufficiale } from '../../models/types/ufficiale'

describe('Testing Ufficiali endpoint', () => {
  const API_BASE_PATH = '/api/v1/ufficiali'
  beforeAll(async () => {
    await connectDB('test')
  })

  afterAll(async () => {
    await disconnectDB()
  })
  // eslint-disable-next-line no-undef

  describe('POST /ufficiali', () => {
    afterEach(async () => {
      await ufficialeSchema.deleteMany()
    })
    test('Crea un ufficiale correttamente', async () => {
      const response = await request(app).post(API_BASE_PATH).send(ufficialeSenzaErrori)
      expect(response.status).toBe(StatusCodes.CREATED)
      const resBody = response.body as SuccessResponse<Ufficiale>
      expect(resBody.success).toBe(true)
      expect(resBody.data[0]).toMatchObject({
        ...ufficialeSenzaErrori,
        data_imbarco: ufficialeSenzaErrori.data_imbarco?.toISOString(),
        attivo: true
      })
    })

    test('Restituisce un errore se manca uno dei campi obbligatori', async () => {
      const ufficialeSenzaNome = {
        ...ufficialeSenzaErrori,
        nome: null
      }
      const response = await request(app).post(API_BASE_PATH).send(ufficialeSenzaNome)
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body.success).toBe(false)
      expect(response.body).toHaveProperty('error')
    })

    test('Restituisce un errore se un campo è invalido', async () => {
      const response = await request(app).post(API_BASE_PATH).send(ufficialeConErrori)
      expect(response.status).toBe(StatusCodes.BAD_REQUEST)
      expect(response.body.success).toBe(false)
      expect(response.body).toHaveProperty('error')
    })

    test('Restituisce un errore se inserisco due ufficiali con la stessa email', async () => {
      const primaRichiesta = await request(app).post(API_BASE_PATH).send(ufficialeSenzaErrori)
      expect(primaRichiesta.status).toBe(StatusCodes.CREATED)
      expect((primaRichiesta.body as SuccessResponse<Ufficiale>).success).toBe(true)

      const secondaRichiesta = await request(app).post(API_BASE_PATH).send(ufficialeSenzaErrori)
      expect(secondaRichiesta.status).toBe(StatusCodes.BAD_REQUEST)
      expect(secondaRichiesta.body.success).toBe(false)
      expect((secondaRichiesta.body as ErrorResponse)).toHaveProperty('error')
    })
  })

  describe('GET /ufficiali', () => {
    beforeAll(async () => {
      await ufficialeSchema.insertMany(ufficialiTest)
    })

    test('Restituisce la lista di tutti gli ufficiali', async () => {
      const response = await request(app).get(API_BASE_PATH)
      expect(response.status).toBe(StatusCodes.OK)
      const resBody = response.body as SuccessResponse<Ufficiale>
      expect(resBody.data).toHaveLength(ufficialiTest.length)
    })

    test('Effettua la ricerca del nome e/o del cognome in modalità case insensitive', async () => {
      const nome = ufficialiTest[0].nome?.toLowerCase()
      const urlRicerca = `${API_BASE_PATH}?nome=${nome}`
      const response = await request(app).get(urlRicerca)

      expect(response.status).toBe(StatusCodes.OK)
      const resBody = response.body as SuccessResponse<Ufficiale>
      expect(resBody.data).not.toHaveLength(0)
      expect(resBody.data[0]).toMatchObject({
        ...ufficialiTest[0],
        data_imbarco: ufficialiTest[0].data_imbarco?.toISOString()
      })

      const cognome = ufficialiTest[1].cognome?.toLowerCase()
      const urlRicerca1 = `${API_BASE_PATH}?cognome=${cognome}`
      const response1 = await request(app).get(urlRicerca1)

      expect(response1.status).toBe(StatusCodes.OK)
      const resBody1 = response1.body as SuccessResponse<Ufficiale>
      expect(resBody1.data).not.toHaveLength(0)
      expect(resBody1.data[0]).toMatchObject({
        ...ufficialiTest[1],
        data_imbarco: ufficialiTest[1].data_imbarco?.toISOString()
      })
    })

    test('Cerca un ufficiale per id', async () => {
      const ufficiale = (await request(app).get(API_BASE_PATH)).body.data

      const { _id } = ufficiale[0]

      const urlRicerca = `${API_BASE_PATH}/${_id}`
      const response = await request(app).get(urlRicerca)
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.body.data).toHaveLength(1)
      expect(response.body.data[0]).toMatchObject(ufficiale[0])
    })
  })
})
