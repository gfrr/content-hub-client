import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
// import { Ng2TweetService } from 'ng2-tweet/lib/index';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public searchTags: string = "";
  public result: any;
  public tweets: any;
  index: number = 0;
  public videoId: string = "";
  public tweet: string = "";
  hidden: boolean = true;
  constructor(
    private session: SessionService,
    // private ng2TweetService: Ng2TweetService
  ) { }

  ngOnInit() {
  }
  search(){
    this.session.searchYoutube({search: this.searchTags}).subscribe(result => {
      console.log(result);

      this.result = result.items;
      this.videoId = this.result[this.index].id.videoId;
      this.index++;
      console.log(this.result);
      this.hidden = false;
    });
    this.session.searchTwitter({hashtag: this.searchTags}).subscribe(result =>  {
      this.tweets = result.statuses;
      console.log(this.tweets);
      this.tweet = this.tweets[this.index].text;
      console.log(this.tweet);
    });
  }

  next(){
    if(this.index == this.result.length - 1) this.index = 0;
    this.videoId = this.result[this.index].id.videoId;
    this.tweet = this.tweets[this.index].text;
    this.index++;
  }
}
