import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {MaskedTextChangedListener} from 'ts-input-mask';

@Directive({
  selector: 'input[mask]'
})
export class InputMaskAngularDirective implements AfterViewInit {

  @Output('maskFilled') public maskFilled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('extractedValue') public extractedValue: EventEmitter<string> = new EventEmitter<string>();
  @Output('formattedText') public formattedText: EventEmitter<string> = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {
  }

  private _primaryFormat: string;

  @Input('mask') set primaryFormat(value: string) {
    this._primaryFormat = value;
  }

  public ngAfterViewInit(): void {
    this.setupListener(this.elementRef.nativeElement);
  }

  private setupListener(input: HTMLInputElement): void {
    const emitChanges = (
      maskFilled: boolean,
      extractedValue: string,
      formattedText: string
    ): void => {
      this.maskFilled.emit(maskFilled);
      this.extractedValue.emit(extractedValue);
      this.formattedText.emit(formattedText);
    };
    const listener: MaskedTextChangedListener = new MaskedTextChangedListener(
      this._primaryFormat,
      input,
      new class implements MaskedTextChangedListener.ValueListener {
        public onTextChanged(
          maskFilled: boolean,
          extractedValue: string,
          formattedText: string
        ): void {
          emitChanges(maskFilled, extractedValue, formattedText);
        }
      }()
    );

    input.placeholder = String(listener.placeholder());
  }

}
