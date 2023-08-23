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

watch(() => imageInfo.value.selected, (characterLearning) => {
  console.log('characterLearning =', characterLearning)

  return imageInfo.value.selected
})

// const imageInfo = ref<typeof imageInfog>()

const step = ref(1)
const done1 = ref(false)
const done2 = ref(false)
const done3 = ref(false)
const reset = () => {
  done1.value = false
  done2.value = false
  done3.value = false
  step.value = 1
}

const hi = () => {
  imageInfo.value.filesTags = imageInfo.value.files[imageInfo.value.selected].tags
}

// const sendImgInfo = () => {
//   // 파일 전송(업로드) btn 클릭하면 실행 예정
//   // 이미지 정보 전달
// }

// const sendImgTag = () => {
//   // submit btn을 틀릭하면 실행될 예정
//   // 이미지 태그 정보 전달 함수
// }

// const getImageTag = () => {
//   // 각 이미지 별로 달린 태그 정보 받기
//   // ajax 사용해서 비동기로 작동 예정
// }

console.log('selected =', imageInfo.value.selected)

</script>

<template>
  <div class="q-pa-md">
    <q-btn
      label="Reset"
      push
      color="white"
      text-color="primary"
      class="q-mb-md"
      @click="reset"
    />

    <q-stepper
      ref="stepper"
      v-model="step"
      header-nav
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="이미지 첨부"
        icon="settings"
        :done="done1"
      >
        <div class="q-pa-md">
          <div class="q-gutter-sm row items-start">
            <q-uploader
              url="http://localhost:4444/upload"
              label="사진 첨부"
              multiple
              style="max-width: 300px"
            />
          </div>
        </div>

        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="Continue"
            @click="() => { done1 = true; step = 2 }"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="이미지 태그 편집"
        icon="create_new_folder"
        :done="done2"
      >
        <div class="q-pa-md row items-start q-gutter-md">
          <template
            v-for="(file, index) in imageInfo.files"
            :key="index"
          >
            <!-- {{ file.key }} -->
            <q-img
              v-ripple
              :class="imageInfo.selected === file.key ? 'selectBorder' : ''"
              :src="file.src"
              spinner-color="white"
              style="height: 200px; max-width: 200px"
              @click=" imageInfo.selected = file.key; hi()"
            />
            <!-- -->
            <!-- {{ imageInfo.selected }}
            {{ file.key }} -->
          </template>
        </div>
        <div>
          <!-- imageInfo.selected === '' -->
          <template v-if="imageInfo.selected === ''">
            <q-chip
              v-for="(tag, index) in imageInfo.filesTags"
              :key="index"
              color="primary"
              text-color="white"
            >
              {{ tag }}
            </q-chip>
          </template>
          <template v-else>
            <q-select
              v-model="imageInfo.files[imageInfo.selected].tags"
              filled
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
            />
          </template>
        </div>
        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="submit"
            @click="() => { done2 = true; step = 3 }"
          />
          <q-btn
            flat
            color="primary"
            label="Back"
            class="q-ml-sm"
            @click="step = 1"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="완료"
        icon="add_comment"
        :done="done3"
      >
        태그 저장 완료

        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="Finish"
            @click="done3 = true"
          />
          <q-btn
            flat
            color="primary"
            label="Back"
            class="q-ml-sm"
            @click="step = 2"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<style>
  .q-gutter-sm {
    width: 100%;
  }
</style>
