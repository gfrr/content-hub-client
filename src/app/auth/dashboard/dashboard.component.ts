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
  filtered: any = undefined;
  public searches :any;
  autocompleteItems = [];
  favorites: any;
  favoritesData: any = [];
  constructor(
    private session: SessionService,
    private router: Router,
    public dialog: MdDialog
  ) { }

  onItemAdded(event){
    console.log(event.value);
    if(typeof(this.filtered)=="undefined") this.filtered = [];
    console.log(event.value.substring(1));
    this.filtered.push(event.value.substring(1));
  }
  onItemRemoved(event){
    console.log(event.value);
    this.filtered.splice(this.filtered.indexOf(event.value), 1);
    if(this.filtered.length < 1) this.filtered = undefined;
  }


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
    this.autocompleteItems = this.searches.map((elem)=> "#"+elem);

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
      this.autocompleteItems = this.searches.map((elem)=> "#"+elem);
    });
  }
}
