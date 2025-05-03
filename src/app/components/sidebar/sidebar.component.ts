import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/modules/users/interfaces/user-data';
import { UsersService } from 'src/app/modules/users/services/users.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    constructor(private _UsersService: UsersService) { }
    userData: UserData | null = {} as UserData;
    ngOnInit(): void {
        this.userData = this._UsersService.retriveUserData();
    }
    logout() {
        this._UsersService.logout();
    }
}
