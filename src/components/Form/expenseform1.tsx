"use client"

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/components/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export function DrawerDialogDemo() {
  const [date, setDate] = React.useState<Date>()
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <div className="-mt-5">
            <Button variant="outline" className="bg-gray-950 text-white font-semibold text-2xl">+</Button>
        </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add your expense</DialogTitle>
            <DialogDescription>
                Add your monthly financial expenses here.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      <div className="-mt-5">
            <Button variant="outline" className="bg-black text-white font-semibold text-2xl" >+</Button>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add your expense</DrawerTitle>
          <DrawerDescription>
                Add your monthly financial expenses here.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className, date }: { className: string, date?: Date }) {
    return (
      <form className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" />
        </div>
        <div className="grid gap-1 -mt-2">
          <Label htmlFor="description">Description</Label>
          <textarea id="description" className="border" />
        </div>
        <div className="grid grid-cols-2">
          <div className="-mt-3">
            <Label htmlFor="paidby">Paid By</Label>
            <Select>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ejas Muhammed">Ejas Muhammed</SelectItem>
                <SelectItem value="Muhammed Nishan">Muhammed Nishan</SelectItem>
                <SelectItem value="Bytsolv">Bytsolv</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="-mt-3">
            <Label htmlFor="paidto" className="ml-3">Paid To</Label>
            <Input id="paidto" className="w-44 ml-3"/>
          </div>
        </div>
        <div className="">
          <Label htmlFor="date" className="block text-sm font-medium">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className={cn("w-full", !date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid items-center gap-2">
            <Label htmlFor="invoiceFile">Invoice File</Label>
            <Input id="invoiceFile" type="file" className="col-span-2 h-10 " />
        </div>
        <div className="grid items-center gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" className="col-span-2 h-8 " placeholder="₹"/>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    );
  }
  