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
						isApplied: filtersState[name]?.isApplied || false,
						dataType: 'boolean',
						value: filtersState[name]?.value || false,
					};
					break;
				}
				default:
			}
		});

		setFiltersState(newState);
		submitNewFilterState(newState);
	}, [columns]);

	const changeFilterStatus = (name: string, isApplied: boolean) => {
		const newState: FiltersState = {
			...filtersState,
			[name]: {
				...filtersState[name],
				isApplied,
			}
		};

		setFiltersState(newState);
		submitNewFilterState(newState);
	};

	const updateFilterValue = (name: string, value: boolean) => {
		const newState: FiltersState = {
			...filtersState,
			[name]: {
				...filtersState[name],
				value
			}
		};

		setFiltersState(newState);
		submitNewFilterState(newState);
	};

	const submitNewFilterState = (newState: FiltersState) => {
		const onlyAppliedFilters: FiltersState = {};
		Object.keys(newState).forEach((name) => {
			if (newState[name].isApplied) {
				onlyAppliedFilters[name] = newState[name];
			}
		});
		onChange(onlyAppliedFilters);
	};

	return (
		<Dropdown triggerLabel="Filters" className={cls.dropdown}>
			<div>
				{ Object.keys(filtersState).map((name, index) => {
					const { dataType, value, isApplied } = filtersState[name];

					return (
						<div key={name}>
							<div className={cls.section}>
								<h6>
									<label>
										{name}
										<input
											type="checkbox"
											checked={isApplied}
											onChange={() => changeFilterStatus(name, !isApplied)}
										/>
									</label>
								</h6>

								{isApplied && dataType === 'boolean' && (
									<div>
										<label>
											true
											<input
												type="radio"
												name={name}
												value="true"
												checked={value}
												onChange={() => updateFilterValue(name, true)}
											/>
										</label>
										<label>
											false
											<input
												type="radio"
												name={name}
												value="false"
												checked={!value}
												onChange={() => updateFilterValue(name, false)}
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
