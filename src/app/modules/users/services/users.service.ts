import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/user-data';
import { Userslist } from '../interfaces/userslist';
import { UserProfile } from '../interfaces/user-profile';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private _HttpClient: HttpClient) { }

    private querySrc = new BehaviorSubject<string | null>(null);
    queryUpdate$ = this.querySrc.asObservable();

    updateQueryValue(data: string | null) {
        this.querySrc.next(data);
    }
    
    retriveUserData(): UserData | null {
        let _userData: UserData| null = null;
        const token = localStorage.getItem('umsToken');
        if (token) {
            _userData = jwtDecode(token);
        }
        return _userData;
    }

    getUsersList(): Observable<Userslist> {
        return this._HttpClient.get<Userslist>('users');
    }

    getUserProfileData(): Observable<any> {
        return this._HttpClient.get("user/me", {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("umsToken")}` 
            }
        });
    }

    deleteUserItem(id: number): Observable<any> {
        return this._HttpClient.delete(`users/${id}`);
    }
    
    searchUserByName(queryName: string): Observable<any> {
        return this._HttpClient.get(`users/search?q=${queryName}`);
    }
    
    addNewUser(data: UserProfile): Observable<any>  {
        return this._HttpClient.post('users/add', data);
    }
    
    getSingleUser(id: number): Observable<any> {
        return this._HttpClient.get(`users/${id}`);
    }
    
    updateUserData(data: UserProfile, id: number): Observable<any> {
        return this._HttpClient.put(`users/${id}`, data);
    }

    logout() {
        localStorage.removeItem("umsToken");
    }
}
