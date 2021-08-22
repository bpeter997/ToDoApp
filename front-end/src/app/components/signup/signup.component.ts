import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {

  signUpFormGroup: FormGroup;

  userRoles: any = ['admin', 'user'];

  constructor(private authService: AuthService, private router: Router, private appComponent: AppComponent) {
    this.signUpFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl(''),
    });
  }

  signUp(): void {
    if (this.signUpFormGroup.valid) {
      this.authService.signUp(this.signUpFormGroup.value.name, this.signUpFormGroup.value.email, this.signUpFormGroup.value.password, this.signUpFormGroup.value.role).subscribe(msg => {
        console.log(msg);
        this.router.navigate(['/signin']);
      }, error => {
        console.log(error);
      });
    };
  }

}
