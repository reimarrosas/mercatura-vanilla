import db from '../database/init';
import controllerError from '../utils/controllerError';

export async function searchCommentsByProductID(id: number, limit: number, offset: number) {
  try {
    return await db.manyOrNone(`
      SELECT COMMENT_ID, COMMENT_CONTENT, COMMENT_LIKES, COMMENT_DISLIKES, USER_NAME
      FROM COMMENTS JOIN USERS ON COMMENTS.USER_ID = USERS.USER_ID
      WHERE PRODUCT_ID = $<id>
      ORDER BY UPDATED_AT
      LIMIT $<limit>
      OFFSET $<offset>;
    `, { id, limit, offset });
  } catch (err: any) {
    controllerError(err);
  }
}

export async function updateCommentLikeOrDislike(id: number, sentiment: string) {
  try {
    await db.none(`
      UPDATE COMMENTS
      SET $<sentiment>^ = $<sentiment>^ + 1
      WHERE COMMENT_ID = $<id>;
    `, { id, sentiment });
  } catch (err: any) {
    controllerError(err);
  }
}

export async function updateCommentContent(id: number, content: string) {
  try {
    await db.none(`
      UPDATE COMMENTS
      SET COMMENT_CONTENT = $<content>
      WHERE COMMENT_ID = $<id>;
    `, { id, content });
  } catch (err: any) {
    controllerError(err);
  }
}

export async function addComment(userId: number, productId: number, content: string) {
  try {
    await db.none(`
      INSERT INTO COMMENTS (USER_ID, PRODUCT_ID, COMMENT_CONTENT)
      VALUE ($<userId>, $<productId>, $<content>);
    `, { userId, productId, content });
  } catch (err: any) {
    controllerError(err);
  }
}