export interface Patient {
  id: string;
  name: string;
  caretaker: string;
  email: string;
  symptoms: string;
  date: Date;
}

export type DraftPatient = Omit<Patient, "id">;
