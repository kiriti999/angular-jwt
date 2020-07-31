import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { GlobalErrorHandler } from '../error-handling/error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    API_URL = environment.API_URL;
    currentUser = {};

    constructor(private httpClient: HttpClient, public router: Router, private errorHandler: GlobalErrorHandler) {}

    register(user: User) {
        return this.httpClient.post(`${this.API_URL}/user/register`, user).pipe(catchError((error) => this.errorHandler.handleError(error)));
    }

    login(user: User) {
        return this.httpClient.post<any>(`${this.API_URL}/user/login`, user).subscribe(
            (res: any) => {
                localStorage.setItem('access_token', res.token);
                this.router.navigate(['/profile/' + res.id]);
            },
            (error) => this.errorHandler.handleError(error)
        );
    }

    getAccessToken() {
        return localStorage.getItem('access_token');
    }

    isLoggedIn(): any {
        const authToken = localStorage.getItem('access_token');
        return authToken !== null ? true : false;
    }

    logout() {
        if (localStorage.removeItem('access_token') == null) {
            this.router.navigate(['/login']);
        }
    }

    getUserProfile(id): any {
        return this.httpClient.get(`${this.API_URL}/user/profile/${id}`).toPromise();
    }
}
