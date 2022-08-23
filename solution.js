'use strict';
// School app
//     create app to add, remove, read and edit Students and Classes in a School
//         the School model:
//        School=[ classObject1,classObject2,....]
//         the class model:
//      {
//          name: "FbW3",
//          students: [studentObject1, studentObject1,...],
//      }
//         the Student model:
//     {
//             name: "Pilar",
//             email: "pilar@yahoo.com",
//             city: "Berlin",
//     }
// School data model:
let School = [
    {
        name: "FbW1",
        students: [
            {
                name: "Alex",
                email: "alex@yahoo.com",
                city: "Berlin",
            },
            {
                name: "Max",
                email: "max@yahoo.com",
                city: "Hamburg",
            },
        ],
    },
    {
        name: "FbW2",
        students: [
            {
                name: "Jon",
                email: "jon@yahoo.com",
                city: "Berlin",
            },
            {
                name: "Pilar",
                email: "pilar@yahoo.com",
                city: "Berlin",
            },
        ],
    },
    {
        name: "FbW3",
        students: [],
    },
];

// Tasks
// App Functions
//     Functions arguments ==> Passing one single object as argument holds all the arguments.
//     createClass function which takes argument(object) holds class name



function createClass({ name: className }, aSchool = School) {
    aSchool.push({ name: className, students: [] })
}
createClass({ name: 'Class10' });

//     create student function which takes argument(object) holds class ID and the student data
//   {
//         name: "Pilar",
//         email: "pilar@yahoo.com",
//         city: "Berlin",
//   }

function createStudent({ classID, newStudent }, aSchool = School) {
    aSchool[classID - 1].students.push(newStudent);
}

createStudent(
    {
        classID: 4,
        newStudent: {
            name: "Johnnny",
            email: "johnny@yahoo.com",
            city: "Paris",
        }
    });
//     create removeClass function which takes ID and remove class by ID

function removeClass({ classID }, aSchool = School) {
    aSchool.splice([classID - 1], 1);
}

// removeClass({ classID: 4 });

//     create removeStudent function which takes argument(object) holds class ID and the student ID
function removeStudent({ classID, studentID }, aSchool = School) {
    //    delete aSchool[classID - 1].students[studentID - 1];
    aSchool[classID - 1].students.splice(studentID - 1, 1);
}
//removeStudent({ classID: 4, studentID: 1 });
//     create editStudent function which takes argument(object) with holds class ID and the student ID
// editStudent ==> info name, email and city.
function editStudent({ classID, studentID, name, email, city, info }, aSchool = School) {
    aSchool[classID - 1].students[studentID - 1] = { name, email, city, info };
}
editStudent({ classID: 4, studentID: 1, name: 'Rami', email: 'rami222@email.com', city: 'Beirut' });
//     create function call RenderSchoolTemplate
//     This function Format and render School data
function RenderSchoolTemplate(aSchool = School) {
    let SchoolStudents = 0;
    let output = '';
    output += '\n';
    output += ' School Classes:';
    output += '\n------------------\n';
    if (aSchool.length > 0) {
        for (let i = 0; i < aSchool.length; i++) {
            output += ' ' + aSchool[i].name + ' - (class ID: ' + (i + 1) + '):';
            if (aSchool[i].students.length > 0)
                for (let j = 0; j < aSchool[i].students.length; j++) {
                    output += '\n ' + (j + 1) + '- ' + aSchool[i].students[j].name + ', ' + aSchool[i].students[j].email + ', ' + aSchool[i].students[j].city + ' - (student ID: ' + (j + 1) + ').';
                    SchoolStudents++;
                }
            else
                output += '\n  The class is empty '
            output += '\n********************************************\n';
        }
        output += ' Total Classes ' + aSchool.length + ', total students ' + SchoolStudents + '\n';
    }
    else
        output += '  The School is empty\n';
    console.log(output);
    return output;
}
RenderSchoolTemplate();

// Final Template

//  School Classes: 
// ------------------ 
//  FbW1 - (class ID: 1): 
//   1- Alex, alex@yahoo.com, Berlin - (student ID: 1).
//   2- Max, max@yahoo.com, Hamburg - (student ID: 2).
// ******************************************** 
//  FbW2 - (class ID: 2): 
//   1- Jon, jon@yahoo.com, Berlin - (student ID: 1).
//   2- Pilar, pilar@yahoo.com, Berlin - (student ID: 2).
// ******************************************** 
//  FbW3 - (class ID: 3): 
//    The class is empty 
// ******************************************** 
//   Total Classes 3, total students 4
//
