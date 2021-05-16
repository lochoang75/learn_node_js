var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

app.use(express.static('public'));
app.use(multer({ dest: '/tmp/' }).any());
app.use(bodyParser.urlencoded({ extended: false}));

var urlencodedParser = bodyParser.urlencoded({ extended: false});

app.get('/', function (req, res) {
    console.log("Got a get request for the homepage");
    res.send('Hello GET');
});

app.post('/', function (req, res) {
    console.log("Get a POST request for the homepage");
    res.send('Hello POST');
});

app.delete('/del_user', function (req, res) {
    console.log("Got a DELETE reuest for /del_user");
    res.send('Hello DELETE');
});

app.get('/list_user', function (req, res) {
    console.log("Got a list user request for list user page");
    res.send('Page Listing');
});

app.get('/ab*cd', function (req, res) {
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
});

app.get('/get_example', function (req, res) {
    res.sendFile(__dirname + "/" + "get_example.html");
});

app.get('/post_example', function (req, res) {
    res.sendFile(__dirname + "/" + "post_example.html");
});

app.get('/file_upload_example', function (req, res) {
    res.sendFile(__dirname + "/" + "file_upload.html");
});

app.get('/process_get', function (req, res) {
    response = {
        first_name:req.query.first_name,
        last_name:req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

app.post('/process_post', urlencodedParser, function (req, res) {
    response = {
        first_name:req.body.first_name,
        last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

app.post('/file_upload', function (req, res) {
    console.log(req.files.file.name);
    console.log(req.files.file.path);
    console.log(req.files.file.type);
    var file = __dirname + "/" + req.files.file.name;

    fs.readFile(req.files.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename:req.files.file.name
                };
            }

            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
