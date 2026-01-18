import { describe, it, expect, vi } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { csrfMiddleware } from './csrfMiddleware';
import { CsrfError } from '@/errors/csrfError';

describe('csrfMiddleware', () => {
  const res = {} as Response;

  it('SAFE_METHODS は常に通過する', () => {
    // Arrange
    const req = {
      method: 'GET',
    } as Partial<Request>;

    const next: NextFunction = vi.fn();

    // Act
    csrfMiddleware(req as Request, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith();
  });

  it('cookie と header が一致していれば通過する', () => {
    const req = {
      method: 'POST',
      cookies: { csrf: 'token123' },
      headers: { 'x-csrf-token': 'token123' },
    } as Partial<Request>;

    const next: NextFunction = vi.fn();

    csrfMiddleware(req as Request, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('cookie がない場合は CsrfError', () => {
    const req = {
      method: 'POST',
      headers: { 'x-csrf-token': 'token123' },
    } as Partial<Request>;

    const next: NextFunction = vi.fn();

    csrfMiddleware(req as Request, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(CsrfError));
  });

  it('header がない場合は CsrfError', () => {
    const req = {
      method: 'POST',
      cookies: { csrf: 'token123' },
      headers: {},
    } as Partial<Request>;

    const next: NextFunction = vi.fn();

    csrfMiddleware(req as Request, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(CsrfError));
  });

  it('token が一致しない場合は CsrfError', () => {
    const req = {
      method: 'POST',
      cookies: { csrf: 'token123' },
      headers: { 'x-csrf-token': 'different' },
    } as Partial<Request>;

    const next: NextFunction = vi.fn();

    csrfMiddleware(req as Request, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(CsrfError));
  });
});
