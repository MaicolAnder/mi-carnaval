import { Component, Input } from '@angular/core';
import { CardsModel } from '../../models/cards-model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() cards!: CardsModel[];
}
