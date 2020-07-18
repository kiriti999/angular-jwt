import { Injectable, ErrorHandler } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
    constructor() {}

    handleError(error: HttpErrorResponse): any {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            if (error.error) {
                errorMessage = `Error Code: ${error.status}\nName: ${error.error.name}\nMessage: ${error.error.message}`;
            } else {
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
        }

        console.log(errorMessage);

        return throwError(errorMessage);
    }
}

// OPTION 2

// export class GlobalErrorHandler implements HttpInterceptor {
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(request).pipe(
//             catchError((error: HttpErrorResponse) => {
//                 let errMsg = '';
//                 // Client Side Error
//                 if (error.error instanceof ErrorEvent) {
//                     errMsg = `Error: ${error.error.message}`;
//                 } else {
//                     // Server Side Error
//                     errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
//                 }
//                 // return an observable
//                 return throwError(errMsg);
//             })
//         );
//     }
// }
