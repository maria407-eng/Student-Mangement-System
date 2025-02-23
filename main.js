#! /usr/bin/env node
import inquirer from "inquirer";
// Define the student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize an empty array for courses
        this.balance = 100;
    }
    //Method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    //Method to view a student balance
    view_balance() {
        console.log(`Balance for  ${this.name} : $ ${this.balance}`);
    }
    //Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$ ${amount} Fees paid successfuly for ${this.name}`);
        console.log(`Remaining balance is $${this.balance}`);
    }
    //Method to display student status
    show_status() {
        console.log(` ID :${this.id}`);
        console.log(` Name :${this.name}`);
        console.log(` Courses :${this.courses}`);
        console.log(` Balance :${this.balance}`);
    }
}
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //Method to add a new student to the manager
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfuly .Student ID: ${student.id} `);
    }
    //method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.students.find(std => std.id === student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfuly`);
        }
    }
    //Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found. please enter a correct Student ID");
        }
    }
    //Method  to pay a student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found. please enter a correct Student ID ");
        }
    }
    //Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    //Method to find a student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
//Main Function to run the program
async function main() {
    console.log("\t \n Welcome to 'CodeWithMaria' - Student Management System\t \ n");
    console.log("-".repeat(50));
    let student_manager = new Student_manager();
    //while loop to keep programming running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exist"
                ]
            }
        ]);
        // Using  switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exist":
                console.log("Existing...");
                process.exit();
        }
    }
}
//Calling a main Function
main();
