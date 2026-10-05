import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useStudent from "../hooks/useStudent";

function EditStudentPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { getStudentById, updateStudent } = useStudent();

    const [student, setStudent] = useState(null);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {

        async function loadStudent() {

            try {

                setLoading(true);

                const data = await getStudentById(id);

                setStudent(data);

                setName(data.name);
                setAge(data.age);

            } catch (error) {

                console.error(error);

                if (error.response?.status === 404) {
                    setError("Student not found.");
                } else {
                    setError("Failed to load student.");
                }

            } finally {

                setLoading(false);

            }
        }

        loadStudent();

    }, [id, getStudentById]);


    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");

            const updatedStudent = {
                id: student.id,
                name: name,
                age: Number(age)
            };

            await updateStudent(id, updatedStudent);

            navigate(`/students/${id}`);

        } catch (error) {

            console.error(error);

            setError("Failed to update student.");

        } finally {

            setSaving(false);

        }
    }


    if (loading) {
        return <p>Loading student...</p>;
    }


    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div>

            <h2>Edit Student</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Name</label>

                    <input
                        value={name}
                        onChange={event =>
                            setName(event.target.value)
                        }
                    />
                </div>

                <div>
                    <label>Age</label>

                    <input
                        value={age}
                        onChange={event =>
                            setAge(event.target.value)
                        }
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Update"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate(`/students/${id}`)}
                >
                    Cancel
                </button>

            </form>

        </div>
    );
}

export default EditStudentPage;