'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Eye, EyeOff, KeyRound, Book, BarChart3, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
    { date: "July 16", ocr: 400, liveness: 240 },
    { date: "July 17", ocr: 300, liveness: 139 },
    { date: "July 18", ocr: 200, liveness: 980 },
    { date: "July 19", ocr: 278, liveness: 390 },
    { date: "July 20", ocr: 189, liveness: 480 },
    { date: "July 21", ocr: 239, liveness: 380 },
    { date: "July 22", ocr: 349, liveness: 430 },
]

export default function DeveloperPage() {
    const [apiKey, setApiKey] = useState("aman_sk_test_************************");
    const [showKey, setShowKey] = useState(false);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Developer Portal</h1>
            
            <div className="grid gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><KeyRound className="w-5 h-5"/> API Keys</CardTitle>
                        <CardDescription>Manage your API keys for accessing Aman ID services.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Input value={showKey ? "aman_sk_test_aB1cD2eF3gH4iJ5kL6mN7oP8q" : apiKey} readOnly />
                            <Button variant="ghost" size="icon" onClick={() => setShowKey(!showKey)}>
                                {showKey ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText("aman_sk_test_aB1cD2eF3gH4iJ5kL6mN7oP8q")}>
                                <Copy className="w-4 h-4"/>
                            </Button>
                        </div>
                        <Button>Generate New Key</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Book className="w-5 h-5"/> Documentation</CardTitle>
                        <CardDescription>Explore our comprehensive API documentation and guides.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-start space-y-4">
                        <p>Access detailed guides, endpoint references, and code samples to get started with your integration.</p>
                        <Button variant="outline" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                View API Docs <ArrowRight className="ml-2 w-4 h-4" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5"/> API Usage</CardTitle>
                    <CardDescription>Monitor your API call volume over the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{
                      ocr: { label: "OCR", color: "hsl(var(--primary))" },
                      liveness: { label: "Liveness", color: "hsl(var(--accent))" },
                    }} className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                <Legend />
                                <Bar dataKey="ocr" fill="var(--color-ocr)" radius={4} />
                                <Bar dataKey="liveness" fill="var(--color-liveness)" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
