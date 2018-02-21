import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Route, RouterModule, CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { QuizMasterComponent } from './components/quiz-master/quiz-master.component';
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
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { ShowValidationErrorComponent } from './components/show-validation-error/show-validation-error.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticateUserService } from './services/authenticate-user.service';
import { QuestionPaperAdminViewComponent } from './components/question-paper-admin-view/question-paper-admin-view.component';

const route: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', component: QuizMasterComponent, canActivate: [AuthGuardService] },
  { path: 'quiz/:id', component: QuestionPaperComponent, canActivate: [AuthGuardService] },
  { path: 'quizes', component: QuizesComponent, canActivate: [AuthGuardService] },
  { path: 'addNewQuiz', component: AddQuizComponent, canActivate: [AuthGuardService] },
  { path: 'setQuestionPaper/:id', component: QuestionPaperAdminViewComponent, canActivate: [AuthGuardService] },  
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    QuizMasterComponent,
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
    ModalWindowComponent,
    AddQuizComponent,
    ShowValidationErrorComponent,
    QuestionPaperAdminViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(route)
  ],
  providers: [QuizService,
    AuthService,
    AuthGuardService,
    AuthenticateUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
