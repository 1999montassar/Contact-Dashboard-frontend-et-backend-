import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Router } from '@angular/router';  // Import RouterModule et Router
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule],  // Utilisation de RouterModule au lieu de RouterLink
})
export class NavbarComponent {
  isSidebarOpen = false;  // Flag to track sidebar state

  constructor(private router: Router) {}

  captureScreenshot() {
    html2canvas(document.body).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'screenshot.png';
      link.click();
    });
  }
  
  toggleMessages() {
    console.log('Messages button clicked!');
    // Handle messages toggle logic
  }

  logout() {
    console.log('Logging out!');
    localStorage.removeItem('userToken');  // Supprime le token utilisateur
    this.router.navigate(['/login']);  // Redirige vers la page de connexion
  }

  // Define the toggleSidebar method
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;  // Toggle the sidebar state
    console.log('Sidebar toggled:', this.isSidebarOpen);
  }
}
