// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
// PROVIDERS

export const MODULES = [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
];

export const COMPONENTS = [
    LoginComponent,
    NotFoundComponent
];

// export const PROVIDERS = [
    
// ];