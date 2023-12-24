const express = require('express');
const cors = require('cors');
const bodyParser = require ("body-parser");
const app = express();
const { faker } = require('@faker-js/faker');
const port = 3000;

let folder = {
  "status": "ok",
  "timestamp": 1553400000,
  "messages": [],
}

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// GET /messages/unread
app.get('/messages/unread', (req, res) => {
  const date = new Date().getTime() / 1000;
  const fakeMessage = {
    "id": faker.string.uuid(),
    "from": faker.internet.email(),
    "subject": `Hello from ${faker.internet.userName()}`,
    "body": faker.lorem.paragraphs(3),
    "received": date,
  }; 
  folder.messages.push(fakeMessage);
  folder.timestamp = date;
  res.send(JSON.stringify(fakeMessage));
});

// GET /messages
app.get('/messages', (req, res) => {
  const date = new Date().getTime() / 1000;
  folder.timestamp = date;
  res.send(JSON.stringify(folder));
});

app.listen(port, () => {
  console.log(`Сервер запущен, порт: ${port}`);
});