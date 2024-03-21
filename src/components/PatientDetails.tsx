import { toast } from "react-toastify";
import { usePatientStore } from "../store";
import { Patient } from "../types";
import { PatientDetailItem } from "./PatientDetailItem";

interface Props {
  patient: Patient;
}

export const PatientDetails = ({ patient }: Props) => {
  const deletePatient = usePatientStore((state) => state.deletePatient);
  const updateActiveId = usePatientStore((state) => state.updateActiveId);

  const handleDelete = () => {
    deletePatient(patient.id);
    toast.success("Paciente eliminado correctamente");
  };

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="ID" data={patient.id} />
      <PatientDetailItem label="Nombre" data={patient.name} />
      <PatientDetailItem label="Propietario" data={patient.caretaker} />
      <PatientDetailItem label="Email" data={patient.email} />
      <PatientDetailItem label="Date" data={patient.date.toString()} />

      <div className="flex flex-col lg:flex-row justify-between mt-10 gap-3">
        <button
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
          onClick={() => updateActiveId(patient.id)}
        >
          Editar
        </button>

        <button
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
