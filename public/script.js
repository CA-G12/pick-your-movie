const searchInput = document.getElementById('search');
const autocomplete = document.querySelector('.autocomplete');
const emptyIcon = document.querySelector('.empty-icon');
const searchIcon = document.querySelector('.search-icon');
const cardsCont = document.querySelector('.cards-container');

const fetch = (method, uri, cb) => {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      cb(data);
    }
  };

  xhr.open(method, uri, true);
  xhr.send();
};

const emptyInputField = () => {
  searchInput.value = '';
  autocomplete.style.display = 'none';
  autocomplete.textContent = '';
};

const concatenate = (arr) => arr.join(', ');

const manipulateDOM = (data) => {
  autocomplete.innerHTML = '';
  autocomplete.style.display = 'block';
  data.forEach((title) => {
    const titlePara = document.createElement('p');
    titlePara.classList.add('title');
    titlePara.textContent = title;
    autocomplete.appendChild(titlePara);
  });
};

searchInput.addEventListener('keyup', (event) => {
  const uri = `/autocomplete?data=${encodeURIComponent(event.target.value)}`;
  if (event.target.value === '') {
    autocomplete.innerHTML = '';
    autocomplete.style.display = 'none';
  }
  if (event.target.value !== '') {
    fetch('GET', uri, manipulateDOM);
  }
});

emptyIcon.addEventListener('click', emptyInputField);

