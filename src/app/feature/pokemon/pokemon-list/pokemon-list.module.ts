import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonManageModule } from '../dialogs/pokemon-manage/pokemon-manage.module';
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ],
  exports: [
    PokemonListComponent
  ]
})
export class PokemonListModule { }
