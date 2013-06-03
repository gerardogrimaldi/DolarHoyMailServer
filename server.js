var express = require('express');
var mail = require("./nodemail");
var app = express();

app.use(express.logger());

app.get('/mail/:pass/:name/:subject/:text', function(req, res) {
    if (req.params.pass != 'Hola123!') return res.send('Error: Wrong password...');
    try {
        sendMail(req.params.name,req.params.subject, req.params.text);
    }
    catch(err) { onError(err); }
});

app.listen(process.env.PORT);

function sendMail(name, subject, text) {
    mail.mailOptions.subject = 'DolarHoyServer Mensaje del Usuario: ' + name +  ' con Tema : ' + subject;
    mail.mailOptions.text = subject;
    mail.sendMail();
}

function onError(err) {
    mail.mailOptions.subject = 'DolarHoyServer Info: Error';
    mail.mailOptions.html = 'ERROR : ' + err;
    mail.sendMail();
    console.log(err);
}

console.log('Server HTTP Listening on port ' + process.env.PORT + '...');