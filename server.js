"use strict";
const http = require('http');
const url = require('url');
const validUrl = require('valid-url');
const db = require('./db.js');

const server = http.createServer();

server.on('error', (e) => {
   console.error(e)
});

server.on('request', (req, res) => {
  const urlObject = url.parse(req.url, true);
  if (req.url === '/'){
    res.end(JSON.stringify({
      error:{
        number: 404,
        message: "not found"
      }
    }));
  } else if( req.url.indexOf('/new/') === 0 ){
    // Handle creation logic here
    const addr = req.url.slice(5);
    if( validUrl.isUri(addr) ) {
      db.save(addr,(err, row)=>{
        if(err || !row){
          res.end(JSON.stringify({error: {
            number: 500, message: http.STATUS_CODES[500]
          }}));
        } else {
          res.end(JSON.stringify({
            original_url: addr,
            short_url: req.headers.host +'/'+ row.rowid,
          }));
        }
      });
    } else {
      res.end(JSON.stringify({
        error:{ number: 400, message: http.STATUS_CODES[400]}
      }));
    }
    // End of creation logic
  } else {
    // Handle look up logic  
    db.search(req.url.slice(1), (err, row)=>{
      if(err) {
        res.end(JSON.stringify({error: {
          number: 500, message: http.STATUS_CODES[500]
        }}));
      } else if( !row ) {
        res.end(JSON.stringify({
          error:{ number: 400, message: http.STATUS_CODES[400]}
        }));
      } else {
        // redirect logic
        res.writeHead(301, { Location: row.url});
        res.end();
      }
    });
  }
});

server.listen(8080);

