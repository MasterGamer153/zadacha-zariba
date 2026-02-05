import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  private route = inject(Router);
  constructor(private auth: Auth, private cdr: ChangeDetectorRef, private router: Router, private activatedRoute: ActivatedRoute) {}

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

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['reason'] === 'sessionExpired') {
        this.loginForm.setErrors({ sessionExpired: true });
        this.cdr.detectChanges();
      }
      });
  }

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
    this.loginForm.setErrors(null);

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
