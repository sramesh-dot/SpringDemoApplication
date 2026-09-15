import { useState } from "react";
import EditStudentForm from "./EditStudentForm";
import { Link } from "react-router-dom";

function StudentCard({ student, onDelete, onStudentUpdated}) {

    const [isEditing, setIsEditing] = useState(false);

    if(isEditing) {
    return(
        <EditStudentForm
            student={student}
            onStudentUpdated={(updatedStudent) => {   
                
                console.log("2. StudentCard received:", updatedStudent);

                onStudentUpdated(updatedStudent);
                setIsEditing(false);
            }}
            onCancel={()=> setIsEditing(false)}
        />
    );
}

    return (
        <div>
            <p>ID: {student.id}</p>
            <p>Name: {student.name}</p>
            <p>Age: {student.age}</p>

            <button onClick={()=> setIsEditing(true)}>
                Edit
            </button>

            <button onClick = {() => onDelete(student.id)}>
                Delete
            </button>

            <Link to={`/students/${student.id}`}>
                View Details
            </Link>

        </div>
    );
}

export default StudentCard;