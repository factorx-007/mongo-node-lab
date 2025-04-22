// clientes.js
const mongoose = require("mongoose");

// Definir el esquema para el Cliente
const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  correo: { type: String, required: true, unique: true },
  ciudad: { type: String, required: true }
});

// Crear el modelo Cliente
const Cliente = mongoose.model("Cliente", ClienteSchema);

// Exportar el modelo y la función de ejemplo
module.exports = {
  Cliente,
  crearClienteEjemplo
};
