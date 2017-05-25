import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  @Input() video: any;
  constructor() { }

  ngOnInit() {
  }

}
