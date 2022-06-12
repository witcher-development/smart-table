import React, { useState, useEffect } from 'react';

import { Row, Sort, PaginationConfig } from './types';
import { Pagination } from './Pagination';
import cls from './Table.module.scss';


type Props = {
  columnNames: string[],
  rows: Row[],
	paginationConfig?: PaginationConfig
}

export const Table = ({ columnNames, rows, paginationConfig }: Props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [sort, setSort] = useState<Sort | null>(null);
	const [filteredRows, setFilteredRows] = useState(rows);

	const filterRowsBySearchQuery = (searchQuery: string, rows: Row[]) => rows.filter((row) => Object.values(row).some((cell) => String(cell).toLowerCase().includes(searchQuery.toLowerCase())));
	const sortRows = (sort: Sort, rows: Row[]) => rows.sort((row1, row2) => {
		if (row1[sort.column] > row2[sort.column]) {
			return sort.type === 'asc' ? 1 : -1;
		}
		if (row1[sort.column] < row2[sort.column]) {
			return sort.type === 'asc' ? -1 : 1;
		}
		return 0;
	});

	const onClickSort = (columnName: string) => {
		if (!sort || sort.column !== columnName) {
			setSort({ column: columnName, type: 'asc' });
			return;
		}

		setSort({ column: columnName, type: sort.type === 'desc' ? 'asc' : 'desc' });
	};

	useEffect(() => {
		const bySearch = filterRowsBySearchQuery(searchQuery, rows);
		const bySort = sort ? sortRows(sort, bySearch) : bySearch;
		setFilteredRows(bySort);
	}, [searchQuery, sort, rows]);

	const arrowUp = <>&#8593;</>;
	const arrowDown = <>&#8595;</>;
	const arrowUpDown = <>&#8645;</>;

	const getArrowByColumnName = (columnName: string) => {
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

	return (
		<div className={cls.table}>
			<div className={cls.tools}>
				<input type="text" value={searchQuery} onInput={(e) => setSearchQuery(e.currentTarget.value)} />
			</div>
			<div className={cls.header}>
				{columnNames.map((columnName) => (
					<div
						key={columnName}
						className={cls.headerCell}
						onClick={() => onClickSort(columnName)}
					>
						{columnName}
						{getArrowByColumnName(columnName)}
					</div>
				))}
			</div>
			<div>
				{filteredRows.map((row, index) => (
					<div key={index} className={cls.row}>
						{columnNames.map((column) => <div key={column} className={cls.cell}>{row[column]}</div>)}
					</div>
				))}
			</div>
			<div className={cls.footer}>
				{paginationConfig && <Pagination paginationConfig={paginationConfig} />}
			</div>
		</div>
	);
};
