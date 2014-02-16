var twilio = require('twilio'),
    express = require('express'),
    sms = require('./lib/sms-channel-handler'),
    http = require('http'),
    querystring = require('querystring'),
    req = require('request'),
    voice = sms = require('./lib/voice-channel-handler');

// Create an express web app
var app = express();

// Use middleware to parse incoming form bodies
app.use(express.urlencoded());

// Create a webhook that handles an incoming SMS
app.post('/sms', function (request, response) {
    var data = request.body.Body;
    var twiml = new twilio.TwimlResponse();

    if (sms.validate(data)) {
        var parts = data.split(',');
        var priority = parts[0], location = parts[1], topic = parts[2], from = request.body.From, to = request.body.To,
            pushObj = {
                priority: priority,
                location: location,
                topic: topic,
                from: from,
                to: to
            },
            pushObjStr = JSON.stringify(pushObj);
        console.log(pushObj);

        req({
            uri: "http://virtual-techno.co.uk:8888/start",
            method: "POST",
            body: pushObjStr
        }, function (err, res, body) {
            body = JSON.parse(body);
            console.log(body);
            var outMsg = "Thank you. We've forwarded your request to " + body.agency + " their " + body.branch + " branch will be in touch ASAP";
            console.log(outMsg);
            twiml.message(outMsg);
            var msg = twiml.toString();
            console.log(msg);
            response.type('text/xml');
            response.send(msg);
        });
    } else {
        twiml.message('Usage: urgency, postcode, topic');
        var msg = twiml.toString();
        console.log(msg);
        response.type('text/xml');
        response.send(msg);
    }
});

// Create a webhook that handles an incoming voice
app.post('/voice', function (request, response) {

    var twiml = voice.respond(request.body.Body);

    // Render the TwiML response as XML
    response.type('text/xml');
    response.send(twiml.toString());
});

// Create a webhook that handles an incoming voice
app.post('/callstage1', function (request, response) {

    var twiml = voice.stage1(request.body.Digits);

    // Render the TwiML response as XML
    response.type('text/xml');
    response.send(twiml.toString());

});

// Create a webhook that handles an incoming voice
app.post('/callstage2', function (request, response) {

    var twiml = voice.stage2(request.body.Digits);

    // Render the TwiML response as XML
    response.type('text/xml');
    response.send(twiml.toString());

});

// Create a webhook that handles an incoming voice
app.post('/callstage3', function (request, response) {

    var twiml = voice.stage3(request.body.Digits);

    // Render the TwiML response as XML
    response.type('text/xml');
    response.send(twiml.toString());

});

// Have express create an HTTP server that will listen on port 3000
// or "process.env.PORT", if defined
app.listen(8000);
