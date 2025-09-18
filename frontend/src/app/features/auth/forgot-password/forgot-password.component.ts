import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.forgotForm.get('email');
  }

  onSubmit() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched(); // marque tous les champs comme touchés pour afficher les erreurs
      return;
    }

    this.authService.forgotPassword(this.email?.value).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.error = '';
      },
      error: (err) => {
        this.error = err.error.message || 'Error';
        this.message = '';
      }
    });
  }
}
