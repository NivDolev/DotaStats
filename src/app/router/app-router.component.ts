import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsComponent } from './../items/items.component';
import { HeroesComponent } from './../heroes/heroes.component';
import { ProMatchesComponent } from './../pro-matches/pro-matches.component';
import { HomeComponent } from '../home/home.component';
import { PlayersComponent } from '../players/players.component';
import { ProPlayersComponent } from '../pro-players/pro-players.component';
import { MatchesComponent } from '../matches/matches.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'players', component: PlayersComponent },
    { path: 'pro-players', component: ProPlayersComponent },
    { path: 'matches', component: MatchesComponent },
    { path: 'pro-matches', component: ProMatchesComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'items', component: ItemsComponent }
];


@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
    providers: []
})

export class AppRoutingModule { }
