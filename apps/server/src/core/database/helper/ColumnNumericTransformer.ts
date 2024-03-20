import { Column, ColumnOptions } from 'typeorm'

export class ColumnNumericTransformer {
  to(data: number): number {
    return data
  }
  from(data: string): number {
    return parseFloat(data)
  }
}

export function ColumnNumeric(options?: ColumnOptions): PropertyDecorator {
  return function (target: any, propertyKey: string) {
    Column({
      ...options,
      type: 'numeric',
      transformer: new ColumnNumericTransformer(),
    })(target, propertyKey)
  }
}
