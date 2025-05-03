import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    let _Router = inject(Router);
    let _ToastrService = inject(ToastrService);
    
    let guardActivate = false;
    if(localStorage.getItem("umsToken") !== null) {
        guardActivate = true;
        // _ToastrService.success("Welcome back", "Loggedin");
    } else {
        _Router.navigate(["/login"]);
        _ToastrService.error("PLZ login first", "ERROR !!");
    }

    return guardActivate;
};
