import React, { useState } from 'react';
import cx from 'classnames';

import { PaginationConfig } from '@table';

import cls from './Pagination.module.scss';


type Props = {
  paginationConfig: PaginationConfig
};

export const Pagination = ({ paginationConfig }: Props) => {
	const [currentPage, setCurrentPage] = useState(1);

	const onClickPagination = (page: number) => {
		setCurrentPage(page);
		paginationConfig.onPaginate(page);
	};

	const getPagesToRender = () => {
		const onLeft =
      currentPage < 2
      	? []
      	: Array(currentPage - 1)
      		.fill(0).map((_, index) => index + 1);
		const onRight =
      currentPage < paginationConfig.numberOfPages
      	? Array(paginationConfig.numberOfPages - currentPage)
      		.fill(0).map((_, index) => currentPage + index + 1)
      	: [];

		const visiblePagesOnSidesNumber = paginationConfig.visiblePagesOnSidesNumber || 3;

		return {
			onLeft: onLeft.slice(-visiblePagesOnSidesNumber),
			current: currentPage,
			onRight: onRight.slice(0, visiblePagesOnSidesNumber)
		};
	};

	const pages = getPagesToRender();

	return (
		<nav>
			<ul className={cls.pagination}>
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
			</ul>
		</nav>
	);
};
