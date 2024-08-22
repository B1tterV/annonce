interface HeaderInterface{
  name?: string
  logo: string
}

export default defineEventHandler(() => {
  const baseUrl = 'http://localhost:3000/img/company/'
  const header = <HeaderInterface>{
    name: 'Annoncé',
    logo: baseUrl + 'company-logo.jpg'
  }
  return header
})
