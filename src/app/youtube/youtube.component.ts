import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../services/session.service';
@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  @Input() video: any;
  @Output() onFavorite = new EventEmitter<string>();
  constructor(
    private session: SessionService,
  ) { }

  ngOnInit() {
  }

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
    });
  }
}
