// productos.js
const mongoose = require("mongoose");

// Esquema del producto
const ProductoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  stock: Number
});

// Modelo Producto
const Producto = mongoose.model("Producto", ProductoSchema);

// Función para insertar un producto de ejemplo
async function crearProductoEjemplo() {
  try {
    const producto = new Producto({ nombre: "Mouse", precio: 50, stock: 20 });
    await producto.save();
    console.log("✔️ Producto guardado:", producto);
  } catch (error) {
    console.error("❌ Error al guardar producto:", error.message);
  }
}

// Exportar el modelo y la función
module.exports = {
  Producto,
  crearProductoEjemplo
};
