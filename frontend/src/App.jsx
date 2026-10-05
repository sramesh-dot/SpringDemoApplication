import './App.css';

import {
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import useStudent from "./hooks/useStudent";

import AppLayout from "./layouts/AppLayout";

import StudentListPage from "./pages/StudentListPage";
import AddStudentPage from "./pages/AddStudentPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditStudentPage from "./pages/EditStudentPage";


function App() {

    const {
        loading,
        error,
        loadStudents
    } = useStudent();

    if (loading) {
        return <p>Loading students...</p>;
    }

    if (error) {
        return (
            <div>

                <p>{error}</p>

                <button onClick={loadStudents}>
                    Retry
                </button>

            </div>
        );
    }

    return (

        <Routes>

            {/* Default route */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/students"
                        replace
                    />
                }
            />


            {/* Layout route */}

            <Route element={<AppLayout />}>

                <Route
                    path="/students"
                    element={<StudentListPage />}
                />

                <Route
                    path="/students/add"
                    element={<AddStudentPage />}
                />

                <Route
                    path="/students/:id"
                    element={<StudentDetailsPage />}
                />

            </Route>

            <Route
                path="*"
                element={<NotFoundPage/>}
            />

            <Route
                path="/students/:id/edit"
                element={<EditStudentPage />}
            />

        </Routes>

    );
}

export default App;