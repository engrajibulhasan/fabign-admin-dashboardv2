'use client';

import { ColDef } from "ag-grid-community";

import AgGridShared from "../ag-grid/AgGridShared";
import "./style.css";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}


export default function CategoryTableShared() {
    const productData: Product[] = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics', inStock: true },
  { id: 2, name: 'Phone', price: 699, category: 'Electronics', inStock: true },
  { id: 3, name: 'Desk', price: 299, category: 'Furniture', inStock: false },
];

// Explicitly type the column definitions
const productColumns: ColDef<Product>[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'name', headerName: 'Product Name', filter: true },
  { 
    field: 'price', 
    headerName: 'Price', 
    valueFormatter: (params) => `$${params.value}` 
  },
  { field: 'category', headerName: 'Category' },
  { 
    field: 'inStock', 
    headerName: 'In Stock',
    cellRenderer: (params:any) => params.value ? '✅' : '❌'
  },
];

  return (
    <div className="p-4">
      
      
    <AgGridShared<Product>
        gridId="products-grid"
        columnDefs={productColumns}
        rowData={productData}
        height="400px"
        pagination={true}
        pageSize={5}
      />
    </div>
  );
}