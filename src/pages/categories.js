import React from 'react'
import Link from 'gatsby-link'
import Categories from '../components/Categories/Categories';

const CategoriesPage = ({data}) => {
	return (
		<div>
			<h3>Categories</h3>
			<Categories />
		</div>
	)
};

export default CategoriesPage;