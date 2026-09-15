import {
    createContext,
    useCallback,
    useEffect,
    useState
} from "react";

import {
    getStudents,
    getStudentById as getStudentByIdApi,
    createStudent,
    updateStudent as updateStudentApi,
    deleteStudent
} from "../services/studentService";

const StudentContext = createContext();

function StudentProvider({ children }) {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadStudents = useCallback(async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getStudents();

            setStudents(data);

        } catch (error) {

            console.error(error);
            setError("Failed to load students");

        } finally {

            setLoading(false);

        }

    }, []);

    // GET student by ID
    const getStudentById = useCallback(async (id) => {

        return await getStudentByIdApi(id);

    }, []);

    useEffect(() => {

        loadStudents();

    }, [loadStudents]);    


    async function addStudent(student) {

        const createdStudent = await createStudent(student);

        setStudents(previousStudents => [
            ...previousStudents,
            createdStudent
        ]);

        return createdStudent;
    }


    async function updateStudent(id, student) {

        const updatedStudent =
            await updateStudentApi(id, student);

        setStudents(previousStudents =>
            previousStudents.map(student =>
                student.id === updatedStudent.id
                    ? updatedStudent
                    : student
            )
        );

        return updatedStudent;
    }


    async function removeStudent(id) {

        await deleteStudent(id);

        setStudents(previousStudents =>
            previousStudents.filter(
                student => student.id !== id
            )
        );

    }


    return (
        <StudentContext.Provider
            value={{
                students,
                loading,
                error,
                loadStudents,
                addStudent,
                updateStudent,
                removeStudent, 
                getStudentById
            }}
        >
            {children}
        </StudentContext.Provider>
    );
}

export { StudentContext, StudentProvider };