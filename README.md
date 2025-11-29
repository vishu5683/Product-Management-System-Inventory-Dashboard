# Product Inventory Management System

A modern React application built with Material-UI for managing product inventory with full CRUD operations, search, and pagination.

## Features

### ✅ 1. Product List Display
- **List View**: Table format showing all product details
- **Card View**: Grid format with product cards
- **Toggle**: Switch between List and Card views seamlessly

### ✅ 2. Search with Debounce
- Real-time search by product name
- Debounce set to 500ms for optimal performance
- Instant filtering as you type

### ✅ 3. Add & Edit Product
- **Form Fields**:
  - Name (required)
  - Price (number, required, must be > 0)
  - Category (required)
  - Stock (number, optional, must be non-negative)
  - Description (optional)
- **Validation**: 
  - Real-time error messages
  - Field-level validation
  - Prevents invalid submissions
- **State Management**: All data stored in memory (no backend required)

### ✅ 4. Pagination
- 8 products per page
- Navigate through pages easily
- Automatically adjusts when search results change

## Tech Stack

- **React 19.2.0** - UI library
- **Material-UI (MUI) 7.3.5** - Component library
- **React Scripts 5.0.1** - Build tooling
- **Custom Hooks** - useDebounce for search optimization

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ganyam
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deployment

### Option 1: Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Go to [Netlify](https://www.netlify.com/) and sign up/login
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Click "Deploy site"

### Option 2: Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and sign up/login
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Create React App settings
6. Click "Deploy"

### Option 3: Deploy to Render

1. Push your code to GitHub
2. Go to [Render](https://render.com/) and sign up/login
3. Click "New" → "Static Site"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
6. Click "Create Static Site"

## Project Structure

```
src/
├── components/
│   ├── ProductCard.jsx      # Card view component
│   ├── ProductTable.jsx     # Table view component
│   ├── ProductForm.jsx       # Add/Edit form dialog
│   └── Pagination.jsx       # Pagination component
├── hooks/
│   └── useDebounce.js       # Custom debounce hook
├── App.js                   # Main application component
└── index.js                 # Entry point
```

## Usage

1. **View Products**: Toggle between List and Card views using the buttons in the toolbar
2. **Search**: Type in the search box to filter products by name (500ms debounce)
3. **Add Product**: Click "Add Product" button, fill the form, and submit
4. **Edit Product**: Click the edit icon on any product card/row
5. **Delete Product**: Click the delete icon and confirm
6. **Navigate Pages**: Use pagination controls at the bottom

## Requirements Met

✅ Product List Display (List & Card views with toggle)  
✅ Search with 500ms debounce  
✅ Add & Edit Product form with validation  
✅ Pagination (8 items per page)  
✅ All state managed in memory  
✅ Modern UI with Material-UI  

## License

This project is created for assessment purposes.
