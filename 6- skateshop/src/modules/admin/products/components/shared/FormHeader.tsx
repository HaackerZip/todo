import { Button } from "@/modules/ui/button";

interface FormHeaderProps {
  title: string;
  onClose: () => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

export const FormHeader = ({ title, onClose, isEdit, isLoading }: FormHeaderProps) => (
  <div className="flex items-center justify-between mb-8">
    <h1 className="text-3xl font-bold text-white">{title}</h1>
    <div className="flex gap-4">
      <Button variant="ghost" onClick={onClose} disabled={isLoading}>
        {isLoading ? "Canceling..." : "Cancel"}
      </Button>
      
      <Button
        className="bg-[#38BDF8] hover:bg-[#38BDF8]/90"
        type="submit"
        disabled={isLoading}
        // onClick={() => console.log("Botón de envío clickeado")}
      >
        {isLoading ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
      </Button>
    </div>
  </div>
);