import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { 
        path: "",
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) 
    },
    { 
        path: "home", 
        component: HomeComponent, 
        title: "UMS - Home", 
        canActivate: [authGuard], 
        children: [
            {
                path: "",
                redirectTo: "users",
                pathMatch: "full"
            },
            { 
                path: 'users', 
                loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule), 
            },
        ] 
    },
    { 
        path: "**", 
        component: NotFoundComponent, 
        title: "UMS - NotFound" 
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
