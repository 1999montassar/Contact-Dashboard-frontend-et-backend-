import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 

@Component({
  selector: 'app-contacts-table',
  standalone: true,
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css'],
  imports: [CommonModule, RouterModule,FormsModule], 
})
export class ContactsTableComponent {
  // Liste des contacts
  contacts = [
    { nom: 'John Doe', email: 'john@example.com', telephone: '1234567890', isEditing: false, isFavorite: false },

  ];

  favoris: any[] = [];  // Liste des contacts favoris
  searchTerm: string = '';  // Variable pour la recherche
  currentPage: number = 1;  // Page actuelle
  itemsPerPage: number = 3; // Nombre de contacts par page

  // Filtrage des contacts par recherche
  get filteredContacts() {
    const filtered = this.contacts.filter(contact =>
      contact.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.telephone.includes(this.searchTerm)
    );
    
    // Pagination : découper les contacts selon la page actuelle
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return filtered.slice(start, end);
  }

  // Calcul du nombre total de pages
  get totalPages() {
    return Math.ceil(this.contacts.length / this.itemsPerPage);
  }

  // Fonction pour passer à la page suivante
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Fonction pour revenir à la page précédente
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Fonction pour aller à une page spécifique
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Ajouter un nouveau contact
  ajouterContact() {
    this.contacts.push({
      nom: '', email: '', telephone: '',
      isEditing: true, isFavorite: false
    });
  }

  // Voir les détails d'un contact
  consulterContact(contact: any) {
    alert(`Voir les détails du contact:\nNom: ${contact.nom}\nEmail: ${contact.email}\nTéléphone: ${contact.telephone}`);
  }

  // Modifier un contact
  modifierContact(contact: any) {
    contact.isEditing = true;
  }

  // Sauvegarder les modifications d'un contact
  sauvegarderContact(contact: any) {
    contact.isEditing = false;
    alert(`Les modifications ont été sauvegardées pour ${contact.nom}`);
  }

  // Supprimer un contact
  supprimerContact(contact: any) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${contact.nom} ?`)) {
      this.contacts = this.contacts.filter(c => c !== contact);
      this.favoris = this.favoris.filter(c => c !== contact);  // Supprime aussi des favoris
    }
  }

  // Ajouter ou retirer un contact des favoris
  ajouterFavoris(contact: any) {
    contact.isFavorite = !contact.isFavorite;

    if (contact.isFavorite) {
      this.favoris.push(contact);
    } else {
      this.favoris = this.favoris.filter(c => c !== contact);  // Retirer des favoris
    }
  }
}
