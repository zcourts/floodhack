var request = require('request');
request({
        uri: "http://virtual-techno.co.uk:8888/start",
        method: "POST",
        body: JSON.stringify({ priority: '1',
            location: 'GL53 0HE',
            topic: 'medical',
            from: '+447832101007',
            to: '+441183241615' })
    },
    function (error, response, body) {
        body = JSON.parse(body);
        console.log(body.agency);
        console.log(body, error)
    }
);
