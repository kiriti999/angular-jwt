import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
    constructor() {}

    handleError(error: Error): any {
        const err = {
            message: error.message ? error.message : error.toString(),
            stack: error.stack ? error.stack : ''
        };
        console.log(err);
        // IMPORTANT: Rethrow the error otherwise it gets swallowed
        // throw error;
    }
}
