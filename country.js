const countryName = new URLSearchParams(window.location.search).get('name');
const darkMode = document.querySelector('#dark-mode');


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then((country) => {
        console.log(country);
        const flagContainer = document.querySelector('#flag');
        const flagImg = document.createElement('img');
        flagImg.src = country[0].flags.svg;
        flagContainer.append(flagImg);
        const data = document.querySelector('#data');

        const countryData = document.createElement('div');
        countryData.classList.add('data-part')
        countryData.innerHTML = `<h3>${country?.[0].name.common}</h3>
				<div id="country-data">
					<div id="sub-data-1">
                        <p><b>Native Name: </b>${Object.values(country?.[0].name.nativeName)[0].common}</p>
						<p><b>Population: </b>${country?.[0].population.toLocaleString('en-IN')}</p>
						<p><b>Region: </b>${country?.[0].region}</p>
						<p><b>Sub Region: </b>${country?.[0].subregion}</p>
						<p><b>Capital: </b>${country?.[0].capital}</p>
					</div>
					<div id="sub-data-2">
						<p><b>Top Level Domain : </b>${country?.[0].tld.join(', ')}</p>
						<p><b>Currencies: </b>${Object.values(country?.[0].currencies).map((currency) => currency.name).join(', ')}</p>
						<p><b>Languages: </b>${Object.values(country?.[0].languages).join(', ')}</p>
					</div>
				</div>
                `

                const border = document.createElement('div');
                border.id = 'border-contry';
                
                if (country[0].borders) {
                    const borderCountryTitle = document.createElement('b');
                    borderCountryTitle.innerHTML = 'Border Countries:';
                    border.append(borderCountryTitle);
                
                    country[0].borders.forEach(bdr => {
                        fetch(`https://restcountries.com/v3.1/alpha/${bdr}`)
                        .then((res) => res.json())
                        .then((data) => {
                            const borderCountry = document.createElement('a');
                            borderCountry.innerHTML = `${data[0].name.common}`;
                            borderCountry.href = `/country.html?name=${data[0].name.common}`; 
                            borderCountry.style.marginRight = '10px'; 
                            border.append(borderCountry);
                        });
                    });
                }


            data.append(countryData);
            data.append(border);

});


darkMode.addEventListener('click', (e) => {
    document.body.classList.toggle('dark');

    const icon = document.querySelector('#dark-mode i');
    const dayNightName = document.querySelector('#dark-mode p');

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