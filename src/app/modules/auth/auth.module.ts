import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
    ]
})
export class AuthModule { }
