import db from '../database/init';
import controllerError from '../utils/controllerError';

export async function countProductQueryResult(searchQuery: string) {
  try {
    return await db.one(`
      SELECT COUNT(*)
      FROM PRODUCTS
      WHERE PRODUCT_NAME %> $1
    `, [searchQuery]);  
  } catch (err: any) {
    controllerError(err);
  }
}

export async function countProductCategory(category: string) {
  try {
    return await db.one(`
      SELECT COUNT(*)
      FROM
        PRODUCTS JOIN CATEGORIES ON
        PRODUCTS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
      WHERE CATEGORY_NAME = $1
    `, [category]);
  } catch (err: any) {
    controllerError(err);
  }
}

export async function searchProductBySimilarity(searchQuery: string, limit: number, offset: number) {
  try {
    return await db.manyOrNone(`
      SELECT PRODUCT_ID, PRODUCT_NAME, PRODUCT_DESCRIPTION, PRODUCT_IMAGE, PRODUCT_PRICE
      FROM PRODUCTS
      WHERE PRODUCT_NAME %> $<searchQuery>
      ORDER BY PRODUCT_NAME <-> $<searchQuery>
      LIMIT $<limit>
      OFFSET $<offset>
    `, { searchQuery, limit, offset });
  } catch (err: any) {
    controllerError(err);
  }
}

export async function searchProductByCategory(category: string, limit: number, offset: number) {
  try {
    return await db.manyOrNone(`
      SELECT PRODUCT_ID, PRODUCT_NAME, PRODUCT_DESCRIPTION, PRODUCT_IMAGE, PRODUCT_PRICE
      FROM
        PRODUCTS JOIN CATEGORIES ON
        PRODUCTS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
      WHERE CATEGORY_NAME = $<category>
      LIMIT $<limit>
      OFFSET $<offset>
    `, { category, limit, offset});
  } catch (err: any) {
    controllerError(err);
  }
}