import { Component, OnInit, OnChanges } from '@angular/core';
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
  favorites: any;
  favoritesData: any = [];
  constructor(private session: SessionService,
    private router: Router,
  ) { }
  // generateArray(obj){
  //   return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
  // }
  remove(id, index){
    console.log("id", id);
    this.session.removeContent({contentId: id}).subscribe(result=>{
      console.log(index);
      this.favoritesData.splice(index, 1);
    });
  }

  generateFavs(){
    this.favorites = this.session.getFavorites();
    this.favorites.forEach((favorite)=>{
      this.session.getFavorite(favorite).subscribe(result=> {
        this.favoritesData.push(result);
      });

    })
  }
  // ngOnChanges(){
  //   this.user = this.session;
  //   this.favorites = this.session.getFavorites();
  //   this.generateFavs();
  // }
  ngOnInit() {
    this.user = this.session;
    this.favorites = this.session.getFavorites();
    this.generateFavs();
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
