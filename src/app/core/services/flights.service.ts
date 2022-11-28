import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map, Observable} from "rxjs";
import {FlightModel} from "../../model/flight.model";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private API_URL = '/flights'

  constructor(private db: AngularFireDatabase) {
  }

  getFlights(): Observable<FlightModel[]> {
    return this.db.list<FlightModel[]>(this.API_URL).snapshotChanges()
      .pipe(map(res => res.map(item => this.assignKey(item))));
  }

  getOneFlight(key: string): Observable<FlightModel> {
    return this.db.object<FlightModel>(`${this.API_URL}/${key}`).snapshotChanges()
      .pipe(map(flight => this.assignKey(flight)));
  }

  addFlight(flight: FlightModel): firebase.database.ThenableReference {
    return this.db.list<FlightModel>(this.API_URL).push(flight);
  }

  editFlight(key: string, flight: FlightModel): Promise<void> {
    return this.db.object<FlightModel>(`${this.API_URL}/${key}`).update(flight);
  }

  removeFlight(key: string): Promise<void> {
    return this.db.object<FlightModel>(`${this.API_URL}/${key}`).remove();
  }

  private assignKey(flight: any): FlightModel {
    return {...flight.payload.val(), key: flight.key}
  }
}
