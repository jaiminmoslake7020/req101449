import React from 'react';
import {useParams} from 'react-router-dom';
import {Alert} from '@mui/material';
import ProductUpdateBox from '../components/app/ProductUpdateBox';
import {useAppSelector} from '../redux/store';
import {Product} from '../types/app';
import Header from '../components/app/Header';

export type HomePropTypes = {

};

function View(props: HomePropTypes) {
  const params = useParams();
  const { id } = params;

  const {
    products
  } = useAppSelector((store) => store.productsData);

  const productArray = products.filter((p:Product) => p.productId === id);
  const product = productArray.length === 1 ? productArray[0] : undefined;
  return (
    <>
      <Header product={product} />
      <h1 className="my-2">Update Product</h1>
      {product ? <ProductUpdateBox product={product}/> : <Alert className="mt-4" severity="info" >There is no product with this ID.</Alert> }
    </>
  );
}

View.defaultProps = {};

export default View;
