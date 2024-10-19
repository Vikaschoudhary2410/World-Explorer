const cardContainer = document.querySelector(".card-container");
const filter = document.querySelector('#filter-by-region');
const search = document.querySelector('#search');
const nightMode = document.querySelector('#day-night');
let allCountriesData;

fetch(`https://restcountries.com/v3.1/all`)
  .then((response) => response.json())
  .then(function(data) {
        // console.log(data);
        renderCountries(data);
        allCountriesData = data;
  });


filter.addEventListener('change', (e) => {
    // console.log(e.target.value);
    // console.log(filter.value);
    fetch(`https://restcountries.com/v3.1/region/${filter.value}`)
  .then((response) => response.json())
  .then(function(data) {
        //console.log(data)
        renderCountries(data);
  });
})

search.addEventListener('input', (e)=>{
    const data = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(data);
})

nightMode.addEventListener('click', (e) => {
    document.body.classList.toggle('dark');
    const icon = document.querySelector('#day-night i');
    const dayNightName = document.querySelector('#day-night p');

    if(dayNightName.innerHTML === 'Dark Mode'){
        icon.classList.remove("ri-moon-line");
        icon.classList.add("ri-sun-line")
        dayNightName.innerHTML = 'Light Mode';
    }
    else{
        icon.classList.remove("ri-sun-line")
        icon.classList.add("ri-moon-line");
        dayNightName.innerHTML = 'Dark Mode'
    }
})



function renderCountries(data){
        cardContainer.innerHTML = '';
        data.forEach(country => {
            const countryCard = document.createElement("a");
            countryCard.classList.add('card');
            countryCard.href = `/country.html?name=${country.name.common}`

            countryCard.innerHTML = `<img src="${country.flags.svg}">
                <div style="padding: 10px">
                <h3>${country.name.common}</h3>
                <p><b>Population: </b> ${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0]}</p>
                </div>`
            
            cardContainer.append(countryCard);
        });
}