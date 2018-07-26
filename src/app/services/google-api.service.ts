import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

declare let google;

@Injectable()
export class GoogleApiService {



  constructor() {}


  search(location: any): Observable < any > {

    console.log(location);

    return new Observable(observer => {
      let geocoder = new google.maps.Geocoder();

      let directionsService = new google.maps.DirectionsService;

      geocoder.geocode({
        'location': location
      }, function(response, status) {
        observer.next(response);
        observer.complete();

      });

    });

  }




  public directions(origen: any, destino: any): Observable < any > {

    return new Observable(observer => {

      let directionsService = new google.maps.DirectionsService;

      directionsService.route({
        origin: origen,
        destination: destino,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      }, function(response, status) {
        observer.next(response);
        observer.complete();

      });

    });


  }

}
