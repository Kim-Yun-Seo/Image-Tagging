const
  express = require('express'),
  app = express(),
  formidable = require('formidable'),
  path = require('node:path'),
  fs = require('node:fs'),
  throttle = require('express-throttle-bandwidth')
  bodyParser = require('body-parser');

const
  port = process.env.PORT || 3000,
  folder = path.join(__dirname, 'files')

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder)
}

app.set('port', port)
app.use(throttle(1024 * 128)) // throttling bandwidth

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())

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

let test = []
let loginId = ''
let loginPw = ''
let tag = []
const urlArr = []

app.post('/file/kk', async (req, res) => {
  const form = new formidable.IncomingForm()
  // const form = formidable()
  // console.log('POST /upload', form)

  form.uploadDir = folder

  form.multiples = true

  form.parse(req, (err, fields, files) => {
    console.log('\n-----------')
    console.log("error:", err)
    test = Object.keys(files)
    // test.push(Object.keys(files))
    console.log('Received:', Object.keys(files))
    console.log()
    console.log('test =' , test)
    res.send(test)
  })

  // form.on('fileBegin', (formname, file) => {
  //   console.log('fileBegin:', formname, file)
  // })
  // form.on('file', (formname, file) => {
  //   console.log('file', { formname, file });
  // });
  
  // form.on('field', (fieldName, fieldValue) => {
  //   console.log('field', { fieldName, fieldValue });
  // });
  
  // form.once('end', () => {
  //   console.log('Done!');
  // });
})

app.listen(port, () => {
  console.log('\nUpload server running on http://localhost:' + port)
})

app.get('/', (req, res) => {
  res.send("hello world!!!!!!!!!!!!!!")
})

app.get('/file/kk', (req, res) => {
  res.send(test)
})

app.get('/api/account', (req, res) => {
  // res.send(401)
})

app.get('upload', (req, res) => {
  //
})

app.post('/api/account', (req, res) => {
  loginId = req.body.loginId
  loginPw = req.body.loginPw
  const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw)
  members[0].url = req.body.url
  if (req.body.tag) {
    members[0].tag = req.body.tag
  }
  if (member) {
    console.log('member =' , member)
    res.send(member)
  } else {
    res.send(404)
  }
})
