import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SidebarComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            closeButton: true,
            progressBar: true,
            timeOut: 4000,
            positionClass: "toast-top-right"
        }),
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: GlobalInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
