import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHorizontalMenu]',
  standalone: true
})
export class HorizontalMenuDirective implements OnInit {

  constructor(
    private elRef: ElementRef,
  ) { }



  ngOnInit(): void {
    this.elRef.nativeElement.syle = `
            px-8 pt-24 md:px-0 md:pt-16 bg-white md:rounded-md
            md:border md:shadow-md overflow-hidden h-screen md:h-auto`
  }

}
