import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';

@Injectable({providedIn: 'root'})
export class AuthService {

    private token: string;

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
        this.http.post<{token: string}>("http://localhost:3000/api/users/login", authData)
        .subscribe(response => {
            console.log("Token from response from auth.service.ts");
            console.log(response.token);
            const token = response.token;
            this.token = token;
        });
    }
    
    getToken() {
        return this.token;
    }
        
}
