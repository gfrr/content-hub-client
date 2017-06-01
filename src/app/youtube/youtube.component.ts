import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  @Input() video: any;
  @Input() search: any;
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
      this.save(this.video);
    }
    if (action === this.SWIPE_ACTION.LEFT) {
            this.onQuote();
        }
  };

  onQuote () {
    this.onFavorite.emit("video");
  }

  save(data){
    this.session.save({
      source: "YOUTUBE",
      uniqueRef: data,
      data: {
        video: data
      },
      searchTag: this.search
    }
    ).subscribe(()=>{
      this.onQuote();
    });
  }
}
