import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule, CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { QuizService } from './services/quiz.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { QuizMaster } from './models/quiz-master';
import { QuestionPaperComponent } from './components/question-paper/question-paper.component';
import { MenuComponent } from './components/menu/menu.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionResultStutasBarComponent } from './components/question-result-stutas-bar/question-result-stutas-bar.component';
import { QuizesComponent } from './components/quizes/quizes.component';
import { QuizFilterPipe } from './shared/quiz-filter.pipe';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { QuizMasterComponent } from './components/quiz-master/quiz-master.component';
import { ShowValidationErrorComponent } from './components/show-validation-error/show-validation-error.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticateUserService } from './services/authenticate-user.service';
import { QuestionPaperAdminViewComponent } from './components/question-paper-admin-view/question-paper-admin-view.component';
import { QuestionMasterComponent } from './components/question-master/question-master.component';
import { DisplayDirective } from './shared/display.directive';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { QuestionService } from './services/question-service.service';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { UserAccountService } from './services/user-account.service';
import { StartQuizComponent } from './components/start-quiz/start-quiz.component';
import { QuestionFilterPipe } from './shared/question-filter.pipe';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { QuestionViewComponent } from './components/question-view/question-view.component';

const route: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuardService] },
  { path: 'quizMaster/Create', component: QuizMasterComponent, canActivate: [AuthGuardService] },
  { path: 'quizMaster/Edit/:id', component: QuizMasterComponent, canActivate: [AuthGuardService] },
  { path: 'startQuiz/:id', component: StartQuizComponent, canActivate: [AuthGuardService] },
  { path: 'quiz/:id', component: QuestionPaperComponent, canActivate: [AuthGuardService] },
  { path: 'quizResult/:id', component: QuizResultComponent, canActivate: [AuthGuardService] },
  {
    path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuardService], data: { userRole: 'ADMIN' }, children: [
      { path: 'quizes', component: QuizesComponent, outlet: "admin" },
      { path: '', redirectTo: 'quizes', pathMatch: 'full' },
      { path: 'questions', component: QuestionListComponent, outlet: "admin" }
    ]
  },
  { path: 'questionPaper/:id', component: QuestionPaperAdminViewComponent, canActivate: [AuthGuardService], data: { userRole: 'ADMIN' } },
  { path: 'questionMaster/Create/:id', component: QuestionMasterComponent, canActivate: [AuthGuardService], data: { userRole: 'ADMIN' } },
  { path: 'question/:id/:viewMode', component: QuestionViewComponent, canActivate: [AuthGuardService], data: { userRole: 'ADMIN' } },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignUpComponent,
    QuestionPaperComponent,
    MenuComponent,
    QuizResultComponent,
    QuestionComponent,
    QuestionResultStutasBarComponent,
    QuizesComponent,
    QuizFilterPipe,
    QuestionFilterPipe,
    ModalWindowComponent,
    QuizMasterComponent,
    ShowValidationErrorComponent,
    QuestionPaperAdminViewComponent,
    QuestionMasterComponent,
    DisplayDirective,
    AdminDashboardComponent,
    QuestionListComponent,
    StartQuizComponent,
    QuestionViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(route)
  ],
  providers: [QuizService,
    QuestionService,
    AuthService,
    AuthGuardService,
    AuthenticateUserService,
    UserAccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
