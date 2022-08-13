const { getRoot, getFromPublic, getAutocomplete } = require('./handlers');

const router = (req, res) => {
  const endPoint = req.url;
  const { method } = req;

  if (endPoint === '/') {
    getRoot(res);
  } else if (endPoint.includes('/autocomplete') && method === 'GET') {
    getAutocomplete(req, res, endPoint);
  } else if (endPoint.indexOf('/') !== -1) {
    getFromPublic(res, endPoint);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Error, Page Is Not Found!!!</h1>');
  }
};

if (typeof module !== 'undefined') {
  module.exports = router;
}
