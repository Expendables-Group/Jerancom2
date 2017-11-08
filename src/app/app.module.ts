import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router'
import { AppRoutingModule, routingComponents } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, Headers } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
/*****************************************************************************************************/
import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { signupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home';
import { MapComponent } from './components/map/map.components';
import { LoginComponent } from './components/login/login.component';
import { MaintenanceComponent } from './components/maintenance/maintenance';
import { OthersComponent } from './components/others/others';
import { ToolsComponent } from './components/tools/tools'
import { FernutureComponent } from './components/fernuture/fernuture';
import { ClothesComponent } from './components/clothes/clothes';
import { chatRoomComponent } from './components/chat/chatRoom.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: signupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'clothes', component: ClothesComponent },
  { path: 'others', component: OthersComponent },
  { path: 'fernuture', component: FernutureComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'item', component: ItemComponent },
  { path: 'profiler', component: ProfileComponent },
  { path: 'chatRoom', component: chatRoomComponent },
  { path: 'about', component: AboutComponent }

];
/*****************************************************************************************************/
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    signupComponent,
    ItemComponent,
    MapComponent,
    LoginComponent,
    ToolsComponent,
    MaintenanceComponent,
    OthersComponent,
    routingComponents,
    FernutureComponent,
    ClothesComponent,
    chatRoomComponent,
    ProfileComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    [RouterModule.forRoot(routes, { enableTracing: true })],

    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAaprvcVNVDbJGy7YTZ3OUVCl4c0KvrhTc",
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
/*****************************************************************************************************/
export class AppModule { }
