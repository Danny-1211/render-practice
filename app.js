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

// redirect
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

// 404
// 注意：如果你的專案裡沒有 ./views/404.html 這個檔案，這裡還是會報錯導致崩潰
app.use((req, res) => {
    res.status(404).json({ error: "Page not found" }); 
    // 建議先用 JSON 測試，確定通了再換回 sendFile
});

// 關鍵修改：加上 '0.0.0.0'
app.listen(port, '0.0.0.0', () => {   
    console.log(`範例應用程式正在監聽連接埠 ${port}`);
});