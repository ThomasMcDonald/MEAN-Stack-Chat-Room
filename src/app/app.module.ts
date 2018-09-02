import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule }     from './app-routing/app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatInputModule, MatFormFieldModule, MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule, MatGridListModule, MatProgressSpinnerModule, MatMenuModule, MatDividerModule, MatListModule, MatDialogModule, MatSelectModule, MatTooltipModule } from '@angular/material';

import { AppComponent } from './app.component';

// Pages
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomComponent } from './room/room.component';

//Modal Dialog
import { NewUserComponent } from './modals/new-user/new-user.component';
import { AddToGroupComponent } from './modals/add-to-group/add-to-group.component';
import { NewGroupComponent } from './modals/new-group/new-group.component';
import { NewChannelComponent } from './modals/new-channel/new-channel.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NewUserComponent,
    RoomComponent,
    AddToGroupComponent,
    NewGroupComponent,
    NewChannelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule
  ],
  entryComponents: [NewUserComponent,AddToGroupComponent,NewGroupComponent, NewChannelComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
