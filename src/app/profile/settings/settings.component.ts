import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      language: ['fr', Validators.required],
      emailNotifications: [false],
      emailPromotions: [false],
      shareData: [false],
      twoFactorAuth: [false],
      notifications: ['enabled']
    });
  }

  // Fonction pour enregistrer les paramètres
  saveSettings(): void {
    if (this.settingsForm.valid) {
      console.log('Settings saved:', this.settingsForm.value);
      // Vous pouvez envoyer les données au serveur ici si nécessaire
    } else {
      console.log('Formulaire invalide');
    }
  }
}
