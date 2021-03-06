var storage = {};
storage.results = [];
var url = require('url');

var requestHandler = function(request, response) {
  var dataString = '';

  var defaultCorsHeaders = {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      "access-control-allow-headers": "content-type, accept",
      "access-control-max-age": 10 // Seconds.
    };
  var headers = defaultCorsHeaders; 


  if (request.method === 'POST') {
    console.log ("[201]" + request.method + "to" + request.url);

    request.on('data', function(chuck) {
      console.log('Recieved Body Data:');
      dataString += chuck;
      // dataString += chuck.toString();
    });

    request.on('end', function () {
      response.writeHead(201, 'OK', headers);
      response.end();
       storage.results.push(JSON.parse(dataString));
      console.log(storage);
    });

    
  }

  if (request.method === 'GET') {
    console.log("Serving request type " + request.method + " for url " + request.url);
    var statusCode = 200;
    var requestURL = url.parse(request.url);
    var ending = requestURL.pathname;
  //  console.log(requestURL);
  //  console.log(ending);

    var re = /classes/g;

    if (!ending.match(re)) {
      console.log("[404]" + request.method + " to " + requestURL);
      response.writeHead(404, "Method not supported", {'Content-Type': 'text/plain'});
      response.end();
    }


    headers['Content-Type'] = "application/json";

    response.writeHead(statusCode, headers);

    response.end(JSON.stringify(storage));
  }
  if(request.method === 'OPTIONS'){
      response.writeHead(200, headers);
      response.end();
  }                       
};




exports.requestHandler = requestHandler;

