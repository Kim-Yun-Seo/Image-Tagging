<script setup lang="ts">
import { ref, watch } from 'vue'

const imageInfo = ref(
  {
    files: {
      1: {
        key: '1',
        src: 'https://cdn.imweb.me/thumbnail/20211229/a85203b810b76.jpg',
        tags: ['a girl', 'tiara', 'good']
      },
      2: {
        key: '2',
        src: 'https://i1.sndcdn.com/avatars-xsoyM023yLDj8S6B-DCiezQ-t500x500.jpg',
        tags: ['a girl', 'surprise', 'masterpiece']

      },
      3: {
        key: '3',
        src: 'https://i.pinimg.com/originals/f7/77/55/f7775543e15e04b22fc7008bae1e5899.jpg',
        tags: ['a girl', 'angry', 'braided hair']
      },
      4: {
        key: '4',
        src: 'https://itimg.chosun.com/sitedata/image/201807/06/2018070602943_0.jpg',
        tags: ['a girl', 'confused', 'pan']
      },
      5: {
        key: '5',
        src: 'https://i.pinimg.com/736x/60/69/86/606986d82fa7f4801076673eb661b4f5.jpg',
        tags: ['a baby', 'shy', 'big eyes']
      },
      6: {
        key: '6',
        src: 'https://i.namu.wiki/i/V4lnpG0NHcsRUTVPMFil1z6YPv3b0d4_fCrsVId48o10EE6QTQBMP3jVGdRxNdbUlspPIuign7q52yoT5FGTPw.webp',
        tags: ['a girl', 'confuesd', 'short brown hair']
      },
      7: {
        key: '7',
        src: 'https://image.jtbcplus.kr/data/contents/jam_photo/202003/30/fb002e68-7a2d-4317-8418-6bc12fde5e71.jpg',
        tags: ['a girl', 'blonde', 'singing']
      },
      8: {
        key: '8',
        src: 'https://post-phinf.pstatic.net/MjAxOTA1MjFfMjIg/MDAxNTU4NDQ3MzcyOTk5.RAPmZq6iI5szHe6Kdl6G5JCSD_k_Ib3qd_A3GjdTOMkg.P6Irrxfwnfs04q3PLzp4CeLmaFfgLOXTmaOmvynPfE0g.JPEG/%EB%9D%BC%ED%91%BC%EC%A0%A4.jpg?type=w800_q75',
        tags: ['a girl', 'pet', 'pascal']
      }
    },
    selected: '',
    filesTags: ''
  }
)

const findTag = ref('')
const imgArray = ref<string[]>([])

const tagArray = ref<string[]>([])

console.log('findTag =', findTag.value)

const makeArray = () => {
  imgArray.value = []
  for (const num in imageInfo.value.files) {
    const value = imageInfo.value.files
    // console.log('key =', key)
    // console.log('value =', value)
    // console.log('배열모음 =', value[num].tags)
    // console.log('dkdk =', findTag)
    // console.log('keyy =', num)
    // console.log(' dfsfsfdfsfd=', imageInfo.value.files[num].src)
    if (value[num].tags.includes(findTag.value) && !imgArray.value.includes(imageInfo.value.files[num].src)) {
      imgArray.value.push(imageInfo.value.files[num].src)
      console.log('imgArray =', imgArray.value)
    }
  }
}

watch(() => imageInfo.value.selected, (characterLearning) => {
  return imageInfo.value.selected
})

</script>

<template>
  <div padding>
    <q-input
      v-model="findTag"
      outlined
      clearable
      clear-icon="close"
      label="태그 검색"
      @keyup.enter="makeArray(), tagArray.push(findTag)"
    />
    <template v-if="false">
      <q-chip
        v-for="(tag, index) in tagArray"
        :key="index"
        color="primary"
        text-color="white"
      >
        {{ tag }}
      </q-chip>
    </template>
    <template v-else>
      <q-select
        v-model="tagArray"
        filled
        clearable
        clear-icon="close"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="0"
        new-value-mode="add-unique"
      />
    </template>
    <div
      padding
      class="q-pa-md row items-start q-gutter-md"
    >
      <template
        v-for="(file, index) in imgArray"
        :key="index"
      >
        <q-img
          :src="file"
          spinner-color="white"
          style="height: 200px; max-width: 200px"
        />
      </template>
    </div>
  </div>
  <div padding>
    <!-- imageInfo.selected === '' -->
  </div>
</template>
