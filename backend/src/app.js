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
    // In this scaffold, we won't force sync to avoid data loss; for dev you can use sync({alter:true})
    // await db.sequelize.sync({ alter: true });
    app.listen(config.port, () => console.log('Server started on', config.port));
  } catch (err) {
    console.error('Startup error', err);
    process.exit(1);
  }
}

start();
