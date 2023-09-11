import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonManageComponent } from 'src/app/feature/pokemon/dialogs/pokemon-manage/pokemon-manage.component';
import { PokemonListModel } from 'src/app/feature/pokemon/models/pokemon.model';
import { PokemonService } from 'src/app/feature/pokemon/services/pokemon.service';

@Component({
  templateUrl: './pokemon-list-container.component.html',
  styleUrls: ['./pokemon-list-container.component.scss']
})
export class PokemonListContainerComponent implements OnInit {
  pokemonList: PokemonListModel[] = [];
  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllPokemon();
  }

  private getAllPokemon() {
    this.pokemonList = [];
    this.pokemonService.getAllPokemon().subscribe(pokemonList => {
      this.pokemonList = pokemonList;
    });
  }

  openDialog(pokemonId?: number) {
    const modalInstance = this.dialog.open(PokemonManageComponent, {
      width: '500px',
      height: '500px',
      data: {
        pokemonId
      }
    });


    modalInstance.componentInstance.save$.subscribe(pokemonModel => {
      if (pokemonModel.id) {
        // Update
        this.pokemonService.updatePokemon(pokemonModel);
      } else {
        // Create
        this.pokemonService.addPokemon(pokemonModel);
      }
      modalInstance.close()
      this.getAllPokemon();
    })
  }

}
