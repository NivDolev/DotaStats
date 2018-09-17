import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  leagues: any[] = [];
  filteredLeagues: any[] = [];
  onLeagueName = false;
  inputLeagueName = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
   this.getInitialLeaguesData();
  }

  getInitialLeaguesData() {
    this.dataService.getData('leagues').subscribe(leagues => {
      const tempLeagues = leagues.sort(this.dynamicSort('leagueid')).reverse();
      tempLeagues.forEach(league => {
        if (league.leagueid < 65000 && league.tier === 'premium') {
          this.leagues.push(league);
        }
      });
      this.filteredLeagues = leagues;
      console.log(this.leagues);
    });
  }

  onFocusOutLeagueName() {
    console.log(this.inputLeagueName);
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


}
