import {
    Link,
    Outlet
} from "react-router-dom";

function AppLayout() {

    return (
        <div>

            <header>

                <h1>StudentApp</h1>

                <nav>
                    
                    <Link to="/students">
                        Students
                    </Link>

                    {" | "}

                    <Link to="/students/add">
                        Add Student
                    </Link>

                </nav>

            </header>

            <hr />

            <main>

                <Outlet />

            </main>

        </div>
    );
}

export default AppLayout;