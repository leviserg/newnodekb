/*
function greeting(greet){
    console.log(greet);
}

greeting('Привіт, Сергій!');
*/
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs'); // file system

fs.readFile('index.html', (err,html) => {
    
    if(err){
        throw err;
    }

    const server = http.createServer((req, res)=>{
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html'); // text/plain - run as simple text
        res.write(html);
        res.end();
    });
    
    server.listen(port, hostname, () => {
        console.log('Server started on port ' + port);
    });

});