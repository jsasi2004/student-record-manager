require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Basic security middlewares
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layout'); // default layout file

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.use('/', studentRoutes);

app.use((req, res) => {
  res.status(404).render('404', { message: 'Page not found' });
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/studentdb';
    await mongoose.connect(uri, { dbName: 'studentdb' });
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start app', err);
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}

module.exports = app; // for tests
