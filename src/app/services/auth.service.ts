import { Injectable } from '@angular/core';
import { Router }     from '@angular/router';
import { filter }     from 'rxjs/operators';
import * as auth0     from 'auth0-js';

( window as any ).global = window;

@Injectable()
export class AuthService {
  public userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'btMVg7O0JNa3cbf8lR9WdT04FeftYfSR',
    domain: 'angulartestapp.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4300/callback',
    scope: 'openid profile'
  });

  constructor( public router: Router ) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash( ( err, authResult ) => {
      if( authResult && authResult.accessToken && authResult.idToken ) {
        window.location.hash = '';
        this.setSession( authResult );
        this.router.navigate( [ '/home' ] );
      } else if( err ) {
        this.router.navigate( [ '/home' ] );
        console.log( err );
      }
    });
  }

  private setSession( authResult ): void {
    const expiresAt = JSON.stringify( ( authResult.expiresIn * 1000 ) + new Date().getTime() );

    localStorage.setItem( 'access_token', authResult.accessToken );
    localStorage.setItem( 'id_token', authResult.idToken );
    localStorage.setItem( 'expires_at', expiresAt );
  }

  public logout(): void {
    localStorage.removeItem( 'access_token' );
    localStorage.removeItem( 'id_token' );
    localStorage.removeItem( 'expires_at' );

    this.router.navigate( [ '/' ] );
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse( localStorage.getItem( 'expires_at' ) );
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem( 'access_token' );
    if( !accessToken ) {
      throw new Error( 'Access Token must exist to fetch profile' );
    }

    const self = this;

    this.auth0.client.userInfo( accessToken, ( err, profile ) => {
      if( profile ) {
        self.userProfile = profile;
      }
      cb( err, profile );
    });
  }
}