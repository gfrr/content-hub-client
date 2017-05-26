import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-tumblr',
  templateUrl: './tumblr.component.html',
  styleUrls: ['./tumblr.component.css']
})
export class TumblrComponent implements OnInit {
  @Input() tumblr: any;
  @Output() onFavorite = new EventEmitter<string>();
  constructor(private session: SessionService,) { }

  ngOnInit() {
  }
  onQuote () {
    this.onFavorite.emit("tumblr");
  }

  save(data){
    this.session.save({
      source: "TUMBLR",
      data: {
        tumblr: data
      }
    }
    ).subscribe(()=>{
      console.log("item saved");
      this.onQuote();
    });
  }
}
