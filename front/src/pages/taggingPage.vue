<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { state, imageInfo, upload } from '../stores/mockup/imageOption'
// import { stat } from 'fs'

const step = ref(1)
const done1 = ref(false)
const done2 = ref(false)
const done3 = ref(false)
const files = ref(null)
const reset = () => {
  done1.value = false
  done2.value = false
  done3.value = false
  step.value = 1
}
const url = 'http://localhost:3000/file'
const text = ref('')
const textArr:string[] = []
const plus = () => {
  textArr.push(text.value)
  console.log('textArr =', textArr)
}
const hi = () => { imageInfo.value.filesTags = imageInfo.value.files[imageInfo.value.selected].tags }
const next = () => { done1.value = true; step.value = 2 }
const next2 = () => { done1.value = true; step.value = 3 }

const submit = () => {
  console.log('-------------- =', state.account.tag)
  if (state.account.id) {
    const args = {
      loginId: state.form.loginId,
      loginPw: state.form.loginPw,
      url: text.value,
      tag: state.account.tag
    }

    axios.post('/api/account', args).then((res) => {
      alert('태그 수정에 성공했습니다.')
      console.log('files =', files)
      console.log('--------------22 =', state.account.tag)
      console.log('--------------33 =', args.tag)
    }).catch(() => {
      alert('태그수정에 실패했습니다.')
    })
  } else {
    const args = {
      loginId: state.form.loginId,
      loginPw: state.form.loginPw,
      url: text.value
    }

    axios.post('/api/account', args).then((res) => {
      alert('로그인에 성공했습니다')
      console.log('state.account.tag =', state.account.tag)
      state.account = res.data
    }).catch(() => {
      alert('로그인에 실패했습니다. 계정 정보를 확인해주세요')
    })
  }
}

axios.get('/api/account').then((res) => {
  console.log(res.data)
  state.account = res.data
})

const kkk = ref([])

const change = () => {
  axios.get('/file').then((res) => {
    console.log('res =', res.data)
    upload.form.img = res.data
    console.log('upload.form.img =', upload.form.img)
    console.log('sksksk =', Object.values(upload.form.img)[0])
    for (let i = 0; i < Object.values(upload.form.img).length; i++) {
      kkk.value.push(`http://localhost:9000/${Object.values(upload.form.img)[i]}`)
    }
    console.log('kkk =', kkk)
  })
}
</script>

<template>
  <div class="q-pa-md">
    <!-- <img
      :src="kkk"
      alt=""
    > -->
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
        <div class="q-pa-md">
          <!-- <q-file
            v-model="files"
            label="Pick files"
            filled
            multiple
            style="max-width: 300px"
          /> -->
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
        <q-input
          v-model="text"
          label="Standard"
        />
        <q-btn
          label="plus"
          push
          color="white"
          text-color="primary"
          class="q-mb-md"
          @click="plus()"
        />
        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="Continue"
            @click="next(); submit(); change()"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="이미지 태그 편집"
        icon="create_new_folder"
        :done="done2"
      >
        <div v-if="state.account.id">
          <!-- 안녕하세요~
          {{ state.account.name }} 님! -->
          <template
            v-for="(file, index) in kkk"
            :key="index"
          >
            <img
              v-ripple
              :src="file"
              spinner-color="white"
              style="height: 200px; max-width: 200px"
              alt=""
            >
            <br>
            <!-- <q-chip
              v-for="(tag, index) in state.account.tag"
              :key="index"
              color="primary"
              text-color="white"
            >
              {{ tag }}
            </q-chip> -->
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
          </template>
        </div>
        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="tagging"
            @click="next2(); submit()"
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
        <template
          v-for="(file, index) in kkk"
          :key="index"
        >
          <img
            v-ripple
            :src="file"
            spinner-color="white"
            style="height: 200px; max-width: 200px"
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
</template>
