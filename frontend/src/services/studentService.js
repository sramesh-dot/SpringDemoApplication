import api from "./api";

export async function getStudents() {

    const response = await api.get("/students");

   console.log("API response:", response);
   console.log("API data:", response.data);

    return response.data;
}

export async function getStudentById(id) {

    const response = await api.get(`/students/${id}`);

    console.log("GET student by ID response:", response);
    console.log("GET student by ID data:", response.data);

    return response.data;
}

export async function createStudent(student) {

    const response = await api.post("/students", student);

  console.log("API response:", response);
  console.log("API data:", response.data);

    return response.data;
}


export async function updateStudent(id, student) {

    const response = await api.put(`/students/${id}`, student);

   console.log("API response:", response);
   console.log("API data:", response.data);
    return response.data;
}


export async function deleteStudent(id) {

     await api.delete(`/students/${id}`);
}