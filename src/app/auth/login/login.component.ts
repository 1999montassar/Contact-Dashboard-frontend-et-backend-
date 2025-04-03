import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Ajoute Router ici
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, RouterLink],  // Ajoute FormsModule ici
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';  // Remplace username par email
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      console.log('Login Data:', { email: this.email, password: this.password });
      this.router.navigate(['/home']);
    } else {
      console.log('Veuillez remplir tous les champs.');
    }
  }
}