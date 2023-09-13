const members = [
  { id: 3,
    name: "도서관",
    url: '',
    tag: ['a place', 'lib', 'book', 'silent'] },
  { id: 3,
    name: "사자",
    url: '',
    tag: ['a lion', 'big', 'mammuls', 'predator'] },
  { id: 3,
    name: "펭귄",
    url: '',
    tag: ['a penguin', 'cute', 'Antarctica', 'swim'] },
  { id: 4,
    name: "홍길동",
    url: '',
    tag: ['a person', 'hero', 'past', 'brave']  }
]

const
  express = require('express'),
  app = express(),
  formidable = require('formidable'),
  path = require('node:path'),
  fs = require('node:fs'),
  throttle = require('express-throttle-bandwidth')
  bodyParser = require('body-parser');
  url = require('url')

const
  port = process.env.PORT || 3000,
  // folder = path.join('C:/Users/ssamk/reps/Image-Tagging/front/public')
  folder = path.join(__dirname + '/../front/public/', 'img')
console.log('dirname =' , __dirname + '/../front/public/img')

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder)
}

app.set('port', port)
app.use(throttle(1024 * 128))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())
app.set('view engine', 'ejs')

let test = []
let loginId = ''
let loginPw = ''
let keyArr = ''

app.post('/file', async (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = folder
  form.multiples = true

  form.parse(req, (err, fields, files) => {
    form.on('fileBegin', (formname, file) => {
      test.push(file.originalFilename)
    })
    test = Object.keys(files)
    keyArr = Object.keys(files)

    keyArr.forEach((key) => {
      console.log('key =' , key)
      fs.rename(`${folder}/${files[key][0].newFilename}`,`${folder}/${files[key][0].originalFilename}`, (err) => {
        if (err) throw err;
        // rename complete!
      })
    })
    res.send(test)
  })
})

app.listen(port, () => {
  console.log('\nUpload server running on http://localhost:' + port)
})

app.get('/', (req, res) => {
  res.send("hello world!!!!!!!!!!!!!!")
})

app.get('/file', (req, res) => {
  res.send(test)
})

app.get('/api/account', (req, res) => {
  //
})

app.get('upload', (req, res) => {
  //
})

app.post('/api/account', (req, res) => {
  // loginId = req.body.loginId
  // loginPw = req.body.loginPw
  // const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw)
  const member = members[0]
  // 여기서 맞는 tag를 찾아주는 과정을 하면 된다
  if (req.body.tag) {
    members[0].tag = req.body.tag
  }
  if (member) {
    res.send(member)
  } else {
    res.send(404)
  }
})