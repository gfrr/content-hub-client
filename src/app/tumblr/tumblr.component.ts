import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-tumblr',
  templateUrl: './tumblr.component.html',
  styleUrls: ['./tumblr.component.css']
})
export class TumblrComponent implements OnInit {
  @Input() tumblr: any;
  @Input() search: any;
  @Input() showButtons: boolean;
  @Output() onFavorite = new EventEmitter<string>();
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  swipe(action){
    if(action === this.SWIPE_ACTION.RIGHT){
      this.save(this.tumblr);
    }
    if (action === this.SWIPE_ACTION.LEFT) {
            this.onQuote();
        }
  };
  constructor(private session: SessionService,) { }

  ngOnInit() {
  }
  onQuote () {
    this.onFavorite.emit("tumblr");
  }

  save(data){
    this.session.save({
      source: "TUMBLR",
      uniqueRef: data.id,
      data: {
        tumblr: data
      },
      searchTag: this.search
    }
    ).subscribe(()=>{
      this.onQuote();
    });
  }
}
