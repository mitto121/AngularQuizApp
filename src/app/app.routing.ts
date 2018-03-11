import { Route, RouterModule, CanActivate } from '@angular/router';

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

import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Route[] = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'signup', component: SignUpComponent },
    { path: 'startQuiz/:id', component: StartQuizParticipatePageComponent },
    { path: 'quiz/:id/:participantId', component: QuestionPaperComponent },
    {
      path: 'home', component: DashboardComponent, canActivate: [AuthGuardService], children: [
        { path: 'quizes', component: QuizesComponent, outlet: 'dashboard' },
        { path: 'questions', component: QuestionListComponent, canActivate: [AuthGuardService], outlet: 'dashboard' },
        { path: 'quizResult', component: QuizResultComponent, canActivate: [AuthGuardService], outlet: 'dashboard' },
      ]
    },
    { path: 'participants/:quizId', component: ParticipantListComponent, canActivate: [AuthGuardService] },
    { path: 'quizMaster/Create', component: QuizMasterComponent, canActivate: [AuthGuardService] },
    { path: 'quizMaster/Edit/:id', component: QuizMasterComponent, canActivate: [AuthGuardService] },
    { path: 'quizResult/:id/:participantId', component: QuizAnswerSheetComponent, canActivate: [AuthGuardService] },
    { path: 'questionPaper/:id', component: QuestionPaperAdminViewComponent, canActivate: [AuthGuardService] },
    { path: 'questionMaster/Create/:id', component: QuestionMasterComponent, canActivate: [AuthGuardService] },
    { path: 'question/:id/:viewMode', component: QuestionViewComponent, canActivate: [AuthGuardService] },
    { path: '**', component: PageNotFoundComponent }
  ];
  

  export const AppRouting = RouterModule.forRoot(appRoutes);