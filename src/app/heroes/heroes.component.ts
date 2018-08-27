import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ResolvedStaticSymbol } from '@angular/compiler';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  private heroes = [];
  filteredHeroes = [];
  heroRoles: string[] = [];
  selectedRoles: string[] = [];
  loading = true;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData('heroes').subscribe(heroes => {
      this.loading = false;
      this.heroes = heroes;
      this.filteredHeroes = this.heroes;
      this.getHeroRoles();
    });
  }

  // Add selected roll to selectedRolls / remove selected roll from selectedRolls
  selectFilter(roleSelected: string) {
    if (this.selectedRoles.includes(roleSelected)) {
      this.selectedRoles.splice(this.selectedRoles.indexOf(roleSelected), 1);
    } else { this.selectedRoles.push(roleSelected); }
  }

  // For each hero in Heroes checkes if hero roles == all seleceted roles
  filterHeroesByRole() {
    this.filteredHeroes = this.heroes.filter(hero => {
      let match = true;
      let i = 0;
      while (match && i < this.selectedRoles.length) {
        if (!hero.roles.includes(this.selectedRoles[i])) {
          match = false;
        }
        i++;
      }
      return match;
    });
  }

  getHeroRoles() {
    const allRoles = [];
    this.heroes.forEach(hero => {
      const roles = hero.roles;
      roles.forEach(role => {
        if (!allRoles.includes(role)) {
          allRoles.push(role);
        }
      });
      this.heroRoles = allRoles;
    });
    console.log(allRoles);
  }

  clearFilters() {
    this.selectedRoles = [];
    this.filteredHeroes = this.heroes;
  }
}
