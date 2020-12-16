'use strict'

import { utilService } from './util-service.js'

export const weatherService = {
    getWeather
}

function getWeather(){
    return fetch('http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}&appid={e1aa53f20c49949cd017192f632de630}')
    .then((res) => res.json())
    .catch((err) => { console.log('Had issues:', err) })
}