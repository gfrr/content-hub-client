import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public searchTags: string = "";
  public result:any;
  testRequestId: string = "";

  constructor(
    private session: SessionService,
  ) { }

  ngOnInit() {
  }
  search(){
    this.session.search({search: this.searchTags}).subscribe(result => {
      this.result = result;
      console.log(result);
      console.log(result.items["0"].id.videoId);
      this.testRequestId = result.items["0"].id.videoId;
    });

  }
}
