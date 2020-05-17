import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    userIsAuthenticated = false;
    private authListernerSubs: Subscription;
  
    constructor(private authService: AuthService) {}
  
    ngOnInit(): void {
      this.authListernerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAutheticated => {
      this.userIsAuthenticated = isAutheticated;
      })
    }

    onLogout() {
      this.authService.logout();
      }
      
    
    ngOnDestroy(): void {
      this.authListernerSubs.unsubscribe();
    }

}
  