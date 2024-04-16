import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  public employees: Employee[] | undefined;
  public editEmployee: Employee | undefined;

public onAddEmployee(addForm: NgForm): void {     
  document.getElementById('add-employee-form')?.click();
  this.employeeService.addEmployee(addForm.value).subscribe(
    (response: Employee) => {
      console.log(response)
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    }
  )
}
public onUpdateEmployee(employee: Employee): void {   
  //document.getElementById('add-employee-form')?.click();
  this.employeeService.updateEmployee(employee).subscribe(
    (response: Employee) => {
      console.log(employee)
      //console.log(response)
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    }
  )
}



  constructor(private employeeService: EmployeeService){ }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployee().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };

  public onOpenModal(employee: Employee | undefined, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode ==='add') {
      button.setAttribute('data-target', '#addEmployeeModal')
    }
    if (mode ==='edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal')
    }
    if (mode ==='delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal')
    }

    container?.appendChild(button)
    button.click();
  }
}
