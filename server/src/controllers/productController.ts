import pg from 'pg-promise';
import db from '../database/init';
import controllerError from '../utils/controllerError';

export async function countProductQueryResult(searchQuery: string) {
  let res: { count: string } = {
    count: ""
  };
  
  try {
    res = await db.one(`
      SELECT COUNT(*)
      FROM PRODUCTS
      WHERE PRODUCT_NAME %> $1
    `, [searchQuery]);  
  } catch (err: any) {
    controllerError(err);
  }

  return res;
}

export async function searchProductBySimilarity(searchQuery: string, limit: number, offset: number) {
  let res;
  try {
    res = await db.manyOrNone(`
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

  return res;
} 