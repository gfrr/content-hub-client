import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reddit',
  templateUrl: './reddit.component.html',
  styleUrls: ['./reddit.component.css']
})
export class RedditComponent implements OnInit {
  @Input() reddit: any;
  constructor() { }

  ngOnInit() {
    console.log(this.reddit);
  }

}
