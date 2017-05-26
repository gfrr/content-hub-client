import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../services/session.service';
@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  @Input() video: any;
  constructor(
    private session: SessionService,
  ) { }

  ngOnInit() {
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
