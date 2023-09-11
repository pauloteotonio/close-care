import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListContainerComponent } from './containers/pokemon-list-container/pokemon-list-container.component';

const routes: Routes = [
  {
    path: '',
    component: PokemonListContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
