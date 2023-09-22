export default {
	exchangeRates: (key) =>  `http://data.fixer.io/api/latest?access_key=${key}`,
	fullTitleCountries: (key) => `http://data.fixer.io/api/symbols?access_key=${key}`,
	currencyRates: () => 'http://country.io/currency.json',
	flagCountry: (country) => `http://flagcdn.com/108x81/${country}.png`,
}