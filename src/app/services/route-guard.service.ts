import { Injectable }          from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService }         from './auth.service';

@Injectable()
export class RouteGuardService implements CanActivate {
	constructor(
		private auth: AuthService,
		private router: Router
	) {}

	canActivate(): boolean {
		if ( !this.auth.isAuthenticated() ) {
			this.router.navigate( [ '/home' ] );
			return false;
		}
		return true;
	}
}