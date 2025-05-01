
import * as React from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface DataTableProps<TData> {
  columns: {
    header: React.ReactNode;
    cell: (item: TData) => React.ReactNode;
    key: string;
  }[];
  data: TData[];
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  showBorder?: boolean;
}

export function DataTable<TData>({
  columns,
  data,
  isLoading,
  emptyState,
  showBorder = true,
}: DataTableProps<TData>) {
  return (
    <Card className={`w-full overflow-hidden ${showBorder ? 'border' : 'border-0 shadow-none'}`}>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={`header-${column.key || index}`}>
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      {columns.map((column, cellIndex) => (
                        <TableCell key={`skeleton-cell-${cellIndex}`}>
                          <div className="h-6 w-full animate-pulse bg-muted rounded"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-32 text-center">
                    {emptyState || (
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <p>No results found</p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow key={`row-${index}`}>
                    {columns.map((column, cellIndex) => (
                      <TableCell key={`cell-${column.key || cellIndex}`}>
                        {column.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
