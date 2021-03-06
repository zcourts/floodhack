var twilio = require('twilio');
var regexIncoming = /([12345]),([a-z]{2}\d{1,2}\s*\d[a-z]{2}),(medical|callback|buddy|vehicle|food|electrician|phonebook|labour|materials|other.* )/i;

/* Module methods and properties */
var smsChannelHandler = function smsChannelHandler() {

    this.respond = function (message) {
        var twiml = new twilio.TwimlResponse();

        if (this.validate(message)) {
            twiml.message('Thank you for your message, we will respond shortly.');
            twiml.valid_msg = true;
        }
        else {
            twiml.message('Usage: urgency, postcode, topic');
            twiml.valid_msg = false;
        }

        return twiml;
    };

    this.validate = function (message) {
        return regexIncoming.test(message);
    };

    if (smsChannelHandler.caller != smsChannelHandler.getInstance) {
        throw new Error("This object cannot be instantiated");
    }
}


/*  Singleton pattern */
smsChannelHandler.instance = null;

smsChannelHandler.getInstance = function () {
    if (this.instance === null) {
        this.instance = new smsChannelHandler();
    }

    return this.instance;
}

module.exports = smsChannelHandler.getInstance();
