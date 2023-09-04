const express = require("express");
const server = express();
const app = express();

server.use(express.static(__dirname + "/public"));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.post("/file", (req, res) => {
  res.sendFile(__dirname + "/file.html");
  console.log(req.file);
  // res.status(200).send('uploaded');
});

// server.use((req, res) => {
//   res.sendFile(__dirname + "/404.html");
// });

const multer = require('multer');

const upload = multer({
	dest: 'files/'
});

const uploadMiddleware = upload.single('myFile');

app.use(uploadMiddleware);

// app.post('/file', (req, res) => {
//     console.log(req.file);
//     res.status(200).send('uploaded');
// });

server.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("The server is listening on port 3000");
  console.log(`서버가 실행됩니다. http://localhost:${3000}`)
});