import { Component }   from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: 'navbar.component.html'
})

export class NavbarComponent {
	constructor( private auth: AuthService ) {
		auth.handleAuthentication();
	}

	login(): void {
		this.auth.login();
	}

	logout(): void {
		this.auth.logout();
	}
}