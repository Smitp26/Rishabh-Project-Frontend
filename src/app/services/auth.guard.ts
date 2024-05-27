import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const toaster = inject(ToastrService);

  const isAuthenticated = authService.isAuthenticated();

  if(!isAuthenticated){
    toaster.error("Please Login First");
    router.navigate(["/login"]);
  }
  
  return isAuthenticated;
};
