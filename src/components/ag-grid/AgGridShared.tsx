'use client';
import { useCallback, useMemo } from "react";

import {
  ClientSideRowModelModule,
  CsvExportModule,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  ValidationModule,
  type ColDef,
  type GridReadyEvent,
} from "ag-grid-community";
import {
  ClipboardModule,
  ColumnMenuModule,
  ContextMenuModule,
  ExcelExportModule,
  SetFilterModule,
} from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";


// Register shared Modules globally (runs once)
const sharedModules = [
  ClientSideRowModelModule,
  ColumnMenuModule,
  ContextMenuModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
];

ModuleRegistry.registerModules(sharedModules);

// Available modules for different feature sets
export const AgGridModules = {
  basic: [TextFilterModule, NumberFilterModule, CsvExportModule],
  advanced: [SetFilterModule, ClipboardModule, ExcelExportModule],
  all: [
    TextFilterModule,
    NumberFilterModule,
    CsvExportModule,
    SetFilterModule,
    ClipboardModule,
    ExcelExportModule,
  ]
};

export interface AgGridProps<T = any> {
  /** Unique identifier for the grid */
  gridId: string;
  /** Array of column definitions */
  columnDefs: ColDef<T>[];
  /** Array of row data */
  rowData: T[];
  /** Height of the grid */
  height?: string;
  /** Width of the grid */
  width?: string;
  /** Theme for the grid */
  theme?: 'ag-theme-alpine' | 'ag-theme-balham' | 'ag-theme-material';
  /** Module configuration */
  modules?: 'basic' | 'advanced' | 'all' | any[];
  /** Enable pagination */
  pagination?: boolean;
  /** Page size for pagination */
  pageSize?: number;
  /** Default column definition */
  defaultColDef?: Partial<ColDef<T>>;
  /** Callback when grid is ready */
  onGridReady?: (event: GridReadyEvent<T>) => void;
  /** Additional AG Grid props */
  gridOptions?: any;
}

const AgGridShared = <T,>({
  gridId,
  columnDefs,
  
  rowData,
  height = '500px',
  width = '100%',
  theme = 'ag-theme-alpine',
  modules = 'basic',
  pagination = false,
  pageSize = 10,
  defaultColDef,
  onGridReady,
  gridOptions = {},
}: AgGridProps<T>) => {
  // Resolve modules based on the prop
  const resolvedModules = useMemo(() => {
    if (Array.isArray(modules)) {
      return modules;
    }
    return AgGridModules[modules] || AgGridModules.basic;
  }, [modules]);

  // Merge default column definitions
  const mergedDefaultColDef = useMemo((): Partial<ColDef<T>> => ({
    flex: 1,
    minWidth: 60,
    filter: true,
    sortable: true,
    resizable: true,
    ...defaultColDef,
  }), [defaultColDef]);

  // Handle grid ready event
  const handleGridReady = useCallback((event: GridReadyEvent<T>) => {
    // Log registered modules for debugging
    const moduleClasses = [
      ClipboardModule,
      ClientSideRowModelModule,
      ColumnMenuModule,
      ContextMenuModule,
      CsvExportModule,
      ExcelExportModule,
      NumberFilterModule,
      SetFilterModule,
      TextFilterModule,
    ];


    // Call user-provided callback
    if (onGridReady) {
      onGridReady(event);
    }
  }, [gridId, onGridReady]);

  return (
    <div className="ag-theme-material" style={{ height, width }}>
      <AgGridReact<T>
        gridId={gridId}
        columnDefs={columnDefs}
        rowData={rowData}
        modules={resolvedModules}
        defaultColDef={mergedDefaultColDef}
        pagination={pagination}
        paginationPageSize={pageSize}
        onGridReady={handleGridReady}
        suppressRowClickSelection={false}
        animateRows={true}
        {...gridOptions}
        
      />
    </div>
  );
};

export default AgGridShared;