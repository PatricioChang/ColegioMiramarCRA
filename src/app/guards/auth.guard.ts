import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const login= inject(LoginService)
  const router= inject(Router)

  return login.isLoggedIn();
};

export const notLogged: CanActivateFn = (route, state) => {
  const login = inject(LoginService)
  return login.isAlreadyLogged();
};