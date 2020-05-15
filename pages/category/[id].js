import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {withApollo} from '../../lib/apollo';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';

const CATEGORY =gql`
    query product($id: String!){
		categoryList (filters: {ids: {eq: $id}}){
            id
            name
            image_path
            description
			products {
                items {
                    id
                    name
                    sku
                    url_key
                    price_range {
                        minimum_price {
                          regular_price {
                            currency
                            value
                          }
                          final_price {
                            currency
                            value
                          }
                        }
                      }
                    small_image {
                        url
                        label
                    }
                }
            }
		}
  	}
`

const Category = () => {
    const router = useRouter();
    const { id } = router.query;
	const pageConfig = {
		title: 'Category ' + id
    }

    const {loading, data} = useQuery(CATEGORY, {
        variables: {id: id}
    });
    
	if(loading){
		return <div>Loading...</div>
    }
    
    const categoryDetail = data.categoryList[0];
    console.log(categoryDetail);

    const description = categoryDetail.description;
    const itemProduct = categoryDetail.products.items;

    return (
        <Layout pageConfig={pageConfig}>
            id: {id}
            <div className="category_info">
				<h1 className="title">{categoryDetail.name}</h1>
                <div className="category_image"><img src={categoryDetail.image_path}/></div>
                <div className="category_description">{ ReactHtmlParser(description) }</div>
			</div>
            <div className="product_list">
            {itemProduct.map((items)=> (
                <div className="product_item" key={items.id}>
                    <div className="product_image"><img src={items.small_image.url} alt={items.small_image.label}/></div>
                    <div className="product_info">
                        <div className="product_name">
                        <Link href="/product/[url_key]" as={`/product/${items.url_key}`}>
                            <a>{items.name}</a>
                        </Link>
                        </div>
                        <div className="price">
                            {items.price_range.minimum_price.final_price.value != items.price_range.minimum_price.regular_price.value ? (
                                <div className="regular_price">
                                    <s>
                                        {items.price_range.minimum_price.regular_price.currency} {items.price_range.minimum_price.regular_price.value}
                                    </s>
                                </div>
                            ) : null}
                            <div className="final_price">
                                {items.price_range.minimum_price.final_price.currency} {items.price_range.minimum_price.final_price.value}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </Layout>
    );
}

export default (withApollo)(Category);
