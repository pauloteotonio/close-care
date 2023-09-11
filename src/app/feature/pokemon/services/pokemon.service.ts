import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, tap, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { PageModel } from 'src/app/shared/models/page.model';
import { environment } from 'src/environments/environment';
import { PokemonListModel, PokemonModel } from '../models/pokemon.model';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  localPokemonlList: PokemonListModel[] = [];

  constructor(private http: HttpClient) { }

  private readonly limitPokemonSearch = 5;

  getAllPokemon(): Observable<PokemonListModel[]> {
    return this.http.get<PageModel>(`${environment.pokemonApi}/pokemon`, { params: { limit: this.limitPokemonSearch } })
      .pipe(
        concatMap(page => page.results.map(result => {
          return this.getPokemonWithUri(result.url)
        })),
        mergeMap(pokemonModelObservable => pokemonModelObservable),
        map<PokemonModel, PokemonListModel>(pokemon => {
          return {
            name: pokemon.name,
            abilities: pokemon.abilities.map(abilityItem => abilityItem.ability.name),
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
            types: pokemon.types.map(typeItem => typeItem.type.name),
            id: pokemon.id
          }
        }),
        toArray(),
        tap(pokemonlList => {
          pokemonlList.forEach(pokemonItem => {
            if (!this.localPokemonlList.some(pokemonListItem => pokemonListItem.id == pokemonItem.id)) {
              this.localPokemonlList.push(pokemonItem)
            }
          })
        }),
        map(() => this.localPokemonlList)
      )
  }

  addPokemon(pokemonModel: PokemonModel) {
    this.localPokemonlList.push({
      abilities: pokemonModel.abilities.map(abilityItem => abilityItem.ability.name),
      types: pokemonModel.types ? pokemonModel.types.map(typeItem => typeItem.type.name) : null,
      imageUrl: null,
      name: pokemonModel.name,
    })
  }

  updatePokemon(pokemonModel: PokemonModel) {
    if (pokemonModel.id) {
      this.localPokemonlList.forEach(pokemonListItem => {
        if (pokemonListItem.id === pokemonModel.id) {
          Object.assign(pokemonListItem, {
            abilities: pokemonModel.abilities.map(abilityItem => abilityItem.ability.name),
            types: pokemonModel.types.map(typeItem => typeItem.type.name),
            imageUrl: pokemonListItem.imageUrl,
            name: pokemonModel.name,
            id: pokemonListItem.id
          })
        }
      });
    }
  }

  getPokemonById(id: number): Observable<PokemonModel> {
    const pokemonOnLocalList = this.localPokemonlList.find(pokemon => pokemon.id === id);
    if (pokemonOnLocalList) {
      return of({
        name: pokemonOnLocalList.name,
        types: pokemonOnLocalList.types.map(typeName => {
          return {
            type: {
              name: typeName
            }
          }
        }),
        abilities: pokemonOnLocalList.abilities.map(abilityName => {
          return {
            ability: {
              name: abilityName
            }
          }
        }),
        id: pokemonOnLocalList.id
      });
    }
    return this.http.get<PokemonModel>(`${environment.pokemonApi}/pokemon/${id}`);
  }

  getPokemonWithUri(uri: string): Observable<PokemonModel> {
    return this.http.get<PokemonModel>(uri);
  }

}
