const fs = require('fs');
const path = require('path');
const url = require('url');

const { titles } = require('./data');

const getRoot = (res) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Sorry, Server Internal Error!!!</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(file);
      res.end();
    }
  });
};

const getFromPublic = (res, endPoint) => {
  const extensionsObj = {
    html: 'text/html',
    css: 'text/css',
    png: 'image/png',
    js: 'application/javascript',
  };
  const extension = endPoint.split('.')[1];
  const filePath = path.join(__dirname, '..', 'public', endPoint);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Sorry, Server Internal Error!!!</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': extensionsObj[extension] });
      res.write(file);
      res.end();
    }
  });
};

const getAutocomplete = (req, res, uri) => {
  const queryData = url.parse(uri, true).query.data;

  const filteredData = titles.filter((title) => title.includes(queryData));
  const stringData = JSON.stringify(filteredData);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(stringData);
  res.end();
};

if (typeof module !== 'undefined') {
  module.exports = {
    getRoot,
    getFromPublic,
    getAutocomplete,
  };
}
