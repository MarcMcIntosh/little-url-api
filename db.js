"use strict";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.cached.Database(`./db.sqlite`);
db.on('open',()=>{
  db.run('CREATE TABLE IF NOT EXISTS urls (url TEXT PRIMARY KEY NOT NULL)');
});

module.exports = {
  save: (addr, cb) => {
    db.run('INSERT OR IGNORE INTO urls (url) VALUES ( $addr )',{
      $addr: addr
    }, ()=>{
      db.get('SELECT rowid, * FROM urls WHERE url = $addr',{
        $addr: addr
      }, cb);
    });
  },
  search: (id, cb) => {
    db.get('SELECT url FROM urls WHERE rowid = $id',{$id: id}, cb);
  }
};

