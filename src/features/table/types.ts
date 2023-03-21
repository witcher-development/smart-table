export enum ColumnDataType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
}

export type Column = {
  name: string,
  dataType: ColumnDataType
}

export type Row = { [key: string]: any};

export type Sort = { column: string, type: 'asc' | 'desc' };

export type PaginationConfig = {
  numberOfPages: number,
  onPaginate: (page: number) => void,
  visiblePagesOnSidesNumber?: number,
}

export type BooleanFilterValue = boolean;
type BooleanFilterField = {
  dataType: ColumnDataType.Boolean,
  value: BooleanFilterValue
}

export type StringFilterValue = string[];
type StringFilterField = {
  dataType: ColumnDataType.String,
  value: StringFilterValue,
  // possibleValues: string[],
}

export type NumberFilterValue = {
  moreThan: number | null,
  lessThan: number | null,
}
type NumberFilterField = {
  dataType: ColumnDataType.Number,
  value: NumberFilterValue
}

export type FilterValueTypes = BooleanFilterValue | StringFilterValue | NumberFilterValue;
export type FilterFieldTypes = BooleanFilterField | StringFilterField | NumberFilterField;

export type FiltersState = {
 [key: string]: {
   isApplied: boolean,
 } & FilterFieldTypes
}
