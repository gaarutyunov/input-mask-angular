import { NgModule } from '@angular/core';
import { InputMaskAngularDirective } from './input-mask-angular.directive';
import { InputMaskAngularPipe } from './input-mask-angular.pipe';

@NgModule({
  declarations: [InputMaskAngularDirective, InputMaskAngularPipe],
  exports: [InputMaskAngularDirective, InputMaskAngularPipe]
})
export class InputMaskAngularModule { }
