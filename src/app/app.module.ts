import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { JwtModule } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { LaTanaDelNerdComponent } from './home/home.component';

import { CarrelloComponent } from './carrello/carrello.component';
import { LoginComponent } from './login/login.component';


// Funzione per ottenere il token JWT dal localStorage
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LaTanaDelNerdComponent,
    CarrelloComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,  // Aggiunto per i form reattivi nel login
    AppRoutingModule,
    JwtModule.forRoot({   // Aggiunta configurazione JWT
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['localhost:8080/auth']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
