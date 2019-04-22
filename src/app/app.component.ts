import {Component} from '@angular/core';
import {InputMaskOptions} from 'input-mask-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: InputMaskOptions = new InputMaskOptions();

  logValue(value: any): void {
    console.log(value);
  }
}
