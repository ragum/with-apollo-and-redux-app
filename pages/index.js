import React from 'react';
import Layout from '../components/layout';
import gql from 'graphql-tag';
import {withApollo} from '../lib/apollo';
import {useQuery} from '@apollo/react-hooks';
import Link from 'next/link';

const CATEGORY_QUERY=gql`
	{
		categoryList {
			id
			name
			children {
				id
				name
				children {
					id
					name
					children {
						id
						name
					}
				}
			}
		}
  	}
`
const Index = () => {
	const pageConfig = {
		title: 'Homepage'
	}
	const {loading, data} = useQuery(CATEGORY_QUERY);

	if(loading){
		return <div>Loading...</div>
	}

	const categories = data.categoryList[0].children;
  return (
    <div>
		<Layout pageConfig={pageConfig}>
			<div>
				<h1>Homepage</h1>
				<p>Aliqua adipisicing aute Lorem irure commodo commodo et tempor duis ut incididunt irure nisi laborum.</p>
				<p>Qui sint nisi et dolore irure quis. Sit aliqua aute veniam magna exercitation amet mollit. </p>	
				<p>Duis irure commodo mollit velit officia est consectetur enim mollit ut consectetur pariatur nostrud.</p>
			</div>

			<div className="category-list">
				<ul>
					{categories.map((catLvl1)=> (
						<li key={catLvl1.id}>
							<Link href="category/[id]" as={`category/${catLvl1.id}`}>
								<a>{catLvl1.name}</a>
							</Link>
							<ul>
							{catLvl1.children.map((catLvl2)=> (
								<li key={catLvl2.id}>
									<Link href="category/[id]" as={`category/${catLvl2.id}`}>
										<a>{catLvl2.name}</a>
									</Link>
									<ul>
									{catLvl2.children.map((catLvl3)=> (
										<li key={catLvl3.id}>
											<Link href="category/[id]" as={`category/${catLvl3.id}`}>
												<a>{catLvl3.name}</a>
											</Link>
										</li>
									))}
									</ul>
								</li>
							))}
							</ul>
						</li>
					))}
				</ul>
			</div>
		</Layout>
	</div>
  )
}

export default (withApollo)(Index);
