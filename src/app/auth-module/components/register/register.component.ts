import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    registerForm: FormGroup;
    currentUser = {};

    constructor(public formBuilder: FormBuilder, public authService: AuthService, public router: Router) {
        this.registerForm = this.formBuilder.group({
            username: [''],
            email: [''],
            password: ['']
        });
    }

    registerUser(): void {
        this.authService.register(this.registerForm.value).subscribe((res: any) => {
            if (res) {
                localStorage.setItem('access_token', res.token);
                this.authService
                    .getUserProfile(res.id)
                    .then((profile: any) => {
                        this.currentUser = profile;
                        this.registerForm.reset();
                        this.router.navigate(['/profile/' + profile._id]);
                    })
                    .catch((error: any) => {
                        if (error.error && error.error.name === 'TokenExpiredError') {
                            this.authService.logout();
                            alert('Session expired. Please login to continue');
                        }
                        console.log('err: ', error);
                    });

                // this.router.navigate(['login']);
            }
        });
    }
}
