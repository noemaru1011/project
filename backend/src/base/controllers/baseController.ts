import { Request, Response, NextFunction, RequestHandler } from 'express';
import type { ApiBody } from '@shared/models/common';
import type { ApiMessage, ApiMessageCode } from '@shared/constants/apiMessage';
import { APIMESSAGE } from '@shared/constants/apiMessage';

export abstract class BaseController {
  // 汎用ハンドラ
  asyncHandler = <T>(
    fn: (req: Request, res: Response<ApiBody<T>>, next: NextFunction) => Promise<any>,
  ): RequestHandler => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res as Response<ApiBody<T>>, next)).catch(next);
    };
  };

  // 取得成功 (200)
  protected ok<T>(
    res: Response<ApiBody<T>>,
    data: T,
    message: ApiMessage = APIMESSAGE.FETCH_SUCCESS,
    code: ApiMessageCode = 'FETCH_SUCCESS',
  ) {
    return res.status(200).json({
      code,
      data,
      message,
    });
  }

  // 作成成功 (201)
  protected created<T>(
    res: Response<ApiBody<T>>,
    data: T,
    message: ApiMessage = APIMESSAGE.CREATE_SUCCESS,
  ) {
    return res.status(201).json({ code: 'CREATE_SUCCESS', data, message });
  }

  // 更新成功 (200)
  protected updated<T>(
    res: Response<ApiBody<T>>,
    data: T,
    message: ApiMessage = APIMESSAGE.UPDATE_SUCCESS,
  ) {
    return res.status(200).json({ code: 'UPDATE_SUCCESS', data, message });
  }

  // 削除成功 (204) - データは返さない
  protected deleted(res: Response) {
    return res.status(204).send();
  }
}
