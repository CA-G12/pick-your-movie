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

const createMovieCards = (data) => {
  cardsCont.textContent = '';
  data.forEach((obj) => {
    const card = document.createElement('section');
    card.classList.add('card');
    cardsCont.appendChild(card);

    const img = document.createElement('img');
    img.src = obj.show.image.medium;
    img.alt = 'Poster Image';
    card.appendChild(img);

    const detailsSection = document.createElement('section');
    detailsSection.classList.add('details');
    card.appendChild(detailsSection);

    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = obj.show.name;
    detailsSection.appendChild(title);

    const rating = document.createElement('p');
    rating.classList.add('rating');
    rating.textContent = obj.show.rating.average;
    detailsSection.appendChild(rating);

    const genres = document.createElement('p');
    genres.classList.add('genres');
    genres.textContent = concatenate(obj.show.genres);
    card.appendChild(genres);
  });
};
const getMovies = () => {
  const url = `https://api.tvmaze.com/search/shows?q=${searchInput.value}`;
  fetch('GET', url, createMovieCards);
};

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

searchIcon.addEventListener('click', getMovies);