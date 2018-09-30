import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'contains',
    pure: false
})

export class ContainsFilter implements PipeTransform {
    transform(value: any, filterString: string, propName: string): any {
        if (value.length === 0 || filterString === '') {
            return value;
        } else {
            const results = [];
            for (const item of value) {
                if (item[propName].toLowerCase().includes(filterString.toLowerCase())) {
                    results.push(item);
                }
            }
            return results;
        }
    }
}
