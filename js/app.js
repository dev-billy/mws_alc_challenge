const searchBtn = document.getElementById('search_btn');
const searchInput = document.getElementById('search_input');

searchBtn.addEventListener('click',()=>{
    if(searchInput.value == ''){
        alert('Please Enter a city');
    }else{
        
        runUrl(searchInput.value);
    }
});

function runUrl(userSearch) {
    const API_KEY = '9f18e84e6874fc2fb81e7bb28c932f88';
    let searchedLocation = userSearch;

    const openWeatherApi = `http://api.openweathermap.org/data/2.5/forecast?q=${searchedLocation}&appid=${API_KEY}`;

    const weatherLocation = document.getElementById('weather_location');


    const daysTemp = ['day_temp0','day_temp1','day_temp2','day_temp3','day_temp4'];
    const daysDate = ['date0','day1','day2','day3','day4'];
    const daysWeather = ['day_weather0','day_weather1','day_weather2','day_weather3','day_weather4']

    const daysArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const dayShortArr = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

    const monthsArray = ['January','February','March','May','June','July','August','September','October','November','December'];


    let promise = fetch(openWeatherApi)
                    .then(data =>{
                        return data.json();
                    }).then(results =>{
                        weatherLocation.innerHTML = results.city.name + ', ' + results.city.country;

                        let myRes = [];

                        const date = new Date();
                        let currentDay = date.getUTCDay();

                        document.getElementById(daysDate[0]).innerHTML = 
                                                                        daysArray[currentDay] + ', ' + 
                                                                        date.getDate() + ' ' + monthsArray[date.getMonth()] + ' ' 
                                                                        + date.getFullYear();

                        let myList = results.list.forEach(item => {
                            let apiDay = new Date(item.dt *1000).getUTCDay();
                            if(currentDay == apiDay){
                                myRes.push(item);   
                                currentDay = currentDay + 1;
                                apiDay = apiDay +1;
                            }else{
                                return
                            }
                    });
                    

                    for(let i =0; i<5; i++){
                        document.getElementById(daysTemp[i]).innerHTML = Math.ceil(myRes[i].main.temp - 273.15) + ' °C'; 
                        document.getElementById(daysWeather[i]).innerHTML = myRes[i].weather[0].main;
                        let resDay = new Date(myRes[i].dt * 1000).getUTCDay();
                        
                        if(i != 0 && i <=5){
                            document.getElementById(daysDate[i]).innerHTML = dayShortArr[resDay];
                        }
                    }                 
                })
}
    