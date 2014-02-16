var twilio = require('twilio');

/* Module methods and properties */
var voiceChannelHandler = function voiceChannelHandler(){

    this.respond = function(message)
    {
        var twiml = new twilio.TwimlResponse();

        twiml.say('Welcome to Flood 998!')
            .gather({
                action:'/callstage1',
                numDigits: 1
            }, function() {
                this.say('Press 1 if you need urgent help')
                    .say('Press 2 for non-urgent help')
                    .say('Press 3 for general information');
            }).say('Sorry, I didn\'t get your response.')
            .redirect('/voice');

        return twiml;
    };

    this.stage1 = function(digitPressed)
    {
        var twiml = new twilio.TwimlResponse();
        var digit = parseInt(digitPressed) || 0;

        switch(digit)
        {
            case 1:
            case 2:
            case 3:

                twiml.say('Thanks. What do you need help with?')
                    .gather({
                        action:'/callstage2',
                        numDigits: 1
                    }, function() {
                        this.say('Press 1 for medical')
                            .say('Press 2 for food supplies')
                            .say('Press 3 for electric or gas supply')
                            .say('Press 4 for materials such as sand or sandbags');
                    }).say('Sorry, I didn\'t get your response.')
                    .redirect('/callstage1');

                break;

            default:

                twiml.say('Sorry, I didn\'t understand your response.')
                    .redirect('/voice');

                break;
        };

        return twiml;
    };
 
    this.stage2 = function(digitPressed)
    {
        var twiml = new twilio.TwimlResponse();
        var digit = parseInt(digitPressed) || 0;

        switch(digit)
        {
            case 1:
            case 2:
            case 3:
            case 4:
                twiml.say('Thanks. Now use your keypad to enter your postcode.')
                    .gather({
                        action:'/callstage3',
                        numDigits: 7
                    }, function() {
                        this.say('Thanks. Now use your keypad to enter your postcode.');
                    }).say('Sorry, I didn\'t get your response.')
                    .redirect('/callstage2');
                break;

            default:

                twiml.say('Sorry, I didn\'t understand your response.')
                    .redirect('/callstage1');

                break;
        };

        return twiml;
    };

    this.stage3 = function(digitsPressed)
    {
        var twiml = new twilio.TwimlResponse();
        twiml.say('Thanks. We\'ll be in touch shortly');
        return twiml;
    };

    if(voiceChannelHandler.caller != voiceChannelHandler.getInstance){
        throw new Error("This object cannot be instantiated");
    }
}


/*  Singleton pattern */
voiceChannelHandler.instance = null;
 
voiceChannelHandler.getInstance = function(){
    if(this.instance === null){
        this.instance = new voiceChannelHandler();
    }

    return this.instance;
}

module.exports = voiceChannelHandler.getInstance();