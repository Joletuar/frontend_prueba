export interface DataResponse<T> {
  data: Data<T>;
}

export interface Data<T> {
  [key: string]: T[];
}

export interface Profesor {
  id: string;
  nombre: string;
  correo: string;
}
export interface Materia {
  id: string;
  nombre: string;
  descripcion: string;
}
export interface Aula {
  id: string;
  fecha: string;
  hora: string;
  tema: string;
  profesor: Profesor;
  materia: Materia;
}
