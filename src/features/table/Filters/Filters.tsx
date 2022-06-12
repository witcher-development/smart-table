import React, { useEffect, useState } from 'react';

import { Dropdown } from '@common/Dropdown';
import {
	Column,
	ColumnDataType,
	FilterFieldTypes,
	FilterValueTypes,
	FiltersState,
	getTypedBooleanFilterValue, getTypedStringFilterValue, getTypedNumberFilterValue
} from '@table';

import { BooleanFilter } from './BooleanFilter';
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
				case ColumnDataType.Boolean: {
					if (!filtersState[name] || filtersState[name].dataType !== ColumnDataType.Boolean) {
						newState[name] = {
							isApplied: false,
							dataType: ColumnDataType.Boolean,
							value: false
						};
					} else {
						newState[name] = {
							isApplied: filtersState[name].isApplied,
							dataType: ColumnDataType.Boolean,
							value: filtersState[name].value as boolean,
						};
					}
					break;
				}
				default:
			}
		});

		setFiltersState(newState);
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
	};

	const updateFilterValue = (name: string, value: FilterValueTypes) => {
		if (!filtersState[name]) throw Error();

		const getStateWithUpdatedField = (value: FilterFieldTypes): FiltersState => (
			{
				...filtersState,
				[name]: {
					isApplied: true,
					...value
				}
			}
		);

		let newState: FiltersState;

		switch (filtersState[name].dataType) {
			case ColumnDataType.Boolean: {
				newState = getStateWithUpdatedField({
					dataType: ColumnDataType.Boolean,
					value: getTypedBooleanFilterValue(value)
				});
				break;
			}
			case ColumnDataType.String: {
				newState = getStateWithUpdatedField({
					dataType: ColumnDataType.String,
					value: getTypedStringFilterValue(value)
				});
				break;
			}
			case ColumnDataType.Number: {
				newState = getStateWithUpdatedField({
					dataType: ColumnDataType.Number,
					value: getTypedNumberFilterValue(value)
				});
				break;
			}
			default: throw Error;
		}

		setFiltersState(newState);
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

	useEffect(() => {
		submitNewFilterState(filtersState);
	}, [filtersState]);

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
									<BooleanFilter
										filterName={name}
										currentValue={value}
										updateValue={(value) => updateFilterValue(name, value)}
									/>
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
