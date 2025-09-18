import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]] // facultatif
    });

    // Charger infos du user connecté
    this.userService.getProfile().subscribe({
      next: res => this.userForm.patchValue({ name: res.name, email: res.email }),
      error: err => console.error(err)
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched(); // pour afficher toutes les erreurs
      return;
    }

    this.userService.updateProfile(this.userForm.value).subscribe({
      next: () => {
        alert('Profil mis à jour avec succès');
        this.router.navigate(['/profile']);
      },
      error: err => {
        console.error(err);
        alert('Erreur lors de la mise à jour'); 
      }
    });
  }
}
