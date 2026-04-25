import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clipboardCode',
})
export class ClipboardCodePipe implements PipeTransform {

  transform(value: string): string {

    if (!value) return value;

    const middle = Math.floor(value.length / 2);

    return value.slice(0, middle) + '-' + value.slice(middle);
  }
}
