import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'content',
  pure: false
})
export class ContentPipe implements PipeTransform {

  transform(value: any, fil: any = undefined): any {
    if(typeof(fil)!== "undefined"){


      return value.filter((elem)=>{

        if(fil.indexOf(elem.content.searchTag) != -1) return elem;
      })
    }
    return value;
  }

}
