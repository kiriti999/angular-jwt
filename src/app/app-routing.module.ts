import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth-module/components/login/login.component';
import { RegisterComponent } from './auth-module/components/register/register.component';
import { UserProfileComponent } from './auth-module/components/user-profile/user-profile.component';

import { AuthGuard } from './auth-module/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
