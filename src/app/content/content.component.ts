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
  public tumblr: any;
  public redditPosts: any;
  public tumblrPosts: Object[];
  index: number = 0;
  public videoId: string = "";
  public tweet: string = "";
  public reddit: any;
  hidden: boolean = true;
  isLoadingTweet: boolean = false;
  isLoadingYt: boolean = false;
  isLoadingReddit: boolean = false;
  isLoadingTumblr: boolean = false;
  constructor(
    private session: SessionService,
    // private ng2TweetService: Ng2TweetService
  ) { }

  ngOnInit() {
  }
  search(){
    this.isLoadingTweet = false;
    this.isLoadingYt = false;
    this.isLoadingReddit = false;
    this.isLoadingTumblr = false;
    this.index = 0;
    this.session.searchYoutube({search: this.searchTags}).subscribe(result => {
      this.result = result.items;
      this.videoId = this.result[this.index].id.videoId;
      this.isLoadingYt = true;
    });

    this.session.searchTwitter({hashtag: this.searchTags}).subscribe(result =>  {
      this.tweets = result.statuses;
      this.tweet = this.tweets[this.index];
      this.isLoadingTweet = true;
    });

    this.session.searchReddit({hashtag: this.searchTags}).subscribe(result => {
      this.redditPosts = result.data.children;
      this.reddit = this.redditPosts[this.index];
      this.isLoadingReddit = true;
    });

    this.session.searchTumblr({hashtag: this.searchTags}).subscribe(result=>{
      this.tumblrPosts = result.response;
      this.tumblr = this.tumblrPosts[this.index];
      console.log(this.tumblr);
      this.isLoadingTumblr = true;
    });

    this.index++;
    this.hidden = false;
  }

  next(){
    if(this.index == this.tweets.length - 1) this.index = 0;
    this.videoId = this.result[this.index].id.videoId;
    this.tweet = this.tweets[this.index];
    this.reddit = this.redditPosts[this.index];
    this.index++;
  }
}
