import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Import du service Router
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , RouterLink],
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup; // Déclaration du formulaire réactif
  selectedMethod: string = 'email'; // Méthode par défaut pour la réinitialisation (email)

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire avec les contrôles nécessaires
    this.forgotPasswordForm = this.fb.group({
      resetMethod: ['email', Validators.required], // Méthode de réinitialisation (email ou téléphone)
      email: ['', [Validators.required, Validators.email]], // Champ e-mail avec validation
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]], // Champ téléphone avec validation
    });
  }

  // Méthode pour changer la méthode de réinitialisation
  onChoiceChange(method: string): void {
    this.selectedMethod = method; // Mise à jour de la méthode choisie (email ou téléphone)
  }
}