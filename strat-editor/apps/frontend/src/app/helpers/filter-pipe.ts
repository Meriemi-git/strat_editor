import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string[], fieldName: string): any[] {
    // return empty array if array is falsy
    if (!items) {
      return [];
    }

    // return the original array if search text is empty
    if (!searchText) {
      return items;
    }

    // retrun the filtered array
    return items.filter((item) => {
      if (item && item[fieldName]) {
        return searchText.some((term) =>
          item[fieldName].toLocaleLowerCase().includes(term.toLocaleLowerCase())
        );
      }
      return false;
    });
  }
}
