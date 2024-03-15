
import { Pipe, PipeTransform } from '@angular/core';
import { KeyValue, GridFilter, Column_Detail } from './common_model'
import { AbstractControl } from '@angular/forms';

@Pipe({ name: 'filterArray' })
export class FilterArrayPipe implements PipeTransform {
    transform(value: Array<KeyValue>, args: string[]): Array<KeyValue> {
        try {
            let input: string;
            if (typeof (args) === 'string') {
                input = args;
            } else {
                input = args[0];
            }
            if (input) {
                let tmp1 = value.filter((d) => d.Key.toLowerCase().indexOf(input.toLowerCase()) === 0);
                let tmp2 = value.filter((d) => d.Key.toLowerCase().indexOf(input.toLowerCase()) > 0);
                let final = tmp1.concat(tmp2);
                if (final.length == 0 || final[0].Value <= 0) {
                    final.splice(0, 0, value[0]);
                }
                return final;
            } else {
                return value;
            }
        }
        catch (ex) {
            return value;
        }
    }
}
@Pipe({ name: 'fileType' })
export class fileTypePipe implements PipeTransform {
    transform(type: string): string {
        try {
            type = type.toLowerCase().replace(".", "");
            let lstImgType = ["bmp", "gif", "ico", "jpeg", "jpg", "png", "ps", "psd", "svg", "tif", "tiff"];
            let lstVideoType = ["3gp", "avi", "flv", "m4v", "mkv", "mov", "mp4", "mpg", "mpeg", "wmv", "vob"];
            if (lstImgType.indexOf(type) > -1) { return "fa fa-file-image"; }
            else if (type == "pdf") { return "fa fa-file-pdf"; }
            else if (type == "xls" || type == "xlsx" || type == "csv") { return "fa fa-file-excel"; }
            else if (type == "doc" || type == "docx") { return "fa fa-file-word"; }
            else if (type == "txt" || type == "tex" || type == "rtf") { return "fa fa-file-alt"; }
            else if (type == "mp3" || type == "ogg" || type == "mpa" || type == "wav") { return "fa fa-file-audio"; }
            else if (type == "7z" || type == "rar" || type == "zip") { return "fa fa-file-archive"; }
            else if (type == "ppt" || type == "pptx" || type == "pps") { return "fa fa-file-powerpoint"; }
            else if (type == "htm" || type == "html" || type == "css") { return "fa fa-file-code"; }
            else if (lstVideoType.indexOf(type) > -1) { return "fa fa-file-video"; }
            else { return "fa fa-file"; }

        }
        catch (ex) {
            return "";
        }
    }
}

export class PasswordValidation {
    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password')!.value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword')!.value; // to get value in input tag
        if (password != confirmPassword) {
            AC.get('confirmPassword')!.setErrors({ MatchPassword: true })
        } else {
            return null
        }
    }
}


@Pipe({ name: 'filterArrayObject' })
export class FilterArrayObjectPipe implements PipeTransform {
   // transform(value: Array<object>, args: string, cd?: GridFilter): Array<object> {
    transform(value: any, args: string, cd?: GridFilter): Array<object> {
        let retVal: Array<object>;
        try {
            if (args) {
                let input = undefined;
                input = args;
                if (input && value.length > 0) {
                    let final = [];
                    let keys = Object.keys(value[0]).filter(d => typeof (value[0][d]) != 'object');
                    for (var j = 0; j < value.length; j++) {
                        for (var i = 0; i < keys.length; i++) {
                            if (value[j][keys[i]] && value[j][keys[i]].toString().toLowerCase().indexOf(input.toLowerCase()) > -1) {
                                final.push(value[j]);
                                break;
                            }
                        }
                    }
                    retVal = final;
                } else {
                    retVal = value;
                }
            } else {
                retVal = value;
            }
            //if (cd) {
            //    let direction = cd.Sort_Order == 'desc' ? 1 : -1;
            //    value.sort(function (a, b) {
            //        if (a[cd.Property_Name] < b[cd.Property_Name]) {
            //            return -1 * direction;
            //        }
            //        else if (a[cd.Property_Name] > b[cd.Property_Name]) {
            //            return 1 * direction;
            //        }
            //        else {
            //            return 0;
            //        }
            //    });
            //}
        }
        catch (ex) {
            retVal = value;
        }
        return retVal;
    }
}

@Pipe({ name: 'sum' })
export class SumPipe implements PipeTransform {
   // transform(value: Array<object>, cd?: GridFilter): Array<object> {
    transform(value: any, cd?: GridFilter): Array<object> {
        let retVal: any;
        try {
            if (cd && value.length > 0) {
                if (cd.Type == 'number') {
                    retVal = parseFloat(value.reduce((a: any, b: { [x: string]: any; }) => { return a + b[cd.ColumnName] }, 0)).toFixed(2);
                }
            }
        }
        catch (ex) {
        }
        return retVal == "NaN" ? "" : retVal;
    }
}

import { DomSanitizer } from '@angular/platform-browser'
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
    constructor(public sanitized: DomSanitizer) { }
    transform(value: any) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}