import React, { useState, useRef, useEffect, PropsWithChildren } from 'react';
import cx from 'classnames';

import cls from './Dropdown.module.scss';


type Props = {
  triggerLabel: string;
  className?: string;
};

export const Dropdown = ({ triggerLabel, className, children }: PropsWithChildren<Props>) => {
	const [isOpened, setOpened] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isOpened && containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setOpened(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [containerRef, isOpened]);

	return (
		<div className={cls.container} ref={containerRef}>
			<button onClick={() => setOpened(!isOpened)}>{triggerLabel}</button>
			{isOpened && (
				<div className={cx(cls.dropdown, className)}>
					{children}
				</div>
			)}
		</div>
	);
};
