import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public searchTags: string = "";
  result: any;
  index: number = 0;
  videoId: string = "";
  hidden: boolean = true;
  constructor(
    private session: SessionService,
  ) { }

  ngOnInit() {
  }
  search(){
    this.session.search({search: this.searchTags}).subscribe(result => {
      console.log(result);

      this.result = result.items;
      this.videoId = this.result[this.index].id.videoId;
      this.index++;
      console.log(this.result);
      this.hidden = false;
    });
  }

  next(){
    if(this.index == this.result.length - 1) this.index = 0;
    this.videoId = this.result[this.index].id.videoId;
    this.index++;
  }
}
