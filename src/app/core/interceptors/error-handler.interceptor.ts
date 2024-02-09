import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {MainService} from "../services/main.service";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private mainService: MainService,
    private toast: ToastrService,
  ) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        this.handleHttpError(err, request);
        return throwError(err);
      })
    )
  }

  handleHttpError(error: HttpErrorResponse, request: any) {
    let message: any
    console.log(error)
    if (error?.error?.message != null || error?.error?.errors != null) {
      message = error.error.message?error.error.message:error.error.errors;
      if (typeof message !== 'string') {
        message.forEach((item: string) => {
          this.toast.error(item)
        })
      } else {
        this.toast.error(message)
      }
    }

    if (error.status === 401)
      this.mainService.logout()
  }
}
