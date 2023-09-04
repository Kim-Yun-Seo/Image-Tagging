<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { state, imageInfo, upload } from '../stores/mockup/imageOption'

watch(() => imageInfo.value.selected, (characterLearning) => {
  console.log('characterLearning =', characterLearning)
  return imageInfo.value.selected
})

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
const text = ref('')
const urlArr = ref([])

const hi = () => {
  imageInfo.value.filesTags = imageInfo.value.files[imageInfo.value.selected].tags
}

const model = ref(null)

const submit = () => {
  const args = {
    loginId: state.form.loginId,
    loginPw: state.form.loginPw,
    url: text.value
  }
  axios.post('/api/account', args).then((res) => {
    alert('로그인에 성공했습니다')
    state.account = res.data
  }).catch(() => {
    alert('로그인에 실패했습니다. 계정 정보를 확인해주세요')
  })
}

const finish = () => {
  console.log(' state.form.tag=', state.form.tag)
  const args = {
    tag: state.form.tag
  }
  axios.post('/tagging', args).then((res) => {
    alert('태그 수정에 성공했습니다.')
    state.account = res.data
  }).catch(() => {
    alert('태그수정에 실패했습니다.')
  })
}

axios.get('/api/account').then((res) => {
  console.log(res.data)
  state.account = res.data
})

console.log('sss =', state.account.url)
console.log('selected =', imageInfo.value.selected)

// addEventListener()

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
              url="http://localhost:3000/api/img"
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
            <q-img
              v-ripple
              :class="imageInfo.selected === file.key ? 'selectBorder' : ''"
              :src="file.src"
              spinner-color="white"
              style="height: 200px; max-width: 200px"
              @click=" imageInfo.selected = file.key; hi()"
            />
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
  <div v-if="state.account.id">
    안녕하세요~
    {{ state.account.name }} 님!

    <img
      :src="state.account.url"
      alt=""
    >
    <br>
    <q-chip
      v-for="(tag, index) in state.account.tag"
      :key="index"
      color="primary"
      text-color="white"
    >
      {{ tag }}
    </q-chip>
    <q-select
      v-model="state.account.tag"
      filled
      use-input
      use-chips
      multiple
      hide-dropdown-icon
      input-debounce="0"
      new-value-mode="add-unique"
    />
  </div>
  <div v-else>
    <label for="longinId">
      <span>아이디</span>
      <input
        id="loginId"
        v-model="state.form.loginId"
        type="text"
      >
    </label>
    <label for="longinPw">
      <span>비밀번호</span>
      <input
        id="loginPw"
        v-model="state.form.loginPw"
        type="text"
      >
    </label>
    <button @click="submit()">
      로그인
    </button>

    <q-input
      v-model="text"
      label="Standard"
    />
  </div>

  <button @click="finish()">
    태깅 완료
  </button>
</template>

<style>
  .q-gutter-sm {
    width: 100%;
  }
</style>
  <!-- <form
    action="/upload"
    method="POST"
    enctype="multipart/form-data"
  >
    <input
      type="file"
      name="myFile"
    >
    <button type="submit">
      Upload
    </button>
  </form> -->
