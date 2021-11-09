import db from '../database/init';
import controllerError from '../utils/controllerError';

export async function searchCategories() {
  let queryResult;

  try {
    queryResult = await db.many(`
      SELECT CATEGORY_NAME, CATEGORY_DESCRIPTION, CATEGORY_IMAGE
      FROM CATEGORIES;
    `);
  } catch (err: any) {
    controllerError(err);
  }

  return queryResult;
}