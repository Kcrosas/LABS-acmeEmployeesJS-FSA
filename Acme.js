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

[[[4. Find management chain: 
findManagementChain
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
Notes: If employee has a manager, then start loop from 0 to employee's managerID to find any searches. Then reverse the array. 


5. Generate a management tree: 
generateManagementTree
////given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. 
///Not sure on how to do this object in array in another object etc...Will have to do some planning


6. Display management tree previously generated
displayManagementTree
//given a tree of employees, generate a display which displays the hierarchy
//Plan if managerid = undefined, add no dashes 
//if manager id = 1, add 1 dash + name to string variable  
//repeat for all with manager ids 
//add


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

//findManagerFor("larry", employees);

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
  console.log(`Coworkers for ${search} are the following:`);
  console.log(coworkers);
}

findCoworkersFor("larry", employees);

function findManagementChain(search, someArray) {
  const tree = [];
  let treeObject = {};
  let reports = {};
  for (let i = 0; i < someArray.length; i++) {
    if (someArray[i].name === search) {
      let limiter = someArray[i].managerId;
      while (limiter > 0) {
        someArray.find((o, x) => {
          if (o.id === limiter) {
            tree.push(someArray[x]);
            limiter = o.managerId;
          }
        });
      }
    }
  }
  /*
  This was an attempt on trying to create the tree structure for the next function but it does not work 
  let limits = tree.length;
  while (limits >= 0) {
    reports = tree[limits];
    treeObject = Object.assign({ treeObject }, { reports });
    console.log(limits);
    limits--;
  }*/
  console.log(`The management chain for ${search} is:`);
  return tree.reverse();
}

console.log(findManagementChain("harpo", employees));

//Solution below as discussed on 10/18/2021, study session after class

//Goal: Determine each step in the method chain and see how it affects the passed in argument
//Side-Goal: Practice the methods filter(), reduce(), and find()
/*
Findings: 
1. Solution's generateManagementTree cannot be run by itself otherwise a maximum callstack error happens. This might be due to nothing stopping it as it continues to call itself. It's a function only meant to be used in generateDirectReports 

2. Currently, this seems to push a generic tree but the structure isn't correct. It pushes the employee object as ANOTHER element in an array rather than pushes the employee object as a value of the previous object's report key. 

*/

const generateManagementTree = () => {
  //The following searches the passed in array of objects and searches for OBJECT that doesn't have the key of managerID then saves it to the variable manager
  const manager = employees.find((employee) => !employee.managerID);
  //Then it returns an object with a manager who has no manager ID and passes itself as a key to reports
  return { ...manager, reports: generateManagementTree(manager, employees) };
};

//console.log(generateManagementTree());

const generateDirectReports = (manager, employees) => {
  return employees
    .filter((employee) => employee.mangerID === manager.id)
    .reduce((acc, employee) => {
      acc.push({
        ...employee,
        reports: generateDirectReports(employee, employees),
      });
      return acc;
    }, []);
};

console.log(generateDirectReports("moe", employees));
