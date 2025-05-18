"use client";

import { Input } from "@/modules/ui/input";
import { Label } from "@/modules/ui/label";
import { UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  id: "email" | "password" | "confirmPassword";
  label: string;
  type?: string;
  register: UseFormRegister<{ email: string; password: string; confirmPassword?: string }>;
  error?: { message?: string };
}

export const FormField = ({ id, label, type = "text", register, error }: FormFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-white">{label}</Label>
    <Input
      id={id}
      type={type}
      {...register(id)}
      className="bg-coffee-brown text-white border-rustic-brown"
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);