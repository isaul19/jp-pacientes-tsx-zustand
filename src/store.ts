import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { v4 as uui } from "uuid";
import { DraftPatient, Patient } from "./types";

interface State {
  patients: Patient[];
  activeId: Patient["id"];
}

interface Actions {
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  updatePatient: (data: DraftPatient) => void;

  updateActiveId: (id: Patient["id"]) => void;
}

export const usePatientStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        activeId: "",

        addPatient: (data) => {
          const newPatient = {
            ...data,
            id: uui(),
          };

          set((state) => ({
            patients: [...state.patients, newPatient],
          }));
        },

        deletePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter((patient) => patient.id !== id),
          }));
        },

        updatePatient: (data) => {
          set((state) => ({
            patients: state.patients.map((patient) => {
              const updatedPatient = {
                id: state.activeId,
                ...data,
              };

              return patient.id === state.activeId ? updatedPatient : patient;
            }),
            activeId: "",
          }));
        },

        updateActiveId: (id) => {
          set(() => ({
            activeId: id,
          }));
        },
      }),
      {
        name: "patient-storage",
        // storage: createJSONStorage(() => localStorage)
      }
    )
  )
);
