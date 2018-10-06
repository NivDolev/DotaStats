import { HeroPicks } from './models/heroPicks';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes/hero.model';

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
  private tuplesMap: {} = {};
  tupleResults: {} = {
    maxWins: 0,
    bestTuple: [],
    maxLoses: 0,
    worstTuple: []
  };
  selectedTuple = 3;
  heroes: Hero[] = [];
  haveData = null;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getInitialLeaguesData();
    console.log(this.tupleResults);
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
    this.dataService.getData('heroes').subscribe(heroes => {
      this.heroes = heroes;
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
    this.tuplesMap = {};
    this.tupleResults = {
      maxWins: 0,
      bestTuple: [],
      maxLoses: 0,
      worstTuple: []
    };
    this.haveData = null;
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
    const sqlQuery = encodeURI(`explorer?sql=select * from matches where leagueid=${this.selectedLeague.leagueid}`);
    this.dataService.getData(sqlQuery).subscribe(matches => {
      if (matches != null) {
        this.leagueMatches = matches.rows;
        this.getHeroPickes();
      }
    });
  }

  getHeroPickes() {
    const matchPicks: MatchDetails[] = [];
    this.leagueMatches.forEach(match => {
      const radiant: MatchDetails = {
        tuples: [],
        winner: false,
        side: 'radiant'
      };
      const dire: MatchDetails = {
        tuples: [],
        winner: false,
        side: 'dire'
      };
      // Check if match has picks/bans data
      if (match.picks_bans != null) {
        const picks = match.picks_bans.filter(pick => pick.is_pick === true).sort(this.dynamicSort('hero_id'));
        // Extract hero id picks per team
        picks.forEach(pick => {
          if (pick.team === 0) {
            radiant.tuples.push(pick.hero_id);
          } else {
            dire.tuples.push(pick.hero_id);
          }
        });
        radiant.tuples = this.getHeroCombinations(radiant.tuples, 3);
        dire.tuples = this.getHeroCombinations(dire.tuples, 3);
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
    if (matchPicks.length > 0) {
      this.haveData = true;
      this.buildTuplesMap(matchPicks);
      this.getMostPickedTuples();
    } else {
      this.haveData = false;
    }
  }

  getHeroCombinations(picks: any[], n: number): any[] {
    const combinations = [];
    if (n === 1) {
      for (let i = 0; i < picks.length; i++) {
        combinations.push([picks[i]]);
      }
    } else {
      const heroes = picks.slice();
      while (heroes.length > n - 1) {
        const heroId = heroes.shift();
        const comb = this.getHeroCombinations(heroes, n - 1);
        for (let i = 0; i < comb.length; i++) {
          comb[i].unshift(heroId);
          combinations.push(comb[i]);
        }
      }
    }
    return combinations;
  }

  buildTuplesMap(plays: MatchDetails[]): void {
    plays.forEach(play => {
      const tuples: any[] = play.tuples;
      tuples.forEach(tuple => {
        const id = this.parseTupleId(tuple);
        if (this.tuplesMap[id] === undefined) {
          this.tuplesMap[id] = {
            tuple: tuple,
            wins: (play.winner ? 1 : 0),
            loses: (play.winner ? 0 : 1)
          };
        } else {
          if (play.winner) {
            this.tuplesMap[id].wins++;
          } else {
            this.tuplesMap[id].loses++;
          }
        }
      });
    });
  }

  parseTupleId(tuple: number[]): string {
    let id = '';
    for (let i = 0; i < tuple.length; i++) {
      id += `${tuple[i].toString()}_`;
    }
    return id;
  }

  getMostPickedTuples(): void {
    const tuplesKeys: any[] = Object.keys(this.tuplesMap);
    let maxWins = 0;
    let maxLoses = 0;
    let bestTuple = [];
    let worstTuple = [];
    tuplesKeys.forEach(key => {
      const curTuple = this.tuplesMap[key];
      if (curTuple.wins > maxWins) {
        maxWins = curTuple.wins;
        bestTuple = curTuple.tuple;
      }
      if (curTuple.loses > maxLoses) {
        maxLoses = curTuple.loses;
        worstTuple = curTuple.tuple;
      }
    });
    const results = {
      maxWins: maxWins,
      bestTuple: bestTuple,
      maxLoses: maxLoses,
      worstTuple: worstTuple
    };
    this.tupleResults = results;
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
  tuples: any[];
  winner: boolean;
  side: string;
}
