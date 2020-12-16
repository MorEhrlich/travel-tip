'use strict'

import { utilService } from './util-service.js'

export const locationService = {
    getLocations,
    deleteLocation
}

const KEY = 'locationsDB';
const gLocations = [{ lat: 17, lng: 19, name: 'Puki Home', weather: 'sunny'}];

function getLocations() {
    return Promise.resolve(gLocations)
    .then(locations => {
        utilService.saveToStorage('locationsDB', locations);
        return locations;
    })
    .catch((err) => { 
        console.log('Had issues:', err)
     })
}



function deleteLocation(locationName) {
    var LocationIdx = gLocations.findIndex((location) => {
        return locationName === location.name;
    });
    if (LocationIdx === -1) return;
    gLocations.splice(LocationIdx, 1);
    utilService.saveToStorage(KEY, gLocations);
}
