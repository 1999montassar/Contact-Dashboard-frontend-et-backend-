import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  imports: [CommonModule] // Assurez-vous que CommonModule est bien importé dans votre module parent
})
export class NotificationsComponent implements OnInit {
  notifications: string[] = [
    'Nouveau message reçu.',
    'Votre profil a été mis à jour.',
    'Nouvelle mise à jour disponible.'
  ];

  constructor() { }

  ngOnInit(): void { }

  // Méthode pour supprimer une notification
  deleteNotification(notification: string): void {
    this.notifications = this.notifications.filter(n => n !== notification);
  }
}
