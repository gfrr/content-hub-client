import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../services/session.service';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() tweet: any;
  @Input() showButtons: boolean;
  @Output() onFavorite = new EventEmitter<string>();
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  swipe(action){
    if(action === this.SWIPE_ACTION.RIGHT){
      console.log("ayy swiped right");
      this.save(this.tweet);
    }
    if (action === this.SWIPE_ACTION.LEFT) {
            console.log("ayy swiped left");
            this.onQuote();
        }
  };

  constructor(
    private session: SessionService,
  ){}


  ngOnInit() {

  }
  onQuote () {
    this.onFavorite.emit("tweet");
  }

  save(data){
    this.session.save({
      source: "TWITTER",
      data: {
        tweet: data
      }
    }
    ).subscribe(()=>{
      console.log("item saved");
      this.onQuote();
    });
  }
}
