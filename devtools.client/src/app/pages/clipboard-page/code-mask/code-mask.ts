import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[dtCodeMask]',
})
export class CodeMask {

  private readonly ngControl = inject(NgControl, { self: true, optional: true });

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    const viewValue = input.value;

    const rawValue = viewValue.replace(/-/g, '');

    this.ngControl?.control?.setValue(rawValue, { emitEvent: false });
  }
}
