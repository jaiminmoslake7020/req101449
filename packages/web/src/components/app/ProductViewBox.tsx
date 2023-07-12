import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import {Alert} from '@mui/material';
import {Product, ProductLabel} from '../../types/app';
import ProductColorBox from './ProductColorBox';

export type ProductViewBoxProps = {
  product:Product
};

export default function ProductViewBox(props:ProductViewBoxProps) {
  const {
    product
  } = props;

  const {
    productId, productName,
    productDescription, productSize, productColour,
  } = product;

  // @ts-ignore
  return (
    product
      ? (
        <TableContainer className="product-view-table" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="product list table">
            <TableBody>
              <TableRow

              >
                <TableCell component="th">{ProductLabel.productId}</TableCell>
                <TableCell scope="row">
                  <Link className="btn btn-link" to={`/view/${productId}`} >
                    {productId}
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow

              >
                <TableCell component="th">{ProductLabel.productName}</TableCell>
                <TableCell scope="row">
                  <Link className="btn btn-link" to={`/view/${productId}`} >
                    {
                      productName
                    }
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow

              >
                <TableCell component="th">{ProductLabel.productDescription}</TableCell>
                <TableCell scope="row">
                  {productDescription}
                </TableCell>
              </TableRow>
              <TableRow

              >
                <TableCell component="th">{ProductLabel.productSize}</TableCell>
                <TableCell scope="row">
                  {productSize}
                </TableCell>
              </TableRow>
              <TableRow

              >
                <TableCell component="th">{ProductLabel.productColour}</TableCell>
                <TableCell scope="row">
                  <ProductColorBox color={productColour}/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : <Alert className="mt-4" severity="info" >There is no product with this ID.</Alert>
  )
}
