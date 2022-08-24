'use strict';



let School = {
    id: 1,
    classes: [
        {
            id: 1,
            name: "FbW1",
            students: [
                {
                    id: 1,
                    name: "Alex",
                    email: "alex@yahoo.com",
                    city: "Berlin",
                },
                {
                    id: 2,
                    name: "Max",
                    email: "max@yahoo.com",
                    city: "Hamburg",
                },
            ],
        },
        {
            id: 2,
            name: "FbW2",
            students: [
                {
                    id: 1,
                    name: "Jon",
                    email: "jon@yahoo.com",
                    city: "Berlin",
                },
                {
                    id: 2,
                    name: "Pilar",
                    email: "pilar@yahoo.com",
                    city: "Berlin",
                },
            ],
        },
        {
            id: 3,
            name: "FbW3",
            students: [],
        },
    ]
};

function createClass({ name: className = '' } = {}, aSchool = School) {
    if (!arguments[0] || !className) {
        console.log('Class name is required');
        return false;
    }
    let maxID = 0;
    for (let i = 0; i < aSchool.classes.length - 1; i++) {
        maxID = aSchool.classes[i].id > aSchool.classes[i + 1].id ? aSchool.classes[i].id : aSchool.classes[i + 1].id;
    }
    let classID = maxID + 1 || 0;
    if (aSchool.classes) {
        aSchool.classes.push({ name: className, students: [], id: classID });
        return true;
    }
    else
        return false
}

//    function createStudent takes an object that holds the class ID and the student data

function createStudent({ classID, newStudent } = {}, aSchool = School) {
    if (!(classID)) {
        console.log('ClassID is required to add a new student');
        return false;
    }
    if (!(newStudent)) {
        console.log('newStudent (data) is required to add a new student');
        return false;
    }
    let classIndex = findClassIndex(classID);
    if (classIndex === false)
        return false
    let maxID = 0;
    let students = aSchool.classes[classIndex].students;
    if (students.length === 1)
        maxID = students[0].id;
    else if (students.length > 1)
        for (let i = 0; i < students.length - 1; i++) {
            maxID = students[i].id > students[i + 1].id ? students[i].id : students[i + 1].id;
        }
    newStudent.id = maxID + 1;
    students.push(newStudent);
    //    aSchool.classes[classIndex].students[aSchool.classes[classIndex].students.length - 1].id = 3;
}


//     create removeClass function which takes ID and remove class by ID

function removeClass({ classID } = {}, aSchool = School) {
    if (!classID) {
        console.log('classID is needed to remove a class');
        return false;
    }
    let classIndex = findClassIndex(classID);
    if (!(classIndex === false)) {
        aSchool.classes.splice([findClassIndex(classID)], 1);
        return true;
    }
    else
        return false;
}

//removeClass({ classID: 4 });

//     create removeStudent function which takes argument(object) holds class ID and the student ID
function removeStudent({ classID, studentID } = {}, aSchool = School) {
    if (!classID) {
        console.log('classID is needed to remove Student');
        return false;
    }
    if (!studentID) {
        console.log('studentID is needed to remove Student');
        return false;
    }
    //    delete aSchool[classIndex].students[studentID - 1];
    let classIndex = findClassIndex(classID);
    if (classIndex === false)
        return false
    let studentIndex = findStudentIndex(classID, studentID);
    if (studentIndex === false)
        return false
    aSchool.classes[classIndex].students.splice(studentIndex, 1);
    return true;
}
// removeStudent({ classID: 2, studentID: 1 });
//     create editStudent function which takes argument(object) with holds class ID and the student ID
// editStudent ==> info name, email and city.
function findClassIndex(classID, aSchool = School) {
    if (!classID) {
        console.log('classID is needed to find class index');
        return false;
    }
    let classes = aSchool.classes;
    for (let i = 0; i < classes.length; i++)
        if (classes[i].id === classID)
            return i;
    return false;
}
function findStudentIndex(classID, studentID, aSchool = School) {
    if (!classID) {
        console.log('classID is needed to findStudentIndex');
        return false;
    }
    if (!studentID) {
        console.log('studentID is needed to findStudentIndex');
        return false;
    }
    let aClass;
    let classIndex = findClassIndex(classID)
    if (classIndex === false)
        return false;
    if (!(aClass = aSchool.classes[classIndex]))
        return false;
    let students;
    if (!(students = aClass.students))
        return false
    //    console.log(students)
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === studentID)
            return i;
    }
    return false;
}


function editStudent({ classID, studentID, name, email, city, info } = {}, aSchool = School) {
    if (!classID) {
        console.log('classID is needed to editStudent');
        return false;
    }
    if (!studentID) {
        console.log('studentID is needed to editStudent');
        return false;
    }
    let update = { name, email, city, info };
    let classIndex = findClassIndex(classID);
    if (classIndex === false)
        return false
    let studentIndex = findStudentIndex(classID, studentID);
    if (studentIndex === false)
        return false
    aSchool.classes[classIndex].students[studentIndex] = { ...aSchool.classes[classIndex].students[studentIndex], ...update };
}

//     create function call RenderSchoolTemplate
//     This function Format and render School data
function RenderSchoolTemplate(aSchool = School) {
    let SchoolStudents = 0;
    let output = '';
    output += '\n';
    output += ' School Classes:';
    output += '\n------------------\n';
    if (aSchool.classes.length > 0) {
        for (let i = 0; i < aSchool.classes.length; i++) {
            output += ' ' + aSchool.classes[i].name + ' - (class ID: ' + (aSchool.classes[i].id) + '):';
            if (aSchool.classes[i].students.length > 0)
                for (let j = 0; j < aSchool.classes[i].students.length; j++) {
                    output += '\n ' + (j + 1) + '- ' + aSchool.classes[i].students[j].name + ', ' + aSchool.classes[i].students[j].email + ', ' + aSchool.classes[i].students[j].city + ' - (student ID: ' + (aSchool.classes[i].students[j].id) + ').';
                    SchoolStudents++;
                }
            else
                output += '\n  The class is empty '
            output += '\n********************************************\n';
        }
        output += ' Total Classes ' + aSchool.classes.length + ', total students ' + SchoolStudents + '\n\n';
    }
    else
        output += '  The School is empty\n\n';
    console.log(output);
    return true;
}

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


RenderSchoolTemplate();

createClass({ name: 'Class19' });
createClass({ name: 'Class10' });
createStudent(
    {
        classID: 4,
        newStudent: {
            name: "Johnnny",
            email: "johnny@yahoo.com",
            city: "Paris",
        }
    });
createStudent(
    {
        classID: 4,
        newStudent: {
            name: "Johnnny",
            email: "johnny@yahoo.com",
            city: "Paris",
        }
    });
createStudent(
    {
        classID: 4,
        newStudent: {
            name: "Rony",
            email: "rony@yahoo.com",
            city: "Paris",
        }
    });
editStudent({ classID: 4, studentID: 1, name: 'Rami', email: 'rami222@email.com', city: 'Beirut' });

RenderSchoolTemplate();

// createClass();
