export default class SearchCountries {
  constructor() {
    this.countrie = '';
  }

  fetchCountries(countrie) {
    const url = `https://restcountries.com/v3.1/name/${this.countrie}?fields=capital,flags,languages,name,population`;

    return fetch(url).then(r => {
      if (!r.ok) {
        throw new Error(r.status);
      }
      return r.json();
    });
  }

  get query() {
    return this.countrie;
  }

  set query(newCountrie) {
    this.countrie = newCountrie;
  }
}
