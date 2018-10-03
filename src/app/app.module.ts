import { DataService } from './services/data.service';
import { AppRoutingModule } from './router/app-router.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PlayersComponent } from './players/players.component';
import { MatchesComponent } from './matches/matches.component';
import { ProMatchesComponent } from './pro-matches/pro-matches.component';
import { ProPlayersComponent } from './pro-players/pro-players.component';
import { HomeComponent } from './home/home.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ItemsComponent } from './items/items.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TeamsComponent } from './teams/teams.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReplaceWhiteSpace } from './custome-pipes/replace.pipe';
import { ContainsFilter } from './custome-pipes/contains.pipe';
import { HeroDetailsComponent } from './heroes/hero-details/hero-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PlayersComponent,
    MatchesComponent,
    ProMatchesComponent,
    ProPlayersComponent,
    HomeComponent,
    HeroesComponent,
    ItemsComponent,
    SearchResultsComponent,
    TeamsComponent,
    StatisticsComponent,
    ReplaceWhiteSpace,
    ContainsFilter,
    HeroDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
