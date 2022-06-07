import React, { useState, useEffect } from 'react';

import cls from './Table.module.scss';


type Props = {
  columnNames: string[],
  rows: { [key: string]: any}[]
}

export const Table = ({ columnNames, rows }: Props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredRows, setFilteredRows] = useState(rows);

	useEffect(() => {
		setFilteredRows(rows.filter((row) => Object.values(row).some((cell) => String(cell).toLowerCase().includes(searchQuery.toLowerCase()))));
	}, [searchQuery]);

	return (
		<div className={cls.table}>
			<div className={cls.tools}>
				<input type="text" value={searchQuery} onInput={(e) => setSearchQuery(e.currentTarget.value)} />
			</div>
			<div className={cls.header}>
				{columnNames.map((columnName) => <div key={columnName} className={cls.headerCell}>{columnName}</div>)}
			</div>
			<div>
				{filteredRows.map((row, index) => (
					<div key={index} className={cls.row}>
						{columnNames.map((column) => <div key={column} className={cls.cell}>{row[column]}</div>)}
					</div>
				))}
			</div>
		</div>
	);
};