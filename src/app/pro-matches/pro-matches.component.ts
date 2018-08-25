import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pro-matches',
  templateUrl: './pro-matches.component.html',
  styleUrls: ['./pro-matches.component.css']
})
export class ProMatchesComponent implements OnInit {

  private proMatches = [];
  fillteredMatches = [];
  columnSort = {
    'match_id': true,
    'dire_name': true,
    'radiant_name': true,
    'radiant_win': true,
    'duration': true,
    'league_name': true
  };

  _match_id: number;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProMatches('promatches').subscribe(
      (matches) => {
        this.proMatches = matches;
        this.fillteredMatches = this.proMatches;
        console.log(this.proMatches);
      }
    );
  }

  onSortBySide(columnName: string) {
    if (this.columnSort[columnName]) {
      this.fillteredMatches = this.fillteredMatches.sort(
        function (a, b) {
          if (a[columnName] < b[columnName]) { return -1; } else
            if (b[columnName] < a[columnName]) { return 1; } else { return 0; }
        });
        this.columnSort[columnName] = !this.columnSort[columnName];
    } else {
      this.fillteredMatches = this.fillteredMatches.sort(
        function (b, a) {
          if (a[columnName] < b[columnName]) { return -1; } else
            if (b[columnName] < a[columnName]) { return 1; } else { return 0; }
        });
        this.columnSort[columnName] = !this.columnSort[columnName];
    }
  }

  onKeyChangeFilter() {
    const refine = this._match_id.toString();
    this.fillteredMatches = this.proMatches.filter(function(match) {
      return match.match_id.toString().startsWith(refine);
    });
  }
}
