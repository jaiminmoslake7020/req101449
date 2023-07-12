import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *        - productName
 *        - productDescription
 *        - productColour
 *        - productSize
 *       properties:
 *         productId:
 *           type: string
 *         productDescription:
 *           type: string
 *         productColour:
 *           type: string
 *         productSize:
 *           type: string
 *         productName:
 *           type: string
 */

const payload = {
  body: object({
    productName: string({
      required_error: "Product Name is required",
    }),
    productDescription: string({
      required_error: "Product Description is required",
    }),
    productColour: string({
      required_error: "Product Colour Name is required",
    }),
    productSize: string({
      required_error: "Product Size is required",
    }),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: "id is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
