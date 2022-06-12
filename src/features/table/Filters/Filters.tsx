import React from 'react';

import { Dropdown } from '@common/Dropdown';
import { Column } from '@table';

import cls from './Filters.module.scss';


type Props = {
  columns: Column[]
};

export const Filters = ({ columns }: Props) => (
	<Dropdown triggerLabel="Filters" className={cls.dropdown}>
		<div>
			filters
		</div>
	</Dropdown>
);
