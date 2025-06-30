'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Activity, ScanLine, KeyRound, LogIn, FileSignature } from "lucide-react";

const historyEvents = [
  {
    icon: LogIn,
    title: "Logged In",
    description: "Successfully logged in via Google.",
    date: "July 23, 2025, 10:45 AM",
  },
  {
    icon: ScanLine,
    title: "ID Verification",
    description: "Verification attempt completed: Approved.",
    date: "July 23, 2025, 10:48 AM",
  },
  {
    icon: FileSignature,
    title: "Document Signed",
    description: "Signed 'Service Agreement.pdf'.",
    date: "July 22, 2025, 03:22 PM",
  },
  {
    icon: KeyRound,
    title: "API Key Generated",
    description: "New API key created for 'My Test App'.",
    date: "July 21, 2025, 09:14 AM",
  },
    {
    icon: LogIn,
    title: "Logged In",
    description: "Successfully logged in via email.",
    date: "July 21, 2025, 09:12 AM",
  },
];

export default function HistoryPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-bold font-headline">History</h1>
        <p className="text-muted-foreground">A log of your recent account activity.</p>
      </header>

      <Card>
          <CardContent className="p-0">
             <div className="divide-y divide-border">
                {historyEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-4 p-4">
                        <div className="p-2 bg-muted rounded-full mt-1">
                            <event.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">{event.date}</p>
                    </div>
                ))}
             </div>
          </CardContent>
      </Card>
    </div>
  );
}
