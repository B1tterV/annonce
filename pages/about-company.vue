<template>
  <div class="about-company">
    <company-card v-bind="company" />
    <div class="about-company__content">
      <div v-if="company?.aboutCompany" class="text-item">
        <div class="text-item__title">
          О компании
        </div>
        <div class="text-item__description">
          {{ company?.aboutCompany }}
        </div>
      </div>
      <div class="text-item disabled">
        <div class="text-item__title">
          Режим работы
        </div>
        <div class="text-item__description">
          Сегодня с {{ company?.workTime.at }} до {{ company?.workTime.to }}
        </div>
      </div>
      <div class="text-item text-item_row">
        <div class="column">
          <div class="text-item__title">
            Местоположение
          </div>
          <div class="text-item__description adress">
            {{ company?.address }}
          </div>
        </div>
        <div
          ref="mapRef"
          class="yandex-map"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify'

interface GeoObject {
  geometry: {
    getCoordinates: () => [number, number];
  };
  properties: {
    get: (_key: string) => string | number;
  };
}

interface GeocodeResponse {
  geoObjects: {
    get: (_index: number) => GeoObject;
  };
}

definePageMeta({
  middleware: 'auth'
})

const { data: company } = await useAsyncData('company', () => $fetch('/api/company/details'))

const mapRef = ref<HTMLDivElement | null>(null)
let mapInstance: any = null

declare global {
  interface Window {
    ymaps: any;
  }
}

const loadYandexMap = () => {
  return new Promise<typeof window.ymaps>((resolve, reject) => {
    if (typeof window.ymaps !== 'undefined') {
      resolve(window.ymaps) // Если API уже загружено, просто возвращаем его
    } else {
      const script = document.createElement('script')
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=46573320-da9d-4fb8-8432-3ecf62a19ae9&lang=ru_RU'
      script.onload = () => {
        if (typeof window.ymaps !== 'undefined') {
          resolve(window.ymaps)
        } else {
          reject(new Error('Yandex Maps API failed to load.'))
        }
      }
      script.onerror = () => reject(new Error('Failed to load Yandex Maps API.'))
      document.head.appendChild(script)
    }
  })
}

const initMap = async () => {
  try {
    const ymaps = await loadYandexMap()
    ymaps.ready(() => {
      if (mapRef.value) {
        mapInstance = new ymaps.Map(mapRef.value, {
          center: [55.76, 37.64],
          zoom: 10,
          controls: []
        })

        const address = company.value?.address

        ymaps.geocode(address).then((res: GeocodeResponse) => {
          const firstGeoObject = res.geoObjects.get(0)

          if (firstGeoObject) {
            const coords = firstGeoObject.geometry.getCoordinates()
            const bounds = firstGeoObject.properties.get('boundedBy')

            mapInstance.setBounds(bounds, { checkZoomRange: true })

            const placemark = new ymaps.Placemark(coords, {
              balloonContent: address
            })
            mapInstance.geoObjects.add(placemark)
          } else {
            toast('Адрес не найден', {
              type: 'error',
              position: 'bottom-right',
              transition: 'flip',
              dangerouslyHTMLString: true
            })
          }
        }).catch(() => {
          toast('Ошибка геокодирования:', {
            type: 'error',
            position: 'bottom-right',
            transition: 'flip',
            dangerouslyHTMLString: true
          })
        })
      }
    })
  } catch (error) {
    toast('Ошибка загрузки Yandex Maps API', {
      type: 'error',
      position: 'bottom-right',
      transition: 'flip',
      dangerouslyHTMLString: true
    })
  }
}

const updateMapSize = () => {
  if (mapRef.value) {
    const newWidth = Math.min(window.innerWidth)
    mapRef.value.style.width = `${newWidth}px`
    if (mapInstance) {
      mapInstance.container.fitToViewport()
    }
  }
}

onMounted(() => {
  initMap()
  window.addEventListener('resize', updateMapSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMapSize)
})

</script>

<style scoped lang="scss">
.about-company{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__content{
    margin-top: 32px;
    margin-bottom: 24px;
    .text-item{
      padding: 20px;
      max-width: 560px;
      width: 100%;
      border-radius: 16px;
      overflow: hidden;
      &:not(:last-child){
        margin-bottom: 12px;
      }
      &_row{
        padding: 0;
        display: flex;
        justify-content: space-between;
        padding-right: 0;
        .column{
          padding: 20px;
        }
      }
      &.disabled{
        background-color: $color-gray-500;
        opacity: 0.3;
      }
      &__title{
        margin-bottom: 8px;
        font-weight: $font-weight-semiBold;
        font-size: $font-size-lg;
        line-height: 28px;
      }
      &__description{
        font-size: $font-size-md;
        line-height: 28px;
        &.adress{
          color: $color-green;
        }
      }
      .yandex-map{
        width: 100%;
        max-width: 200px;
        height: 132px;
        border-radius: 0 20px 20px 0;
        overflow: hidden;
      }
    }
  }

  @media (max-width: 576px) {
    padding-bottom: 0;
    ::v-deep .company-card{ // v-deep (deep selector) для изменения компонента внутри scoped
      border-bottom: none;
      &__nav{
        margin-bottom: 24px;
        border-bottom: 1px solid #CCC;
      }
      &__logo, &__name{
        display: block;
        order: 1;
      }
      &__info{
        display: flex;
        order: 1;
      }
    }
    &__content{
      margin-top: 0;
      margin-bottom: 0;
      .text-item{
        padding: 16px;
        &:not(:last-child){
          margin-bottom: 12px;
        }
        &_row{
          padding: 0;
          display: flex;
          flex-direction: column-reverse;
          padding-right: 0;
          .column{
            padding: 16px;
          }
        }
        &__title{
          font-size: $font-size-lg-min;
          line-height: 24px;
        }
        &__description{
          font-size: $font-size-sm;
          line-height: 24px;
          &.adress{
            color: $color-green;
          }
        }
        .yandex-map{
          max-width: 100%;
          height: 96px;
          border-radius: 20px 20px 0 0;
          .ymaps-2-1-79-map{
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
