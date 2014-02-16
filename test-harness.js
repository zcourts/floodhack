var sms = require('./lib/sms-channel-handler');
var fs = require('fs');
var twilio = require('twilio');


// Check command line arguments
if(!process.argv[2])
{
	console.log("USAGE: node test-harness.js [SMS incoming text]");
	process.exit(1);
}

var response = sms.respond(process.argv[2]);

console.log(response.toString());