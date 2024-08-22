import type { AgentCard } from '~/types/AgentCard'

export default defineEventHandler(() => {
  const baseUrl = 'http://localhost:3000/img/agents/'
  const agents = <AgentCard[]>[
    {
      id: 1,
      imageUrl: baseUrl + 'agent-1.jpg',
      firstName: 'Дмитрий',
      lastName: 'Хитрый',
      description: `
        Помог справиться с потерей и организовать похороны для 126
        семей ну и еще чуть описания, чтобы дойти до конца строки
        и текст будет отсекаться`,
      reviewCount: 19,
      docsVerified: true,
      rating: 4.3
    },
    {
      id: 2,
      imageUrl: baseUrl + 'agent-2.jpg',
      firstName: 'Апполинарий',
      lastName: 'Землеперекопский',
      description: `
        Помог справиться с потерей и организовать похороны для 126 семей.
      `,
      reviewCount: 0,
      docsVerified: true
    },
    {
      id: 3,
      imageUrl: baseUrl + 'agent-3.jpg',
      firstName: 'Фёдор',
      lastName: 'Сумкин',
      description: `
        Помог справиться с потерей и организовать похороны для 126
        семей ну и еще чуть описания, чтобы дойти до конца строки
        и текст будет отсекаться`,
      reviewCount: 19,
      docsVerified: false,
      rating: 4.3
    },
    {
      id: 4,
      imageUrl: baseUrl + 'agent-4.jpg',
      firstName: 'Василий',
      lastName: 'Копушин',
      description: `
        Помог справиться с потерей и организовать похороны для 126
        семей ну и еще чуть описания, чтобы дойти до конца строки
        и текст будет отсекаться`,
      reviewCount: 19,
      docsVerified: true,
      rating: 4.3
    },
    {
      id: 5,
      imageUrl: baseUrl + 'agent-5.jpg',
      firstName: 'Феофан',
      lastName: 'Кусакин',
      description: `
        Помог справиться с потерей и организовать похороны для 126
        семей ну и еще чуть описания, чтобы дойти до конца строки
        и текст будет отсекаться`,
      reviewCount: 19,
      docsVerified: false,
      rating: 4.3
    },
    {
      id: 6,
      imageUrl: baseUrl + 'agent-6.jpg',
      firstName: 'Василиса',
      lastName: 'Землеперекопская',
      description: `
        Помог справиться с потерей и организовать похороны для 126
        семей ну и еще чуть описания, чтобы дойти до конца строки
        и текст будет отсекаться`,
      reviewCount: 19,
      docsVerified: true,
      rating: 4.3
    }
  ]

  return agents
})
