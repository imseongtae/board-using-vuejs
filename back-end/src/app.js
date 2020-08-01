const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// api
const api = require('./api');
// const middleware = require('./middleware');
const config = require('./config.json');

// setup express
const app = express();

app.use(morgan('dev'));

// 3rd party middleware
// cors 를 적용하면 회원가입이 정상적으로 이루어짐
app.use(cors({ exposedHeaders: config.corsHeaders }));
// app.use(cors());

app.use(express.json());
// CORS를 허용했더라도 POST, PUT, DELETE 요청에서 json을 전송하는 경우 요청이 차단
// 아래로 인해 CORB 에러 발생, www-form-urlencoded 형식으로 데이터 보내면 해결
// app.use(express.urlencoded({ extended: false }));

// internal middleware
// app.use(middleware({ config }));

// api router
app.use('/api', api());

module.exports = app;
