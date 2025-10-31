-- GitHub Copilot Prompt:
-- Write SQL schema for Easy-Sheets.
-- Tables:
--  users (id, username, password_hash, role)
--  sheets (id, name, owner_id, settings, created_at, updated_at)
--  cells (id, sheet_id, row, column, value, format, locked, password_hash)
--  functions (id, name, enabled, description)
--  logs (id, user_id, sheet_id, action, created_at)

