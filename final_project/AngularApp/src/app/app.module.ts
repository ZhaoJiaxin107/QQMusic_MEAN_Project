//built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule,MatSortModule } from '@angular/material';
import { MatIconModule,MatButtonModule } from '@angular/material';
import { MatFormFieldModule,MatInputModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { from } from 'rxjs';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { SongService } from './shared/song.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider} from 'ng4-social-login';
import { SongComponent } from './song/song.component';
import { DetailsComponent } from './details/details.component';
import { ReviewdetailsComponent } from './reviewdetails/reviewdetails.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistdetailComponent } from './playlistdetail/playlistdetail.component';
import { UpdateplaylistComponent } from './updateplaylist/updateplaylist.component';
import { AdminComponent } from './admin/admin.component';
const config = new AuthServiceConfig([
{
  id:GoogleLoginProvider.PROVIDER_ID,
  provider:new GoogleLoginProvider('242896001594-m6n1m47msroiut12esi21u0pr1o87nt4.apps.googleusercontent.com')
}
],false);

export function provideConfig(){
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    SongComponent,
    DetailsComponent,
    ReviewdetailsComponent,
    PlaylistComponent,
    PlaylistdetailComponent,
    UpdateplaylistComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },{provide:AuthServiceConfig,
    useFactory:provideConfig
  },AuthGuard,UserService,SongService],
  bootstrap: [AppComponent]
})
export class AppModule { }
