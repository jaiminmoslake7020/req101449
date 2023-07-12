export type ProductSizeType = 'small' | 'medium' | 'large';

export type Product = {
  productId?: string,
  productName: string,
  productDescription: string,
  productColour: string,
  productSize: ProductSizeType,
};

export type ProductKey = keyof Product;

export const ProductLabel = {
  productId: 'Product Id',
  productName: 'Name',
  productDescription: 'Description',
  productColour: 'Colour',
  productSize: 'Size',
} as Record<ProductKey, string>;

export const productSizeList = [{
  label: 'Small',
  value: 'small'
},
{
  label: 'Medium',
  value: 'medium'
},
{
  label: 'Large',
  value: 'large'
}] as {
  label: string,
  value: ProductSizeType
}[];

export const getProductSizeListLables = () => {
  const productSizeListLables = {} as Record<ProductSizeType, string>;
  productSizeList.forEach((m) => {
    productSizeListLables[m.value] = m.label
  });
  return productSizeListLables;
};
