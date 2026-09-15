import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStudent from "../hooks/useStudent";
import { useNavigate } from "react-router-dom";


function StudentDetailsPage() {

    const { id } = useParams();

    const { getStudentById } = useStudent();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();


    useEffect(() => {

        async function loadStudent() {

            try {

                setLoading(true);
                setError("");

                const data = await getStudentById(id);

                setStudent(data);

            } catch (error) {

                console.error(error);

                setError("Failed to load student");

            } finally {

                setLoading(false);
            }
        }

        loadStudent();

    }, [id, getStudentById]);


    if (loading) {
        return <p>Loading student...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!student) {
        return <p>Student not found.</p>;
    }


    return (
        <div>

            <h2>Student Details</h2>

            <p>ID: {student.id}</p>
            <p>Name: {student.name}</p>
            <p>Age: {student.age}</p>

            <button onClick={() => navigate(-1)}>
                Back
            </button>

        </div>
    );
}

export default StudentDetailsPage;