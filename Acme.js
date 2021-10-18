/*
The Acme Company keeps track of their management structure in an array.

Your task is to write some functions to help them find information about them.

Put your solution in a github repo named acme_employees_js.

Functions required per code provided: 
[[[1. Find an employee by name:
findEmployeeByName
// given a name and array of employees, return employee

[[[2. Find an employee's manager:
findManagerFor
//given an employee and a list of employees, return the employee who is the manager

[[[3. Find coworkers of an employee:
findCoworkersFor
//given an employee and a list of employees, return the employees who report to the same manager

4. Find management chain: 
findManagementChain
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 

5. Generate a management tree: 
generateManagementTree
////given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.


6. Display management tree previously generated
displayManagementTree
//given a tree of employees, generate a display which displays the hierarchy


*/

const employees = [
  { id: 1, name: "moe" },
  { id: 2, name: "larry", managerId: 1 },
  { id: 4, name: "shep", managerId: 2 },
  { id: 3, name: "curly", managerId: 1 },
  { id: 5, name: "groucho", managerId: 3 },
  { id: 6, name: "harpo", managerId: 5 },
  { id: 8, name: "shep Jr.", managerId: 4 },
  { id: 99, name: "lucy", managerId: 1 },
];

function findEmployeeByName(search, someArray) {
  for (let i = 0; i < someArray.length; i++) {
    const searchIndex = Object.values(someArray[i]);
    if (searchIndex[1] === search) {
      console.log(
        `${searchIndex[1]} is an employee of Acme and his employee ID is ${searchIndex[0]}`
      );
      return someArray[i];
    }
  }
}

findEmployeeByName("larry", employees);

function findManagerFor(search, someArray) {
  for (let i = 0; i < someArray.length; i++) {
    const searchIndex = Object.values(someArray[i]);
    if (searchIndex[1] === search) {
      const managerID = searchIndex[2];
      for (let j = 0; j < someArray.length; j++) {
        const searchManager = Object.values(someArray[j]);
        if (searchManager[0] === managerID) {
          console.log(`The manager for ${search} is ${searchManager[1]}`);
          return someArray[j];
        } else {
          console.log(`${search} does not have a manager`);
        }
      }
    }
  }
}

findManagerFor("larry", employees);

function findCoworkersFor(search, someArray) {
  const coworkers = [];
  for (let i = 0; i < someArray.length; i++) {
    const searchIndex = Object.values(someArray[i]);
    if (searchIndex[1] === search) {
      const managerID = searchIndex[2];
      for (let j = 0; j < someArray.length; j++) {
        const searchManager = Object.values(someArray[j]);
        if (
          searchManager[2] === managerID &&
          searchManager[1] != searchIndex[1]
        ) {
          coworkers.push(someArray[j]);
        }
      }
    }
  }
  console.log(coworkers);
}

findCoworkersFor("larry", employees);
