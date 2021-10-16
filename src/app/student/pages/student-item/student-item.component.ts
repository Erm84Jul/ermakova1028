import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/shared/interfaces/student.interfaces';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.css']
})
export class StudentItemComponent implements OnInit {

  id: number | null = null;


  student!: Student;
  

  students!: Student[];
 

  studentItem!: FormGroup;
  

  constructor(private fb: FormBuilder,
    private StudentService: StudentService,
    private ActivatedRoud: ActivatedRoute,
    private router : Router) {
  }



  ngOnInit(): void {

    this.ActivatedRoud.params.subscribe((params) => {
      this.id = params.id ? +params.id : null;
      this.getData()
    })
  }

  async getData() {

    const controls = {
      surname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      middlename: [],
      telephone: [null, [Validators.required,Validators.pattern(/8[0-9]{10}/)]],
      email:  [null, [Validators.required,Validators.email]],
      birthday:  [null, [Validators.required]],
      group:  [null, [Validators.required,Validators.pattern(/\d{3}-\d{3}/)]],
      direction:  [null, [Validators.required]]
    };
   



    this.studentItem = this.fb.group(controls);

    try {
      this.students = await this.StudentService.getStudents();
    
    } catch (error) {
      console.log(error)
    }

    if (this.id) {
      try {
        this.student = await this.StudentService.getStudent(this.id);
      }
      catch (error) {
        console.log(error)
      }
      this.studentItem.patchValue(this.student)
    }
    else {
      this.studentItem.reset();
    }

  }

  async addStudent() {

    

    if (this.id) {
      const student = this.studentItem.value;
      try {
        await this.StudentService.editStudent(this.id, student);

      } catch (error) {
        console.log(error);
      } 

    }

    else {
      try {

        const student = this.studentItem.value;

        const result = await this.StudentService.postStudents(student);
        
        this.router.navigate([this.router.url, result.id])

      } catch (error) {
        console.log(error);
      } 

      this.studentItem.reset();

    }

  }

 

  async deleteStudent(id: any) {

    try {
      await this.StudentService.deleteStudent(id)
      this.router.navigate(['student']);
    }
   catch(error)
    {
      console.error();
    }

  }
}
