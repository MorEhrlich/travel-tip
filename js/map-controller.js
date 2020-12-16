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
    // document.querySelector('#map').addEventListener('click', (ev) => {
    //     panTo(ev.latLng.lat(), ev.latLng.lng());
    // })

    locationService.getLocations()
        .then(locations => renderLocations(locations));
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


// function onGoToPlace() {
//     var elMap = document.querySelector('#map')
//     elMap.addEventListener('click', function (ev) {
//         console.log('Map clicked', ev.latLng.lat(), ev.latLng.lng());
//         var place = {
//             lat: ev.latLng.lat(),
//             lng: ev.latLng.lng()
//         }
//         panTo(place.lat,place.lng);    
//     });

// }

// onGoToPlace() 
// mapView()

// function mapView() {
//     const myLatlng = { lat: -25.363, lng: 131.044 };
//     const map = new google.maps.Map(document.querySelector("#map"), {
//       zoom: 4,
//       center: myLatlng,
//     });
//     // Create the initial InfoWindow.
//     let infoWindow = new google.maps.InfoWindow({
//       content: "Click the map to get Lat/Lng!",
//       position: myLatlng,
//     });
//     infoWindow.open(map);
//     // Configure the click listener.
//     map.addListener("click", (mapsMouseEvent) => {
//       // Close the current InfoWindow.
//       infoWindow.close();
//       // Create a new InfoWindow.
//       infoWindow = new google.maps.InfoWindow({
//         position: mapsMouseEvent.latLng,
//       });
//       infoWindow.setContent(
//         JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
//       );
//       infoWindow.open(map);
//     });
//   }



/* map */


function renderLocations(locations) {
    const strHtmls = locations.map((location, idx) => {
        return `
                <tr>
                    <td>${idx + 1}</td>
                    <td>${location.name}</td>
                    <td>${location.lat}</td>
                    <td>${location.lng}</td>
                </tr>
            `
    })
    document.querySelector('.locations-table').innerHTML = strHtmls.join('');
}
