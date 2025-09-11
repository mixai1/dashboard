import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { API_HOST_URL } from 'src/app/app.config';

export abstract class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiHostUrl = inject(API_HOST_URL);
  protected apiRelativePath = 'api';
  protected abstract endpoint: string;

  protected httpGet<TResponse>(url: string, ctor: (value: any) => TResponse): Observable<any> {
    return this.http
      .get<TResponse>(`${this.apiHostUrl}/${this.apiRelativePath}/${this.endpoint}/${url}`, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<TResponse>) => this.mapType<TResponse>(res, ctor)),
        catchError((error: HttpErrorResponse) => throwError(() => error))
      );
  }

  private mapType<T>(res: HttpResponse<T>, ctor: (value: any) => T): any {
    const val: any = res.status === 204 ? null : res.body;
    if (val === null) {
      return null;
    }

    if (val === '[]') {
      return [];
    }

    if (Array.isArray(val)) {
      return val.map((x) => ctor(x));
    }

    return ctor(val);
  }
}
