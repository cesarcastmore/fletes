import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Http, Response, Headers } from '@angular/http';
import { AuthService } from './auth.service';


@Injectable()
export class FirestoreService {

  private itemsCollection: AngularFirestoreCollection < any > ;
  private entity;

  constructor(public db: AngularFirestore) {

  }


  public setEntity(entity: string) {
    this.entity = entity;

  }


  public filter(qf: Query) {
    this.itemsCollection = this.db.collection < any > (this.entity, ref => {

      return qf.create(ref);

    });

    return this.itemsCollection;
  }


  public getAll() {
    this.itemsCollection = this.db.collection < any > (this.entity);

    return this.itemsCollection;
  }

  public createDocRef(entity: string, id: string) {
    this.itemsCollection = this.db.collection < any > (entity);
    return this.itemsCollection.doc(id).ref;
  }

  public createDoc(entity: string, id: string) {
    this.itemsCollection = this.db.collection < any > (entity);
    return this.itemsCollection.doc(id).ref;
  }

  public create(item: any): Observable < any > {
    return new Observable(observer => {

      this.itemsCollection = this.db.collection < any > (this.entity);
      const id = this.db.createId();
      item['id'] = id;
      let doc = this.itemsCollection.doc(id);
      doc.set(item);
      doc.ref.get().then(documentSnapshot => {
        let data = documentSnapshot.data();
        observer.next(data);
        observer.complete();

      });
    });

  }


  public update(item: any): Observable < any > {
    return new Observable(observer => {

      this.itemsCollection = this.db.collection < any > (this.entity);
      let doc = this.itemsCollection.doc(item.id);
      doc.set(
        item, {
          merge: true
        });

      doc.set(item);
      doc.ref.get().then(documentSnapshot => {
        let data = documentSnapshot.data();
        observer.next(data);
        observer.complete();

      })


    });

  }


  public get(id: string): Observable < any > {
    return new Observable(observer => {
      this.itemsCollection = this.db.collection < any > (this.entity);
      let doc = this.itemsCollection.doc(id);

      doc.ref.get().then(documentSnapshot => {
        let data = documentSnapshot.data();
        observer.next(data);
        observer.complete();

      })

    });

  }

    public getEntity(entity: string, id: string): Observable < any > {
    return new Observable(observer => {
      this.itemsCollection = this.db.collection < any > (this.entity);
      let doc = this.itemsCollection.doc(id);

      doc.ref.get().then(documentSnapshot => {
        let data = documentSnapshot.data();
        observer.next(data);
        observer.complete();

      })

    });

  }


  public getDatafromDocRef(documentReference: firebase.firestore.DocumentReference): Observable < any > {
    return new Observable(observer => {
      documentReference.get().then(documentSnapshot => {
        let data = documentSnapshot.data();
        observer.next(data);
        observer.complete();

      });
    })

  }


  public remove(item: any) {
    console.log(item);
    this.itemsCollection = this.db.collection < any > (this.entity);
    this.itemsCollection.doc(item.id).delete();
  }
}

export class Query {

  public _queryWhere: QueryWhere[] = [];
  public ref: firebase.firestore.Query;

  constructor() {

  }

  public _where(key: any, expresion: any, value: any) {
    this._queryWhere.push(new QueryWhere(key, expresion, value));

  }


  public create(ref: firebase.firestore.Query): firebase.firestore.Query {

    this.ref = ref;

    for (let _where of this._queryWhere) {
      console.log("key " + _where.key + " expresion " + _where.expresion + " value " + _where.value);
      this.ref = this.ref.where(_where.key, _where.expresion, _where.value);
    }

    return this.ref;
  }

}



export class QueryWhere {

  public key: string;
  public expresion: any;
  public value: any;
  constructor(key: string, expresion: string, value) {
    this.key = key;
    this.expresion = expresion;
    this.value = value;

  }




}
