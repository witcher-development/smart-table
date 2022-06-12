import React, { useState, useEffect } from 'react';

import { Dropdown } from '@common/Dropdown';
import { Column, FiltersState } from '@table';

import cls from './Filters.module.scss';


type Props = {
  columns: Column[],
	onChange: (filtersState: FiltersState) => void,
};

export const Filters = ({ columns, onChange }: Props) => {
	const [filtersState, setFiltersState] = useState<FiltersState>({});

	useEffect(() => {
		const newState: FiltersState = {};
		columns.forEach(({ name, dataType }) => {
			switch (dataType) {
				case 'boolean': {
					newState[name] = {
						dataType: 'boolean',
						value: filtersState[name]?.value || false,
					};
					break;
				}
				default:
			}
		});

		setFiltersState(newState);
		onChange(newState);
	}, [columns]);

	const updateFilterField = (name: string, value: boolean) => {
		const newState = {
			...filtersState,
			[name]: {
				...filtersState[name],
				value
			}
		};

		setFiltersState(newState);
		onChange(newState);
	};

	return (
		<Dropdown triggerLabel="Filters" className={cls.dropdown}>
			<div>
				{ Object.keys(filtersState).map((name, index) => {
					const { dataType, value } = filtersState[name];

					return (
						<div key={name}>
							<div className={cls.section}>
								<h6>{name}</h6>

								{dataType === 'boolean' && (
									<div>
										<label>
											true
											<input
												type="radio"
												name={name}
												value="true"
												checked={value}
												onChange={() => updateFilterField(name, true)}
											/>
										</label>
										<label>
											false
											<input
												type="radio"
												name={name}
												value="false"
												checked={!value}
												onChange={() => updateFilterField(name, false)}
											/>
										</label>
									</div>
								)}
							</div>
							{index < columns.length - 1 && <hr/>}
						</div>
					);
				}) }
			</div>
		</Dropdown>
	);
};
