const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const adminRouter = require('./routes/admin');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URL;

// --- 1. 設定 Middleware 與 View Engine ---
const engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public')); // 如果使用者要找的是圖片、CSS 或 JavaScript 檔案，請直接去 public 資料夾裡找
app.use(express.urlencoded({ extended: true })); // 負責處理「表單數據」
app.use(morgan('dev'));

// --- 2. 設定所有路由 (Routes) ---

app.use(adminRouter);

// add single blog 
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2232323',
        snippet: 'about my new blog223232',
        body: 'more about my new blog2323232'
    });
    blog.save()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        });
});

// get all blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        });
});

// get specific blog content by id 
app.get('/single-blog', (req, res) => {
    Blog.findById('69a3f8f64ffd1e5cf0006368')
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
    });
});

// 404 (找不到網頁的路由，必須放在所有路由的最下方)
// app.use((req, res) => {
//     res.status(404).render('404', {
//         title: '404',
//     });
// });

// --- 3. 最底部：確保連上資料庫後，才啟動伺服器 ---
mongoose.connect(dbUrl)
    .then((result) => {
        console.log('connected to db');

        app.listen(port, '0.0.0.0', () => {
            console.log(`範例應用程式正在監聽連接埠 ${port}`);
        });
    }).catch((err) => {
        console.log('資料庫連線失敗：', err);
    });