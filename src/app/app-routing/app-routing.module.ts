import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppNavComponent } from '../app-nav/app-nav.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { WelcomeComponent } from '../welcome/welcome.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: 'welcome', component:WelcomeComponent },
        { path: '', redirectTo:'welcome', pathMatch:"full" },
        { path: '**' ,component: PageNotFoundComponent}
      ]
      ),
    CommonModule
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
