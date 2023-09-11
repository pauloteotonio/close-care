import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonManageComponent } from '../dialogs/pokemon-manage/pokemon-manage.component';
import { PokemonListModel } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnChanges {

  @Input()
  pokemonList: PokemonListModel[] = [];

  @Output()
  openDialog$ = new EventEmitter<number>();

  displayedColumns: string[] = ['imageUrl', 'name', 'abilities', 'types', 'action'];
  dataSource = new MatTableDataSource<PokemonListModel>();

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.dataSource.data = this.pokemonList;
  }
  openDialog(pokemonId?: number): void {
    this.openDialog$.emit(pokemonId);
  }

}
