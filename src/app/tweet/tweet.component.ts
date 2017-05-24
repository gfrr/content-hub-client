import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() tweet: any;
  constructor(
  ){}


  ngOnInit() {
    
  }

}
//
//
// import { Pipe, PipeTransform } from '@angular/core';
//
// @Pipe({
//   name: 'twitter',
//   pure: false
// })
// export class TwitterPipe implements PipeTransform {
//
//   transform(input: Object, args?: any): any {
//
//     var result = input["text"].split(" ");
//     console.log(result);
//
//     result = result.map((word)=>{
//         if(word.match(/https/g)) word = `<a href=${word}>${word}</a>`;
//         word = word.replace(/(@)\w+/g, `<a href="https://twitter.com/${word.substring(1)}">${word}</a>`);
//         word = word.replace(/(#)\w+/g, `<a href="https://twitter.com/hashtag/${word.substring(1)}?src=hash">${word}</a> `);
//         return word;
//       }).join(" ");
//     result = `<p lang="en" dir="ltr">` + result + `</p>`;
//
//     return result;
//
//   }
