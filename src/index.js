import './css/styles.css';
import APIservices from './js/serviceAPI';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import manyMarkup from './templates/manyCountry.hbs';
import oneMarkup from './templates/oneCcountry.hbs';

// console.log(manyMarkup({ flags: 'first', name: 'name' }));

const apiCountry = new APIservices();
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  text: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  //   refs.text.innerHTML = '';
  console.log(e.target.value);
  apiCountry.responce = e.target.value.trim();
  if (apiCountry.responce) {
    apiCountry.fetchFromServer().then(markUp);
  } else {
    refs.text.innerHTML = '';
  }
}

function markUp(data) {
  if (data.length > 10) {
    refs.text.innerHTML = '';
    Notify.success(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length === 1) {
    refs.text.innerHTML = '';
    refs.text.insertAdjacentHTML(
      'beforeend',
      oneMarkup(oneCountryMarkup(data[0]))
    );
  } else {
    refs.text.innerHTML = '';
    refs.text.insertAdjacentHTML('beforeend', manyMarkup(data));
  }
}

function oneCountryMarkup({ flags, name, capital, languages, population }) {
  const data = {
    flags,
    name,
    population,
    capital,
  };
  data.languages = Object.values(languages).join(', ');
  return data;
}
