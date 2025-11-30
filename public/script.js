const API_URL = "https://todo-app-biho.onrender.com/api/tareas";

const tareasTable = document.querySelector("#tareasTable tbody");
const crearBtn = document.getElementById("crearBtn");
const refrescarBtn = document.getElementById("refrescarBtn");

const inputTitulo = document.getElementById("titulo");
const inputDescripcion = document.getElementById("descripcion");
const inputFecha = document.getElementById("fecha");

// Cargar todas las tareas
async function cargarTareas() {
    tareasTable.innerHTML = "";
    const res = await fetch(API_URL);
    const tareas = await res.json();
    tareas.forEach(t => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${t.idTarea}</td>
            <td>${t.titulo}</td>
            <td>${t.descripcion}</td>
            <td>${new Date(t.fecha).toLocaleDateString()}</td>
            <td>${t.completada ? "Sí" : "No"}</td>
            <td>
                <button class="action-btn action-complete" onclick="marcarCompletada(${t.idTarea})" title="Marcar completada">
                    <i class="fas fa-check"></i>
                </button>
                <button class="action-btn action-edit" onclick="editarTarea(${t.idTarea})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn action-delete" onclick="eliminarTarea(${t.idTarea})" title="Eliminar">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tareasTable.appendChild(tr);
    });
}

// Crear tarea
crearBtn.addEventListener("click", async () => {
    const nuevaTarea = {
        titulo: inputTitulo.value,
        descripcion: inputDescripcion.value,
        fecha: inputFecha.value
    };
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaTarea)
    });
    inputTitulo.value = "";
    inputDescripcion.value = "";
    inputFecha.value = "";
    cargarTareas();
});

// Eliminar tarea
async function eliminarTarea(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    cargarTareas();
}

// Marcar completada
async function marcarCompletada(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completada: true })
    });
    cargarTareas();
}

// Editar tarea (abrir prompt para actualizar)
async function editarTarea(id) {
    const nuevoTitulo = prompt("Ingrese el nuevo título:");
    const nuevaDescripcion = prompt("Ingrese la nueva descripción:");
    const nuevaFecha = prompt("Ingrese la nueva fecha (YYYY-MM-DD):");

    if (!nuevoTitulo || !nuevaDescripcion || !nuevaFecha) return;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            titulo: nuevoTitulo,
            descripcion: nuevaDescripcion,
            fecha: nuevaFecha
        })
    });
    cargarTareas();
}

// Botón refrescar
refrescarBtn.addEventListener("click", cargarTareas);

// Cargar tareas al inicio
cargarTareas();
