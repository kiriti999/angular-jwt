import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GlobalErrorHandler } from '../../error-handling/error-handler.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
    currentUser: any = {};

    constructor(public authService: AuthService, private activatedRoute: ActivatedRoute, private errorHandler: GlobalErrorHandler) {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.authService.getUserProfile(id).subscribe(
            (res) => {
                this.currentUser = res;
            },
            (error) => this.errorHandler.handleError(error)
        );
    }
}
