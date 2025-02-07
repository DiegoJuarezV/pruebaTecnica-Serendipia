import { Usuario } from "../types/types";

window.addEventListener("load", () => {
  const tableData1 = document.querySelector("#tabla1-body");
  const tableData2 = document.querySelector("#tabla2-body");
  const filtroBusqueda = document.querySelector("#busquedaFiltro") as HTMLInputElement;

  let usuarios: Usuario[] = [];

  const loadCvs = async () => {
    try {
      const response = await fetch('data/usuarios.csv');
      const cvsData = await response.text();
      window.Papa.parse(cvsData, {
        complete: (result) => {
          usuarios = result.data as Usuario[];
          renderizarUsuarios(usuarios);
        },
        header: true,
        skipEmptyLines: true,
      });
    } catch (error) {  
      console.error("No se pudo obtener datos del archivo: ", error);
    } 
  }

  const renderizarUsuarios = (usuarios: Usuario[]) => {
    tableData1!.innerHTML = "";
    tableData2!.innerHTML = "";

    tableData1!.innerHTML = usuarios.slice(0, 25).map((usuario) => `
      <tr>
        <th scope="row">${usuario.Id}</th>
        <td>
          <span class="nombre-usuario" data-index="${usuario.Id}" data-bs-toggle="modal" data-bs-target="#infoModal">
            ${usuario.Nombre}
          </span>
        </td>
      </tr>
    `).join("");

    tableData2!.innerHTML = usuarios.slice(25, 50).map((usuario) => `
      <tr>
        <th scope="row">${usuario.Id}</th>
        <td>
          <span class="nombre-usuario" data-index="${usuario.Id}" data-bs-toggle="modal" data-bs-target="#infoModal">
            ${usuario.Nombre}
          </span>
        </td>
      </tr>
    `).join("");

    document.querySelectorAll(".nombre-usuario").forEach(span => {
      span.addEventListener("click", (event) => {
        const target = event.currentTarget as HTMLElement; 
        const index = target.getAttribute("data-index");
        const usuario = usuarios.find(u => Number(u.Id) === Number(index));
    
        if (usuario) {
          const modalBody = document.querySelector("#tablaDataModal");
          if (modalBody) {
            modalBody.innerHTML = `
              <tr>
                <td>${usuario.Nombre}</td>
                <td>${usuario.Edad}</td>
                <td>${usuario.Sexo}</td>
                <td>${usuario.Ocupacion}</td>
                <td>${usuario.NivelDeEstudios}</td>
              </tr>
            `;
          }
        }
      });
    });
  };

  filtroBusqueda.addEventListener('input', () => {
    const nombreFiltrado = filtroBusqueda.value.toLowerCase();
    const nombreBuscado = usuarios.filter(usuario => 
      usuario.Nombre.toLowerCase().includes(nombreFiltrado)
    );
    renderizarUsuarios(nombreBuscado);
  })

  loadCvs();
});





