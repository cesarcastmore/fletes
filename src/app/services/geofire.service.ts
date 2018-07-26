import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import { GeoFirestore } from 'geofirestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class GeofireService {

  private itemsCollection: AngularFirestoreCollection < any > ;
  private geoFirestore: GeoFirestore;
  locations = new BehaviorSubject([])

  constructor(public db: AngularFirestore) {
    let collectionRef = this.db.collection < any > ('coordenadas_solicitudes');
    this.geoFirestore = new GeoFirestore(collectionRef.ref);
  }



  //https://angularfirebase.com/lessons/geofire-location-queries-with-google-maps/
  //https://github.com/firebase/geofire-js/blob/master/docs/reference.md
  public set(key: string, coordinates: number[]) {


    this.geoFirestore.set(key, coordinates).then((docRef) => {

    }, (error) => {
      console.log('Error: ' + error);
    });

  }
/*

  public getLocations(center: any, radius: number): Observable < any > {
    return new Observable(observer => {

      var geoQuery = this.geoFirestore.query({
        center: [center.lat, center.lng],
        radius: radius
      });

      let onKeyEnteredRegistration = geoQuery.on('key_entered', (key, location, distance) => {

        let hit = {
          key: key,
          location: location,
          distance: distance
        }

        observer.next(hit);

      });
      geoQuery.on("ready", function() {

        // This will fire once the initial data is loaded, so now we can cancel the "key_entered" event listener
        onKeyEnteredRegistration.cancel();
        observer.complete();

      });

    });

  }*/
}
