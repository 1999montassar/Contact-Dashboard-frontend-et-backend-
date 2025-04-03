import { Component } from '@angular/core'; 
import { RouterLink, RouterLinkActive } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 

@Component({ 
  selector: 'app-sidebar', 
  templateUrl: './sidebar.component.html', 
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  styleUrls: ['./sidebar.component.css'] 
}) 
export class SidebarComponent {
  isSidebarClosed = false;
  isMessagesOpen = false;

  // Menu principal avec sous-menu pour les messages
  menuItems = [
    { name: 'Home', icon: 'bi bi-house-door', path: '/home' },
    { name: 'Contacts', icon: 'bi bi-people', path: '/contacts' },
    { 
      name: 'Messages', icon: 'bi bi-envelope', path: '/messages', 
      subMenu: [
        { name: 'Envoyés', path: '/messages/sent' },
        { name: 'Reçus', path: '/messages/received' },
        { name: 'Favoris', path: '/messages/favorites' }
      ]
    },
    { name: 'Corbeille', icon: 'bi bi-trash', path: '/trash' }
  ];

  filteredMenuItems = [...this.menuItems];  // Initialisation des éléments filtrés

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleMessages() {
    this.isMessagesOpen = !this.isMessagesOpen;
  }

  search(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.trim().toLowerCase();

    if (query.length === 0) {
      this.filteredMenuItems = [...this.menuItems]; // Réinitialise si vide
      return;
    }

    // Filtrage des éléments du menu
    this.filteredMenuItems = this.menuItems.filter(item => {
      // Vérifie si le nom du menu ou un des sous-éléments contient la recherche
      const itemMatches = item.name.toLowerCase().includes(query);
      if (item.subMenu) {
        // Filtrage du sous-menu
        item.subMenu = item.subMenu.filter(subItem =>
          subItem.name.toLowerCase().includes(query)
        );
      }
      return itemMatches || (item.subMenu && item.subMenu.length > 0);
    });

    console.log('Résultats de recherche :', this.filteredMenuItems);
  }
}
