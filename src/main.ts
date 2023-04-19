import { bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from "@angular/router";

import { provideState, provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";

import { AppComponent } from "@app/app.component";
import { AppRoutes } from "@app/app-router";
import { UsersReducer } from "@state/users/users-store";
import { UsersEffects } from "@app/_state/users/users-effects";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { MatTableModule, MatColumnDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { MatIcon } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RouterModule } from "@angular/router";

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(AppRoutes),
        provideStore(),
        provideState(UsersReducer),
        provideEffects(UsersEffects),
        importProvidersFrom(BrowserAnimationsModule,RouterModule,HttpClientModule,CommonModule,MatProgressSpinnerModule,MatTable,MatIcon,MatTableDataSource,MatSortModule,MatTable,MatTableModule,MatPaginatorModule),
    ]
});