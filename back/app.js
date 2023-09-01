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
    url: '' },
  { id: 3,
    name: "사자",
    loginId: "lion",
    loginPw:"cute",
    url: '' },
  { id: 3,
    name: "펭귄",
    loginId: "peng",
    loginPw:"cold",
    url: '' },
  { id: 4,
    name: "홍길동",
    loginId: "a",
    loginPw:"1",
    url: 'https://image.jtbcplus.kr/data/contents/jam_photo/202003/30/fb002e68-7a2d-4317-8418-6bc12fde5e71.jpg'  }
]



app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("hello world!!!!!!!!!!!!!!")
})

app.get('/api/account', (req, res) => {
  // res.send(401)
})

let loginId = ''
let loginPw = ''
const urlArr = []

// app.get('/api/img', (req, res) => {
//   console.log('req =' , req)
//   res.send(req)
// })
const folder = path.join(__dirname, 'files')

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder)
}

app.set('port', port)
// app.use(throttle(1024 * 128)) // throttling bandwidth

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})



app.post('/api/account', (req, res) => {
  loginId = req.body.loginId
  loginPw = req.body.loginPw
  // console.log('req.body.url =' , req.body.url.key)
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

// app.post('/upload', (req, res) => {
//   // const form = new formidable.IncomingForm()

//   form.uploadDir = folder
//   form.parse(req, (_, fields, files) => {
//     console.log('\n-----------')
//     console.log('Fields', fields)
//     console.log('Received:', Object.keys(files))
//     console.log()
//     res.send('Thank you')
//   })
// })

app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`)
})