import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'replace'
})
export class ReplaceWhiteSpace implements PipeTransform {
    transform(value: string) {
        const str: string = value.replace("'", "");
        return str.replace(/ /g, '_');
    }
}
