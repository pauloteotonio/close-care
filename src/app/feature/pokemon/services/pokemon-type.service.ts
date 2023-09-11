import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageModel } from 'src/app/shared/models/page.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PokemonTypeService {

  constructor(
    private http: HttpClient
  ) { }


  getAllTypes():Observable<PageModel>{
    return this.http.get<PageModel>(`${environment.pokemonApi}/type`);
  }

}