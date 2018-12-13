import { BrowserModule }      from '@angular/platform-browser';
import { NgModule }           from '@angular/core';

import { AppComponent }       from './app.component';

import { HomeComponent }      from './components/home/home.component';
import { NavbarComponent }    from './components/navbar/navbar.component';
import { PreciosComponent }   from './components/precios/precios.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';

import { AuthService }        from './services/auth.service';
import { RouteGuardService }  from './services/route-guard.service';

import { APP_ROUTING }        from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PreciosComponent,
    ProtegidaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [
    AuthService,
    RouteGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
