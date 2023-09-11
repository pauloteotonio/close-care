import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { PokemonListModule } from './feature/pokemon/pokemon-list/pokemon-list.module';
import { PokemonListContainerComponent } from './containers/pokemon-list-container/pokemon-list-container.component';
import { PokemonManageModule } from './feature/pokemon/dialogs/pokemon-manage/pokemon-manage.module';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    PokemonListModule,
    PokemonManageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
