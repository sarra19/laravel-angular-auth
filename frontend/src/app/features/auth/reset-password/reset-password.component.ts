import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];

    this.resetForm = this.fb.group({
      email: [email || '', [Validators.required, Validators.email]],
      token: [token || '', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    });
  }

  // Getter pratiques
  get password() {
    return this.resetForm.get('password');
  }
  get password_confirmation() {
    return this.resetForm.get('password_confirmation');
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched(); // affiche les erreurs si champs invalides
      return;
    }

    this.authService.resetPassword(this.resetForm.value).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.error = '';
        // Rediriger après succès
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error.message || 'Error';
        this.message = '';
      }
    });
  }
}
