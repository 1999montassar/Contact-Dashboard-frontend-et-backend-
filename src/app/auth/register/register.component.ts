import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Importation des modules nécessaires
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Utilisation de ReactiveFormsModule

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,  // Spécifier que le composant est autonome
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Importation des modules nécessaires
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Initialisation du formulaire réactif
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]], // Validation pour le champ username
      email: ['', [Validators.required, Validators.email]], // Validation pour le champ email
      password: ['', [Validators.required, Validators.minLength(6)]] // Validation pour le champ password
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log("Données de l'inscription :", formData);
      // Logique pour enregistrer l'utilisateur via un service
      this.router.navigate(['/login']); // Redirection après inscription réussie
    } else {
      console.log('Veuillez remplir tous les champs.');
    }
  }
}
