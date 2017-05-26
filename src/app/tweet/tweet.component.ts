import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../services/session.service';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() tweet: any;
  @Output() onFavorite = new EventEmitter<string>();
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
