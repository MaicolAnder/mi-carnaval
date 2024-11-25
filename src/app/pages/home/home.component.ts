import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { ExperiencesComponent } from "../experiences/experiences.component";
import { CardsModel } from '../../shared/models/cards-model';
import { ExperienceModel } from '../../shared/models/experience-model';

@Component({
    selector: 'app-home',
    imports: [CardComponent, ExperiencesComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  cards: CardsModel[] = [];
  selectedExperience: ExperienceModel | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  onExperienceSelected(experience: ExperienceModel) {
      this.selectedExperience = experience;
      this.cards = this.selectedExperience?.informacion;
  }
}
