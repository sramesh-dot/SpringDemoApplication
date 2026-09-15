import  useStudent  from "../hooks/useStudent";

import StudentCard from "./StudentCard";

function StudentList() {
    const {
        students,
        removeStudent,
        updateStudentInState    
    } = useStudent();

   if (students.length === 0) {
        return <p>No students found.</p>;
    }

    return (
        <div>
            {students.map((student) => (
                <StudentCard
                    key={student.id}
                    student={student}
                    onStudentUpdated={updateStudentInState}
                    onDelete={removeStudent}
                />
            ))}           
        </div>
    );
}

export default StudentList;