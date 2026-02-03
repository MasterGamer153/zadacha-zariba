import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  private route = inject(Router);
  constructor(private auth: Auth, private cdr: ChangeDetectorRef) {}

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });



  get email(){
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password')
  }

  onSubmit() {
    if (this.loginForm.invalid){
      return;
    }


    const { email, password } = this.loginForm.value;
    
    this.auth.login(email!, password!).subscribe({
      next: (response) => {
        this.auth.saveToken(response.token);
        console.log('Token saved');
        this.route.navigate(['/chat']);
      },
      error: () => {
        this.loginForm.setErrors({ invalidCredentials: true })
      },
    });

    console.log(this.loginForm.value)

    
  }
}
