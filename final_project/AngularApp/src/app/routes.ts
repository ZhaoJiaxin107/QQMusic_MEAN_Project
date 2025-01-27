import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { SongComponent } from './song/song.component';
import { DetailsComponent } from './details/details.component';
import { ReviewdetailsComponent } from './reviewdetails/reviewdetails.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistdetailComponent } from './playlistdetail/playlistdetail.component';
import { UpdateplaylistComponent } from './updateplaylist/updateplaylist.component';
import { AdminComponent } from './admin/admin.component';
import { GooglepageComponent } from './googlepage/googlepage.component';
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
        path:'playlist',component:PlaylistComponent
    },
    {
        path:'playlistdetail',component:PlaylistdetailComponent
    },
    {
        path:'updateplaylist/:id',component:UpdateplaylistComponent
    },
    {
        path:'admin',component:AdminComponent
    },
    {
        path:'googlepage',component:GooglepageComponent
    },
    {
        path:'',redirectTo:'/home',pathMatch:'full'
    }

];