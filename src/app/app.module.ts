import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Pipe } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { AppRouting } from './app.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import {HTTP_INTERCEPTORS} from '@angular/common/http'

//services
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticateUserService } from './services/authenticate-user.service';
import { QuestionService } from './services/question.service';
import { UserAccountService } from './services/user-account.service';
import { QuizService } from './services/quiz.service';
import { ParticipantService } from './services/participant.service';

//pipes
import { QuizFilterPipe } from './pipes/quiz-filter.pipe';
import { QuestionFilterPipe } from './pipes/question-filter.pipe';
import { UsersFilterPipe } from './pipes/users-filter.pipe';


//components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { QuestionPaperComponent } from './components/question-paper/question-paper.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionResultStutasBarComponent } from './components/question-result-stutas-bar/question-result-stutas-bar.component';
import { QuizesComponent } from './components/quizes/quizes.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { QuizMasterComponent } from './components/quiz-master/quiz-master.component';
import { ShowValidationErrorComponent } from './components/show-validation-error/show-validation-error.component';
import { QuestionPaperAdminViewComponent } from './components/question-paper-admin-view/question-paper-admin-view.component';
import { QuestionMasterComponent } from './components/question-master/question-master.component';
import { QuestionViewComponent } from './components/question-view/question-view.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuestionsListDialogComponent } from './components/questions-list-dialog/questions-list-dialog.component';
import { ParticipantRegistrationComponent } from './components/participant-registration/participant-registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StartQuizParticipatePageComponent } from './components/start-quiz-participate-page/start-quiz-participate-page.component';
import { StartQuizDialogComponent } from './components/start-quiz-dialog/start-quiz-dialog.component';
import { QuizAnswerSheetComponent } from './components/quiz-answer-sheet/quiz-answer-sheet.component';
import { QuizBoardComponent } from './components/quiz-board/quiz-board.component';
import { ParticipantListComponent } from './components/participant-list/participant-list.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { TimerComponent } from './components/shared/timer/timer.component';
import { AppUsersComponent } from './components/app-users/app-users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { RouteMiddleware } from './shared/RouteMiddleware';
import { LoadingIndicatorService } from './services/loading-indicator.service';
import { AppMaterialModule } from './app-material.module';
import { AppKendoModule } from './app-kendo.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignUpComponent,
    QuestionPaperComponent,
    QuizAnswerSheetComponent,
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
    QuestionListComponent,
    StartQuizDialogComponent,
    QuestionViewComponent,
    QuizResultComponent,
    QuestionsListDialogComponent,
    ParticipantRegistrationComponent,
    DashboardComponent,
    StartQuizParticipatePageComponent,
    QuizBoardComponent,
    ParticipantListComponent,
    TimerComponent,
    AppUsersComponent,
    UsersFilterPipe,
    ProfileComponent,
    ChangePasswordComponent,
    CompareValidatorDirective,    
  ],
  imports: [
    BrowserModule,    
    BrowserAnimationsModule,
    AppMaterialModule,
    AppKendoModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouting,
    HttpClientModule,
    HttpModule,
    NgxPaginationModule,

  ],
  providers: [
    LoadingIndicatorService,
    AuthService,
    AuthGuardService,
    AuthenticateUserService,
    UserAccountService,
    QuizService,
    QuestionService,
    ParticipantService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:RouteMiddleware,
      multi:true
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
