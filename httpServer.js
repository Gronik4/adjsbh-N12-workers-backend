const http = require('http');
const koaBode = require('koa-body');
const cors = require('koa-cors');
const Koa = require('koa');
const app = new Koa();
const slow = require('koa-slow');
const content = [
  {
    date: Date.now(),
    text: '"Люди икс: Тёмный Феникс" - свой против своих. Показ стартует 27 августа.'
  },
  {
    date: Date.now(),
    text: '"Джон Уик 3". - продолжение истории наемного убийцы уже 7 сентября в кино.'
  },
  {
    date: Date.now(),
    text: '"Мстители 4. Финал". Показ стартует 17 сентября.'
  },
  {
    date: Date.now(),
    text: '"Кими". История айтишницы Зои Кравиц, которая случайно обнаруживает доказательство жестокого преступления.Показ стартует 17 сентября.'
  }
]

app.use(koaBode({
  urlencoded: true,
  json: true,
  multipart: true,
}));

app.use(cors());
app.use(async (ctx, next) => {
  const putUrl = ctx.request.URL; // Получаем от клиента рандом. Если 1 выдаем новый фильм. Если 0 - ошибку.
  const param = putUrl.searchParams.get('fl');
  switch (Number(param)) {
    case 1:
      const rand = Math.floor(Math.random() * 4);
        ctx.status = 200;
        ctx.response.body = content[rand];
      break;
    case 0:
      ctx.status = 500;
      ctx.response.body = 'Error';
      break;
    default:
      console.log('string 46 = default');
      break;
  }
  await next();
}).use(slow({delay: 1500}));

const port = 8080;
http.createServer(app.callback()).listen(port, (err) => {
  if(err) {
    return console.log(`string18 ${err}.`)
  }
  console.log(`Сервер запущен на порту №${port}.`)
})
