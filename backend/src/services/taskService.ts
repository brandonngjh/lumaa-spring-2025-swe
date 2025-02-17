import pool from '../db.js';

interface TaskUpdate {
  title?: string;
  description?: string;
  isComplete?: boolean;
}

export async function getTasks(userId: number) {
  const result = await pool.query('SELECT * FROM tasks WHERE "userId" = $1', [userId]);
  return result.rows;
}

export async function createTask(userId: number, title: string, description?: string) {
  const result = await pool.query(
    'INSERT INTO tasks (title, description, "userId") VALUES ($1, $2, $3) RETURNING *',
    [title, description, userId]
  );
  return result.rows[0];
}

export async function updateTask(userId: number, taskId: number, updates: TaskUpdate) {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1 AND "userId" = $2', [taskId, userId]);
  if (result.rows.length === 0) {
    return null;
  }

  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (updates.title !== undefined) {
    fields.push(`title = $${index++}`);
    values.push(updates.title);
  }
  if (updates.description !== undefined) {
    fields.push(`description = $${index++}`);
    values.push(updates.description);
  }
  if (updates.isComplete !== undefined) {
    fields.push(`"isComplete" = $${index++}`);
    values.push(updates.isComplete);
  }

  if (fields.length === 0) {
    return result.rows[0];
  }

  values.push(taskId, userId);
  const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${index++} AND "userId" = $${index} RETURNING *`;
  const updateResult = await pool.query(query, values);
  return updateResult.rows[0];
}

export async function deleteTask(userId: number, taskId: number) {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND "userId" = $2', [taskId, userId]);
  return result.rowCount > 0;
}
