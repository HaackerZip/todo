
import { Button } from "@/modules/ui/button";
import { Card } from "@/modules/ui/card";
import { Input } from "@/modules/ui/input";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface VariantListProps {
  label: string;
  items: string[];
  onAdd: (newItem: string) => void;
  onRemove: (item: string) => void;
}

export const VariantList = ({ label, items, onAdd, onRemove }: VariantListProps) => {
    const [newItem, setNewItem] = useState("");
  
    return (
      <Card className="bg-[#1E293B] border-0">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">{label}</h2>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <div key={item} className="flex items-center gap-2 bg-[#0F172A] rounded-lg p-2">
                <span>{item}</span>
                <Button variant="ghost" size="icon" onClick={() => onRemove(item)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                placeholder={`Add ${label.toLowerCase()}`}
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
              <Button variant="outline" onClick={() => {
                if (newItem.trim()) {
                  onAdd(newItem.trim());
                  setNewItem("");
                }
              }}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };