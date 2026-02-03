import { Request, Response, NextFunction, RequestHandler } from 'express';
import type { ApiBody } from '@shared/models/common';
import type { ApiMessage } from '@shared/constants/apiMessage';
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

  //成功レスポンス (200 OK)
  protected ok<T>(
    res: Response<ApiBody<T>>,
    data: T,
    message: ApiMessage = APIMESSAGE.FETCH_SUCCESS,
  ) {
    return res.status(200).json({
      code: 'FETCH_SUCCESS',
      data,
      message,
    });
  }

  //作成レスポンス (201 Created)
  protected created<T>(
    res: Response<ApiBody<T>>,
    data: T,
    message: ApiMessage = APIMESSAGE.CREATE_SUCCESS,
  ) {
    return res.status(201).json({
      code: 'CREATE_SUCCESS',
      data,
      message,
    });
  }
}
