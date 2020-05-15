import React from 'react';
import { useRouter } from 'next/router';
import { withApollo } from '../../lib/apollo';
import Layout from '../../components/layout';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { withRedux } from '../../lib/redux';

const PRODUCT_QUERY =gql`
query getProduct($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
        items {
            name
            sku
            stock_status
            description {
                html
            }
            image {
                url
                label
            }
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
        }
    }
}
`

const Pdp = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { url_key } = router.query;
    const [qty, setQty] = useState();
	const pageConfig = {
		title: 'product ' + url_key
    }
    const {loading, data} = useQuery(PRODUCT_QUERY, {
        variables: {urlKey: url_key}
    });
    if(loading){
		return <div>Loading...</div>
    }
    const product = data.products.items[0];
    const productDescription = product.description.html;
    console.log(product);

    const handleChangeQty = (e) => {
        setQty(e.target.value);
    }

    const handleAddToCart = (e) => {
        e.preventDefault();
        console.log(qty);
        const item = {
            sku: product.sku,
            name: product.name,
            image: product.image.url,
            qty: qty,
            price: product.price_range.minimum_price.final_price,
        };

        dispatch({
            type: 'ADD_TO_CART',
            item,
        });
    }
    return (
        <Layout pageConfig={pageConfig}>
            <div className="product_media">
                <img src={product.image.url} alt={product.image.label} />
            </div>
            <div className="product_info">
                <div className="product_name"><h1>{product.name}</h1></div>
                <div className="product_sku_status">
                    <div className="product_sku">SKU: {product.sku}</div>
                    <div className="product_status">{product.stock_status == "IN_STOCK" ? (
                        <span>STATUS: IN STOCK</span>
                    ) : (<span>STATUS: OUT OF STOCK</span>)}</div>
                </div>
                <div className="price">
                    {product.price_range.minimum_price.final_price.value != product.price_range.minimum_price.regular_price.value ? (
                        <div className="regular_price">
                            <s>
                                {product.price_range.minimum_price.regular_price.currency} {product.price_range.minimum_price.regular_price.value}
                            </s>
                        </div>
                    ) : null}
                    <div className="final_price">
                        {product.price_range.minimum_price.final_price.currency} {product.price_range.minimum_price.final_price.value}
                    </div>
                </div>
                <div className="addto">
                    <form onSubmit={handleAddToCart}>
                        <input
                            type="number"
                            name="qty"
                            className="qty"
                            placeholder="Qty"
                            onChange={handleChangeQty}
                        />
                        <button type="submit">Add to Cart</button>
                    </form>
                </div>
                
                {productDescription != "" ? (
                    <div className="product_description">{productDescription}</div>
                ) : null}
            </div>
        </Layout>
    );
}

export default compose(withApollo, withRedux)(Pdp);