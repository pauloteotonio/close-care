import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbilityModel, PokemonModel } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PokemonTypeService } from '../../services/pokemon-type.service';


@Component({
  selector: 'app-pokemon-manage',
  templateUrl: './pokemon-manage.component.html',
  styleUrls: ['./pokemon-manage.component.scss']
})
export class PokemonManageComponent implements OnInit {

  formPokemon: FormGroup;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  localAbilities: string[] = [];
  localTypes: string[] = [];
  myControl = new FormControl();
  options: string[] = [];
  typesOptions: string[] = [];
  filteredOptions: Observable<string[]>;
  typeFilteredOptions: Observable<string[]>;
  save$ = new EventEmitter<PokemonModel>();
  searchTypeControl = new FormControl({ value: null, disabled: true });
  searchHabilityControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<PokemonManageComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { pokemonId?: number },
    private pokemonService: PokemonService,
    private pokemonTypeService: PokemonTypeService) {
  }

  ngOnInit(): void {
    this.getPokemonTypes();
    this.createForm();
    this.checkPokemonToUpdate();
    this.observableAutocompleteInputs();
    this.observableCheckBox();
  }
  getPokemonTypes() {
    this.pokemonTypeService.getAllTypes().subscribe((types) => {
      this.typesOptions = types.results.map(result => result.name);
    })
  }

  private observableAutocompleteInputs() {
    const habilityFilter = (value: string) => {
      if (!value) return this.options;
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    const typeFilter = (value: string) => {
      if (!value) return this.typesOptions;
      const filterValue = value.toLowerCase();
      return this.typesOptions.filter(option => option.toLowerCase().includes(filterValue));
    }

    this.filteredOptions = this.searchHabilityControl.valueChanges
      .pipe(
        startWith(''),
        map(value => habilityFilter(value))
      );

    this.typeFilteredOptions = this.searchTypeControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeFilter(value))
      );

  }

  private observableCheckBox() {
    this.formPokemon.get("typeInputControl").valueChanges
      .subscribe(checked => {
        if (checked) {
          this.searchTypeControl.enable();
        } else {
          this.searchTypeControl.disable();
        }
      })

  }
  checkPokemonToUpdate() {
    if (this.data.pokemonId) {
      // Consultar pokeomn por ID e alimentar o form
      this.pokemonService.getPokemonById(this.data.pokemonId).subscribe(pokemonModel => {
        this.localAbilities = pokemonModel.abilities.map(abilityItem => abilityItem.ability.name)
        if (pokemonModel.types.length) {
          this.formPokemon.get("typeInputControl").setValue(true)
        }
        this.localTypes = pokemonModel.types.map(typeItem => typeItem.type.name);
        this.formPokemon.patchValue({
          name: pokemonModel.name,
          types: this.localTypes,
          abilities: this.localAbilities
        })
        this.formPokemon.enable();
      })
    }
  }

  createForm() {
    this.formPokemon = this.fb.group({
      name: [null, [Validators.required]],
      abilities: [null, [Validators.required]],
      types: [null],
      typeInputControl: [false]
    })
    this.searchTypeControl.disable();
    if (this.data.pokemonId) {
      this.formPokemon.disable();
    }
  }

  submitForm() {
    if (this.formPokemon.valid) {
      const formValue = this.formPokemon.getRawValue();
      this.save$.emit({
        abilities: formValue.abilities.map((abilityName: string) => {
          return {
            ability: {
              name: abilityName
            }
          }
        }),
        name: formValue.name,
        types: formValue.types ? formValue.types.map((typeName:string) =>{
          return {
            type: {
              name: typeName
            }
          }
        }): null,
        id: this.data.pokemonId
      })
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.localAbilities.push(value);
      this.formPokemon.get("abilities").setValue(this.localAbilities);
    }
    event.chipInput!.clear();
  }

  remove(ability: string): void {
    const index = this.localAbilities.indexOf(ability);
    if (index >= 0) {
      this.localAbilities.splice(index, 1);
      this.formPokemon.get("abilities").setValue(this.localAbilities);
    }
  }

  addType(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.localTypes.push(value);
      this.formPokemon.get("types").setValue(this.localTypes);
    }
    event.chipInput!.clear();
  }

  removeType(selectedType: string) {
    const index = this.localTypes.indexOf(selectedType);
    if (index >= 0) {
      this.localTypes.splice(index, 1);
      this.formPokemon.get("types").setValue(this.localTypes);
    }
  }

  typeSelected(event: MatAutocompleteSelectedEvent, searchTypeInput: HTMLInputElement): void {
    this.localTypes.push(event.option.viewValue);
    this.formPokemon.get("types").setValue(this.localTypes);
    searchTypeInput.value = '';
    this.searchTypeControl.reset();
  }

}
