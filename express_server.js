// =================================================================================================
// ==================================     express_server.js     ====================================
// =================================================================================================
// https://www.tutorialspoint.com/expressjs/expressjs_static_files.htm
const express = require('express');
//const http    = require('http');

const app  = express();
const PORT = 8080;

let router = express.Router();

//const http_server = http.Server(app);

console.log(">> ==== server.js (JSON Preprocessor demo) ====");
// console.log("__dirname: " + __dirname);

let www_path = __dirname + "\\public";
console.log("www_path: " + www_path);

app.use(express.static(www_path));

app.listen(PORT);
console.log(">> listening on port: " + PORT);