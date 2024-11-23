import { Component } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { ExperiencesComponent } from "../experiences/experiences.component";
import { CardsModel } from '../../shared/models/cards-model';

@Component({
    selector: 'app-home',
    imports: [CardComponent, ExperiencesComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  cards: CardsModel[] = [
    {
      image: "../assets/images/mi-carnaval.jpeg",
      title: "Historia de los Carnavales Blancos y Negros",
      description: "Descripción de la historia..."
    },
    {
      image: "../assets/images/mi-carnaval.jpeg",
      title: "Mejor carroza Blancos y Negros 2024",
      description: "Descripción de la mejor carroza..."
    },
    {
      image: "../assets/images/mi-carnaval.jpeg",
      title: "Programación blancos y negros",
      description: "Descripción de la programación..."
    },
    {
      image: "../assets/images/mi-carnaval.jpeg",
      title: "Conciertos blancos y negros",
      description: "Descripción de los conciertos..."
    },{
      image: "../assets/images/mi-carnaval.jpeg",
      title: "Historia de los Carnavales Blancos y Negros",
      description: "Descripción de la historia..."
    },
    {
      image: "../assets/images/mi-carnaval.jpeg",
      title: "Mejor carroza Blancos y Negros 2024",
      description: "Descripción de la mejor carroza..."
    },
    {
      image: "../assets/images/mi-carnaval.jpeg",
      title: "Programación blancos y negros",
      description: "Descripción de la programación..."
    },
    {
      image: "../assets/images/mi-carnaval.jpeg",
      title: "Conciertos blancos y negros",
      description: "Descripción de los conciertos..."
    }
  ];

}
