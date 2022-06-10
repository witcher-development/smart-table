import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import { Row, Sort } from './types';
import cls from './Table.module.scss';


type Props = {
  columnNames: string[],
  rows: Row[],
	numberOfPages?: number,
	onPaginate?: (page: number) => void,
}

export const Table = ({ columnNames, rows, numberOfPages, onPaginate }: Props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [sort, setSort] = useState<Sort | null>(null);
	const [filteredRows, setFilteredRows] = useState(rows);
	const [currentPage, setCurrentPage] = useState(1);

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

	const onClickPagination = (page: number) => {
		setCurrentPage(page);

		if (onPaginate) {
			onPaginate(page);
		}
	};

	const getPagesToRender = (numberOfPages: number) => {
		const onLeft = currentPage < 2 ? [] : Array(currentPage - 1).fill(0).map((_, index) => index + 1);
		const onRight =
			currentPage < numberOfPages
				? Array(numberOfPages - currentPage)
					.fill(0).map((_, index) => currentPage + index + 1)
				: [];

		return {
			onLeft: onLeft.slice(-3),
			current: currentPage,
			onRight: onRight.slice(0, 3)
		};
	};

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
			{numberOfPages && (
				<div className={cls.footer}>
					<nav>
						<ul className={cls.pagination}>
							{(() => {
								const pages = getPagesToRender(numberOfPages);

								return (
									<>
										{pages.onLeft.map((pageNumber, index) => (
											<li
												key={pageNumber}
												className={cls.notMiddlePage}
												style={{
													transform: `translateX(${-(pages.onLeft.length - index) * 100}%)`
												}}
												onClick={() => onClickPagination(pageNumber)}
											>
												{pageNumber}
											</li>
										))}
										<li
											key={currentPage}
											className={cx(cls.page, cls.current)}
											onClick={() => onClickPagination(currentPage)}
										>
											{currentPage}
										</li>
										{pages.onRight.map((pageNumber, index) => (
											<li
												key={pageNumber}
												className={cls.notMiddlePage}
												style={{
													transform: `translateX(${(index + 1) * 100}%)`
												}}
												onClick={() => onClickPagination(pageNumber)}
											>
												{pageNumber}
											</li>
										))}
									</>
								);
							})()}
						</ul>
					</nav>
				</div>
			)}
		</div>
	);
};
