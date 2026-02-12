const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    // 如果前面是寫相對路徑,那我們需要跟 express 說明確的根目錄是哪一個
    res.sendFile('./views/index.html', { root: __dirname });
    res.json({
        message: "test work!!!"
    })
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
    res.json({
        message: "about work!!!"
    })
})

// redirect
app.get('/about-me', (req, res) => {
    res.redirect('/about')
})

// 404
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})

app.listen(port);