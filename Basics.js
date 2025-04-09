db.createCollection("students")

db.students.insertMany([
{student_id:101,name:"Akshay kumar",age:23,department:"Computer Science",courses:["HTML","DATABASE SYSTEM"],grade:"A"},
{student_id:102,name:"Salman khan",age:24,departement:"Information Technology",courses:["Btech","BCOM"],grade:"E"},
{student_id:103,name:"Shahid kapoor",age:20,department:"Hotel Manager",courses:["Bcom","BSC"],grade:"A"},
{student_id:104,name:"John Abraham",age:19,department:"Computer Science",courses:["DATABASE SYSTEM","BSC"],grade:"A"},
{student_id:105,name:"Amir khan",age:24,department:"Computer Science",courses:["PTHON","HTML"],grade:"D"},
])

// 1st  Retrieve all students who are in the "Computer Science" department

db.students.find({department:"Computer Science"})



// 2  Retrieve students who have an age greater than 21. 
 db.students.find({age:{$gt:21}})



// 3rd Retrieve students who are taking the "Database Systems" course.

 db.students.find({courses:"DATABASE SYSTEM"})


// 4thRetrieve students with a grade of "A".


db.students.find({grade:"A"})



// 5th Update the age of a student with student_id 101 to 21.


db.students.updateOne({student_id:101},{$set:{age:21}})



//6th Add a new course, "Machine Learning", to the courses array for students in the "Computer Science" department.


db.students.updateMany({department:"Computer Science"},{$addToSet:{courses:"Machine Learning"}})



//7th Delete a student record with student_id 105.

db.students.deleteOne({student_id:105})



//8th  Delete all students who have a grade lower than "C".

 db.students.deleteMany({grade:{$gte:"C"}})
