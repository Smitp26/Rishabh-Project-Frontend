import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {

  hide = true;
  email:string = '';
  type = "password"; 
  submitted = false;
  changePassword!: FormGroup;


  loginForm !: FormGroup;
  hideOld= true;
  hideNew= true;
  hideconfirm= true;
  typeOld="password"
  typeNew="password"

constructor(private fb:FormBuilder,
  private service: UserService,
  private router: Router,
  private snackbar: SnackbarService,
  private route: ActivatedRoute
){}

ngOnInit(): void
{
  this.changePassword = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, {
    validator: this.passwordMatchValidator
  });
}
   
toggleVisibility(): void {    
  this.hide = !this.hide;
  this.type == "password" ? this.type ="text": this.type = "password"
}

passwordMatchValidator(form: FormGroup) {
  return form.controls['newPassword'].value === form.controls['confirmPassword'].value
    ? null : { 'mismatch': true };
}

async onSubmit() {

  this.submitted = true;

  if (this.changePassword.invalid) {
    return;
  }

  const {email, oldPassword, newPassword } = this.changePassword.value;
  // const oldPassword = this.changePassword.value['oldPassword'];
  // const newPassword = this.changePassword.value['newPassword'];
  // const email = localStorage.getItem('email') ?? '';
  console.log("email: ",email);
  try {
    const res = await firstValueFrom(this.service.changePassword(email, oldPassword, newPassword));
    console.log("Response: ",res);
    this.snackbar.openSnackBar("Password has been changed successfully!", 'Close', {
      panelClass: 'success-snackbar'
    });
    this.router.navigate(['/login']);
  } catch (err) {
    this.snackbar.openSnackBar("Error occurred while changing password", 'Close', {
      panelClass: 'error-snackbar',
    });
  }  
}

get f() {
  return this.changePassword.controls;
}
  
  
  // private validdateAllFromFileds(formGroup:FormGroup)
  // {
  //   Object.keys(formGroup.controls).forEach(field=>{
  //     const control = formGroup.get(field);
  //     if(control instanceof FormControl){
  //       control.markAsDirty({onlySelf:true});
  //     }  
  //     else if(control instanceof FormGroup){
  //       this.validdateAllFromFileds(control)
  //     }    
  //   })
  // }
}
