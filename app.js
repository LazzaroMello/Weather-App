window.addEventListener('load', () => {

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('temperature');
    let temperatureSpan = document.querySelector('temperature span');

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)

            let long = position.coords.longitude;
            let lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/c867ea8753c9f3e3149c850144931fb8/${lat},${long}`;

            fetch(api)
                .then(response => {

                    return response.json();

                })
                .then(data => {

                    console.log(data);
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;

                    // set DOM Elements from API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    let celsius = (temperature - 32) * (5 / 9)

                    //set icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Change temperature  to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {

                        if (temperatureSpan.textContent === 'F') {

                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius);

                        } else {

                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = temperature;

                        }
                    })
                })
        })
    }
})

 