const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    // 這樣寫是正確的，一次只回傳一個 JSON
    res.json({
        message: "test work!!!"
    });
});

app.get('/about', (req, res) => {
    res.json({
        message: "about work!!!"
    });
});

// // redirect
// app.get('/about-me', (req, res) => {
//     res.redirect('/about');
// });

app.use((req, res) => {
    res.status(404).json({ error: "Page not found" }); 
});

app.listen(port, '0.0.0.0', () => {   
    console.log(`範例應用程式正在監聽連接埠 ${port}`);
});