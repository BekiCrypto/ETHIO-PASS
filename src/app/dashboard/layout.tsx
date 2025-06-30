'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScanLine, Shield, Code, User, LogOut, Settings, Loader2, Home, FileText, Bell, ArrowRightLeft } from 'lucide-react';
import { EthioPassLogo } from '@/components/aman-logo';
import { getAuth, signOut, onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { app } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const desktopNavItems = [
  { href: '/dashboard/verify', label: 'Verify ID', icon: ScanLine, a11y: "Verify ID" },
  { href: '/dashboard/admin', label: 'Admin Panel', icon: Shield, a11y: "Admin Panel" },
  { href: '/dashboard/developer', label: 'Developer Portal', icon: Code, a11y: "Developer Portal" },
];

const mobileNavItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/documents', label: 'Documents', icon: FileText },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: 17 },
  { href: '/dashboard/history', label: 'History', icon: ArrowRightLeft },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

const getInitials = (name?: string | null) => {
  if (!name) return "U";
  const parts = name.split(" ");
  if (parts.length > 1 && parts[0] && parts[parts.length - 1]) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        router.replace('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);
  
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        toast({
          title: "Logout Failed",
          description: error.message,
          variant: "destructive"
        })
      });
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
            <EthioPassLogo />
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <EthioPassLogo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {desktopNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, 'aria-label': item.label }}
                  >
                    <Link href={item.href}>
                      <item.icon aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <SidebarMenu>
                <SidebarMenuItem>
                     <SidebarMenuButton asChild tooltip={{children: 'Settings'}}>
                        <Link href="/dashboard/settings">
                            <Settings />
                            <span>Settings</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="relative ml-auto flex-1 md:grow-0">
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                   <Avatar>
                        <AvatarImage src={user.photoURL || "https://placehold.co/32x32.png"} alt="User Avatar" data-ai-hint="person" />
                        <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.displayName || user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                   <LogOut className="mr-2 h-4 w-4" />
                   <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-0 sm:px-6 sm:py-0 md:p-8 pb-20 sm:pb-0">
            {children}
          </main>
           <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-40">
            <div className="grid grid-cols-5 h-16">
              {mobileNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "flex flex-col items-center justify-center gap-1 text-xs font-medium",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                        <div className="relative">
                            <item.icon className="h-6 w-6" />
                            {item.badge && (
                                <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px]">
                                    {item.badge}
                                </span>
                            )}
                        </div>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
            </div>
          </nav>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
