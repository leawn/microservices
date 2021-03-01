import { User } from './User'
import { Company } from './Company'

export interface Organisation {
    location: {
        lat: number;
        lng: number;
    };
    markerContent(): string;
}

export class CustomMap {
    private googleMap: google.maps.Map;

    constructor(id: string) {
        this.googleMap = new google.maps.Map(document.getElementById(id), {
            zoom: 1,
            center: {
                lat: 0,
                lng: 0
            }
        })
    }

    addMarker(organisation: Organisation): void {
        const marker = new google.maps.Marker({
            map: this.googleMap,
            position: {
                lat: organisation.location.lat,
                lng: organisation.location.lng
            }
        });

        marker.addListener('click', () => {
           const infoWindow = new google.maps.InfoWindow({
               content: organisation.markerContent()
           });

           infoWindow.open(this.googleMap, marker);
        });
    }
}