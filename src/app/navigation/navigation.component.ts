import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  isAuth = false;
  selectedNav = 'home';
  navigationListItems = [
    { route: 'home', text: 'Home' },
    { route: 'teams', text: 'Teams' },
    { route: 'heroes', text: 'Heroes' },
    { route: 'statistics', text: 'Statistics' },
  ];
  // navigationListItems = [
  //   {route: 'home', text: 'Home'},
  //   {route: 'matches', text: 'Matches'},
  //   {route: 'pro-matches', text: 'Pro Matches'},
  //   {route: 'players', text: 'Players'},
  //   {route: 'pro-players', text: 'Pro Players'},
  //   {route: 'teams', text: 'Teams'},
  //   {route: 'heroes', text: 'Heroes'},
  //   {route: 'items', text: 'Items'},
  //   {route: 'statistics', text: 'Statistics'}
  // ];
  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.authService.tokenChange.subscribe((value) => this.isAuth = value);
    }

  onSelectedNav(selectedNavItem: string) {
    this.selectedNav = selectedNavItem;
  }

  onLogout() {
    this.authService.logout();
  }
}
