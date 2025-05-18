import { Tabs, TabsList, TabsTrigger } from "@/modules/ui/tabs";

interface FormTabsProps {
  tabs: { value: string; label: string }[];
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}

export const FormTabs = ({ 
  tabs, 
  children, 
  value,
  onValueChange 
}: FormTabsProps) => {
  return (
    <Tabs 
      value={value} 
      className="space-y-6"
      onValueChange={onValueChange}
    >
      <TabsList className="bg-[#1E293B] border-b border-gray-700 w-full justify-start h-auto p-0 rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-[#38BDF8] data-[state=active]:text-white px-6 py-3 rounded-none"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};