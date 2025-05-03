import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddUpdateUserComponent } from './components/add-update-user/add-update-user.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';

const routes: Routes = [
    { 
        path: "", 
        redirectTo: "users-list",
        pathMatch: "full"
    },
    { 
        path: "users-list", 
        component: UsersListComponent 
    },
    { 
        path: "add", 
        component: AddUpdateUserComponent 
    },
    { 
        path: "update/:id", 
        component: AddUpdateUserComponent 
    },
    { 
        path: "profile", 
        component: ProfileComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
