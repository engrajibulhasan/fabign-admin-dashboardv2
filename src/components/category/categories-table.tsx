'use client';
import { useCallback, useMemo } from 'react';

import {
  ClientSideRowModelModule,
  CsvExportModule,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  ValidationModule,
  type ColDef,
  type GridReadyEvent,
} from 'ag-grid-community';
import {
  ClipboardModule,
  ColumnMenuModule,
  ContextMenuModule,
  ExcelExportModule,
  SetFilterModule,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

import './style.css';

interface RowData {
  id: number;
  color: string;
  value1: number;
}

const sharedModules = [
  ClientSideRowModelModule,
  ColumnMenuModule,
  ContextMenuModule,
  ...(process.env.NODE_ENV !== 'production' ? [ValidationModule] : []),
];

const leftModules = [SetFilterModule, ClipboardModule, CsvExportModule];
const rightModules = [
  TextFilterModule,
  NumberFilterModule,
  CsvExportModule,
  ExcelExportModule,
];

// Register shared Modules globally
ModuleRegistry.registerModules(sharedModules);

const columns: ColDef<RowData>[] = [
  { field: 'id' },
  { field: 'color' },
  { field: 'value1' },
];

const defaultColDef: ColDef<RowData> = {
  flex: 1,
  minWidth: 80,
  filter: true,
  floatingFilter: true,
};

let rowIdSequence = 100;
const createRowBlock = (): RowData[] =>
  ['Red', 'Green', 'Blue'].map((color) => ({
    id: rowIdSequence++,
    color: color,
    value1: Math.floor(Math.random() * 100),
  }));

const GridExample = () => {
  const leftRowData = useMemo(() => createRowBlock(), []);
  const rightRowData = useMemo(() => createRowBlock(), []);

  const onGridReady = useCallback((event: GridReadyEvent<RowData>) => {
    const api = event.api;

    // Use the actual module classes instead of strings
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

    const registered = moduleClasses.filter((moduleClass) =>
      api.isModuleRegistered(moduleClass)
    );

    // Get module names for logging
    const registeredNames = registered
      .map((module) => module.moduleName)
      .join(', ');
    console.log(api.getGridId(), 'registered:', registeredNames);
  }, []);

  return (
    <div className="example-wrapper">
      <div className="inner-col" style={{ height: '400px' }}>
        <AgGridReact<RowData>
          gridId="Left"
          defaultColDef={defaultColDef}
          rowData={leftRowData}
          modules={leftModules}
          columnDefs={columns}
          onGridReady={onGridReady}
        />
      </div>

      <div className="inner-col" style={{ height: '400px' }}>
        <AgGridReact<RowData>
          gridId="Right"
          defaultColDef={defaultColDef}
          rowData={rightRowData}
          modules={rightModules}
          columnDefs={columns}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default function CategoriesTable() {
  return (
    <div>
      <GridExample />
    </div>
  );
}
