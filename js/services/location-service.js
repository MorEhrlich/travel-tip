'use strict'

import { utilService } from './util-service.js'

export const locationService = {
    getLocations,
    deleteLocation
}

const KEY = 'locationDB';
const gLocations = [{ lat: 17, lng: 19, name: 'Puki Home' }];

function getLocations() {
    return Promise.resolve(gLocations)
}

function deleteLocation(locationName) {
    var LocationIdx = gLocations.findIndex((location) => {
        return locationName === location.name;
    });
    if (LocationIdx === -1) return;
    gLocations.splice(LocationIdx, 1);
    utilService.saveToStorage(KEY, gLocations);
}