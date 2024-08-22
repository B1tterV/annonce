import type { CompanyCard } from '~/types/CompanyCard'

export default defineEventHandler(() => {
  const baseUrl = 'http://localhost:3000/img/company/'
  const company = <CompanyCard>{
    id: 1,
    imageUrl: baseUrl + 'company-logo.jpg',
    name: 'Наследие',
    docsVerified: true,
    phoneNumber: '89993697788',
    agentsCount: 6,
    aboutCompany: `
      Копкой занимаемся 15 лет. Все началось с хобби и плавно переросло в
      любимую работу. Работаем с профессиональной техникой.
    `,
    workTime: { at: '8:00', to: '23:00' },
    address: 'Ростов на Дону, Воронежская ул., 42А корп. 1'
  }
  return company
})
