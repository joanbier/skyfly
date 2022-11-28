import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FlightsService} from "../../core/services/flights.service";
import {tap} from "rxjs";
import {FlightModel} from "../../model/flight.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FlightFormComponent} from "../flight-form/flight-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.scss']
})
export class EditFlightComponent implements AfterViewInit {
  @ViewChild('flightForm') flightForm!: FlightFormComponent;
  flight!: FlightModel;

  constructor(
    private flightsService: FlightsService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: MatSnackBar,
  ) {
  }

  ngAfterViewInit(): void {
    this.loadFlight();
  }

  private loadFlight() {
    const key = this.route.snapshot.params['key'];
    this.flightsService.getOneFlight(key)
      .pipe(
        tap(flight => this.flightForm.setFlight(flight))
      )
      .subscribe(flight => this.flight = flight)
  }

  saveEditedFlight() {
    this.flightsService.editFlight(this.flight.key, this.flightForm.flightForm.value)
      .then(this.onSuccess.bind(this, 'Flight has been successfully edited!'), this.onFailure.bind(this))
  }

  removeFlight() {
    this.flightsService.removeFlight(this.flight.key)
      .then(this.onSuccess.bind(this, 'Flight has been removed!'), this.onFailure.bind(this))
  }

  private onSuccess(message: string): void {
    this.router.navigate(['/dashboard']);
    this.toast.open(message, '', {panelClass: 'toast-success'});
  }

  private onFailure(err: Error) {
    this.toast.open(err.message, '', {panelClass: 'toast-error'})
  }
}
