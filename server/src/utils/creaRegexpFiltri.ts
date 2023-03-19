export function creaRegExpFiltri<T> (filtri: Partial<T>, campi: Array<keyof T>) {
  type FiltroRegexp = Record< typeof campi[number], RegExp>
  const filtriRegexp: FiltroRegexp = {} as FiltroRegexp

  for (const campo in filtri) {
    if (campi.includes(campo)) {
      filtriRegexp[campo] = new RegExp(filtri[campo] as string, 'i')
    }
  }
  return {
    ...filtri,
    ...filtriRegexp!
  }
}
