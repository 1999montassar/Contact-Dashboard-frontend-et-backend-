import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mon-compte',
  standalone: true,  
  imports: [CommonModule, ReactiveFormsModule],  
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent {
  user = {
    nom: '',
    email: '',
    telephone: '',
    avatar: 'https://via.placeholder.com/120' 
  };

  compteForm: FormGroup;
  selectedImage: string | ArrayBuffer | null | undefined = null;


  constructor(private fb: FormBuilder) {
    this.compteForm = this.fb.group({
      nom: [this.user.nom, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      telephone: [this.user.telephone, Validators.required]
    });
  }

  // ✅ Ajout de la méthode pour gérer le fichier sélectionné
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // ✅ Ajout de la méthode pour confirmer la nouvelle photo
  confirmerChangementPhoto() {
    if (this.selectedImage) {
      this.user.avatar = this.selectedImage.toString();
      this.selectedImage = null; // Réinitialiser après la confirmation
    }
  }

  // ✅ Méthode pour sauvegarder les modifications
  sauvegarderModifications() {
    if (this.compteForm.valid) {
      this.user.nom = this.compteForm.value.nom;
      this.user.email = this.compteForm.value.email;
      this.user.telephone = this.compteForm.value.telephone;
      alert('Modifications sauvegardées avec succès !');
    }
  }

  // ✅ Méthode pour changer le mot de passe (à implémenter)

} 