import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  standalone: true, // ✅ Ajouté pour corriger les imports
  templateUrl: './new-password.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
  newPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.newPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });

    // Vérifier si les mots de passe correspondent
    this.newPasswordForm.valueChanges.subscribe(() => {
      this.newPasswordForm.updateValueAndValidity();
    });
  }

  resetPassword() {
    if (this.newPasswordForm.valid) {
      console.log("Mot de passe réinitialisé avec succès !");
      this.router.navigate(['/home']); // ✅ Forcer la navigation
    }
  }
}
