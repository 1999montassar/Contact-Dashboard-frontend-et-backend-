import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, SidebarComponent, SharedModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoginPage: boolean = false; // Détection des pages de connexion

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Utiliser `event.urlAfterRedirects` pour éviter les erreurs avec les redirections
        this.isLoginPage = ['/login', '/register', '/forgot-password', '/verifey', '/newpassword'].includes(event.urlAfterRedirects);
      }
    });
  }
}

