import React from 'react';
import {capitalize} from '../../utils/helpers/string';

export type ProductColorBoxPropTypes = {
  color: string
};

function ProductColorBox(props: ProductColorBoxPropTypes) {
  const {
    color
  } = props;
  return (
    <div className="px-2 py-2 border-b-4 text-center max-w-[10rem]"
      style={{
        borderColor: color,
      }}
    >
      {capitalize(color)}
    </div>
  );
}

ProductColorBox.defaultProps = {};

export default ProductColorBox;
