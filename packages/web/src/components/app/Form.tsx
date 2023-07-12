import * as React from 'react';
import {useCallback, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link, useNavigate} from 'react-router-dom';
import {TextField} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {
  productSizeList, ProductSizeType, Product, ProductLabel
} from '../../types/app';
import {ErrorType, FailedResponseType, SuccessResponseType} from '../../types/base';
import {addNotification} from '../../redux/reducers/feedback';
import {addNewErrorMsgWithTitle, addNewSuccessMsgWithTitle} from '../../utils/helpers/feedback';
import {useAppDispatch} from '../../redux/store';
import validateForm from '../../utils/helpers/validateForm';
import {upsertProduct} from '../../services/api';
import {addProduct, updateProduct} from '../../redux/reducers/productsData';
import ColourInput from '../base/ColourInput';

export type FormProps = {
  product:Product | undefined
};

export default function Form(props:FormProps) {
  const bcGovUrl = 'https://github.com/bcgov/';
  const {
    product
  } = props;
  const isCreate = !product;

  const navigate = useNavigate();
  const {
    productId, productName, webProductId,
    productSize, productColour, productDescription
  } = product || {};

  const [inputProductWedId, setInputProductWebId] = useState<number>(webProductId || 1);
  const [inputProductName, setInputProductName] = useState<string>(productName || '');
  const [inputProductColor, setInputProductColor] = useState<string>(productColour || '');
  const [inputProductDescription, setInputProductDescription] = useState<string>(productDescription || '');
  const [inputProductSize, setInputProductSize] = useState<ProductSizeType>(productSize || productSizeList[0].value);

  const dispatch = useAppDispatch();

  const upsertProductFunction = useCallback((id:string | undefined, body:Product) => {
    upsertProduct(body, id).then((r:SuccessResponseType | FailedResponseType) => {
      const { isSuccess, response: data, error } = r;
      if (isSuccess) {
        if (isCreate) {
          dispatch(addProduct(data));
          navigate(`/view/${data.productId}`);
          dispatch(addNotification(addNewSuccessMsgWithTitle('Product Created', `A new product "${data.productName}" has been added.`)));
        } else {
          dispatch(updateProduct(data));
          navigate(`/view/${data.productId}`);
          dispatch(addNotification(addNewSuccessMsgWithTitle('Product Updated', `"${data.productName}" has been updated.`)));
        }
      } else if (error && error.id) {
        dispatch(addNotification(error));
      } else {
        const eTwo = addNewErrorMsgWithTitle();
        dispatch(addNotification(eTwo));
      }
    });
  }, [navigate])

  const upsertProductFunctionValidateAndSubmit = useCallback(() => {
    const body = {
      productName: inputProductName,
      productSize: inputProductSize,
      productDescription: inputProductDescription,
      productColour: inputProductColor,
      webProductId: inputProductWedId,
    };
    const validation = validateForm(body);
    const {
      isSuccess, response: data, errorList
    } = validation;
    if (isSuccess) {
      console.log('data', data);
      upsertProductFunction(productId, data as Product);
    } else if ((errorList || []).length > 0) {
      errorList.forEach((e:ErrorType) => {
        dispatch(addNotification(e));
      });
    } else {
      dispatch(addNotification(addNewErrorMsgWithTitle('Validation', 'Error while doing validation.')));
    }
  }, [
    inputProductName,
    inputProductColor,
    inputProductSize,
    inputProductDescription,
    productId, isCreate,
    upsertProductFunction,
    inputProductWedId
  ]);

  // @ts-ignore
  return (
    <TableContainer className="form-table" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="product list table">
        <TableBody>
          {
            productId
              ? (
                <TableRow>
                  <TableCell component="th">{ProductLabel.productId}</TableCell>
                  <TableCell scope="row">
                    <Link className="btn btn-link" to={`/view/${productId}`} >
                      {productId}
                    </Link>
                  </TableCell>
                </TableRow>
              ) : null
          }
          <TableRow

          >
            <TableCell component="th">{ProductLabel.webProductId}</TableCell>
            <TableCell scope="row" >
              <TextField
                label={ProductLabel.webProductId}
                name="webProductId"
                value={inputProductWedId}
                type="number"
                inputMode="numeric"
                onChange={(e) => {
                  setInputProductWebId(Number(e.target.value));
                }}
                fullWidth
                required
              />
            </TableCell>
          </TableRow>
          <TableRow

          >
            <TableCell component="th">{ProductLabel.productName}</TableCell>
            <TableCell scope="row" >
              <TextField
                label={ProductLabel.productName}
                name="productName"
                value={inputProductName}
                onChange={(e) => {
                  setInputProductName(e.target.value);
                }}
                fullWidth
                required
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th">{ProductLabel.productDescription}</TableCell>
            <TableCell scope="row">
              <TextField
                label={ProductLabel.productDescription}
                name="productDescription"
                value={inputProductDescription}
                multiline
                rows={2}
                onChange={(e) => {
                  setInputProductDescription(e.target.value);
                }}
                fullWidth
                required
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th">{ProductLabel.productSize}</TableCell>
            <TableCell scope="row">
              <FormControl fullWidth>
                <InputLabel id="select-label">{ProductLabel.productSize}</InputLabel>
                <Select
                  labelId="select-label"
                  id="productSize"
                  value={inputProductSize}
                  label={ProductLabel.productSize}
                  onChange={(e:SelectChangeEvent) => {
                    setInputProductSize(e.target.value as ProductSizeType);
                  }}
                >
                  {
                    productSizeList.map((m:{label: string, value: ProductSizeType}) => {
                      return <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow

          >
            <TableCell component="th">{ProductLabel.productColour}</TableCell>
            <TableCell scope="row">
              <FormControl >
                <ColourInput
                  value={inputProductColor || 'red'}
                  setValue={(v:string) => {
                    setInputProductColor(v);
                  }} />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell component="td" />
            <TableCell component="td" >
              <div className="w-full flex justify-end item-centere">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    upsertProductFunctionValidateAndSubmit();
                  }}
                >
                  {isCreate ? 'Create New Product' : 'Update'}
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
