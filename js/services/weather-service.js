'use strict'

import { utilService } from './util-service.js'

export const weatherService = {
    getWeather
}

function getWeather(){
    return fetch('http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}&appid={API key}')
    .then((res) => res.json())
    .catch((err) => { console.log('Had issues:', err) })
}