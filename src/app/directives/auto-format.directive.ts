import { Directive, ElementRef, DoCheck } from '@angular/core';

@Directive({
  selector: '[appAutoFormat][ngModel]',
  host: {'(ngModelChange)': 'editInputValue($event)'} 
})
export class AutoFormatDirective {

  constructor(private el: ElementRef) {
  }

  editInputValue(event : string){
    event = this.removeComma(event);
    event = this.decomposeNumber(event);
    this.el.nativeElement.value = event;
  }

  decomposeNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  removeComma(text :string){
    return text.replace(/,/g,'');
  }

}
