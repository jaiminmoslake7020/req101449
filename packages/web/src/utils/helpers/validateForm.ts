import {coreFailedResponse, coreSuccessResponse} from './api';
import {addNewErrorMsgWithTitle} from './feedback';
import {ErrorType, FailedResponseType, SuccessResponseType} from '../../types/base';
import {getProductSizeListLables, Product, productSizeList} from '../../types/app';

export function isValidUrl(string:string) {
  try {
    // eslint-disable-next-line no-new
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export default function validateForm(body:Product | undefined): FailedResponseType | SuccessResponseType {
  const success = { ...coreSuccessResponse, response: body };
  const e = addNewErrorMsgWithTitle('Form Validation', 'Form has errors!');
  if (body) {
    const errorList = [] as ErrorType[];
    console.log(body);
    const {
      productName, productDescription, productSize, productColour, webProductId
    } = body || {};
    if (!webProductId || Number.isNaN(webProductId)) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Product Id must not be empty.'));
    }
    if (!productName) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Product Name must not be empty.'));
    }
    if (!productDescription) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Product Description must not be empty.'));
    }
    if (!productColour) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Product Color must not be empty.'));
    }
    if (!Object.keys(getProductSizeListLables()).includes(productSize)) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Product Size must be from selection list.'));
    }
    if (errorList.length === 0) {
      return success;
    }
    return {...coreFailedResponse, error: e, errorList};
  }
  return {...coreFailedResponse, error: e, errorList: [e]};
}
