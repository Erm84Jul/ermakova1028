import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/shared/interfaces/student.interfaces';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {


  students!: Student[];
  constructor(
    private StudentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  async getStudents() {
    try {
      this.students = await this.StudentService.getStudents() || [];
      this.students.sort((a, b) => { return a.surname < b.surname ? -1 : 1 });
    } catch (error) {
      console.log(error)
    }
  }

  itemStudent(id?: number) {
    if (id) {
      this.router.navigate([this.router.url, 'item', id]);
    }
    else {
      this.router.navigate([this.router.url, 'item']);
    }
  }

  async saveStudent(id: any, student: Student) {
    try {
      await this.StudentService.editStudent(id, student);
      this.getStudents();
    }
    catch (error) {
      console.log(error);
    }
  }

}

