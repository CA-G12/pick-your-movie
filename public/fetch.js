const fetch = (method, path, cb, chars = '') => {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      if (chars) {
        xhr.send(chars);
      }
      cb(data);
    }
  };

  xhr.open(method, path, true);
  xhr.send();
};

module.exports = fetch;
