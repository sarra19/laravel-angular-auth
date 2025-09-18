import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: res => this.user = res,
      error: err => console.error(err)
    });
  }
deleteUser() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.userService.deleteProfile().subscribe({
        next: () => {
          alert('Account deleted successfully');
          localStorage.removeItem('token'); // supprime le token
          this.router.navigate(['/login']);  // redirection
        },
        error: err => console.error(err)
      });
    }
  }

  
}
