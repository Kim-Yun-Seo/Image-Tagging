const express = require('express')();
const app = express;
const port = 9001;

app.get('/', (req, res) => {
  res.send("hello world!!!!!!!!!~!!!!!")
})

app.get('/api/account', (req, res) => {
  res.send({
    mid: 3,
    memeberName: "홍길동"
  })
})

app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`)
})