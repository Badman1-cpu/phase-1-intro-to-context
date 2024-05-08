// Your code here

//The payroll system

//create employee record function
function createEmployeeRecord(array){
    return {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : []
    }
}

function createEmployeeRecords(employeeData){
   return employeeData.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });

    return employee;
}
function createTimeOutEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    });

    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);

    if (timeIn && timeOut) {
        return (timeOut.hour - timeIn.hour) / 100;
    }

    return 0;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate all wages for an employee
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((totalWages, timeInEvent) => {
        return totalWages + wagesEarnedOnDate(employee, timeInEvent.date);
    }, 0);
}

// Function to calculate payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor(employee);
    }, 0);
}

// Example usage:
const employeeData = [
    ["John", "Doe", "Manager", 20],
    ["Jane", "Doe", "Assistant", 15]
];

const employees = createEmployeeRecords(employeeData);

createTimeInEvent(employees[0], "2024-05-07 08:00");
createTimeOutEvent(employees[0], "2024-05-07 17:00");
createTimeInEvent(employees[1], "2024-05-07 09:00");
createTimeOutEvent(employees[1], "2024-05-07 16:00");