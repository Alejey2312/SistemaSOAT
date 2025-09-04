import express from 'express';
import cors from 'cors';
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Servidor de backend funcionando!');
});

app.get('/api/archivadores', async (req, res) => {
  const { ht, apellido_nombre, carta_garantia, oficio, limit, offset } = req.query;
  const values = [];
  const conditions = [];
  
  // Base query for counting all results
  let countQuery = 'SELECT COUNT(*) FROM archivadores_ht';
  
  // Base query for fetching paginated results
  let dataQuery = 'SELECT * FROM archivadores_ht';

  if (ht) {
    values.push(`%${ht}%`);
    conditions.push(`ht::text ILIKE $${values.length}`);
  }
  if (apellido_nombre) {
    values.push(`%${apellido_nombre}%`);
    conditions.push(`apellido_nombre ILIKE $${values.length}`);
  }
  if (carta_garantia) {
    values.push(`%${carta_garantia}%`);
    conditions.push(`carta_garantia ILIKE $${values.length}`);
  }
  if (oficio) {
    values.push(`%${oficio}%`);
    conditions.push(`oficio ILIKE $${values.length}`);
  }

  if (conditions.length > 0) {
    const whereClause = ' WHERE ' + conditions.join(' AND ');
    countQuery += whereClause;
    dataQuery += whereClause;
  }
  
  dataQuery += ' ORDER BY id ASC'; // Add ORDER BY clause
  
  if (limit) {
    dataQuery += ` LIMIT ${limit}`;
  }
  if (offset) {
    dataQuery += ` OFFSET ${offset}`;
  }

  try {
    const [countResult, dataResult] = await Promise.all([
      pool.query(countQuery, values),
      pool.query(dataQuery, values)
    ]);

    const totalCount = parseInt(countResult.rows[0].count, 10);
    res.json({ rows: dataResult.rows, count: totalCount });
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Nueva ruta para obtener sugerencias de nombres
app.get('/api/suggestions', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'El parámetro de búsqueda "q" es requerido.' });
  }

  try {
    const result = await pool.query(
      `SELECT DISTINCT apellido_nombre FROM archivadores_ht WHERE apellido_nombre ILIKE $1 LIMIT 10`,
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching suggestions:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Nueva ruta para actualizar el estado
app.put('/api/archivadores/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const result = await pool.query(
      'UPDATE archivadores_ht SET estado = $1 WHERE id = $2 RETURNING *',
      [estado, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar el estado:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para agregar un nuevo archivador
app.post('/api/archivadores', async (req, res) => {
  const {
    ht,
    fecha_recepcion,
    apellido_nombre,
    facturas,
    servicio,
    medicina,
    monto_total,
    fecha_facturacion,
    comentario,
    carta_garantia,
    fecha_oficio,
    oficio,
    archivador,
    estado
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO archivadores_ht (
        ht,
        fecha_recepcion,
        apellido_nombre,
        facturas,
        servicio,
        medicina,
        monto_total,
        fecha_facturacion,
        comentario,
        carta_garantia,
        fecha_oficio,
        oficio,
        archivador,
        estado
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [
        ht,
        fecha_recepcion,
        apellido_nombre,
        facturas,
        servicio,
        medicina,
        monto_total,
        fecha_facturacion,
        comentario,
        carta_garantia,
        fecha_oficio,
        oficio,
        archivador,
        estado
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al insertar el registro:', err);
    res.status(500).json({ error: 'Error interno del servidor al insertar el registro' });
  }
});

// Nueva ruta para eliminar un registro
app.delete('/api/archivadores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM archivadores_ht WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.status(200).json({ message: 'Registro eliminado con éxito', deletedRecord: result.rows[0] });
  } catch (err) {
    console.error('Error al eliminar el registro:', err);
    res.status(500).json({ error: 'Error interno del servidor al eliminar el registro' });
  }
});

app.get('/api/check_database', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.status(200).json({ status: 'Base de datos conectada correctamente.' });
  } catch (err) {
    res.status(500).json({ status: 'Error al conectar a la base de datos.', error: err.message });
  }
});

app.get('/api/archivadores/count', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM archivadores_ht');
    res.json({ count: result.rows[0].count });
  } catch (err) {
    console.error('Error al obtener el recuento:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
