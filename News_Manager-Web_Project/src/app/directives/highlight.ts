import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {
  constructor(private el: ElementRef) { }
  
  @HostListener('focus') onFocus() { 
		this.highlight('lightblue');
  }

  @HostListener('blur') onBlur() {
    this.highlight(''); 
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
    
}
