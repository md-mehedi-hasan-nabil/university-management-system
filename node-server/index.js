const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRouters');
const departmentRoutes = require('./routes/departmentRoutes');
const studentRoutes = require('./routes/studentRoutes');

const { notFoundHandler, errorhandler } = require('./middlewares/errorHandler');
const { authCheck } = require('./middlewares/authCheck');

const app = express();
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// use middleware
dotenv.config();
app.use(cors());
app.use(morgan('tiny'));
// parse json data
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

//mongoose database
//mehedi....49 Database
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kdlsc.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successful...'))
  .catch((err) => {
    console.error("mongodb error: " + err);
  });



// all routes
app.get('/', (req, res) => {
  const routers = [
    {
      method: 'GET',
      url: '/api/courses',
    },
    {
      method: 'GET',
      url: '/api/department',
    },
    {
      method: 'GET',
      url: "/api/student"
    },
    {
      method: 'GET',
      url: '/api/auth/register',
    },
    {
      method: 'POST',
      url: '/api/auth/register',
    },
    {
      method: 'POST',
      url: '/api/auth/login',
    },
  ];
  res.render('pages/index', { routers });
});

// Token verify
// app.use(verifyToken);

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/student', studentRoutes);

// 404 not found handler
app.use(notFoundHandler);

// error handling
app.use(errorhandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
