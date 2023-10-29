const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 4004;
const cors = require("cors");

app.use(cors());

const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error("Ошибка про подключении базы данных:", err.message);
  } else {
    console.log("База данных подключена");
    db.run(`
      CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY,
      user TEXT,
      message TEXT,
      timestamp DATE DEFAULT (datetime('now','localtime'))
    )`);
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT,
      password TEXT
    )`);
  }
});

app.use(express.json());


app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      console.error(err);
      res.send("Не удалось зарегистрироваться");
    } else if (row) {
      res.send("Это имя уже занято");
    } else {
      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password],
        (err) => {
          if (err) {
            console.error(err);
            res.send("Не удалось зарегистрироваться");
          } else {
            res.send("Регистрация прошла успешно");
          }
        }
      );
    }
  });
});


app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        console.error(err);
        res.send("Произошла ошибка во время входа");
      } else if (row) {
        const userData = {
          username: row.username,
        };
        res.json(userData);
      } else {
        res.send("Не получилось войти");
      }
    }
  );
});


app.post("/api/send-message", (req, res) => {
  const { user, message } = req.body;

  db.run(
    "INSERT INTO chat_messages (user, message) VALUES (?, ?)",
    [user, message],
    (err) => {
      if (err) {
        console.error(err);
        res.send("Не удалось отправить сообщение");
      } else {
        res.send("Сообщение отправлено");
      }
    }
  );
});

app.get("/api/get-messages", (req, res) => {
  db.all("SELECT user, message, timestamp FROM chat_messages", (err, rows) => {
    if (err) {
      console.error(err);
      res.send("Ошибка при получении сообщений");
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
