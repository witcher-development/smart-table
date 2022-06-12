export type Row = { [key: string]: any};

export type Sort = { column: string, type: 'asc' | 'desc' };

export type PaginationConfig = {
  numberOfPages: number,
  onPaginate: (page: number) => void,
  visiblePagesOnSidesNumber?: number,
}
