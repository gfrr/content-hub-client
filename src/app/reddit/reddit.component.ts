import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../services/session.service';
@Component({
  selector: 'app-reddit',
  templateUrl: './reddit.component.html',
  styleUrls: ['./reddit.component.css']
})
export class RedditComponent implements OnInit {
  @Input() reddit: any;
  @Input() showButtons: boolean;
  @Output() onFavorite = new EventEmitter<string>();
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  swipe(action){
    if(action === this.SWIPE_ACTION.RIGHT){
      console.log("ayy swiped right");
      this.save(this.reddit);
    }
    if (action === this.SWIPE_ACTION.LEFT) {
            console.log("ayy swiped left");
            this.onQuote();
        }
  };
  constructor(private session: SessionService,) { }

  ngOnInit() {
  }
  onQuote () {
    this.onFavorite.emit("reddit");
  }


  save(data){
    const newReddit = {
      data:{
      permalink: data.data.permalink,
      title: data.data.title,
      url: data.data.url,
      preview: {
        images: data.data.preview.images,
      },
      author: data.data.author,
      subreddit_name_prefixed: data.data.subreddit_name_prefixed,
      created: data.data.created,
      score: data.data.score
      }

    }
    this.session.save({
      source: "REDDIT",
      data: {
        reddit: newReddit
      }
    }
    ).subscribe(()=>{
      console.log("item saved");
      this.onQuote();
    });
  }
}
