import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../services/session.service';
@Component({
  selector: 'app-reddit',
  templateUrl: './reddit.component.html',
  styleUrls: ['./reddit.component.css']
})
export class RedditComponent implements OnChanges {
  @Input() reddit: any;
  @Input() search: any;
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

  ngOnChanges() {
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
      thumbnail: data.data.thumbnail,
      preview: {
        images: data.data.thumbnail,
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
      },
      searchTag: this.search
    }
    ).subscribe(()=>{
      console.log("item saved");
      this.onQuote();
    });
  }
}
