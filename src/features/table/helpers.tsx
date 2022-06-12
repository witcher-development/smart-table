import React from 'react';

import { Sort } from './types';


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
