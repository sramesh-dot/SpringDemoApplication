import { useState } from "react";
import { updateStudent } from "../services/studentService";

function EditStudentForm ({ student, onStudentUpdated, onCancel }) {

    const [id, setId] = useState(student.id);
    const [age, setAge] = useState(student.age);
    const [name, setName] = useState(student.name);

    async function handleUpdate(event) {

        event.preventDefault();

        const updatedStudent = {
            id: Number(id),
            name: name,
            age: Number(age)
        }
        try {
            const result = await updateStudent(student.id, updatedStudent);

            onStudentUpdated(result);
            console.log("1. PUT result:", result);

        } catch (error) {
            console.error(error);
        }

    }
    return (
        <form onSubmit={handleUpdate}>
               
            <input
                value={id}
                onChange={event => setId(event.target.value)}
                placeholder="ID"
            />

            <input
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder="Name"
            />

            <input
                value={age}
                onChange={event => setAge(event.target.value)}
                placeholder="Age"
            />

            <button type="submit">
                Update
            </button>

            <button 
                type="button"
                onClick={onCancel}
            >
                Cancel
            </button>

        </form>
    )

}
export default EditStudentForm;