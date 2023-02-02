const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'orlando'
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

// CREATE a new client
app.post('/clientes', (req, res) => {
  const { dni, nombre, direccion } = req.body;
  const query = `INSERT INTO clientes (dni, nombre, direccion) VALUES ('${dni}', '${nombre}', '${direccion}')`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send('Cliente creado correctamente.');
  });
});

// READ all clients
app.get('/clientes', (req, res) => {
  const query = 'SELECT * FROM clientes';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// UPDATE a client
app.put('/clientes/:id', (req, res) => {
  const { dni, nombre, direccion } = req.body;
  const query = `UPDATE clientes SET dni = '${dni}', nombre = '${nombre}', direccion = '${direccion}' WHERE id = ${req.params.id}`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send('Cliente actualizado correctamente.');
  });
});

// DELETE a client
app.delete('/clientes/:id', (req, res) => {
  const query = `DELETE FROM clientes WHERE id = ${req.params.id}`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send('Cliente eliminado correctamente.');
  });
});

// CREATE a new matter
app.post('/asuntos', (req, res) => {
  const { expediente, id_cliente, fecha_inicio, fecha_finalizacion, estado } = req.body;
  const query = `INSERT INTO asuntos (expediente, id_cliente, fecha_inicio, fecha_finalizacion, estado) VALUES ('${expediente}', '${id_cliente}', '${fecha_inicio}', '${fecha_finalizacion}', '${estado}')`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send('Asunto creado correctamente.');
  });
});

// READ all matters
app.get('/asuntos', (req, res) => {
  const query = 'SELECT * FROM asuntos';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// UPDATE a matter
app.put('/asuntos/:id', (req, res) => {
  const { expediente, id_cliente, fecha_inicio, fecha_finalizacion, estado } = req.body;
  const query = `UPDATE asuntos SET expediente = '${expediente}', id_cliente = '${id_cliente}', fecha_inicio = '${fecha_inicio}', fecha_finalizacion = '${fecha_finalizacion}', estado = '${estado}' WHERE id = ${req.params.id}`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send('Asunto actualizado correctamente.');
  });
});

// DELETE a matter
app.delete('/asuntos/:id', (req, res) => {
  const query = `DELETE FROM asuntos WHERE id = ${req.params.id}`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send('Asunto eliminado correctamente.');
  });
});

// CREATE a new attorney
app.post('/procuradores', (req, res) => {
  const { dni, nombre, direccion } = req.body;
  const query = `INSERT INTO procuradores (dni, nombre, direccion) VALUES ('${dni}', '${nombre}', '${direccion}')`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send('Procurador creado correctamente.');
  });
});

// READ all attorneys
app.get('/procuradores', (req, res) => {
  const query = 'SELECT * FROM procuradores';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// UPDATE an attorney
app.put('/procuradores/:id', (req, res) => {
  const { dni, nombre, direccion } = req.body;
  const query = `UPDATE procuradores SET dni = '${dni}', nombre = '${nombre}', direccion = '${direccion}' WHERE id = ${req.params.id}`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send('Procurador actualizado correctamente.');
  });
});

// DELETE an attorney
app.delete('/procuradores/:id', (req, res) => {
  const query = `DELETE FROM procuradores WHERE id = ${req.params.id}`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send('Procurador eliminado correctamente.');
  });
});

// CREATE a new matter of attorney
app.post('/asuntosprocuradores', (req, res) => {
  const { expediente, id_procurador,  } = req.body;
  const query = `INSERT INTO asuntos_procuradores (expediente, id_procurador ) VALUES ('${expediente}', ${id_procurador})`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send('Asunto de procurador creado correctamente.');
  });
});

// READ all matters of attorneys
app.get('/asuntosprocuradores', (req, res) => {
  const query = 'SELECT * FROM asuntos_procuradores';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// UPDATE a matter of attorney
app.put('/asuntosprocuradores/:id', (req, res) => {
  const { expediente, id_procurador } = req.body;
  const query = `UPDATE asuntos_procuradores SET expediente = '${expediente}', id_procurador = ${id_procurador} WHERE id = ${req.params.id}`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send('Asunto de procurador actualizado correctamente.');
  });
});

// DELETE a matter of attorney
app.delete('/asuntosprocuradores/:id', (req, res) => {
  const query = `DELETE FROM asuntos_procuradores WHERE id = ${req.params.id}`;
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.send('Asunto de procurador eliminado correctamente.');
  });
});


app.listen(3000, () => {
  console.log('Server running on port 3000.');
});
