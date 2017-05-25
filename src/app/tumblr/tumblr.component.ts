import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tumblr',
  templateUrl: './tumblr.component.html',
  styleUrls: ['./tumblr.component.css']
})
export class TumblrComponent implements OnInit {
  @Input() tumblr: any;
  constructor() { }

  ngOnInit() {
  }

}
