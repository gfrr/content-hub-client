import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { FormControl } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

// import { Ng2TweetService } from 'ng2-tweet/lib/index';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public searchTags: string = "";
  public trends: any;
  public result: any;
  public tweets: any;
  public tumblr: any;
  public redditPosts: any;
  public tumblrPosts: Object[];
  public tags: any;
  public tagCounter: Object = {
    max: 40,
    currentMin: 0,
    currentMax: 10

  }

  public popular: any;
  public popularCounter: Object = {
    max: 100,
    currentMin: 0,
    currentMax: 10,
  }
  public searches: any;
  public videoId: string = "";
  public tweet: string = "";
  public reddit: any;
  searchType: string = "popular";
  index: number = 0;
  indexVideo: number = 0;
  indexTwitter: number = 0;
  indexTumblr: number = 0;
  indexReddit: number = 0;
  hidden: boolean = true;
  isLoadingTags: boolean = false;
  isLoadingTweet: boolean = false;
  isLoadingYt: boolean = false;
  isLoadingReddit: boolean = false;
  isLoadingTumblr: boolean = false;



  constructor(
    private session: SessionService,
  ) { }

  searchThis(name){
    console.log(name);
    this.searchTags = name;
    this.search();
  }

  slide(tagtype, sign){
    if(sign== "plus"){
      if(tagtype.currentMax + 5 >= tagtype.max){
        tagtype.currentMax = 5;
        tagtype.currentMin = 0;
      }
      else {
        tagtype.currentMax+= 5;
        tagtype.currentMin+= 5;
      }

    }
    else{
     if(tagtype.currentMin - 5 <= 0){
       tagtype.currentMax = tagtype.max;
       tagtype.currentMin = tagtype.max - 5;
     }
     else{
       tagtype.currentMax-= 5;
       tagtype.currentMin-= 5;
     }

    }


  }


  ngOnInit() {

    this.session.getTags().subscribe(result =>{
      this.isLoadingTags = true;
      this.tags = result.filter((elem) =>{
        if(elem.name[0]=="#"){
          let test = elem.name.substring(1).replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, "");
          if(test.length> 1) return elem;

        }
      });
      this.tagCounter = {
        max: this.tags.length,
        currentMin: 0,
        currentMax: 5
      }
    });
    this.session.getPopular().subscribe(result =>{
      this.popular = result.reverse();
      this.popularCounter = {
        max: this.popular.length,
        currentMin: 0,
        currentMax: 5
      }
    })

    this.searches = this.session.getSearches();

  }
  search(){
    if(this.searchTags != ""){


    if(this.searchTags[0] == "#") this.searchTags = this.searchTags.slice(1);
    this.searchTags = this.searchTags.trim();
    this.isLoadingTweet = false;
    this.isLoadingYt = false;
    this.isLoadingReddit = false;
    this.isLoadingTumblr = false;
    this.index = 0;

    this.session.saveSearch({search: this.searchTags}).subscribe(result => {
      console.log(result);
      this.searches = this.session.getSearches();
    })

    this.session.searchYoutube({search: this.searchTags, type: this.searchType}).subscribe(result => {
      this.result = result.items;
      if(this.result.length > 0){
        this.videoId = this.result[this.index].id.videoId;
        this.isLoadingYt = true;
      }

    });

    this.session.searchTwitter({hashtag: this.searchTags, type: this.searchType}).subscribe(result =>  {
      this.tweets = result.statuses;
      if(this.tweets.length > 0){
        this.tweet = this.tweets[this.index];
        this.isLoadingTweet = true;
      }

    });

    this.session.searchReddit({hashtag: this.searchTags, type: this.searchType}).subscribe(result => {
      this.redditPosts = result.data.children;
      if(this.redditPosts.length > 0){
        this.reddit = this.redditPosts[this.index];
        this.isLoadingReddit = true;
      }

    });

    this.session.searchTumblr({hashtag: this.searchTags, type: this.searchType}).subscribe(result=>{
      this.tumblrPosts = result.response;
      if(this.tumblrPosts.length > 0){
        this.tumblr = this.tumblrPosts[this.index];

        this.isLoadingTumblr = true;
      }

    });
    this.searchTags = "";
    this.hidden = false;
      }
  }

  next(){

    this.index++;
    if(this.index >= this.tweets.length - 1) this.index = 0;
    this.videoId = this.result[this.index].id.videoId;
    this.tweet = this.tweets[this.index];
    this.reddit = this.redditPosts[this.index];
    this.tumblr = this.tumblrPosts[this.index];

  }
  next1(type){
    if(type == "video") {
      this.indexVideo++;
      if(this.indexVideo >= this.result.length - 1) this.indexVideo = 0;
      this.videoId = this.result[this.indexVideo].id.videoId;
    }
    if(type == "tweet"){
      this.indexTwitter++;
      if(this.indexTwitter >= this.tweets.length -1) this.indexTwitter = 0;
      this.tweet = this.tweets[this.indexTwitter];
    }
    if(type == "reddit") {
      this.indexReddit++;
      if(this.indexReddit >= this.redditPosts.length - 1) this.indexReddit = 0;
      this.reddit = this.redditPosts[this.indexReddit];
    }
    if(type  == "tumblr"){
      this.indexTumblr++;
      if(this.indexTumblr >= this.tumblrPosts.length - 1) this.indexTumblr = 0;
      this.tumblr = this.tumblrPosts[this.indexTumblr];
    }
  }

  remove(query){
    this.session.removeSearch({search: query}).subscribe(result=>{
      this.searches = this.session.getSearches();
    });
  }
}
