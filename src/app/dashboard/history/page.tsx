'use client';

export default function HistoryPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-bold font-headline">History</h1>
      </header>

      <div className="flex flex-col items-center justify-center text-center py-32">
        <p className="text-muted-foreground">
          No data found for selected month!
        </p>
      </div>
    </div>
  );
}
