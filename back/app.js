// import formidable from 'formidable'

const express = require('express')();
const app = express;
const port = 3000;
// const formidable = require('formidable');
const path = require('node:path');
const fs = require('node:fs');
// throttle = require('express-throttle-bandwidth');

const bodyParser = require('body-parser');
const { checkPrimeSync } = require('crypto');

const members = [
  { id: 3,
    name: "도서관",
    loginId: "lib",
    loginPw:"africa",
    url: '',
    tag: ['a place', 'lib', 'book', 'silent'] },
  { id: 3,
    name: "사자",
    loginId: "lion",
    loginPw:"cute",
    url: '',
    tag: ['a lion', 'big', 'mammuls', 'predator'] },
  { id: 3,
    name: "펭귄",
    loginId: "peng",
    loginPw:"cold",
    url: '',
    tag: ['a penguin', 'cute', 'Antarctica', 'swim'] },
  { id: 4,
    name: "홍길동",
    loginId: "a",
    loginPw:"1",
    url: 'https://image.jtbcplus.kr/data/contents/jam_photo/202003/30/fb002e68-7a2d-4317-8418-6bc12fde5e71.jpg',
    tag: ['a person', 'hero', 'past', 'brave']  }
]

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("hello world!!!!!!!!!!!!!!")
})

app.get('/api/account', (req, res) => {
  // res.send(401)
})

app.get('/tagging', () => {
  // res.send
})

let loginId = ''
let loginPw = ''
const urlArr = []


app.post('/api/account', (req, res) => {
  loginId = req.body.loginId
  loginPw = req.body.loginPw
  const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw)
  if (!urlArr.includes(req.body.url)) {
    // urlArr.push(req.body.url)
  }
  members[0].url = req.body.url
  
  console.log('urlArr =' , urlArr)

  if (member) {
    res.send(member)
  } else {
    res.send(404)
  }
})

app.post('/tagging', (req, res) => {
  loginId = req.body.loginId
  loginPw = req.body.loginPw
  const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw)
  members[req.body.loginId].tag = req.body.tag
  console.log('req.body.tag =' , req.body.tag)
  console.log(' members[req.body.loginId].tag=' , members[req.body.loginId].tag)

  if (member) {
    res.send(member)
  } else {
    res.send(404)
  }
})

app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`)
})