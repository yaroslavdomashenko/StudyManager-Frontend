import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu/menu.component';
import { MenuButtonComponent } from './components/menu/menu-button/menu-button.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/menu/profile/profile.component';
import { LogonComponent } from './components/logon/logon.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserComponent } from './components/users/user/user.component';
import { CourseItemComponent } from './components/courses/course-item/course-item.component';
import { UsersComponent } from './components/users/users/users.component';
import { AddUserToCourseComponent } from './components/courses/add-user-to-course/add-user-to-course.component';
import { CoursesComponent } from './components/courses/courses/courses.component';
import { CourseItemHistoryComponent } from './components/courses/course-item-history/course-item-history.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { UserVisitsComponent } from './components/courses/user-visits/user-visits.component';
import { NotificationsComponent } from './components/menu/notifications/notifications.component';
import { HomeworkComponent } from './components/courses/homework/homework/homework.component';
import { TaskComponent } from './components/courses/homework/task/task.component';
import { HomeworkParentComponent } from './components/courses/homework/homework-parent/homework-parent.component';
import { CreateTaskComponent } from './components/courses/homework/create-task/create-task.component';
import { CommentsComponent } from './components/courses/homework/comments/comments.component';
import { ChatComponent } from './components/chat/chat.component';

const appRoutes: Routes= [
  {path: '', component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logon', component: LogonComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'users', component:UsersComponent},
  {path: 'users/:login', component: UserComponent },
  {path: 'courses', component: CoursesComponent},
  {path: 'courses/:id/history', component: CourseItemHistoryComponent},
  {path: 'admin-panel', component:AdminComponent},
  {path: "chat/:id", component:ChatComponent},

  {path: 'courses/:id', component: CourseItemComponent, children: [
    {path: 'user-visits/:login', component:UserVisitsComponent}
  ]},

  {path: 'homework/:id', component: HomeworkParentComponent, children: [
    {path: '', component: HomeworkComponent},
    {path:'t/:task', component: TaskComponent}
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuButtonComponent,
    LoginComponent,
    ProfileComponent,
    LogonComponent,
    LogoutComponent,
    SettingsComponent,
    UserComponent,
    CourseItemComponent,
    UsersComponent,
    AddUserToCourseComponent,
    CoursesComponent,
    CourseItemHistoryComponent,
    AdminComponent,
    HomeComponent,
    UserVisitsComponent,
    NotificationsComponent,
    HomeworkComponent,
    TaskComponent,
    HomeworkParentComponent,
    CreateTaskComponent,
    CommentsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
