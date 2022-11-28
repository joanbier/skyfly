import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Crew, FlightModel} from "../../model/flight.model";
import {flightCodeValidator} from "./code.validator";

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss']
})
export class FlightFormComponent implements OnInit {
  @Input() editMode: boolean = false;
  flightForm!: FormGroup;

  professions = [
    {label: 'Flight attendant', value: 'flight_attendant'},
    {label: 'Senior Cabin Crew', value: 'senior_cabin_crew'},
    {label: 'Pilot', value: 'Pilot'},
    {label: 'Co-Pilot', value: 'co_pilot'},
    {label: 'Mechanic', value: 'mechanic'},
  ]

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  setFlight(flight: FlightModel) {
    const {key, ...formData} = flight;
    this.flightForm.patchValue(formData);
    if (formData.crew !== undefined) {
      formData.crew.forEach(crewMember => this.addCrewMember(crewMember));
    }
  }

  buildForm() {
    this.flightForm = this.fb.group({
      additionalInformation: '',
      code: ["SKY", {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
          flightCodeValidator
        ]
      }],
      departureTime: ["", {validators: [Validators.required]}],
      destination: ["", {validators: [Validators.required]}],
      origin: ["", {validators: [Validators.required]}],
      returnTime: ["", {validators: [Validators.required]}],
      withSKPlanesDiscount: false,
      crew: this.fb.array(this.editMode ? [] : [this.buildCrewMember()])
    })
  };

  buildCrewMember(crewMember: Crew = {} as Crew) {
    return this.fb.group({
      name: crewMember.name || '',
      job: crewMember.job || '',
    })
  };

  get crew() {
    return this.flightForm.get('crew') as FormArray;
  }

  get code() {
    return this.flightForm.get('code');
  }

  removeCrewMember(i: number) {
    this.crew.removeAt(i);
  }

  addCrewMember(crewMember?: Crew) {
    this.crew.push(this.buildCrewMember(crewMember));
  }


  trackByFn(index: number) {
    return index;
  }

}
