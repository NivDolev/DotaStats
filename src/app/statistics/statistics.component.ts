import { HeroPicks } from './models/heroPicks';
import { StatsDetails } from './models/statsDetails';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private dataService: DataService) { }
  private proMatch = [];
  private stats: StatsDetails[] = [];
  private heroesPicks: HeroPicks[] = [];

  leagues = [];

  ngOnInit() {
    // this.getMatchDetails('4080856812');
    this.dataService.getData('leagues').subscribe(leagues => {
      leagues.forEach(league => {
        if (league.tier === 'premium') {
          this.leagues.push(league);
        }
        this.leagues = this.leagues.sort(this.dynamicSort('leagueid')).reverse();
      });
      console.log(this.leagues);
    });
  }

  getTriplets(herPick: HeroPicks): void {
    this.heroesPicks.forEach(pick => {
      this.stats.push(this.getStatsFromHeroPick([pick.heroes[0], pick.heroes[1], pick.heroes[2]], pick.winner));
      this.stats.push(this.getStatsFromHeroPick([pick.heroes[0], pick.heroes[1], pick.heroes[3]], pick.winner));
      this.stats.push(this.getStatsFromHeroPick([pick.heroes[0], pick.heroes[1], pick.heroes[4]], pick.winner));
      this.stats.push(this.getStatsFromHeroPick([pick.heroes[0], pick.heroes[2], pick.heroes[3]], pick.winner));
      this.stats.push(this.getStatsFromHeroPick([pick.heroes[0], pick.heroes[2], pick.heroes[4]], pick.winner));
      this.stats.push(this.getStatsFromHeroPick([pick.heroes[0], pick.heroes[3], pick.heroes[4]], pick.winner));
      this.stats.push(this.getStatsFromHeroPick([pick.heroes[1], pick.heroes[2], pick.heroes[3]], pick.winner));
      this.stats.push(this.getStatsFromHeroPick([pick.heroes[1], pick.heroes[2], pick.heroes[4]], pick.winner));
      this.stats.push(this.getStatsFromHeroPick([pick.heroes[1], pick.heroes[3], pick.heroes[4]], pick.winner));
      this.stats.push(this.getStatsFromHeroPick([pick.heroes[2], pick.heroes[3], pick.heroes[4]], pick.winner));
      // let newStat = {};
      // newStat[`${pick.heroes[0]}_${pick.heroes[1]}_${pick.heroes[2]}`] = {wins: 0, losses: 1};
      // console.log(newStat);
    });
    console.log(this.stats);
  }

  getStatsFromHeroPick(heroes: number[], winner: boolean): StatsDetails {
    const newStat: StatsDetails = {
      heroes: heroes,
      wins: 0,
      losses: 0
    };
    if (winner) { newStat.wins++; } else { newStat.losses++; }
    return newStat;
  }

  getMatchDetails(matchId: string): void {
    this.dataService.getData(`matches/${matchId}`).subscribe(
      match => {
        const winner = match.radiant_win;
        const rad_picks: number[] = [];
        const dire_picks: number[] = [];
        match.picks_bans.forEach(hero => {
          if (hero.is_pick) {
            if (hero.team === 0) {
              rad_picks.push(hero);
            } else {
              dire_picks.push(hero);
            }
          }
        });
        this.heroesPicks.push({heroes: this.getHeroes(rad_picks.sort(this.dynamicSort('hero_id'))), winner: winner});
        this.heroesPicks.push({heroes: this.getHeroes(dire_picks.sort(this.dynamicSort('hero_id'))), winner: !winner});
      }
    );
  }

  getHeroes(hero_picks: any): number[] {
    const heroes: number[] = [];
    hero_picks.forEach(hero => {
      heroes.push(hero.hero_id);
    });
    return heroes;
  }

  dynamicSort(property): any {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    };
  }
}
