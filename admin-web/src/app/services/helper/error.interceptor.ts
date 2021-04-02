import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
// import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                localStorage.removeItem('token');
                location.reload(true);
            }
            const errorMsg  = err.error ? err.error : '';
            this.toastr.error(errorMsg);
            // err.errorMsg = err.error.error || err.error.message || err.statusText;
            return throwError(err);
        }));
    }
}
