import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserProfile } from '../../interfaces/user-profile';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    constructor(private _UsersService: UsersService) { }
    title = "Profile";
    userProfileData: UserProfile | null = {} as UserProfile;
    ngOnInit(): void {
        this._UsersService.getUserProfileData().subscribe({
            next: (res) => {
                this.userProfileData = res;
            }
        });
    }

    profileForm = new FormGroup({
        fname: new FormControl({ value: '', disabled: true }),
        lname: new FormControl({ value: '', disabled: true }),
        email: new FormControl({ value: '', disabled: true }),
        age: new FormControl({ value: '', disabled: true }),
        phone: new FormControl({ value: '', disabled: true }),
        birthdate: new FormControl({ value: '', disabled: true }),
    });
}
