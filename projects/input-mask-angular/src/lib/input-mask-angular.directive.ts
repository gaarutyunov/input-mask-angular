import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {MaskedTextChangedListener} from 'ts-input-mask';
import {InputMaskOptions} from './input-mask-options';

@Directive({
  selector: 'input[mask]'
})
export class InputMaskAngularDirective implements AfterViewInit {
  @Output() public maskFilled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public extractedValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() public formattedText: EventEmitter<string> = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {
  }

  private _primaryFormat: string;

  @Input('mask') set primaryFormat(value: string) {
    this._primaryFormat = value;
  }

  private _options: InputMaskOptions = new InputMaskOptions();

  @Input('options') set options(value: InputMaskOptions) {
    this._options = value;
  }

  public ngAfterViewInit(): void {
    this.setupListener(this.elementRef.nativeElement);
  }

  private setupListener(input: HTMLInputElement): void {
    if (!!this._primaryFormat) {
      const emitChanges = (
        maskFilled: boolean,
        extractedValue: string,
        formattedText: string
      ): void => {
        this.maskFilled.emit(maskFilled);
        this.extractedValue.emit(extractedValue);
        this.formattedText.emit(formattedText);
      };
      const listener: MaskedTextChangedListener = MaskedTextChangedListener.installOn(
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
        }(),
        this._options.affineFormats,
        this._options.customNotations,
        this._options.affinityCalculationStrategy,
        this._options.autocomplete
      );

      input.placeholder = String(listener.placeholder());
    }
  }

}
