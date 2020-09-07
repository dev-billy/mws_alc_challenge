const API_KEY = '9f18e84e6874fc2fb81e7bb28c932f88';

const openWeatherApi = 'http://api.openweathermap.org/data/2.5/forecast?q=London&appid='+API_KEY;

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
                  return myRes;
                })