# Easy-Sheets — A Simplified Web Spreadsheet

Build a web-based spreadsheet app called "Easy-Sheets" with the following requirements:

## Core Goals
- Browser-based spreadsheet (editable table with rows, columns, cells)
- UI similar to Excel but simpler (clean, modern layout)
- Data saved and loaded from a cloud database via backend API
- Admin panel to manage functions, locks, and sheets

## Functional Requirements
1. Editable grid/table with support for:
   - Add/delete rows and columns
   - Merge cells
   - Basic formatting (bold, italic, font size, text color, background)
   - Cell selection and keyboard navigation
   - Undo/redo
   - Conditional formatting (simple rules like >, <, ==)
   - Basic formulas (SUM, AVG, COUNT, MIN, MAX)

2. Locking system:
   - Ability to password-protect any cell, row, column, or sheet
   - Locked areas should not be editable unless unlocked
   - Passwords stored securely (hashed in DB)

3. Admin Panel (separate route or page):
   - Login system (username + password)
   - Enable/disable spreadsheet functions by ID (F001, F002, etc.)
   - Manage users, sheets, and permissions
   - View logs or changes
   - Add new spreadsheet functions later

4. Database integration:
   - Use PostgreSQL or MySQL/MariaDB
   - Tables: users, sheets, cells, functions, permissions
   - Each cell stores its value, formatting, and lock status in JSON

5. Backend (API):
   - Node.js + Express (preferred) or PHP + Laravel
   - Routes:
     - `/api/sheets` (list, create, delete)
     - `/api/sheet/:id` (get sheet data)
     - `/api/sheet/:id/save` (save cell changes)
     - `/api/lock` (lock/unlock cell)
     - `/api/functions` (get enabled functions)
   - JWT-based authentication for users and admin

6. Frontend (UI):
   - Use **Luckysheet** or **Jspreadsheet Lite** for main spreadsheet component
   - Use **Vue.js** or **React** for dynamic UI
   - Responsive design with a clean dashboard layout
   - Toolbar with big buttons for common actions (Add Row, Lock, Save, Export)
   - Save data automatically every few seconds

7. Extra features:
   - Export/import to Excel (.xlsx) using SheetJS
   - Auto backup every 30 minutes
   - HTTPS support (Certbot)
   - Dark mode toggle

## Deliverables
- `/frontend` folder (Vue or React app)
- `/backend` folder (Node.js + Express API)
- `/database` folder (SQL schema)
- `/docs` folder (setup + usage guide)
- Dockerfile for easy deployment

## Goal
A functional, secure, cloud-based spreadsheet that’s simple enough for non-technical users, but modular enough for future features like real-time collaboration.



## GitHub Copilot Prompt:
## Write setup instructions for Easy-Sheets:
## - How to install dependencies
## - Configure .env
## - Run database migrations
## - Start server
## - Access admin panel


