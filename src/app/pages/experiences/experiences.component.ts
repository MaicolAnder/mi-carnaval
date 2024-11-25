import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ExperienceModel } from '../../shared/models/experience-model';

@Component({
  selector: 'app-experiences',
  imports: [FormsModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent {
  @Output() experience = new EventEmitter<ExperienceModel>();

  public ratingStar: number[] = Array.from({ length: 5 }, (_, i) => i + 1);
  public listExperiences: ExperienceModel[] = [];

  public inputExperienceSelected: string = 'Carnaval de Blancos y Negros';
  public inputRatingLevel: number = 0;


  constructor () {
    this.setListExperiences();
  }

  public setRatingLevel (ratingLevel: number) {
    this.inputRatingLevel = ratingLevel;
  }

  public getExperience () {
    const nombre = this.inputExperienceSelected;
    const experience = this.listExperiences.find(experience => experience.nombre === nombre);
    if (experience) {
      this.experience.emit(experience);
    }
    return experience;
  }

  public setListExperiences () {
    this.listExperiences = [
      {
        "nombre": "Carnaval de Barranquilla",
        "ciudad": "Barranquilla",
        "fechas": "Del 10 al 13 de febrero",
        "informacion": [
          {
            "image": "../assets/images/logo.png",
            "title": "Carnaval de Barranquilla: Historia",
            "description": "Explora la rica historia del Carnaval de Barranquilla, el evento cultural más importante de la región."
          },
          {
            "image": "../assets/images/logo.png",
            "title": "Desfiles del Carnaval",
            "description": "Descubre los impresionantes desfiles y comparsas que llenan las calles de Barranquilla de color y música."
          },
          {
            "image": "../assets/images/logo.png",
            "title": "Tradiciones y Rituales",
            "description": "Sumérgete en las tradiciones y rituales que hacen único al Carnaval de Barranquilla."
          },
          {
            "image": "../assets/images/logo.png",
            "title": "Música y Danzas",
            "description": "Conoce los ritmos tradicionales como la cumbia, el mapalé y otras danzas folclóricas del carnaval."
          },
          {
            "image": "../assets/images/logo.png",
            "title": "Gastronomía del Carnaval",
            "description": "Degusta los platos típicos que forman parte esencial de la celebración del carnaval."
          }
        ]
      },
      {
        "nombre": "Carnaval de Blancos y Negros",
        "ciudad": "Pasto",
        "fechas": "Del 2 al 7 de enero",
        "informacion": [
          {
            "image": "../assets/images/mi-carnaval.jpeg",
            "title": "Origen del Carnaval de Blancos y Negros",
            "description": "Conoce la historia detrás de este carnaval que celebra la diversidad cultural."
          },
          {
            "image": "../assets/images/mi-carnaval.jpeg",
            "title": "Desfile de Colonias",
            "description": "Admira las impresionantes carrozas que forman parte del desfile de colonias en Pasto."
          },
          {
            "image": "../assets/images/mi-carnaval.jpeg",
            "title": "Día de los Negros",
            "description": "Explora las tradiciones del Día de los Negros y su importancia en el carnaval."
          },
          {
            "image": "../assets/images/mi-carnaval.jpeg",
            "title": "Día de los Blancos",
            "description": "Descubre cómo se celebra el Día de los Blancos, una jornada llena de color y alegría."
          },
          {
            "image": "../assets/images/mi-carnaval.jpeg",
            "title": "Música del Carnaval",
            "description": "Escucha las melodías tradicionales que animan el Carnaval de Blancos y Negros."
          }
        ]
      },
      {
        "nombre": "Carnaval de Riosucio",
        "ciudad": "Riosucio, Caldas",
        "fechas": "Cada dos años, del 2 al 8 de enero",
        "informacion": [
          {
            "image": "../assets/images/logo.png",
            "title": "Historia del Carnaval de Riosucio",
            "description": "Descubre el legado cultural del Carnaval de Riosucio."
          },
          {
            "image": "../assets/images/mi-carnaval.jpeg",
            "title": "El Diablo del Carnaval",
            "description": "Conoce la fascinante historia del Diablo, símbolo principal del carnaval."
          },
          {
            "image": "../assets/images/logo.png",
            "title": "Comparsas Tradicionales",
            "description": "Admira las comparsas que representan las tradiciones ancestrales del carnaval."
          },
          {
            "image": "../assets/images/mi-carnaval.jpeg",
            "title": "Música Andina",
            "description": "Explora los sonidos de la música andina que acompaña las celebraciones."
          },
          {
            "image": "../assets/images/logo.png",
            "title": "Arte y Máscaras",
            "description": "Descubre el arte de las máscaras usadas en el carnaval."
          }
        ]
      }
    ]
  }
}
