// src/components/organisms/ReusableTable/ReusableTable.tsx
import React, { type ReactNode, type ChangeEvent, type JSX } from 'react' // Added ChangeEvent
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
  TablePagination,
  TableSortLabel,
  TextField, // Import TextField for filter inputs
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'

export interface ColumnDefinition<T> {
  id: Extract<keyof T, string> | string
  label: string
  render?: (row: T, rowIndex: number) => ReactNode
  minWidth?: number | string
  align?: 'left' | 'right' | 'center' | 'inherit' | 'justify'
  sortable?: boolean
  filterable?: boolean // New: To enable text filtering for this column
}

export interface SortConfig<T> {
  key: keyof T | string
  direction: 'asc' | 'desc'
}

interface ReusableTableProps<T> {
  data: T[]
  columns: ColumnDefinition<T>[]
  isLoading?: boolean
  title?: string | ReactNode
  onRowClick?: (row: T) => void
  renderRowActions?: (row: T) => ReactNode
  emptyDataMessage?: string

  // Pagination Props
  totalItems: number
  rowsPerPage: number
  page: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  rowsPerPageOptions?: number[]

  // Sorting Props
  sortConfig?: SortConfig<T> | null
  onSortChange?: (sortKey: keyof T | string) => void

  // New Column Filtering Props
  columnFilters?: Record<string, string> // e.g., { name: "search term for name", sku: "search for sku" }
  onColumnFilterChange?: (columnId: string, value: string) => void
}

const ReusableTable = <T extends { id?: any }>({
  data,
  columns,
  isLoading = false,
  title,
  onRowClick,
  renderRowActions,
  emptyDataMessage = 'No data available.', // English default
  totalItems,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50],
  sortConfig,
  onSortChange,
  columnFilters,
  onColumnFilterChange, // New prop
}: ReusableTableProps<T>): JSX.Element => {
  // ... (getRowKey, handleRowsPerPageChange, createSortHandler remain the same) ...
  const getRowKey = (row: T, index: number): string | number => row.id || `row-${index}`
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onRowsPerPageChange) onRowsPerPageChange(event)
  }
  const createSortHandler = (property: keyof T | string) => (event: React.MouseEvent<unknown>) => {
    if (onSortChange) onSortChange(property)
  }

  const handleFilterInputChange = (columnId: string, event: ChangeEvent<HTMLInputElement>) => {
    if (onColumnFilterChange) {
      onColumnFilterChange(columnId, event.target.value)
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2, mb: 2 }} elevation={2}>
      {title && (
        <Box sx={{ p: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
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
            {/* Row for Column Headers and Sorting */}
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={`header-${String(column.id)}`}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: 'grey.100',
                    borderBottom: '2px solid',
                    borderColor: 'grey.300',
                  }}
                  sortDirection={sortConfig?.key === column.id ? sortConfig.direction : false}
                >
                  {column.sortable && onSortChange ? (
                    <TableSortLabel
                      active={sortConfig?.key === column.id}
                      direction={sortConfig?.key === column.id ? sortConfig.direction : 'asc'}
                      onClick={createSortHandler(column.id)}
                    >
                      {column.label}
                      {sortConfig?.key === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {sortConfig.direction === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {renderRowActions && (
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: 'grey.100',
                    borderBottom: '2px solid',
                    borderColor: 'grey.300',
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>

            {/* NEW: Row for Column Filter Inputs */}
            {onColumnFilterChange && ( // Only render filter row if handler is provided
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                {columns.map((column) => (
                  <TableCell key={`filter-${String(column.id)}`} sx={{ py: 0.5, px: 1 }}>
                    {
                      column.filterable ? (
                        <TextField
                          variant="standard" // Use standard or outlined, small size
                          size="small"
                          fullWidth
                          placeholder={`Search ${column.label}...`}
                          value={columnFilters?.[String(column.id)] || ''}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleFilterInputChange(String(column.id), e)
                          }
                          onClick={(e) => e.stopPropagation()} // Prevent row click if onRowClick is enabled
                          InputProps={{ sx: { fontSize: '0.875rem' } }}
                        />
                      ) : null /* Empty cell for non-filterable columns */
                    }
                  </TableCell>
                ))}
                {
                  renderRowActions && (
                    <TableCell sx={{ py: 0.5, px: 1 }} />
                  ) /* Empty cell for actions column */
                }
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {/* ... (isLoading, emptyDataMessage, data mapping for rows remains the same) ... */}
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
                  sx={{
                    cursor: onRowClick ? 'pointer' : 'default',
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  {columns.map((column) => {
                    const value = column.render
                      ? column.render(row, rowIndex)
                      : // @ts-ignore
                        ((row[column.id as keyof T] as ReactNode) ?? '–') // Use '??' for null/undefined check

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
      {/* ... (TablePagination remains the same) ... */}
      {!isLoading && data.length > 0 && (
        <TablePagination
          component="div"
          count={totalItems}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={rowsPerPageOptions}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`
          }
        />
      )}
    </Paper>
  )
}

export default ReusableTable
