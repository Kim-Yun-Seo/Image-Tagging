<script setup lang="ts">
// import axios from 'src/boot/axios' -> 이거 안됨!!!!!
import { ref } from 'vue'
import axios from 'axios'
import { state } from '../stores/mockup/imageOption'

const model = ref(null)

const submit = () => {
  const args = {
    loginId: state.form.loginId,
    loginPw: state.form.loginPw,
    url: model.value
  }
  axios.post('/api/account', args).then((res) => {
    alert('로그인에 성공했습니다')
    // console.log(' res  =', res)
    state.account = res.data
  }).catch(() => {
    alert('로그인에 실패했습니다. 계정 정보를 확인해주세요')
  })
}

axios.get('/api/account').then((res) => {
  console.log(res.data)
  state.account = res.data
})

console.log('sss =', state.account.url)

</script>

<template>
  <div
    class="app"
    padding
  >
    <div v-if="state.account.id">
      안녕하세요~
      {{ state.account.name }} 님!
      <img
        :src="state.account.url"
        alt=""
      >
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
      <q-file
        v-model="model"
        label="Standard"
      />
      <button @click="submit()">
        로그인
      </button>
    </div>
  </div>
</template>
