import {Component} from '@angular/core';
import {InputMaskOptions} from 'input-mask-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  options: InputMaskOptions = new InputMaskOptions();
  mask = '{+7} ([000]) [000] [00] [00]';

  logValue(value: any): void {
    console.log(value);
  }
}
