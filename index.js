// Your code here

const { type } = require("server/reply")

function createEmployeeRecord(employeeData){
 const   [firstName, familyName, title, payPerHour] = employeeData
 return{
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: []

 }
}

const employee = createEmployeeRecord(["Bill", "Gates", "CEO", 65])

console.log(employee)

function createEmployeeRecords(employeesData){
    return employeesData.map(createEmployeeRecord)
}

const employeesData = [
    ["Kendall", "Jenner", "Model", 100],
    ["Bille", "Elish", "Singer", 70],
    ["John", "Grisham", "Author", 50]
]

const employees = createEmployeeRecords(employeesData)
console.log(employees);

function createTimeInEvent(employeeRecord,  dateStamp){
    const [date, hour] = dateStamp.split(' ')

    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }


employeeRecord.timeInEvents.push(timeInEvent)
return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const [date, hour] = dateStamp.split(' ')

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord
}


function hoursWorkedOnDate(employeeRecord, date){
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date)

    if(!timeInEvent || !timeOutEvent) {
        return 0
    }

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour)/100
    return hoursWorked
}
 function wagesEarnedOnDate(employeeRecord, date){
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    const toBePaid = hoursWorked * employeeRecord.payPerHour
    return toBePaid
 }

let employeeRecord = createEmployeeRecord(["Spongebob", "Squarepants", "Cook", 20])
employeeRecord = createTimeInEvent(employeeRecord, "2009-03-12 0800")
employeeRecord = createTimeOutEvent(employeeRecord, "2009-03-12 1600")

const hoursWorked = hoursWorkedOnDate(employeeRecord, "2009-03-12")
console.log("Hours Worked", hoursWorked)

const wages = wagesEarnedOnDate(employeeRecord, "2009-03-12")
console.log( "wages earned", wages);

function allWagesFor (employeeRecord){
    return employeeRecord.timeInEvents.reduce((total, timeInEvent) => {
        const date = timeInEvent.date
        return total + wagesEarnedOnDate(employeeRecord, date)
    }, 0)
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce((totalPayroll, employeeRecord) =>{
    return totalPayroll + allWagesFor(employeeRecord)
    }, 0)
}

const allWagesForSpongebob = allWagesFor(employeeRecord)
console.log("Spongebob's wages", allWagesForSpongebob);

const payroll = calculatePayroll([employeeRecord])
console.log("Total Payroll", payroll);