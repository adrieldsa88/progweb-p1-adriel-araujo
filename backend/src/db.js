import { DatabaseSync } from 'node:sqlite';

const arquivo = process.env.DB_FILE ?? 'banco.db';
export const db = new DatabaseSync(arquivo);

db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    nome     TEXT NOT NULL,
    cpf      TEXT NOT NULL UNIQUE,
    telefone TEXT
  );

  CREATE TABLE IF NOT EXISTS motos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    marca      TEXT NOT NULL,
    modelo     TEXT NOT NULL,
    ano        INTEGER NOT NULL,
    placa      TEXT NOT NULL UNIQUE,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id)
  );

  CREATE TABLE IF NOT EXISTS ordens_servico (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    moto_id       INTEGER NOT NULL REFERENCES motos(id),
    data_abertura TEXT NOT NULL,
    status        TEXT NOT NULL CHECK (status IN ('aberta', 'em_andamento', 'concluida', 'cancelada'))
  );
`);

// Dados de exemplo: só entram se o banco estiver vazio
const { total } = db.prepare('SELECT COUNT(*) AS total FROM clientes').get();
if (total === 0) {
  const c1 = db
    .prepare('INSERT INTO clientes (nome, cpf, telefone) VALUES (?, ?, ?)')
    .run('Carlos Mendes', '11122233344', '(83) 99999-1111');

  const c2 = db
    .prepare('INSERT INTO clientes (nome, cpf, telefone) VALUES (?, ?, ?)')
    .run('Mariana Costa', '55566677788', '(83) 98888-2222');

  const m1 = db
    .prepare('INSERT INTO motos (marca, modelo, ano, placa, cliente_id) VALUES (?, ?, ?, ?, ?)')
    .run('Honda', 'CB 250F Twister', 2021, 'ABC1D23', c1.lastInsertRowid);

  db.prepare('INSERT INTO motos (marca, modelo, ano, placa, cliente_id) VALUES (?, ?, ?, ?, ?)')
    .run('Yamaha', 'XTZ 250 Lander', 2023, 'XYZ9K88', c2.lastInsertRowid);

  db.prepare('INSERT INTO ordens_servico (moto_id, data_abertura, status) VALUES (?, ?, ?)')
    .run(m1.lastInsertRowid, new Date().toISOString(), 'em_andamento');
}