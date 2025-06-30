'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export default function HistoryPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [pickerDate, setPickerDate] = useState<Date | undefined>(new Date());

  const handleDone = () => {
    if (pickerDate) {
      setSelectedDate(pickerDate);
    }
  };

  return (
    <div className="space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">History</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary">
              <CalendarIcon className="h-5 w-5" />
              <span className="sr-only">Select Month</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="rounded-t-lg w-full max-w-md mx-auto p-0"
          >
            <SheetHeader className="p-4 border-b text-center">
              <SheetTitle>Select Date</SheetTitle>
            </SheetHeader>
            <div className="flex justify-center p-4">
              <Calendar
                mode="single"
                selected={pickerDate}
                onSelect={setPickerDate}
                initialFocus
              />
            </div>
            <SheetFooter className="flex flex-row gap-2 p-4 border-t bg-background">
              <SheetClose asChild>
                <Button variant="outline" className="w-full">Cancel</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button onClick={handleDone} className="w-full">Done</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </header>

      <div className="text-center pt-8">
        <p className="text-lg font-medium">{format(selectedDate, 'MMMM yyyy')}</p>
      </div>

      <div className="flex flex-col items-center justify-center text-center py-16">
        <p className="text-muted-foreground">
          No data found for selected month!
        </p>
      </div>
    </div>
  );
}
