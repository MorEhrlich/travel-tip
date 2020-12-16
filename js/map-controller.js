import { locationService } from './services/location-service.js'


console.log('locationService', locationService);

var gGoogleMap;

window.onload = () => {
    initMap()
        .then(() => {
            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    getUserPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })

    document.querySelector('.btn').addEventListener('click', (ev) => {
        console.log('Aha!', ev.target);
        panTo(35.6895, 139.6917);
    })

    locationService.getLocations().then(function (locations) {
        renderLocations(locations) }
    );
   
}


export function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gGoogleMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gGoogleMap);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gGoogleMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gGoogleMap.panTo(laLatLng);
}

function getUserPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBTd-r9ES9me88-mTQasKgom191cNMihjY'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


/* map */


function renderLocations(locations) {
    if (locations) {
        const strHtmls = locations.map((location, idx) => {
            return `
                    <tr>
                        <td>${idx + 1}</td>
                        <td>${location.name}</td>
                        <td>${location.lat}</td>
                        <td>${location.lng}</td>
                        <td><button class="go-btn">Go</button></td>
                        <td><button class="delete-btn">Delete</button></td>
                    </tr>
                `
        })
        document.querySelector('.locations-table-body').innerHTML = strHtmls.join('');
    }

}


/* get current position */

const eCurrlPos = document.querySelector('.my-location-btn');
eCurrlPos.addEventListener('click', getPosition);

function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(setCurrentPosition);
}

function setCurrentPosition(position) {
    initMap(position.coords.latitude, position.coords.longitude);
}

addClickedLocation()

/* get current click position */

function addClickedLocation() {
    gGoogleMap.addEventListener('click', (ev) => {
        console.log('Map clicked', ev);
        const locationName = prompt('What is the location name?')
        console.log('Map clicked', locationName, ev.latLng.lat(), ev.latLng.lng());
        var location = {
            name: locationName,
            lat: ev.latLng.lat(),
            lng: ev.latLng.lng()
        }
        locationService.gLocations.push(location);
        renderLocations();
    });
}

/* go button */

// const elGo = document.querySelector('.go-btn');
// elGo.addEventListener('click', onGoToPlace(`${location.lat} , ${location.lng}`));

// function onGoToPlace(lat, lng) {
//     initMap(lat, lng);
// }

/* delete button */

// const elDelete = document.querySelector('.delete-btn');
// elDelete.addEventListener('click', onDelete(`${location.name}`));

// function onDelete(locationName) {
//     locationService.deleteLocation(locationName);
//     renderLocations()
// }
