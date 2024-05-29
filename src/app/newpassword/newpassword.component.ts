// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../services/user.service';
// import { Router,ActivatedRoute } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { FormControl } from '@angular/forms';

// @Component({
//   selector: 'app-newpassword',
//   templateUrl: './newpassword.component.html',
//   styleUrls: ['./newpassword.component.css']
// })
// export class NewpasswordComponent {
  
//   hidePassword = true;

//   resetPasswordForm!: FormGroup;
//   email: string;
//   otp: string;

//   toggleVisibility(): void {
//     this.hidePassword = !this.hidePassword;
//   }

//   constructor(
//     private fb: FormBuilder,
//     private userService: UserService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private toaster: ToastrService
//   ) {
//     this.email = this.route.snapshot.queryParams['email'];
//     this.otp = this.route.snapshot.queryParams['otp'];
//   }

//   ngOnInit() {
//     this.resetPasswordForm = this.fb.group({
//       newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
//       confirmPassword: ['', [Validators.required, this.confirmationValidator]]
//     }, { validator: this.passwordMatchValidator });
//   }

//   passwordMatchValidator(form: FormGroup) {
//     return form.controls['newPassword'].value === form.controls['confirmPassword'].value
//       ? null : { 'mismatch': true };
//   }

//   confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
//     if (!control.value) {
//       return { required: true };
//     }
//     else if (control.value !== this.resetPasswordForm.controls['confirmPassword'].value) {
//       return { confirm: true, error: true }
//     }
//     return {};
//   }

//   passwordValidator = (control: FormControl): { [s: string]: boolean } => {
//     const value = control.value;
//     if (!value) {
//       return { required: true };
//     } else if (!/(?=.*[a-z])/.test(value)) {
//       return { lowercase: true };
//     } else if (!/(?=.*[A-Z])/.test(value)) {
//       return { uppercase: true };
//     } else if (!/(?=.*[!@#$%^&*])/.test(value)) {
//       return { special: true };
//     } else if (value.length <= 4 || value.length >= 8) {
//       return { length: true };
//     }
//     return {};
//   }

//   onSubmit() {

//     if (this.resetPasswordForm.invalid) {
//       return;
//     }
//     const newPassword = this.resetPasswordForm.value['newPassword'];

//     this.userService.resetPassword(this.email, this.otp, newPassword)
//       .subscribe({
//         next: (res: any) => {
//           console.log(res);
//           this.router.navigate(['login']);
//           this.toaster.success('Password Reset Successfully', 'Success');
//         },
//         error: (err: any) => {
//           console.log("Error occurred", err);
//           this.toaster.error('Error occurred while resetting password!','Error')
//         }
//       });
//     }

// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent {

  hidePassword = true;
  resetPasswordForm!: FormGroup;
  email: string;
  otp: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {
    this.email = this.route.snapshot.queryParams['email'];
    this.otp = this.route.snapshot.queryParams['otp'];
  }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
    if (!valid) {
      return { passwordStrength: true };
    }
    return null;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['newPassword'].value === form.controls['confirmPassword'].value
      ? null : { mismatch: true };
  }

  toggleVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const newPassword = this.resetPasswordForm.value['newPassword'];

    this.userService.resetPassword(this.email, this.otp, newPassword)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigate(['login']);
          this.toaster.success('Password Reset Successfully', 'Success');
        },
        error: (err: any) => {
          console.log("Error occurred", err);
          this.toaster.error('Error occurred while resetting password!', 'Error');
        }
      });
  }
}
