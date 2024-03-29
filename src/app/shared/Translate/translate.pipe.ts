
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service'; // our translate service

@Pipe({
    name: 'translate',
    pure: true
})

export class TranslatePipe implements PipeTransform {

    constructor(public _translate: TranslateService) { }

    transform(value: string, _args: string): any {
        if (!value) return;
        return this._translate.instant(value);
    }
}
