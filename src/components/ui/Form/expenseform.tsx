'use client';

import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, isAfter } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../../../../firebaseConfig";

export function AddExpense() {
  const [date, setDate] = useState<Date | null>(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [paidby, setPaidby] = useState('');
  const [paidto, setPaidto] = useState('');
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [invoiceFileUrl, setInvoiceFileUrl] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | ''>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [created, setCreated] = useState<string>('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setInvoiceFile(file);

      setUploading(true);
      const storageRef = ref(storage, `invoice/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setInvoiceFileUrl(url);
        console.log("File uploaded");
      } catch (error) {
        console.error('Error uploading', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    setCreated('');

    if (date && isAfter(date, new Date())) {
      setErrorMessage('Cannot add future expenses');
      return;
    }

    const formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);
    formData.append('paidby', paidby);
    formData.append('paidto', paidto);
    formData.append('date', date ? date.toISOString() : '');
    if (invoiceFileUrl) formData.append('invoiceFile', invoiceFileUrl);
    formData.append('amount', amount.toString());

    try {
      const response = await fetch('/api/expenses/form', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
        return;
      }

      console.log(data);
      setCreated('Expense added successfully');
      setIsPopoverOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error adding expense:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className=" mt-3" onClick={() => setIsPopoverOpen(true)}>+</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h1 className="text-lg font-bold leading-none">Add your expense</h1>
          </div>
          <div className="grid gap-2 mt-5">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="category">Category</Label>
              <Input id="category" className="col-span-2 h-8 shadow-md" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <textarea id="description" className="col-span-2 h-14 border shadow-md" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="paidby">Paid By</Label>
              <Select onValueChange={setPaidby}>
                <SelectTrigger className="w-[185px] shadow-md">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ejas Muhammed">Ejas Muhammed</SelectItem>
                  <SelectItem value="Muhammed Nishan">Muhammed Nishan</SelectItem>
                  <SelectItem value="Bytsolv">Bytsolv</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="paidto">Paid To</Label>
              <Input id="paidto" className="col-span-2 h-8 shadow-md" value={paidto} onChange={(e) => setPaidto(e.target.value)} />
            </div>
            <div className="inline-flex">
              <Label htmlFor="date" className="block text-sm font-medium">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("ml-[70px] w-[185px] shadow-md", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="invoiceFile">Invoice File</Label>
              <Input id="invoiceFile" type="file" className="col-span-2 h-8 shadow-md" onChange={handleFileChange} />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" className="col-span-2 h-8 shadow-md" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            </div>
            <Button variant="outline" className="shadow-lg" onClick={handleSubmit} disabled={uploading}>Submit</Button>
          </div>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2 col-span-3">
            {errorMessage}
          </div>
        )}
        {created && (
          <div className="text-green-500 text-sm mt-2 col-span-3">
            {created}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
