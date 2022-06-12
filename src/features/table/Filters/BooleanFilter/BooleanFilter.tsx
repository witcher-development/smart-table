import React from 'react';


type Props = {
  filterName: string,
  currentValue: boolean,
  updateValue: (value: boolean) => void,
}

export const BooleanFilter = ({
	filterName,
	currentValue,
	updateValue
}: Props) => (
	<div>
		<label>
			true
			<input
				type="radio"
				name={filterName}
				value="true"
				checked={currentValue}
				onChange={() => updateValue(true)}
			/>
		</label>
		<label>
			false
			<input
				type="radio"
				name={filterName}
				value="false"
				checked={!currentValue}
				onChange={() => updateValue(false)}
			/>
		</label>
	</div>
);