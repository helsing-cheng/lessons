const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');
const db = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

app.get('/', (req, res) => res.send({ ok: true }));

async function start() {
  try {
    await db.sequelize.authenticate();
    console.log('DB connected');

    // 开发环境下自动同步模型到数据库以便快速运行（仅在非 production 使用）
    if (process.env.NODE_ENV !== 'production') {
      console.log('Running sequelize.sync({ alter: true }) for development...');
      await db.sequelize.sync({ alter: true });
      console.log('DB synced (alter)');
    }

    app.listen(config.port, () => console.log('Server started on', config.port));
  } catch (err) {
    console.error('Startup error', err);
    process.exit(1);
  }
}

start();
