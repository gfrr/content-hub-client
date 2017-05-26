import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayEdit: boolean = false;
  user: any;
  constructor(private session: SessionService,
    private router: Router,
  ) { }
  // generateArray(obj){
  //   return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
  // }
  ngOnInit() {
    this.user = this.session;
  }
  edit(){
    this.displayEdit = true;
  }
  delete(){
    this.session.delete().subscribe(() => {
        this.session.logout();
      });
  }
}
