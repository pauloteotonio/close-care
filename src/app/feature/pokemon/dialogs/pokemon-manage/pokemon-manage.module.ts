import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonManageComponent } from './pokemon-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    PokemonManageComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCheckboxModule
  ],
  exports: [
    PokemonManageComponent
  ]
})
export class PokemonManageModule { }
