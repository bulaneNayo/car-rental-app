import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo,redirectLoggedInTo,canActivate } from '@angular/fire/auth-guard'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'admin-login',
    loadChildren: () => import('./admin-login/admin-login.module').then( m => m.AdminLoginPageModule)
  },
  {
    path: 'user-login',
    loadChildren: () => import('./user-login/user-login.module').then( m => m.UserLoginPageModule)
  },
  
  {
    path: 'user-register',
    loadChildren: () => import('./user-register/user-register.module').then( m => m.UserRegisterPageModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  {
    path: 'reservations',
    loadChildren: () => import('./reservations/reservations.module').then( m => m.ReservationsPageModule)
  },
  {
    path: 'booking-details',
    loadChildren: () => import('./booking-details/booking-details.module').then( m => m.BookingDetailsPageModule)
  },
  {
    path: 'user-reservation-details',
    loadChildren: () => import('./user-reservation-details/user-reservation-details.module').then( m => m.UserReservationDetailsPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'reservations-modal',
    loadChildren: () => import('./reservations-modal/reservations-modal.module').then( m => m.ReservationsModalPageModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicles/vehicles.module').then( m => m.VehiclesPageModule)
  },
  {
    path: 'user-feedback',
    loadChildren: () => import('./user-feedback/user-feedback.module').then( m => m.UserFeedbackPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'network',
    loadChildren: () => import('./network/network.module').then( m => m.NetworkPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'battery',
    loadChildren: () => import('./battery/battery.module').then( m => m.BatteryPageModule)
  },
  {
    path: 'update-hehicles',
    loadChildren: () => import('./update-hehicles/update-hehicles.module').then( m => m.UpdateHehiclesPageModule)
  },
  {
    path: 'update-modal',
    loadChildren: () => import('./update-modal/update-modal.module').then( m => m.UpdateModalPageModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./route/route.module').then( m => m.RoutePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
