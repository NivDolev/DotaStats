import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  loading = true;
  teams = [];
  filteredTeams = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData('teams').subscribe(teams => {
      this.loading = false;
      this.teams = teams;
      this.filteredTeams = teams.sort((a, b) => {
        if (a.rating > b.rating) {
          return -1;
        } else if (b.rating > a.rating) {
            return 1;
          } else { return 0; }
      });
    });
  }

}
