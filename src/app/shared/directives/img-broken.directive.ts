import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @HostListener('error') handleError(): void {
    const elNative = this.elHost.nativeElement;
    //console.log('Esta imagen revento: ', this.elHost);
    elNative.src = '../../assets/images/img-broken.png';
  }
  
  //host hace referencia al huesped
  constructor(private elHost: ElementRef) {
    console.log(this.elHost);
   }

}
