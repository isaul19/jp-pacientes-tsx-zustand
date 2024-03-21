import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Error } from "./Error";
import { DraftPatient } from "../types";
import { usePatientStore } from "../store";

export const PatientForm = () => {
  const { register, handleSubmit, formState, setValue, reset } = useForm<DraftPatient>();
  const errors = formState.errors;

  const patients = usePatientStore((state) => state.patients);
  const activeId = usePatientStore((state) => state.activeId);
  const addPatient = usePatientStore((state) => state.addPatient);
  const updatePatiend = usePatientStore((state) => state.updatePatient);

  const registerPatient = (data: DraftPatient) => {
    if (activeId) {
      updatePatiend(data);
      toast.success("Paciente Actualizado exitosamente");
    } else {
      addPatient(data);
      toast.success("Paciente creado exitosamente");
    }

    reset();
  };

  useEffect(() => {
    if (!activeId) return;

    const activePatient = patients.find((patient) => patient.id === activeId);
    if (!activePatient) return;

    setValue("name", activePatient.name);
    setValue("caretaker", activePatient.caretaker);
    setValue("email", activePatient.email);
    setValue("date", activePatient.date);
    setValue("symptoms", activePatient.symptoms);
  }, [activeId, patients, setValue]);

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del paciente es obligatorio",
              minLength: {
                value: 3,
                message: "El nombre del paciente debe tener al menos 3 caracteres",
              },
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El nombre de Propietario es obligatorio",
              minLength: {
                value: 3,
                message: "El nombre del paciente debe tener al menos 3 caracteres",
              },
            })}
          />
          {errors.caretaker && <Error>{errors.caretaker?.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "El Email no es valido",
              },
            })}
          />
          {errors.email && <Error>{errors.email?.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register("date", { required: "La Fecha de alta es obligatoria" })}
          />
          {errors.date && <Error>{errors.date?.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register("symptoms", { required: "Los sintomas son obligatorios" })}
          ></textarea>
          {errors.symptoms && <Error>{errors.symptoms?.message}</Error>}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={activeId ? "Actualizar Paciente" : "Guardar Paciente"}
        />
      </form>
    </div>
  );
};
