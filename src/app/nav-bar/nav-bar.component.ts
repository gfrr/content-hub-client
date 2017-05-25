import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  authenticated: boolean = false;
  constructor(private session: SessionService) { }

  ngOnInit() {
    if(this.session.isAuthenticated()) this.authenticated = true;
    console.log(this.authenticated);
  }
  logout(){
    this.session.logout();
    this.authenticated = false;
  }
}
