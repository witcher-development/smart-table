export type Column = {
  name: string,
  dataType: 'string' | 'number' | 'boolean'
}

export type Row = { [key: string]: any};

export type Sort = { column: string, type: 'asc' | 'desc' };

export type PaginationConfig = {
  numberOfPages: number,
  onPaginate: (page: number) => void,
  visiblePagesOnSidesNumber?: number,
}

export type FiltersState = {
 [key: string]: {
   isApplied: boolean,
   dataType: 'boolean',
   value: boolean
 }
}
