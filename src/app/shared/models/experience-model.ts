import { CardsModel } from "./cards-model";

export interface ExperienceModel {
  nombre: string;
  ciudad: string;
  fechas: string;
  informacion: CardsModel[];
}
