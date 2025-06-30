'use client';

import { Button } from "@/components/ui/button";
import { Search, MoreHorizontal, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notifications = [
    {
        id: "notif-1",
        title: "Your digital Fayida ID has been revoked",
        source: "Federal NID Agency",
        date: "16 Dec 2024",
    },
    {
        id: "notif-2",
        title: "Your digital Residence Permit has been revoked",
        source: "Immigration and Citizenship Service",
        date: "16 Dec 2024",
    },
    {
        id: "notif-3",
        title: "Your digital Fayida ID is expiring soon",
        source: "Federal NID Agency",
        date: "15 Dec 2024",
    },
    {
        id: "notif-4",
        title: "Your digital Residence Permit is expiring soon",
        source: "Immigration and Citizenship Service",
        date: "15 Dec 2024",
    },
    {
        id: "notif-5",
        title: "Your digital Fayida ID is expiring soon",
        source: "Federal NID Agency",
        date: "14 Dec 2024",
    },
    {
        id: "notif-6",
        title: "Your digital Residence Permit is expiring soon",
        source: "Immigration and Citizenship Service",
        date: "14 Dec 2024",
    },
    {
        id: "notif-7",
        title: "Your digital Fayida ID is expiring soon",
        source: "Federal NID Agency",
        date: "13 Dec 2024",
    }
];

export default function NotificationsPage() {
  return (
    <div className="space-y-2">
        <header className="flex justify-between items-center px-4 pt-2">
            <h1 className="text-3xl font-bold font-headline">Notifications</h1>
            <div className="flex items-center">
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreHorizontal className="h-5 w-5" />
                            <span className="sr-only">More options</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Archive all</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View archived notifications</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

        <div className="flex flex-col">
            {notifications.map((notification) => (
                <Link 
                    href="#" 
                    key={notification.id} 
                    className="block border-b border-border last:border-b-0"
                >
                    <div className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex-grow space-y-1">
                            <p className="font-semibold text-foreground leading-tight">
                                {notification.title}
                            </p>
                            <p className="text-sm text-muted-foreground">{notification.source}</p>
                            <p className="text-sm text-muted-foreground">{notification.date}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                </Link>
            ))}
        </div>
    </div>
  );
}
