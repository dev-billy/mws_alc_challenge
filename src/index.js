

const searchBtn = document.getElementById('search_btn');
const searchInput = document.getElementById('search_input');
const dynamicContent = document.getElementById('dynamicContent');
const beforeSearch = document.getElementById('before-search');
const loader = document.getElementById('loader');
const onSearch = document.getElementById('on-search');
const onFail = document.getElementById('on-fail');


dynamicContent.style.display = 'none';

searchInput.addEventListener('keyup',(e)=>{
    if(e.keyCode === 13){
        e.preventDefault();
        searchBtn.click();
    }
});

searchBtn.addEventListener('click',()=>{
    if(searchInput.value == ''){
        alert('Please Enter a city');
    }else{
        loader.style.display = 'block';
        onFail.innerHTML = '';
        onFail.style.display = 'none';
        beforeSearch.style.display = 'none';
        onSearch.style.display = 'block';
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

    const iconArr = ['weather_icon0','weather_icon1','weather_icon2','weather_icon3','weather_icon4']; 

    let promise = fetch(openWeatherApi)
                    .then(response =>{
                        if(!response.ok){
                            loader.style.display = 'block';
                            beforeSearch.style.display ='none';
                            onSearch.style.display = 'none';
                            onFail.style.display = 'block';
                            onFail.innerHTML = `Error: ${response.status}, ${response.statusText}`;
                        }else{
                            return response;
                        }
                    })
                    .then(data =>{
                            return data.json();                    
                    }).then(results =>{
                        loader.style.display = 'none';
                        onSearch.style.display ='none';
                        onFail.style.display = 'none';
                        dynamicContent.style.display = 'block';
                        
                        weatherLocation.innerHTML = results.city.name + ', ' + results.city.country;

                        let myRes = [];
                        
                        const date = new Date();
                        let currentDay = date.getUTCDay();

                        document.getElementById(daysDate[0]).innerHTML = 
                                                                        daysArray[currentDay] + ', ' + 
                                                                        date.getDate() + ' ' + monthsArray[date.getMonth()] + ' ' 
                                                                        + date.getFullYear();

                        let myList = results.list.forEach(item => {
                            let apiDate = new Date(item.dt * 1000);
                            let apiDay = apiDate.getUTCDay();
                            currentDay = date.getUTCDay();
                            
                            if(currentDay == apiDay){
                                myRes.push(item);
                                date.setDate(date.getDate() + 1);
                            }
       
                    });

                    

                    for(let i =0; i<5; i++){
                        document.getElementById(daysTemp[i]).innerHTML = Math.ceil(myRes[i].main.temp - 273.15) + ' °C'; 
                        document.getElementById(daysWeather[i]).innerHTML = myRes[i].weather[0].main;
                        document.getElementById(iconArr[i]).src = `http://openweathermap.org/img/wn/${myRes[i].weather[0].icon}@2x.png`;
                        let resDay = new Date(myRes[i].dt * 1000).getUTCDay();
                        let counter = i;
                        if(counter != 0 && i <=5){
                            document.getElementById(daysDate[counter]).innerHTML = dayShortArr[resDay];
                        }
                    }                 
                }).catch(error =>{
                    dynamicContent.style.display = 'none';
                    
                    
                })
}
    