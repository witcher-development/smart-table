import React from 'react';


type Props = {
  filterName: string,
  currentValue: string[],
  updateValue: (value: boolean) => void,
	possibleValues: string[]
}

export const StringFilter = ({
	filterName,
	currentValue,
	updateValue,
	possibleValues
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