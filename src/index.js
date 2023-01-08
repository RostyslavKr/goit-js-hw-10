import './css/styles.css';
import SearchCountries from './fetchCountries';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const list = document.querySelector('.country-list');

input.addEventListener('input', debounce(onSearchCountries, DEBOUNCE_DELAY));
const searchCountries = new SearchCountries();

function onSearchCountries(e) {
  const input = e.target.value;

  searchCountries.query = input.trim();
  if (input === '') {
    list.innerHTML = '';
  }
  searchCountries
    .fetchCountries(input)
    .then(countries => {
      if (countries.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (countries.length >= 2 || countries.length <= 10) {
        createMarkup(countries);
      }
      if (countries.length === 1) {
        createCountrieMarkup(countries);
      }
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    })
    .finally();
}

function createMarkup(countries) {
  const markup = countries
    .map(
      ({
        name: { official },
        flags: { svg },
      }) => `<li><img src="${svg}" alt="${official}" width="50" height="30">
      <h3>${official}</h3></li>`
    )
    .join('');
  list.innerHTML = markup;
}

function createCountrieMarkup(countries) {
  const markup = countries
    .map(
      ({
        name: { official },
        flags: { svg },
        capital,
        population,
        languages,
      }) => `<div class="countrie-wrapper">
        <img src="${svg}" alt="${official}" width="50" height="30" />
        <h2>${official}</h2>
      </div>
      
        <h3>Capital: <span>${capital}</span></h3>
        
        <h3>Population: <span>${population} </span></h3>
        
        <h3>Languages: <span>${Object.values(languages)}</span></h3>
        `
    )
    .join('');

  return (list.innerHTML = markup);
}
