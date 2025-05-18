"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/ui/table";
import { Input } from "@/modules/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/ui/select";
import { Button } from "@/modules/ui/button";
import { Search, Download } from "lucide-react";
import { ColumnData } from "@/types/category";

export interface Filter {
  key: string
  label: string
  options: { label: string; value: string }[]
}

export interface DataTableProps<T> {
  columns: ColumnData<T>[];
  data: T[];
  filters?: Filter[];
  searchable?: boolean;
  exportable?: boolean;
  loading?: boolean;
}

export function DataTable<T extends object>({
  columns,
  data,
  filters,
  searchable = true,
  exportable = false,
  loading = false,
}: DataTableProps<T>) {

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [String(key)]: value,
    }));
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (Object.keys(selectedFilters).length > 0) {
        return Object.entries(selectedFilters).every(([key, value]) => {
          if (value === "all") return true;
          return String(item[key as keyof T]) === value;
        });
      }

      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return columns.some((column) => {
          if (column.key === 'actions') return false;
          const value = String(item[column.key as keyof T]).toLowerCase();
          return value.includes(searchLower);
        });
      }

      return true;
    });
  }, [data, selectedFilters, searchQuery, columns]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {searchable && (
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 cursor-pointer" />
            <Input
              placeholder="Search..."
              className="pl-8 h-9  bg-[#0F172A] w-full rounded-md border border-input px-8 py-1 text-sm shadow-sm
              transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        {filters && filters.length > 0 && (
          <div className="flex items-center space-x-2">
            {filters.map((filter) => (
              <Select
                key={String(filter.key)}
                value={selectedFilters[String(filter.key)]}
                onValueChange={(value) =>
                  handleFilterChange(filter.key, value)
                }
              >
                <SelectTrigger className="w-[180px] bg-[#0F172A] border-gray-700">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] border-gray-700">
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        )}

        {exportable && (
          <Button variant="outline" className="border-gray-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </div>
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}
        <div className="rounded-md border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                {columns.map((column) => (
                  <TableHead key={String(column.key)} className="text-gray-400">
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, i) => (
                <TableRow
                  key={i}
                  className="border-gray-700 cursor-pointer hover:bg-gray-800"
                >
                  {columns.map((column) => {
                    const cellContent = (() => {

                      if (column.key === 'actions') {
                        return column.render ? column.render(undefined, item) : '';
                      }

                      const value = item[column.key as keyof T];
                      return column.render ? column.render(value, item) : String(value);
                    })();

                    return (
                      <TableCell key={String(column.key)} className="text-gray-300">
                        {cellContent}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}