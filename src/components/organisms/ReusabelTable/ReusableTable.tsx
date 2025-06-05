// src/components/organisms/ReusableTable/ReusableTable.tsx

import React, { type JSX, type ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  TablePagination, // For table pagination
  // TableSortLabel, // Reserved for future sorting features
} from '@mui/material'

// Defines each column's configuration
export interface ColumnDefinition<T> {
  id: Extract<keyof T, string> | string // Column key
  label: string // Column header
  render?: (row: T, rowIndex: number) => ReactNode // Optional custom renderer
  minWidth?: number | string
  align?: 'left' | 'right' | 'center' | 'inherit' | 'justify'
}

// Component props
interface ReusableTableProps<T> {
  data: T[] // Data to display
  columns: ColumnDefinition<T>[] // Column configurations
  isLoading?: boolean // Show loading indicator
  title?: string | ReactNode // Optional title
  onRowClick?: (row: T) => void // Row click handler
  renderRowActions?: (row: T) => ReactNode // Optional action buttons column
  emptyDataMessage?: string // Message shown when no data

  // Pagination props
  totalItems: number // Total number of items (used by pagination)
  rowsPerPage: number // Items per page
  page: number // Current page (zero-based)
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  rowsPerPageOptions?: number[] // Options for rows per page
}

// Generic reusable table component
const ReusableTable = <T extends { id?: any }>({
  data,
  columns,
  isLoading = false,
  title,
  onRowClick,
  renderRowActions,
  emptyDataMessage = 'No data available.',

  // Pagination destructured
  totalItems,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50],
}: ReusableTableProps<T>): JSX.Element => {
  // Gets a unique key for each row
  const getRowKey = (row: T, index: number): string | number => {
    return row.id || `row-${index}`
  }

  // Wraps pagination's row count change handler
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onRowsPerPageChange) {
      onRowsPerPageChange(event)
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2, mb: 2 }} elevation={2}>
      {title && (
        <Box sx={{ p: 2 }}>
          {typeof title === 'string' ? (
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          ) : (
            title
          )}
        </Box>
      )}

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label={typeof title === 'string' ? title : 'data table'}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                  sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}
                >
                  {column.label}
                </TableCell>
              ))}
              {renderRowActions && (
                <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (renderRowActions ? 1 : 0)}
                  align="center"
                  sx={{ p: 3 }}
                >
                  <CircularProgress />
                  <Typography sx={{ mt: 1 }}>Loading data...</Typography>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (renderRowActions ? 1 : 0)}
                  align="center"
                  sx={{ p: 3 }}
                >
                  <Typography>{emptyDataMessage}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  hover={!!onRowClick}
                  onClick={() => onRowClick && onRowClick(row)}
                  key={getRowKey(row, rowIndex)}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columns.map((column) => {
                    const value = column.render
                      ? column.render(row, rowIndex)
                      : // @ts-ignore
                        (row[column.id as keyof T] as ReactNode) || '–'

                    return (
                      <TableCell
                        key={`${String(column.id)}-${getRowKey(row, rowIndex)}`}
                        align={column.align || 'left'}
                      >
                        {value}
                      </TableCell>
                    )
                  })}
                  {renderRowActions && (
                    <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                      {renderRowActions(row)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Show pagination only if not loading and there is data */}
      {!isLoading && data.length > 0 && (
        <TablePagination
          component="div"
          count={totalItems}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={rowsPerPageOptions}
          // labelRowsPerPage="Rows per page:"
          // labelDisplayedRows={({ from, to, count }) => `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`}
        />
      )}
    </Paper>
  )
}

export default ReusableTable
