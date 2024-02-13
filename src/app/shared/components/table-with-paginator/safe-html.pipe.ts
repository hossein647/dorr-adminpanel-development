import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {

  static transform: any;

  constructor(
    private sanetizer: DomSanitizer,
  ) { }
  transform(value: string) {
    return this.sanetizer.bypassSecurityTrustHtml(value)
  }

}
