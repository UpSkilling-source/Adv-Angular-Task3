import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddUpdateUserComponent } from './components/add-update-user/add-update-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    declarations: [
        UsersListComponent,
        ProfileComponent,
        AddUpdateUserComponent,
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
    ]
})
export class UsersModule { }
