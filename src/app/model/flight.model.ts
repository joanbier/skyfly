export interface Crew {
  job: string;
  name: string;
}

export interface FlightModel {
  additionalInformation: string;
  code: string;
  crew: Crew[];
  departureTime: string;
  destination: string;
  origin: string;
  returnTime: string;
  withSKPlanesDiscount: boolean;
  key: string;
}
