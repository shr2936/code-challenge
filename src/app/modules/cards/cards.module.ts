import { NgModule } from '@angular/core';
import { CardsComponent } from './components/cards/cards.component';
import { CardsRoutingModule } from './cards-routing.module';
import { CommonModule } from '@angular/common';
import { CardsApiService } from './services/cards-api.service';
import { FormsModule } from '@angular/forms';

const components = [CardsComponent];

@NgModule({
  declarations: [...components],
  imports: [CardsRoutingModule, CommonModule, FormsModule],
  providers: [CardsApiService],
})
export class CardsModule {}
