import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginform = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    if (this.loginform.valid) {
      this.authService.login(this.loginform.value).subscribe({
        next: (res) => {
          console.log(res);
          this.snackBar.open('Logged in successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });

          if (res.userId != null) {
            const user = {
              id: res.userId,
              role: res.userRole,
            };
            StorageService.saveUser(user);
            StorageService.saveToken(res.jwt);

            if (StorageService.isAdminLoggedIn()) {
              this.router.navigateByUrl('admin/dashboard');
            } else if (StorageService.isSingerLoggedIn()) {
              this.router.navigateByUrl('singer/dashboard');
            }
          }
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open(
            'Something went wrong. Please try again!',
            'Close',
            {
              duration: 3000,
              panelClass: ['error-snackbar'],
            }
          );
        },
      });
    } else {
      this.snackBar.open(
        'Please fill in the required fields correctly!',
        'Close',
        {
          duration: 3000,
          panelClass: ['error-snackbar'],
        }
      );
    }
  }
}
