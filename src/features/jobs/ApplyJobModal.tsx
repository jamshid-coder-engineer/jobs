import { useState } from "react";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const ApplyJobModal = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const isFormValid = fullName !== "" && (email !== "" || phone !== "") && file !== null;

  const handleSubmit = async () => {
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setOpen(false);

    toast.success("Muvaffaqiyatli yuborildi!", {
      description: "Tez orada siz bilan bog'lanamiz.",
    });

    setFullName("");
    setEmail("");
    setPhone("");
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Ariza topshirish</Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Vakansiyaga ariza</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>To'liq ismingiz 👤</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ismingizni yozing" />
          </div>
          
          <div className="grid gap-2 text-xs text-slate-500 italic">
            * Email yoki telefon raqamdan birini kiritishingiz shart
          </div>

          <div className="grid gap-2">
            <Label>Email 📧</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" />
          </div>

          <div className="grid gap-2">
            <Label>Telefon 📞</Label>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998" />
          </div>

          <div className="grid gap-2">
            <Label>Rezyume (PDF, DOCX) 📄</Label>
            {file ? (
              <div className="flex items-center justify-between p-2 bg-slate-50 border rounded-md">
                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
              />
            )}
          </div>
        </div>

        <DialogFooter>
          <Button disabled={!isFormValid || isLoading} onClick={handleSubmit} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Yuborilmoqda...
              </>
            ) : (
              "Yuborish"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobModal;
