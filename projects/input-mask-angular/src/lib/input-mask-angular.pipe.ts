import {Pipe, PipeTransform} from '@angular/core';
import {CaretString, Mask, Notation} from 'ts-input-mask';

@Pipe({
  name: 'mask'
})
export class InputMaskAngularPipe implements PipeTransform {

  transform(
    value: string,
    primaryFormat: string,
    customNotations: Array<Notation> = []
  ): string {
    const mask = Mask.getOrCreate(primaryFormat, customNotations);
    const stringLength: number = value.length;
    const result: Mask.Result = mask.apply(
      new CaretString(
        value,
        stringLength
      ),
      false
    );

    return String(result.formattedText.string);
  }

}
