import { Component } from '@angular/core';
import { UsersService } from 'src/app/modules/users/services/users.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    constructor(private _UsersService: UsersService) {}

    query: string | null = null;

    search() {
        this._UsersService.updateQueryValue(this.query);
    }
}
