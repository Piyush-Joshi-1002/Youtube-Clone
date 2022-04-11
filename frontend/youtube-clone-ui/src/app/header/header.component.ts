import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private oidcSecurityService: OidcSecurityService) { }

  ngOnInit(): void {
   this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated})=>{
     this.isAuthenticated = isAuthenticated;
   })
  }
  login(){
    this.oidcSecurityService.authorize();
  }
  logout()
  {
    this.oidcSecurityService.logoffAndRevokeTokens();
  }

}
