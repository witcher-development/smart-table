import React from 'react';

import { BooleanFilterValue, NumberFilterValue, Sort, StringFilterValue } from './types';


const arrowUp = <>&#8593;</>;
const arrowDown = <>&#8595;</>;
const arrowUpDown = <>&#8645;</>;

export const getArrowByColumnName = (sort: Sort | null, columnName: string) => {
	if (!sort || columnName !== sort.column) {
		return arrowUpDown;
	}
	if (sort.type === 'asc') {
		return arrowDown;
	}
	if (sort.type === 'desc') {
		return arrowUp;
	}
};

export const booleanFromString = (value: string) => {
	if (!value) return null;
	if (value === 'false') return false;
	if (value === 'true') return true;
};


export const getTypedBooleanFilterValue = (value: any): BooleanFilterValue => {
	if (typeof value !== 'boolean') throw Error;
	return value;
};
export const getTypedStringFilterValue = (array: any): StringFilterValue => {
	if (!Array.isArray(array) || array.some((value) => typeof value !== 'string')) throw Error;
	return array;
};
export const getTypedNumberFilterValue = (value: any): NumberFilterValue => {
	const isNumberOrNull = (value: any) => typeof value === 'number' || value === null;
	if (!value.moreThan || !isNumberOrNull(value.moreThan) || !value.lessThan || !isNumberOrNull(value.lessThan)) throw Error;
	return value;
};
