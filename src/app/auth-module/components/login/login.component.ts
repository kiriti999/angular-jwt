import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(public formBuilder: FormBuilder, public authService: AuthService) {
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: ['']
        });
    }

    loginUser() {
        this.authService.login(this.loginForm.value);
    }
}
