import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { StorageServiceService } from '../services/storage-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hidePassword = true;
  responseMessage = "Login Successful";
  userName:string ='';


  toggleVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toaster: ToastrService) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    localStorage.setItem("email", this.loginForm.value.email);

    this.userService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.userService.saveUserData(res.user);
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole
          } 
          this.userName = res.name;
          console.log(this.userName);
          console.log(user);
          StorageServiceService.saveToken(res.jwt);
          StorageServiceService.saveUser(user);
          localStorage.setItem('name',this.userName);
          this.toaster.success('Login Successful', 'Success');
          this.router.navigate(['/dashboard']);
        }
        else {
          this.toaster.error('Login Failed', 'Error');
        }
      },
      error: (err) => {
        this.toaster.error('Login Failed, Please check your credentials', 'Error');
      }
    });
  }
}