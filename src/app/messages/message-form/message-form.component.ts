import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-message-form',
  standalone: true,  // Assurez-vous que le composant est standalone si vous l'utilisez ainsi
  imports: [CommonModule, ReactiveFormsModule],  // Ajoutez ReactiveFormsModule et CommonModule ici
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {
  messageForm: FormGroup;
  messages: { sender: string, content: string }[] = [];
  selectedMode: string = 'email';  // Par défaut, on choisit l'email

  // Regex pour la validation
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  phonePattern = /^\+?[0-9]{10,15}$/;  // Format simple pour un numéro de téléphone

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire
    this.messageForm = this.fb.group({
      modeEnvoi: ['email', Validators.required],  // Par défaut, mode email
      destinataire: ['', [Validators.required, this.validDestinataire.bind(this)]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  // Méthode pour envoyer un message
  envoyerMessage() {
    if (this.messageForm.valid) {
      const formValue = this.messageForm.value;
      this.messages.push({
        sender: 'Moi',
        content: `Envoyé par ${formValue.modeEnvoi}: ${formValue.message}`
      });

      // Réinitialisation du formulaire
      this.messageForm.reset();
      this.messageForm.controls['modeEnvoi'].setValue(this.selectedMode);  // Garder le mode sélectionné
    }
  }

  // Méthode pour annuler le message
  annulerMessage() {
    this.messageForm.reset();
    this.messageForm.controls['modeEnvoi'].setValue(this.selectedMode);  // Garder le mode sélectionné
  }

  // Valider si le destinataire est un email ou un numéro de téléphone valide
  validDestinataire(control: any) {
    const value = control.value;
    if (this.selectedMode === 'email' && !this.emailPattern.test(value)) {
      return { invalidDestinataire: true };
    }
    if (this.selectedMode === 'telephone' && !this.phonePattern.test(value)) {
      return { invalidDestinataire: true };
    }
    return null;
  }

  // Changer la méthode de contact (email ou téléphone)
  onModeChange(mode: string) {
    this.selectedMode = mode;
    this.messageForm.controls['modeEnvoi'].setValue(mode);  // Met à jour le formulaire avec le mode sélectionné
    // Réinitialiser le destinataire pour valider selon le mode choisi
    this.messageForm.controls['destinataire'].reset();
  }
}
