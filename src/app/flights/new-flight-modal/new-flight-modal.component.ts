import {Component, OnInit, ViewChild} from '@angular/core';
import {FlightFormComponent} from "../flight-form/flight-form.component";
import {FlightsService} from "../../core/services/flights.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-new-flight-modal',
  templateUrl: './new-flight-modal.component.html',
  styleUrls: ['./new-flight-modal.component.scss']
})
export class NewFlightModalComponent implements OnInit {
  @ViewChild('form') form!: FlightFormComponent

  constructor(
    private flightsService: FlightsService,
    private toast: MatSnackBar,
    private dialogRef: MatDialogRef<NewFlightModalComponent>
  ) {
  }

  ngOnInit(): void {
  }

  createFlight() {
    console.log(this.form.flightForm)
    this.flightsService.addFlight(this.form.flightForm.value)
      .then(this.onCreatingSuccess.bind(this), this.onCreatingFailure.bind(this))
  }

  private onCreatingSuccess() {
    this.dialogRef.close();
    this.toast.open('Flight has been successfully created!', '', {panelClass: 'toast-success'})
  }

  private onCreatingFailure(err: any) {
    this.toast.open(err.message, '', {panelClass: 'toast-error'})
  }

}
