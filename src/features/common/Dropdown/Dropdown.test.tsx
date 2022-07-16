import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { Dropdown } from './Dropdown';


describe('Dropdown', () => {
	test('renders children and opens dropdown after click on button', () => {
		const buttonText = 'open dropdown';
		const contentText = 'test content';

		render(<Dropdown triggerLabel={buttonText}>
			<p>{contentText}</p>
		</Dropdown>);

		expect(screen.queryByText(contentText)).not.toBeInTheDocument();
		fireEvent.click(screen.getByText(buttonText));
		expect(screen.queryByText(contentText)).toBeInTheDocument();
	});

	test('renders children and opens dropdown after click on button', () => {
		const wrapperId = 'wrapper';
		const buttonText = 'open dropdown';
		const contentText = 'test content';

		render(<div data-testid={wrapperId}>
			<Dropdown triggerLabel={buttonText}>
				<p>{contentText}</p>
			</Dropdown>
		</div>);

		expect(screen.queryByText(contentText)).not.toBeInTheDocument();
		fireEvent.click(screen.getByText(buttonText));
		expect(screen.queryByText(contentText)).toBeInTheDocument();
		fireEvent.click(screen.getByTestId(wrapperId));
		expect(screen.queryByText(contentText)).not.toBeInTheDocument();
	});
});
