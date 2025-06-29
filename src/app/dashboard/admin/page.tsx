import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldAlert, CheckCircle2, Users } from "lucide-react";

const stats = [
    { title: "Total Verifications", value: "12,405", icon: Activity, color: "text-blue-500" },
    { title: "Successful Verifications", value: "11,987", icon: CheckCircle2, color: "text-green-500" },
    { title: "Fraud Alerts", value: "88", icon: ShieldAlert, color: "text-red-500" },
    { title: "Registered Users", value: "2,134", icon: Users, color: "text-indigo-500" },
]

const recentVerifications = [
    { id: "REQ-001", user: "Abebe B.", type: "National ID", status: "Approved", date: "2024-07-22" },
    { id: "REQ-002", user: "Tigist M.", type: "Passport", status: "Pending", date: "2024-07-22" },
    { id: "REQ-003", user: "Yosef T.", type: "Driver's License", status: "Rejected", date: "2024-07-21" },
    { id: "REQ-004", user: "Lensa G.", type: "National ID", status: "Approved", date: "2024-07-21" },
    { id: "REQ-005", user: "Dawit A.", type: "Passport", status: "Approved", date: "2024-07-20" },
]

export default function AdminPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Admin Panel</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Verification Requests</CardTitle>
                    <CardDescription>A log of the most recent user verification attempts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Request ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Document Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentVerifications.map((req) => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-medium">{req.id}</TableCell>
                                    <TableCell>{req.user}</TableCell>
                                    <TableCell>{req.type}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            req.status === "Approved" ? "default" 
                                            : req.status === "Pending" ? "secondary" 
                                            : "destructive"
                                        } className={req.status === 'Approved' ? 'bg-accent text-accent-foreground' : ''}>
                                            {req.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{req.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
