import React, { useState, useEffect } from 'react';

import { getArrowByColumnName, booleanFromString } from './helpers';
import { Row, Sort, PaginationConfig, Column, FiltersState } from './types';
import { Pagination } from './Pagination';
import cls from './Table.module.scss';
import { Filters } from './Filters';


type Props = {
  columns: Column[],
  rows: Row[],
	paginationConfig?: PaginationConfig
}

export const Table = ({ columns, rows, paginationConfig }: Props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [sort, setSort] = useState<Sort | null>(null);
	const [filtersState, setFiltersState] = useState<FiltersState>({});
	const [filteredRows, setFilteredRows] = useState(rows);

	const filterRowsBySearchQuery =
		(searchQuery: string, rows: Row[]) => rows.filter((row) => Object.values(row).some((cell) => String(cell).toLowerCase().includes(searchQuery.toLowerCase())));

	const filterRows =
		(filters: FiltersState, rows: Row[]) => rows.filter((row) => Object.keys(filters).every((filterName) => filters[filterName].value === row[filterName]));

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
		console.log('bySearch', bySearch);
		const byFilters = filterRows(filtersState, bySearch);
		console.log('byFilters', byFilters);
		const bySort = sort ? sortRows(sort, byFilters) : byFilters;
		console.log('bySort', bySort);
		setFilteredRows(bySort);
	}, [searchQuery, sort, filtersState, rows]);

	return (
		<div className={cls.table}>
			<div className={cls.tools}>
				<input type="text" value={searchQuery} onInput={(e) => setSearchQuery(e.currentTarget.value)} />
				<Filters columns={columns} onChange={(filtersState) => setFiltersState(filtersState)} />
			</div>
			<div className={cls.header}>
				{columns.map(({ name }) => (
					<div
						key={name}
						className={cls.headerCell}
						onClick={() => onClickSort(name)}
					>
						{name}
						{getArrowByColumnName(sort, name)}
					</div>
				))}
			</div>
			<div>
				{filteredRows.map((row, index) => (
					<div key={index} className={cls.row}>
						{columns.map(({ name }) => <div key={name} className={cls.cell}>{String(row[name])}</div>)}
					</div>
				))}
				{!filteredRows.length && searchQuery && (
					<div className={cls.cell}>
						no results
					</div>
				)}
			</div>
			<div className={cls.footer}>
				{paginationConfig && <Pagination paginationConfig={paginationConfig} />}
			</div>
		</div>
	);
};
