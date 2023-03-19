import { Request } from 'express'

const DEFAULT_PAGE_LIMIT = 50
const DEFAULT_PAGE_NUMBER = 1

export function creaPagine (req: Request) {
  // TODO implementare anche lofica filtro!
  const page = Math.abs(Number(req.query.page)) || DEFAULT_PAGE_NUMBER
  const limit = Math.abs(Number(req.query.limit)) ?? DEFAULT_PAGE_LIMIT
  const skip = (page - 1) * limit
  return {
    skip,
    limit
  }
}

export function creaFiltriSortCollezione<T> (req: Request): {filtri: Partial<T>, sort?: string} {
  if (Object.keys(req.query).length === 0) {
    return {
      filtri: {},
      sort: '-createdAt'
    }
  }
  let ordinaPer: string = ''
  const parametriQuery = { ...req.query }
  const parametriDaEscludere = ['skip', 'page', 'limit', 'sort']
  parametriDaEscludere.forEach((parametro) => {
    delete parametriQuery[parametro]
  })
  if (req.query.sort) {
    ordinaPer = (req.query.sort as string).split(',').join(' ')
  }
  return {
    filtri: Object.keys(parametriQuery).length !== 0 ? parametriQuery as Partial<T> : {},
    sort: ordinaPer || '-createdAt'
  }
}
