import { Component, OnInit, OnChanges } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayEdit: boolean = false;
  user: any;
  visible: boolean = true;
  public searches :any;

  favorites: any;
  favoritesData: any = [];
  constructor(
    private session: SessionService,
    private router: Router,
    public dialog: MdDialog
  ) { }



  remove(id, index){
    this.session.removeContent({contentId: id}).subscribe(result=>{
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

  ngOnInit() {
    this.user = this.session;
    this.favorites = this.session.getFavorites();
    this.generateFavs();
    this.searches = this.session.getSearches();


  }

  edit(){
    this.displayEdit = true;
  }
  delete(){
    this.visible = false;
  }
  yes(){
    this.session.delete().subscribe(() => {
        this.session.logout();
      });
  }
  no(){
    this.visible = true;
  }
  removeTag(query){
    this.session.removeSearch({search: query}).subscribe(result=>{
      this.searches = this.session.getSearches();
    });
  }
}
