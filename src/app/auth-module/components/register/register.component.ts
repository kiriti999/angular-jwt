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
                this.authService.getUserProfile(res.id).subscribe((profile) => {
                    this.currentUser = profile;
                    this.registerForm.reset();
                    this.router.navigate(['/profile/' + profile._id]);
                });
                // this.router.navigate(['login']);
            }
        });
    }
}
