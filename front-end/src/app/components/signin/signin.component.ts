import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  signInFormGroup: FormGroup;

  constructor(private authServise: AuthService, private router: Router) { 
    this.signInFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signIn() {
    if (this.signInFormGroup.valid) {
      this.authServise.login(this.signInFormGroup.value.email, this.signInFormGroup.value.password).subscribe(msg => {
        this.router.navigate(['/users']);
      }, error => {
        console.log(error);
      });
    };
  }

  ngOnInit(): void {    
    if (this.authServise.isLoggedIn()) {
      this.authServise.logout().subscribe(msg => {
        console.log(msg);
      }, error => {
        console.log(error);
      });
    }
  }

}
