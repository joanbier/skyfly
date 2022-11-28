import {Component} from '@angular/core';
import {FlightsService} from "../core/services/flights.service";
import {Observable} from "rxjs";
import {FlightModel} from "../model/flight.model";
import {MatDialog} from "@angular/material/dialog";
import {NewFlightModalComponent} from "./new-flight-modal/new-flight-modal.component";
import {DetailsComponent} from "./details/details.component";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {
  flights$: Observable<FlightModel[]> = this.flightsService.getFlights();

  constructor(private flightsService: FlightsService, private dialog: MatDialog) {
  }

  openNewFlightModal() {
    this.dialog.open(NewFlightModalComponent)
  }

  openFlightDetailsModal(flight: FlightModel) {
    this.dialog.open(DetailsComponent, {data: flight});
  }
}
