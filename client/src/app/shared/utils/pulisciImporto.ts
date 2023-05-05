export function checkFormattaImporto(input: string) {
  return !(input.endsWith(',') || input.endsWith('.') || (input.length === 1 && input.startsWith('€')))
}


//Formatta il numero utilizzando il metodo parseFloat controllando
//prima se l'utente ha premuto la virgola per intendere la cifra decimale
export function formattaImporto(input: string) {
  let importoFormattato = ''
  if (input.at(-2) === ',') {
    importoFormattato = input.slice(0, -2).concat('.', input.at(-1)!)
  } else {
    importoFormattato = input
  }
  importoFormattato = importoFormattato.replace(/[€,]/g, '')
  return String(parseFloat(importoFormattato) || 0)
}