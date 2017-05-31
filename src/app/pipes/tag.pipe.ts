import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tag',
  pure: false
})
export class TagPipe implements PipeTransform {

  transform(value: any, min: any, max: any): any {
    if(typeof(value)!== undefined){
      return value.filter((elem, index)=>{
          if(index >= min && index <= max) return elem;
      })
    }
      return [""];
  }
}
