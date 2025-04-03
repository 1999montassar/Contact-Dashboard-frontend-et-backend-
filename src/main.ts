import { bootstrapApplication } from '@angular/platform-browser'; 
import { ApplicationConfig } from '@angular/core'; 
import { provideRouter } from '@angular/router'; 
import 'zone.js'; import { AppComponent } from './app/app.component'; 
import { routes } from './app/app.routes'; 
export const appConfig: ApplicationConfig = { providers: [provideRouter(routes)], };
 bootstrapApplication(AppComponent, appConfig); 
 console.clear();