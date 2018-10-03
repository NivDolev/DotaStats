import { HeroPicks } from './models/heroPicks';
import { Match } from './models/match';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  onLeagueName = false;
  inputLeagueName = '';
  inputLeagueTier = '';

  private leagues: any[] = [];
  filteredLeagues: any[] = [];
  tiers: string[] = [];
  tierValues = {
    amateur: 0,
    excluded: 0,
    premium: 0,
    professional: 0
  };
  selectedLeague: any;
  leagueMatches: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getInitialLeaguesData();
    // Remove after done
    this.getMatchesForSelectedLeague();
  }

  getInitialLeaguesData() {
    // gets all leagues and league tiers
    this.dataService.getData('leagues').subscribe(leagues => {
      this.leagues = leagues.sort(this.dynamicSort('name'));
      this.leagues.forEach(league => {
        this.tierValues[league.tier]++;
        if (!this.tiers.includes(league.tier) && league.tier != null) {
          this.tiers.push(league.tier);
        }
        this.tiers = this.tiers.sort();
      });
    });
  }

  onTierSelection() {
    // get leagues for seleceted tier
    this.leagues.forEach(league => {
      if (league.tier === this.inputLeagueTier.toLowerCase()) {
        this.filteredLeagues.push(league);
      }
    });
  }

  onLeagueSelection() {
    // get matches for selected league
    console.clear();
    if (this.inputLeagueName !== '') {
      this.getLeagueIdByName();
    } else {
      console.log('choose league');
    }
  }

  getLeagueIdByName() {
    // get league name by league id
    this.selectedLeague = this.leagues.find(league => league.name === this.inputLeagueName);
    console.log(this.selectedLeague);
    this.getMatchesForSelectedLeague();
  }

  getMatchesForSelectedLeague() {
    // Remove and uncomment after done
    const sqlQuery = encodeURI(`explorer?sql=select * from matches where leagueid=5197`);
    // const sqlQuery = encodeURI(`explorer?sql=select * from matches where leagueid=${this.selectedLeague.leagueid}`);
    this.dataService.getData(sqlQuery).subscribe(matches => {
      if (matches != null) {
        this.leagueMatches = matches.rows;
        this.getHeroPickes();
      }
    });
  }

  getHeroPickes() {
    const matchPicks: any[] = [];
    this.leagueMatches.forEach(match => {
      const radiant: MatchDetails = {
        picks: [],
        winner: false,
        side: 'radiant'
      };
      const dire: MatchDetails = {
        picks: [],
        winner: false,
        side: 'dire'
      };
      // Check if match has picks/bans data
      if (match.picks_bans != null) {
        const picks = match.picks_bans.filter(pick => pick.is_pick === true).sort(this.dynamicSort('hero_id'));
        // Extract hero id picks per team
        picks.forEach(pick => {
          if (pick.team === 0) {
            radiant.picks.push(pick.hero_id);
          } else {
            dire.picks.push(pick.hero_id);
          }
        });
        // radiant.picks = this.getHeroCombinations(radiant.picks, 2);
        // dire.picks = this.getHeroCombinations(dire.picks, 2);
        // Determines winner
        if (match.radint_win) {
          radiant.winner = true;
        } else {
          dire.winner = true;
        }
        matchPicks.push(radiant);
        matchPicks.push(dire);
      }
    });
    this.getHeroCombinations(matchPicks[0].picks, 2);
  }

  getHeroCombinations (picks: any[], num: number): any[] {
    let combinations: any[] = [];
    if (num === 1) {
      for (let i = 0; i < picks.length; i++) {
        combinations.push(picks[i]);
      }
    } else {
      let heroes = picks.slice();
      console.log(`Heroes: ${heroes}`);
      while (heroes.length > num - 1) {
        let heroId = heroes.shift();
        console.log(`Hero Id: ${heroId}`);
        let comb: any[] = this.getHeroCombinations(heroes, num - 1);
        console.log(`Combinations: ${comb}`);
        for (let i = 0; i < comb.length; i++) {
          comb[i].unshift(heroId);
          combinations.push(comb[i]);
        }
      }
    }
    console.log(combinations);
    return combinations;
  }

  dynamicSort(property) {
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

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }


}

class MatchDetails {
  picks: any[];
  winner: boolean;
  side: string;
}
