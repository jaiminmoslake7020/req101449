import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Product} from '../../types/app';

export type LinksPropTypes = {
  product: Product | undefined
};

function Header(props: LinksPropTypes) {
  const {
    product
  } = props;

  const p = useLocation();
  const isUpdate = p.pathname.indexOf('update/') !== -1;
  const isRemove = p.pathname.indexOf('remove/') !== -1;
  const isCreate = p.pathname.indexOf('create') !== -1;

  return (
    <div>
      <div className="btn-row mb-4 all-apart">
        <Link className="header" to="/">Home</Link>
      </div>
      {
        product
          ? (
            <div className="btn-row all-end">
              <Link className="btn btn-blue" to="/create">Create New Product</Link>
              {
                !isUpdate ? (
                  <Link className="btn btn-blue" to={`/update/${product.productId}`}>
                    Edit
                  </Link>
                ) : null
              }
              {
                !isRemove ? (
                  <Link className="btn btn-red" to={`/remove/${product.productId}`}>Delete</Link>
                ) : null
              }
            </div>
          )
          : (
            <>
              { !isCreate ? (
                <div className="btn-row all-end">
                  <Link className="btn btn-blue" to="/create">Create New Product</Link>
                </div>
              ) : null}
            </>
          )
      }
    </div>
  );
}

Header.defaultProps = {};

export default Header;
