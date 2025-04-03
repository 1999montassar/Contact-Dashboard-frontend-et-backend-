import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { Router, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-verification',
  templateUrl: './verifey.component.html',
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  styleUrls: ['./verifey.component.css']
})
export class VerificationComponent implements OnInit {
  verifeyForm!: FormGroup;  // Utilisation de l'opérateur de non-nullité

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Initialisation de la propriété verifeyForm
    this.verifeyForm = this.fb.group({
      verificationCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]] // Code à 6 chiffres
    });
  }

  verifierCode(): void {
    if (this.verifeyForm.valid) {
      console.log('Code de vérification :', this.verifeyForm.value.verificationCode);
      // Redirection vers la page de réinitialisation du mot de passe si le code est valide
      this.router.navigate(['/newpassword']);
    } else {
      console.log('Code invalide');
    }
  }
}
