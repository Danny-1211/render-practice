const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    console.log('req',req.url)

    res.setHeader('Content-Type', 'text/html');
    let path = './views/';

    switch (req.url) {
        case '/':
            res.statusCode = 200;
            path += 'index.html';
            break;
        case '/about':
            res.statusCode = 200;
            path += 'about.html';
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
        default:
            res.statusCode = 404;
            path += '404.html';
            break;
    }

    if (fs.existsSync(path)) {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log(err);
                res.end();
            } else {
                res.write(data)
                res.end();
            }
        })
    }
});

server.listen(3000, 'localhost', () => {
    console.log('start listen')
})