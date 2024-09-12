import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Inject Router service
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
        ],
      ],
      checkPassword: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { email, password, name } = this.signupForm.value;
      const user = { email, password, name };

      this.authService.register(user).subscribe(
        (response) => {
          // Show success alert
          alert('Registration successful! Redirecting to login page...');
          // Redirect to login page
          this.router.navigate(['/login']);
        },
        (error) => {
          // Show error alert
          alert('Registration failed. Please try again.');
          console.error('Signup failed', error);
        }
      );
    } else {
      alert('Form is invalid. Please check the fields.');
      console.error('Form is invalid');
    }
  }
}
