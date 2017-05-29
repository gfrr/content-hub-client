import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../services/session.service';
@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  @Input() video: any;
  @Input() showButtons: boolean;
  @Output() onFavorite = new EventEmitter<string>();
  constructor(
    private session: SessionService,
  ) { }

  ngOnInit() {
  
  }

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  swipe(action){
    if(action === this.SWIPE_ACTION.RIGHT){
      console.log("ayy swiped right");
      this.save(this.video);
    }
    if (action === this.SWIPE_ACTION.LEFT) {
            console.log("ayy swiped left");
            this.onQuote();
        }
  };

  onQuote () {
    this.onFavorite.emit("video");
  }

  save(data){
    this.session.save({
      source: "YOUTUBE",
      data: {
        video: data
      }
    }
    ).subscribe(()=>{
      console.log("item saved");
      this.onQuote();
    });
  }
}
