/* eslint-disable no-undef */
import { Ufficiale } from '../../models/types/ufficiale'
import { connectDB, disconnectDB } from '../../mongoDB'
import app from '../../app'
import { agent as request } from 'supertest'
import { SuccessResponse } from '../../models/types/response'
import ufficialeSchema from '../../models/schemas/ufficiale.schema'

describe('Testing Ufficiali endpoint', () => {
  const API_BASE_PATH = '/api/v1/ufficiali'
  beforeAll(async () => {
    await connectDB('test')
  })

  afterEach(async () => {
    await ufficialeSchema.deleteMany()
  })

  afterAll(async () => {
    await disconnectDB()
  })
  // eslint-disable-next-line no-undef

  describe('POST /ufficiali', () => {
    test('Crea un ufficiale correttamente', async () => {
      const response = await request(app).post(API_BASE_PATH).send(UfficialeSenzaErrori)
      expect(response.status).toBe(201)

      const resBody = response.body as SuccessResponse
      expect(resBody.success).toBe(true)
    })
  })
})

const UfficialeSenzaErrori: Partial<Ufficiale> = {
  nome: 'Test',
  cognome: 'Ufficiale',
  email: 'test.ufficiale@marina.difesa.it',
  data_imbarco: new Date('2022-01-02'),
  grado: 'S.T.V.'
}
