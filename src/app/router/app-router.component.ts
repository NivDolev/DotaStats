import { HeroDetailsComponent } from './../heroes/hero-details/hero-details.component';
import { StatisticsComponent } from './../statistics/statistics.component';
import { TeamsComponent } from './../teams/teams.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsComponent } from './../items/items.component';
import { HeroesComponent } from './../heroes/heroes.component';
import { ProMatchesComponent } from './../pro-matches/pro-matches.component';
import { HomeComponent } from '../home/home.component';
import { PlayersComponent } from '../players/players.component';
import { ProPlayersComponent } from '../pro-players/pro-players.component';
import { MatchesComponent } from '../matches/matches.component';
import { SignupComponent } from '../auth/signup/signup.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'players', component: PlayersComponent },
    { path: 'pro-players', component: ProPlayersComponent },
    { path: 'matches', component: MatchesComponent },
    { path: 'pro-matches', component: ProMatchesComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'heroes', children: [
        { path: ':id', component: HeroDetailsComponent },
        { path: '', component: HeroesComponent }
    ] },
    { path: 'items', component: ItemsComponent },
    { path: 'statistics', component: StatisticsComponent},
    { path: 'signup', component: SignupComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];


@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
    providers: []
})

export class AppRoutingModule { }
