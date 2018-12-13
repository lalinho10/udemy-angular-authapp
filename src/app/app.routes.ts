import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }        from './components/home/home.component';
import { PreciosComponent }     from './components/precios/precios.component';
import { ProtegidaComponent }   from './components/protegida/protegida.component';

import { RouteGuardService }    from './services/route-guard.service';

const APP_ROUTES: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'precios', component: PreciosComponent },
	{ path: 'protegida', component: ProtegidaComponent, canActivate: [ RouteGuardService ] },
	{ path: '**', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot( APP_ROUTES );