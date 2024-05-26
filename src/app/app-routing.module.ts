import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'cards',
    loadChildren: () =>
      import('./modules/cards/cards.module').then((m) => m.CardsModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'cards' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
