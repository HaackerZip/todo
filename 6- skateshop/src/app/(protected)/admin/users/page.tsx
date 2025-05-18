"use client";

import { Card } from "@/modules/ui/card";
import { DataTable } from "@/modules/admin/DataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/modules/ui/avatar";
import { Switch } from "@/modules/ui/switch";

const users = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    lastLogin: "2024-03-20 14:30",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    lastLogin: "2024-03-19 09:15",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: "USR-003",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "User",
    lastLogin: "2024-03-18 16:45",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
  },
];

const columns = [
  {
    key: "avatar",
    label: "",
    render: (value: string, row: any) => (
      <Avatar>
        <AvatarImage src={value} alt={row.name} />
        <AvatarFallback>{row.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
    ),
  },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "lastLogin", label: "Last Login" },
  {
    key: "role",
    label: "Role",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <Switch checked={value === "Admin"} />
        <span>{value}</span>
      </div>
    ),
  },
];

const filters = [
  {
    key: "role",
    label: "Role",
    options: [
      { label: "Admin", value: "Admin" },
      { label: "User", value: "User" },
    ],
  },
];

export default function Users() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Users</h1>
      </div>

      <Card className="bg-[#1E293B] border-0">
        <div className="p-6">
          <DataTable
            columns={columns}
            data={users}
            filters={filters}
            searchable
          />
        </div>
      </Card>
    </div>
  );
}