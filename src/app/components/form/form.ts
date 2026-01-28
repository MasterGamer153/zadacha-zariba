import { ChangeDetectorRef, Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {

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
        console.log('Login success', response);
      },
      error: () => {
        this.loginForm.setErrors({ invalidCredentials: true })
      },
    });

    console.log(this.loginForm.value)

    
  }
}
