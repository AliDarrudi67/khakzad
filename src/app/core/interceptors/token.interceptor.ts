import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse,} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {MainService} from "../services/main.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private toast: ToastrService,
    private mainService: MainService
  ) {
  }

  clonedRequest!: HttpRequest<any>;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // this.spinner.show().then()

    this.clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')!}`,
        'Accept-Language': 'fa',
      },
    });
    return next.handle(this.clonedRequest).pipe(
      tap((event) => {
        if (request.method !== 'GET') {
          if (event instanceof HttpResponse && event.status === 200) {
            const result = event.body as any
            if (result.status === 200)
              this.toast.success(result?.message ? result?.message : 'عملیات با موفقیت انجام شد.');
            else if (result.status === 401)
              this.mainService.logout()
            else
              this.toast.error(result?.message ? result?.message : 'عملیات انجام نشد.');

          }
        }
      })
    )
  }
}
