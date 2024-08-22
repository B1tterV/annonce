import type { ProductCard } from '~/types/ProductCard'

export default defineEventHandler(() => {
  const baseUrl = 'http://localhost:3000/img/products/'
  const products = <ProductCard[]>[
    {
      id: 1,
      imageUrl: baseUrl + 'product-1.jpg',
      price: 450500,
      name: 'Сlavia Nord Grand сценическое цифровое пианино',
      viewsCount: 750,
      adDays: 2,
      promotion: 'advances'
    },
    {
      id: 2,
      imageUrl: baseUrl + 'product-2.jpg',
      price: 3285000,
      name: 'Hyundai Sonata 2.0 AT, 2023, 30 км',
      viewsCount: 255,
      adDays: 4,
      promotion: 'default'
    },
    {
      id: 3,
      imageUrl: baseUrl + 'product-3.jpg',
      price: 4800000,
      name: '2-к. квартира, 46 м², 1/5 эт.',
      viewsCount: 255,
      adDays: 2,
      promotion: 'default'
    },
    {
      id: 4,
      imageUrl: baseUrl + 'product-4.jpg',
      price: 7500,
      name: 'Старые барабаны',
      viewsCount: 255,
      adDays: 2,
      promotion: 'default',
      pieceByPiece: true
    },
    {
      id: 5,
      imageUrl: baseUrl + 'product-5.jpg',
      price: 7500,
      name: 'DMX сплиттер RJ45 to 4x XLR Stairville',
      viewsCount: 255,
      adDays: 2,
      promotion: 'default'
    },
    {
      id: 6,
      imageUrl: baseUrl + 'product-6.jpg',
      price: 217500,
      name: 'Мотоцикл honda',
      viewsCount: 255,
      adDays: 2,
      promotion: 'default'
    },
    {
      id: 7,
      imageUrl: baseUrl + 'product-7.jpg',
      price: 17900,
      name: 'Иж юпитер 5',
      viewsCount: 255,
      adDays: 2,
      promotion: 'default'
    },
    {
      id: 8,
      imageUrl: baseUrl + 'product-8.jpg',
      price: 7500,
      name: 'Пылесос кёрхер с водяным мешком для сбора пыли',
      viewsCount: 255,
      adDays: 2,
      promotion: 'hidden'
    }
  ]

  return products
})
