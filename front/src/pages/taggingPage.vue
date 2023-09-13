<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const step = ref(1)
const done1 = ref(false)
const done2 = ref(false)
const done3 = ref(false)
const url = 'http://localhost:3000/file'
const next = () => { done1.value = true; step.value = 2 }
const next2 = () => { done2.value = true; step.value = 3 }
const sendInfo = ref({})
const imgurl = ref([])
let count = 0

const fileUpload = () => {
  if (count !== 0) {
    //
  } else {
    axios.post('/api/account').then((res) => {
      alert('파일 업로드에 성공했습니다')
      count += 1
      sendInfo.value = res.data
    }).catch(() => {
      alert('파일 업로드에 실패했습니다. 연결상태를 확인해주세요')
    })
  }
}

const tagCRUD = () => {
  const args = {
    sendInfo: sendInfo.value
  }
  axios.post('/api/account', args).then((res) => {
    alert('태그 수정에 성공했습니다.')
  }).catch(() => {
    alert('태그수정에 실패했습니다.')
  })
}

axios.get('/api/account').then((res) => {
  sendInfo.value = res.data
})

const change = () => {
  axios.get('/file').then((res) => {
    // console.log('res =', res.data)
    for (let i = 0; i < Object.keys(res.data).length; i++) {
      imgurl.value.push(Object.keys(res.data)[i])
    }
  })
}
</script>

<template>
  <div class="q-pa-md">
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
              :url="url"
              label="사진 첨부"
              multiple
              batch
              style="max-width: 500px"
            />
          </div>
        </div>
        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="Continue"
            @click="next(); fileUpload(); change()"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="이미지 태그 편집"
        icon="create_new_folder"
        :done="done2"
      >
        <div v-if="sendInfo">
          <template
            v-for="(file, index) in imgurl"
            :key="index"
          >
            <img
              v-ripple
              :src="`http://localhost:9000/img/${file}`"
              spinner-color="white"
              style="height: 200px; max-width: 200px"
            >
            <br>
            <q-select
              v-model="sendInfo[file]"
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
            label="tagging"
            @click="next2(); tagCRUD()"
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
        <template
          v-for="(file, index) in imgurl"
          :key="index"
        >
          <img
            v-ripple
            :src="`http://localhost:9000/img/${file}`"
            spinner-color="white"
            style="height: 200px; max-width: 200px"
            alt=""
          >
          <br>
          <div>
            <q-chip
              v-for="(tag, index_) in sendInfo[file]"
              :key="index_"
              color="primary"
              text-color="white"
            >
              {{ tag }}
            </q-chip>
          </div>
        </template>
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
