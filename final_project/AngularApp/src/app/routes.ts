import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { SongComponent } from './song/song.component';
import { DetailsComponent } from './details/details.component';
import { ReviewdetailsComponent } from './reviewdetails/reviewdetails.component';
export const appRoutes:Routes = [
    {
        path:'signup',component:UserComponent,
        children:[{path:'',component:SignUpComponent}]
    },
    {
        path:'login',component:UserComponent,
        children:[{path:'',component:SignInComponent}]
    },
    {
        path:'userprofile',component:UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path:'home',component:SongComponent
    },
    {
        path:'details/:id',component:DetailsComponent
    },
    {
        path:'moredetails',component:ReviewdetailsComponent
    },
    {
        path:'',redirectTo:'/home',pathMatch:'full'
    }

];