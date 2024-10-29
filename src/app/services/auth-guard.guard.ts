import { CanActivateFn } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    window.location.href = "/login";
    return false;
  }
};
