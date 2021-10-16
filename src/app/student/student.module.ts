import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentItemComponent } from './pages/student-item/student-item.component';
import { StudentLayoutComponent } from './shered/components/student-layout/student-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    StudentListComponent,
    StudentItemComponent,
    StudentLayoutComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
