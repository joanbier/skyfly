import {Component, Inject} from '@angular/core';
import {FlightModel} from "../../model/flight.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  flight!: FlightModel;

  constructor(
    private dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: FlightModel,
    private router: Router
  ) {
    this.flight = data;
  }

  close() {
    this.dialogRef.close();
  }

  goToEditDetails() {
    this.close()
    this.router.navigate(['dashboard/flights', this.flight.key]);
  }
}
