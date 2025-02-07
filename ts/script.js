"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
window.addEventListener("load", function () {
    var tableData1 = document.querySelector("#tabla1-body");
    var tableData2 = document.querySelector("#tabla2-body");
    var filtroBusqueda = document.querySelector("#busquedaFiltro");
    var usuarios = [];
    var loadCvs = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, cvsData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('data/usuarios.csv')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 2:
                    cvsData = _a.sent();
                    window.Papa.parse(cvsData, {
                        complete: function (result) {
                            usuarios = result.data;
                            renderizarUsuarios(usuarios);
                        },
                        header: true,
                        skipEmptyLines: true,
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("No se pudo obtener datos del archivo: ", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var renderizarUsuarios = function (usuarios) {
        tableData1.innerHTML = "";
        tableData2.innerHTML = "";
        tableData1.innerHTML = usuarios.slice(0, 25).map(function (usuario) { return "\n      <tr>\n        <th scope=\"row\">".concat(usuario.Id, "</th>\n        <td>\n          <span class=\"nombre-usuario\" data-index=\"").concat(usuario.Id, "\" data-bs-toggle=\"modal\" data-bs-target=\"#infoModal\">\n            ").concat(usuario.Nombre, "\n          </span>\n        </td>\n      </tr>\n    "); }).join("");
        tableData2.innerHTML = usuarios.slice(25, 50).map(function (usuario) { return "\n      <tr>\n        <th scope=\"row\">".concat(usuario.Id, "</th>\n        <td>\n          <span class=\"nombre-usuario\" data-index=\"").concat(usuario.Id, "\" data-bs-toggle=\"modal\" data-bs-target=\"#infoModal\">\n            ").concat(usuario.Nombre, "\n          </span>\n        </td>\n      </tr>\n    "); }).join("");
        document.querySelectorAll(".nombre-usuario").forEach(function (span) {
            span.addEventListener("click", function (event) {
                var target = event.currentTarget;
                var index = target.getAttribute("data-index");
                var usuario = usuarios.find(function (u) { return Number(u.Id) === Number(index); });
                if (usuario) {
                    var modalBody = document.querySelector("#tablaDataModal");
                    if (modalBody) {
                        modalBody.innerHTML = "\n              <tr>\n                <td>".concat(usuario.Nombre, "</td>\n                <td>").concat(usuario.Edad, "</td>\n                <td>").concat(usuario.Sexo, "</td>\n                <td>").concat(usuario.Ocupacion, "</td>\n                <td>").concat(usuario.NivelDeEstudios, "</td>\n              </tr>\n            ");
                    }
                }
            });
        });
    };
    filtroBusqueda.addEventListener('input', function () {
        var nombreFiltrado = filtroBusqueda.value.toLowerCase();
        var nombreBuscado = usuarios.filter(function (usuario) {
            return usuario.Nombre.toLowerCase().includes(nombreFiltrado);
        });
        renderizarUsuarios(nombreBuscado);
    });
    loadCvs();
});
