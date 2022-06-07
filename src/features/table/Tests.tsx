import React from 'react';

import { Table } from '@table';


export const Page = () => {

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

	return <Table columnNames={columnNames} rows={rows} />;
};