import React from 'react';

import cls from './Table.module.scss';


type Props = {
  columnNames: string[],
  rows: { [key: string]: any}[]
}

export const Table = ({ columnNames, rows }: Props) => (
	<div className={cls.table}>
		<div className={cls.header}>
			{columnNames.map((columnName) => <div key={columnName} className={cls.headerCell}>{columnName}</div>)}
		</div>
		<div>
			{rows.map((row, index) => (
				<div key={index} className={cls.row}>
					{columnNames.map((column) => <div key={column} className={cls.cell}>{row[column]}</div>)}
				</div>
			))}
		</div>
	</div>
);