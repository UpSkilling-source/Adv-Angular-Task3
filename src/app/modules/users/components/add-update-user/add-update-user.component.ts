import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserProfile } from '../../interfaces/user-profile';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-update-user',
    templateUrl: './add-update-user.component.html',
    styleUrls: ['./add-update-user.component.scss']
})
export class AddUpdateUserComponent implements OnInit {
    constructor(
        private _UsersService: UsersService,
        private _ToastrService: ToastrService,
        private _ActivatedRoute: ActivatedRoute
    ) { }
    title: string = "";
    userID: number | undefined = undefined;
    userData: UserProfile | null = {} as UserProfile;
    addUpdateForm = new FormGroup({
        firstName: new FormControl(null),
        lastName: new FormControl(null),
        email: new FormControl(null),
        age: new FormControl(null),
        phone: new FormControl(null),
        birthDate: new FormControl(null),
    });

    ngOnInit(): void {
        this.userID = this._ActivatedRoute.snapshot.params["id"];
        if(this.userID !== undefined) {
            this.title = "Update User";
            this._UsersService.getSingleUser(this.userID).subscribe({
                next: (res) => {
                    if(res) {
                        this.addUpdateForm.controls.firstName.patchValue(res["firstName"]);
                        this.addUpdateForm.controls.lastName.patchValue(res["lastName"]);
                        this.addUpdateForm.controls.age.patchValue(res["age"]);
                        this.addUpdateForm.controls.phone.patchValue(res["phone"]);
                        this.addUpdateForm.controls.email.patchValue(res["email"]);
                        this.addUpdateForm.controls.birthDate.patchValue(res["birthDate"]);
                    }
                }
            });
        } else {
            this.title = "Add User";
        }       
    }

    addUpdateUser(formData: FormGroup) {
        if(this.userID === undefined) {
            this._UsersService.addNewUser(formData.value as UserProfile).subscribe({
                next: (res) => {
                    if(res) {
                        this._ToastrService.success(`[${res["firstName"]} ${res["lastName"]}] is added successfully`, "New User Is Added");
                    } else {
                        this._ToastrService.error(`Error. Plz try again`, "Failed Added");
                    }
                },
                error: (e) => {
                    this._ToastrService.error(`${e.message}`, "Failed Added");
                }
            });
        } else {
            this._UsersService.updateUserData(formData.value as UserProfile, this.userID).subscribe({
                next: (res) => {
                    if(res) {
                        this._ToastrService.success(`[${res["firstName"]} ${res["lastName"]}] is updated successfully`, "Update Done");
                    } else {
                        this._ToastrService.error(`Error. Plz try again`, "Failed Added");
                    }
                },
                error: (e) => {
                    this._ToastrService.error(`${e.message}`, "Failed Update");
                }
            });
        }
    }
}
