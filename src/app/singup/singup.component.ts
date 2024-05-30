import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})

export class SingupComponent {

  hidePassword = true;
  hideConfirmPassword = true;
  responseMessage!: string;
  

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  signForm !: FormGroup;

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    }
    else if (control.value !== this.signForm.controls['cpassword'].value) {
      return { confirm: true, error: true }
    }
    return {};
  }

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.signForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
        this.passwordValidator
      ]],
      cpassword: ['', [Validators.required, this.confirmationValidator]],

    })
  }

  register(): void {

    const user = {
      email: this.signForm.value.email,
      name: this.signForm.value.name,
      password: this.signForm.value.password
    };

    this.service.signup(user).subscribe(
      res => {
        this.toaster.success('Signup Successful!', 'Success');
        this.router.navigate(['/login']);
      },
      err => {
        if (err.status === 409) { 
          this.toaster.error('User already exists!', 'Error');
        } else {
          this.toaster.error('Something went wrong, try again!', 'Error');
        }
      }
    );
  }

  passwordValidator = (control: FormControl): { [s: string]: boolean } => {
    const value = control.value;
    if (!value) {
      return { required: true };
    } else if (!/(?=.*[a-z])/.test(value)) {
      return { lowercase: true };
    } else if (!/(?=.*[A-Z])/.test(value)) {
      return { uppercase: true };
    } else if (!/(?=.*[!@#$%^&*])/.test(value)) {
      return { special: true };
    } else if (value.length < 4 || value.length > 8) {
      return { length: true };
    }
    return {};
  }
  
}

