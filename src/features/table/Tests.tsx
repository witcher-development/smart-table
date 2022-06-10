import React, { useState } from 'react';

import { Table } from '@table';


export const Page = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const columnNames = ['id', 'name', 'age'];

	const rows = [
		{
			id: 1,
			name: 'John',
			age: 30,
		},
		{
			id: 2,
			name: 'Natasha',
			age: 25,
		},
		{
			id: 3,
			name: 'Abraham',
			age: 60,
		}
	];

	return (
		<Table
			columnNames={columnNames}
			rows={[rows[currentPage - 1]]}
			numberOfPages={3}
			onPaginate={(pageNumber) => setCurrentPage(pageNumber)}
		/>
	);
};
