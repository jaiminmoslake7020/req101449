import React from 'react';
import {getProductSizeListLables, ProductSizeType} from '../../types/app';

export type ProductLabelBoxPropTypes = {
  size: ProductSizeType
};

function ProductLabelBox(props: ProductLabelBoxPropTypes) {
  const {
    size
  } = props;
  const productSizeLablesObj = getProductSizeListLables();

  return (
    <p className="font-semibold">{productSizeLablesObj[size] as string}</p>
  );
}

ProductLabelBox.defaultProps = {};

export default ProductLabelBox;
