import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth-module/components/login/login.component';
import { RegisterComponent } from './auth-module/components/register/register.component';
import { UserProfileComponent } from './auth-module/components/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './auth-module/interceptors/auth-interceptor.service';
import { GlobalErrorHandler } from './auth-module/error-handling/error-handler.service';

@NgModule({
    declarations: [AppComponent, LoginComponent, RegisterComponent, UserProfileComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
