import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { UsersService } from '../../services/users.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
// import {MatIconModule} from '@angular/material/icon';

import { UserItem } from '../../interfaces/userItem';
import { Userslist } from '../../interfaces/userslist';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, AfterViewInit {
    // constructor
    // ========================================================
    constructor(
        private _UsersService: UsersService,
        private _ToastrService: ToastrService
    ) { }
    // ========================================================
    
    // properties
    // ========================================================
    title: string = "Users List";
    userslistData: Userslist = {} as Userslist;
    displayedColumns: string[] = ['image', 'name', 'email', 'phoneNumber', 'enrollNumber', 'action']; 

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource = new MatTableDataSource<UserItem>();
    // ========================================================
    
    // lifecycle hooks
    // ========================================================
    ngOnInit(): void {
        this._UsersService.getUsersList().subscribe({
            next: (res) => {
                this.userslistData = res;
                this.dataSource.data = this.userslistData.users;
            }
        });
    }
    
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.trackQuery();
    }
    // ========================================================
    
    // methods
    // ========================================================
    deleteUser(id: number) {
        this._UsersService.deleteUserItem(id).subscribe({
            next: (res) => {
                if(res["isDeleted"]) {
                    this._ToastrService.success(`${res["firstName"]} ${res["lastName"]} is Deleted Successfully`, "DELETE SUCCESS");
                    // simulate delete
                    this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
                } else {
                    this._ToastrService.error(`${res["firstName"]} ${res["lastName"]} is NOT Deleted Yet`, "DELETE ERROR !");
                }
            },
            error: (e) => {
                this._ToastrService.error(`${e.message}`, "DELETE ERROR !");
            }
        });
        
    }

    trackQuery() {
        this._UsersService.queryUpdate$.subscribe((data) => {
            if(data !== null) {
                this._UsersService.searchUserByName(data).subscribe({
                    next: (res) => {
                        this.userslistData = res;
                        this.dataSource.data = this.userslistData.users;
                    }
                });
            }
        });
    }
    // ========================================================

}
