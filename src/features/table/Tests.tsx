import React, { useState } from 'react';

import { Column, ColumnDataType, Table } from '@table';


export const Page = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const columns: Column[] = [
		{
			name: 'id',
			dataType: ColumnDataType.Number
		},
		{
			name: 'name',
			dataType: ColumnDataType.String
		},
		{
			name: 'age',
			dataType: ColumnDataType.Number
		},
		{
			name: 'cool',
			dataType: ColumnDataType.Boolean
		}
	];

	const rows = [
		{
			id: 1,
			name: 'John',
			age: 30,
			cool: false
		},
		{
			id: 2,
			name: 'Natasha',
			age: 25,
			cool: true
		},
		{
			id: 3,
			name: 'Abraham',
			age: 60,
			cool: true
		},
	];

	return (
		<Table
			columns={columns}
			rows={rows}
		/>
	);
};
