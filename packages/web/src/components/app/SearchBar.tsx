import React, {useCallback} from 'react';
import {TextField} from '@mui/material';
import {useAppSelector} from '../../redux/store';
import {Product} from '../../types/app';

export type SearchBarPropTypes = {
  setFilteredProducts: Function,
};

function SearchBar(props: SearchBarPropTypes) {
  const {
    setFilteredProducts
  } = props;
  const {
    products
  } = useAppSelector((store) => store.productsData);

  const applySearch = useCallback((search: string | unknown) => {
    let newItems = products as Product[];
    if (search && search !== '' && typeof search === 'string') {
      const searchLowerCase = (search || '').toLowerCase();
      newItems = products.filter((item: Product) => {
        const {
          productName, productSize, productColour, productId
        } = item;
        const hasId = (productId || '').toLowerCase().indexOf(searchLowerCase) !== -1;
        const hasName = (productName || '').toLowerCase().indexOf(searchLowerCase) !== -1;
        const hasSize = (productSize || '').toLowerCase().indexOf(searchLowerCase) !== -1;
        const hasColor = (productColour || '').toLowerCase().indexOf(searchLowerCase) !== -1;
        return hasId || hasName || hasSize || hasColor;
      });
    }
    return newItems;
  }, [products]);

  return (
    <div className="my-4">
      <TextField
        label="Search Product by Product Id, Name, Color, Size"
        name="search"
        onChange={(e) => {
          const search = e.target.value;
          setFilteredProducts(applySearch(search));
        }}
        fullWidth
        required
      />
    </div>
  );
}

SearchBar.defaultProps = {};

export default SearchBar;
