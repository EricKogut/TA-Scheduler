import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
  MatSelectModule
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { InstructorRankingPageComponent } from './instructor-ranking-page/instructor-ranking-page.component';
import { InstructorHomepageComponent } from './instructor-homepage/instructor-homepage.component';
import { ResponsesUploadPageComponent } from './responses-upload-page/responses-upload-page.component';
import { CourseViewPageComponent } from './course-view-page/course-view-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ChairHoursComponent } from './chair-hours/chair-hours.component';
import { AlgorithmOrderSelectorComponent } from './algorithm-order-selector/algorithm-order-selector.component';

const myRoutes: Routes =  [
  { path: 'landing', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  {path:  'course', component: CourseViewPageComponent},
  { path: 'instructor-ranking', component: InstructorRankingPageComponent},
  { path: 'instructor', component: InstructorHomepageComponent},
  { path: 'upload', component: ResponsesUploadPageComponent },
  { path: 'hours', component:  ChairHoursComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    LoginPageComponent,
    HeaderComponent,
    LandingPageComponent,
    InstructorRankingPageComponent,
    InstructorHomepageComponent,
    ResponsesUploadPageComponent,
    CourseViewPageComponent,
    SignupPageComponent,
    LandingPageComponent,
    FileUploadComponent,
    ChairHoursComponent,
    AlgorithmOrderSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    RouterModule.forRoot(myRoutes, {useHash:true}),
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
