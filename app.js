const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'home',
        titleH2: '<h2>第二級標題</h2>',
        'show': true,
        'foods': ['apple', 'banana', 'mongo']
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
    })
});


app.get('/blogs/create', (req, res) => {
    res.render('create', {
        title: 'create',
    });
})

// 404
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404',
    })
});

app.listen(port, '0.0.0.0', () => {
    console.log(`範例應用程式正在監聽連接埠 ${port}`);
});