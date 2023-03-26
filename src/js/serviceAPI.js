import { Notify } from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1';

export default class countryAPI {
  constructor() {
    this.responce = '';
    this.data = {};
    this.amount = 0;
    this.dataArray = [];
  }

  fetchFromServer() {
    return fetch(
      `${BASE_URL}/name/${this.responce}?fields=name,capital,population,flags,languages`
    )
      .then(response => {
        if (!response.ok) {
          Notify.failure('Oops, there is no country with that name');
          throw new Error(response.status);
        }

        return response.json();
      })
      .then(data => data);
  }
}
