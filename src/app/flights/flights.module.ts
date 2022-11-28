import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlightsComponent} from './flights.component';
import {FlightCardComponent} from './flight-card/flight-card.component';
import {MaterialModule} from "../material/material.module";
import {NewFlightModalComponent} from './new-flight-modal/new-flight-modal.component';
import {FlightFormComponent} from './flight-form/flight-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DetailsComponent} from './details/details.component';
import {EditFlightComponent} from './edit-flight/edit-flight.component';
import {FlightsRoutingModule} from "./flights-routing.module";


@NgModule({
  declarations: [
    FlightsComponent,
    FlightCardComponent,
    NewFlightModalComponent,
    FlightFormComponent,
    DetailsComponent,
    EditFlightComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlightsRoutingModule,
  ]
})
export class FlightsModule {
}
