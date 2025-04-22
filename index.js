const express = require('express');
const app = express();
const path = require('path');
const { connectDB } = require('./database');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Ruta principal: muestra clientes y productos
app.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const [clientes] = await db.execute('SELECT * FROM clientes');
    const [productos] = await db.execute('SELECT * FROM productos');
    res.render("index", { clientes, productos });
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).send("Error al obtener datos");
  }
});

// ====================== CLIENTES ======================

// Crear cliente
app.post("/clientes", async (req, res) => {
  const { nombre, edad, correo, ciudad } = req.body;
  try {
    const db = await connectDB();
    const sql = 'INSERT INTO clientes (nombre, edad, correo, ciudad) VALUES (?, ?, ?, ?)';
    await db.execute(sql, [nombre, edad, correo, ciudad]);
    res.redirect("/");
  } catch (err) {
    console.error("Error al crear cliente:", err);
    res.status(500).send("Error al crear cliente");
  }
});

// Actualizar cliente (por ID)
app.post("/clientes/actualizar", async (req, res) => {
  const { id, nombre, edad, correo, ciudad } = req.body;
  try {
    const db = await connectDB();
    const sql = 'UPDATE clientes SET nombre = ?, edad = ?, correo = ?, ciudad = ? WHERE id = ?';
    await db.execute(sql, [nombre, edad, correo, ciudad, id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error al actualizar cliente:", err);
    res.status(500).send("Error al actualizar cliente");
  }
});

// Actualizar ciudad de un cliente por nombre
app.post("/clientes/actualizarCiudadUno", async (req, res) => {
  const { nombre, nuevaCiudad } = req.body;
  try {
    const db = await connectDB();
    const sql = "UPDATE clientes SET ciudad = ? WHERE nombre = ?";
    await db.execute(sql, [nuevaCiudad, nombre]);
    res.redirect("/");
  } catch (err) {
    console.error("Error al actualizar ciudad:", err);
    res.status(500).send("Error al actualizar ciudad");
  }
});
  
// Eliminar cliente por ID
app.post("/clientes/eliminar", async (req, res) => {
  const { id } = req.body;
  try {
    const db = await connectDB();
    const sql = 'DELETE FROM clientes WHERE id = ?';
    await db.execute(sql, [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error al eliminar cliente:", err);
    res.status(500).send("Error al eliminar cliente");
  }
});

// Eliminar cliente por nombre
app.post("/clientes/eliminarUno", async (req, res) => {
  const { nombre } = req.body;
  try {
    const db = await connectDB();
    const sql = "DELETE FROM clientes WHERE nombre = ?";
    await db.execute(sql, [nombre]);
    res.redirect("/");
  } catch (err) {
    console.error("Error al eliminar cliente:", err);
    res.status(500).send("Error al eliminar cliente");
  }
});

// Eliminar clientes por ciudad
app.post("/clientes/eliminarCiudad", async (req, res) => {
  const { ciudad } = req.body;
  try {
    const db = await connectDB();
    const sql = "DELETE FROM clientes WHERE ciudad = ?";
    await db.execute(sql, [ciudad]);
    res.redirect("/");
  } catch (err) {
    console.error("Error al eliminar clientes por ciudad:", err);
    res.status(500).send("Error al eliminar por ciudad");
  }
});

// Mostrar clientes mayores de 30 años
app.get("/clientes/mayores30", async (req, res) => {
  try {
    const db = await connectDB();
    const [clientes] = await db.query("SELECT nombre, correo FROM clientes WHERE edad > 30");
    res.render("clientes_mayores30", { clientes });
  } catch (err) {
    console.error("Error al filtrar clientes:", err);
    res.status(500).send("Error al obtener clientes");
  }
});

// ====================== PRODUCTOS ======================

// Crear producto
app.post("/productos", async (req, res) => {
  const { nombre, precio, stock } = req.body;
  try {
    const db = await connectDB();
    const sql = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';
    await db.execute(sql, [nombre, precio, stock]);
    res.redirect("/productos");
  } catch (err) {
    console.error("Error al crear producto:", err);
    res.status(500).send("Error al crear producto");
  }
});

// Actualizar producto
app.post("/productos/actualizar", async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    const db = await connectDB();
    const sql = 'UPDATE productos SET precio = ? WHERE nombre = ?';
    await db.execute(sql, [precio, nombre]);
    res.redirect("/productos");
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).send("Error al actualizar producto");
  }
});

// Eliminar producto
app.post("/productos/eliminar", async (req, res) => {
  const { nombre } = req.body;
  try {
    const db = await connectDB();
    const sql = 'DELETE FROM productos WHERE nombre = ?';
    await db.execute(sql, [nombre]);
    res.redirect("/productos");
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).send("Error al eliminar producto");
  }
});

// Mostrar página de productos
app.get("/productos", async (req, res) => {
  try {
    const db = await connectDB();
    const [productos] = await db.execute('SELECT * FROM productos');
    res.render("productos", { productos });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send("Error al obtener productos");
  }
});

// Iniciar servidor
app.listen(4000, () => {
  console.log('🚀 Servidor backend iniciado en http://localhost:4000');
});