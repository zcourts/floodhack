var twilio = require('twilio'),
    express = require('express'),
    sms = require('./lib/sms-channel-handler');
    
// Create an express web app
var app = express();
 
// Use middleware to parse incoming form bodies
app.use(express.urlencoded());
 
// Create a webhook that handles an incoming SMS
app.post('/sms', function(request, response) {

	var twiml = sms.respond(request.body);
    
    // Render the TwiML response as XML
    response.type('text/xml');
    response.send(twiml.toString());
});
 
// Have express create an HTTP server that will listen on port 3000
// or "process.env.PORT", if defined
app.listen(process.env.PORT || 8000);