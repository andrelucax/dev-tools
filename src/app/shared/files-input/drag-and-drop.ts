import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dtDragAndDrop]',
})
export class DragAndDrop {

  @Output() filesDropped = new EventEmitter<File[]>();
  @Output() dragging = new EventEmitter<boolean>();

  @HostBinding('class.dt-drag-over') isDragOver = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.isDragOver = true;
    this.dragging.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.isDragOver = false;
    this.dragging.emit(false);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.isDragOver = false;
    this.dragging.emit(false);

    const files = Array.from(event.dataTransfer?.files || []);

    if (files.length === 0) return;

    this.filesDropped.emit(files);
  }
}
