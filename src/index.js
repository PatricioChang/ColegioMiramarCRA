const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurar rutas y middleware aquí

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
