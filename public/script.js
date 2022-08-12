const fetch = require('./fetch');

const searchInput = document.getElementById('search');
const autocomplete = document.querySelector('.autocomplete');

const manipulateDOM = (data) => {
  autocomplete.innerHTML = '';
  data.forEach((title) => {
    const titlePara = document.createElement('p');
    titlePara.className.add('title');
    titlePara.textContent = title;
    autocomplete.appendChild(titlePara);
  });
};

searchInput.addEventListener('keyup', (event) => {
  fetch('POST', '/autocomplete', manipulateDOM, event.target.value);
});
