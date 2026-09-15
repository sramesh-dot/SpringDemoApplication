import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStudent from "../hooks/useStudent";


function StudentForm() {

    const navigate = useNavigate();

    const { addStudent } = useStudent();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        if (!name.trim()) {
            setError("Name is required");
            return;
        }

        if (Number(age) <= 0) {
            setError("Age must be greater than 0");
            return;
        }

        const student = {
            name: name,
            age: Number(age)
        };

        try {

            setLoading(true);

            await addStudent(student);

            navigate("/students");

        } catch (error) {

            console.error(error);

            setError("Failed to create student");

        } finally {

            setLoading(false);

        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <div>

                <label>Name</label>

                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

            </div>

            <div>

                <label>Age</label>

                <input
                    type="number"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                />

            </div>

            {error && <p>{error}</p>}

            <button
                type="submit"
                disabled={loading}
            >
                {loading ? "Saving..." : "Add Student"}
            </button>

            <button
                type="button"
                onClick={() => navigate("/students")}
            >
                Cancel
            </button>

        </form>
    );
}

export default StudentForm;