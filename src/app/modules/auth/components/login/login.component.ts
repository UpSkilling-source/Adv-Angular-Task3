import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserFormData } from 'src/app/interfaces/user-form-data';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(
        private _AuthService: AuthService,
        private _ToastrService: ToastrService,
        private _Router: Router
    ) {}

    loginForm = new FormGroup({
        username: new FormControl(null, [ 
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10),
            Validators.pattern(/^[a-z]/i),
        ]),
        password: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
            Validators.pattern(/^[a-z]/i),
        ]),
    });

    isPassHidden: boolean = true;

    submitFormData(formData: FormGroup) {
        this._AuthService.onLogin(formData.value as UserFormData).subscribe({
            next: (res) => {
                localStorage.setItem("umsToken", res["accessToken"]);
            },
            error: (e) => {
                this._ToastrService.error(e.error?.message, "Failed");
            },
            complete: () => {
                this._ToastrService.success("You are loggedin", "Success");
                this._Router.navigate(["/home"]);
            }
        });
    }

}
