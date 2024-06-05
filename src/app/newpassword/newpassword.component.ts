import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
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
  hideConfirmPassword = true;
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
    }, { validators: this.passwordMatchValidator });
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

  passwordMatchValidator: ValidatorFn = (form: AbstractControl): { [key: string]: boolean } | null => {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  toggleVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleVisibility1(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
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
          this.router.navigate(['/login']);
          this.toaster.success('Password Reset Successfully', 'Success');
        },
        error: (err: any) => {
          console.log("Error occurred", err);
          this.toaster.error('Error occurred while resetting password!', 'Error');
        }
      });
  }
}
