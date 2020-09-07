const API_KEY = '9f18e84e6874fc2fb81e7bb28c932f88';
let searchedLocation = 'New York'

const openWeatherApi = `http://api.openweathermap.org/data/2.5/forecast?q=${searchedLocation}&appid=${API_KEY}`;

const weatherLocation = document.getElementById('weather_location');

const day0Temp = document.getElementById('day_0_temp');
const day1Temp = document.getElementById('day_1_temp');
const day2Temp = document.getElementById('day_2_temp');
const day3Temp = document.getElementById('day_3_temp');
const day4Temp = document.getElementById('day_4_temp');

const day0Date = document.getElementById('day_0_date');
const day1Day = document.getElementById('day_1_day');
const day2Day = document.getElementById('day_2_day');
const day3Day = document.getElementById('day_3_day');
const day4Day = document.getElementById('day_4_day');

const day0Weather = document.getElementById('day_0_weather');
const day1Weather = document.getElementById('day_1_weather');
const day2Weather = document.getElementById('day_2_weather');
const day3Weather = document.getElementById('day_3_weather');
const day4Weather = document.getElementById('day_4_weather');

let promise = fetch(openWeatherApi)
                .then(data =>{
                    return data.json();
                }).then(results =>{
                    weatherLocation.innerHTML = results.city.name + ', ' + results.city.country;

                    let myRes = [];
                    const date = new Date();
                    let currentDay = date.getDay();

                    let myList = results.list.forEach(item => {
                        let apiDt = new Date(item.dt *1000);
                        if(currentDay != apiDt.getDay()){
                            myRes.push(item);   
                            currentDay += 1;
                        }
                  });
                    day0Temp.innerHTML=Math.ceil(myRes[0].main.temp - 273.15) + ' °C';
                    day1Temp.innerHTML=Math.ceil(myRes[1].main.temp - 273.15) + ' °C';
                    day2Temp.innerHTML=Math.ceil(myRes[2].main.temp - 273.15) + ' °C';
                    day3Temp.innerHTML=Math.ceil(myRes[3].main.temp - 273.15) + ' °C';
                    day4Temp.innerHTML=Math.ceil(myRes[4].main.temp - 273.15) + ' °C';

                    day0Weather.innerHTML=myRes[0].weather[0].main;
                    day1Weather.innerHTML=myRes[1].weather[0].main;
                    day2Weather.innerHTML=myRes[2].weather[0].main;
                    day3Weather.innerHTML=myRes[3].weather[0].main;
                    day4Weather.innerHTML=myRes[4].weather[0].main;
                })