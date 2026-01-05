import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from '../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.startsWith('http://') || req.url.startsWith('https://')) {
    return next(req);
  }

  const baseUrl = environment.apiBaseUrl.replace(/\/$/, '');
  const url = req.url.startsWith('/') ? req.url : `/${req.url}`;

  return next(
    req.clone({
      url: `${baseUrl}${url}`,
    })
  );
};
