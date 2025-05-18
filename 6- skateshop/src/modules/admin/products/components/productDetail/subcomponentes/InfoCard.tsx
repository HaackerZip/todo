import { Card } from "@/modules/ui/card";

export const InfoCard = ({ title, value }: { title: string; value: string }) => (
  <Card className="bg-[#0F172A] border-gray-700 p-4">
    <h3 className="text-sm font-medium text-gray-400">{title}</h3>
    <p className="mt-1 text-lg font-semibold">{value}</p>
  </Card>
);