import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    private token: string;
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated = false;
    private tokenTimer: any;
    private userId: string;

    constructor(private http: HttpClient, private router: Router) {}

    createUser(email: string, password: string) {
        const authData: AuthData = {email: email, password: password };
        console.log("Before calling API from auth.service.ts");
        this.http.post("http://localhost:3000/api/users/signup", authData)
        .subscribe(response => {
            console.log("After calling API from auth.service.ts");
        console.log(response);
        });
    }

    login(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http.post<{token: string, expiresIn: number, userId: string}>("http://localhost:3000/api/users/login", authData)
        .subscribe(response => {
            console.log("Token from response from auth.service.ts");
            console.log(response.token);
            const token = response.token;
            const expiresInDuration = response.expiresIn; 
            this.token = token;
            if(token) {
                this.tokenTimer = setTimeout(() => {
                    this.logout();
                }, expiresInDuration * 1000)

                this.isAuthenticated = true;
                this.userId = response.userId;
                this.authStatusListener.next(true);
                this.router.navigate(['/']);
            }
        });
        
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.userId = null;
        clearTimeout(this.tokenTimer);
        this.router.navigate(['/']);
    }
        
    
    getToken() {
        return this.token;
    }
   
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }
        
    getIsAuth() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }
}
