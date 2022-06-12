import React, { useState } from 'react';

import { Column, Table } from '@table';


export const Page = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const columns: Column[] = [
		{
			name: 'id',
			dataType: 'number'
		},
		{
			name: 'name',
			dataType: 'string'
		},
		{
			name: 'age',
			dataType: 'number'
		},
		{
			name: 'cool',
			dataType: 'boolean'
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
			rows={[rows[currentPage - 1]]}
			paginationConfig={{
				numberOfPages: 3,
				onPaginate: (pageNumber) => setCurrentPage(pageNumber),
			}}
		/>
	);
};
