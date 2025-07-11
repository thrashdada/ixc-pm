"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const usageSummary = {
  sent: 1200,
  received: 950,
  remaining: 800,
  cost: 36.00,
  planLimit: 2000,
};

const billingSummary = {
  plan: "Business 2000",
  nextBill: "2024-07-01",
  paymentMethod: "Visa •••• 1234",
  status: "Active",
};

const usageHistory = [
  { date: "2024-06-01", sent: 300, received: 220, cost: 9.00 },
  { date: "2024-05-01", sent: 250, received: 200, cost: 7.50 },
  { date: "2024-04-01", sent: 320, received: 260, cost: 9.60 },
];

const billingHistory = [
  { date: "2024-06-01", amount: 36.00, method: "Visa •••• 1234", status: "Paid" },
  { date: "2024-05-01", amount: 36.00, method: "Visa •••• 1234", status: "Paid" },
  { date: "2024-04-01", amount: 36.00, method: "Visa •••• 1234", status: "Paid" },
];

export default function SmsBillingContent() {
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Row: Usage & Billing Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Usage Summary */}
          <Card>
            <CardHeader>
              <CardTitle>SMS Usage</CardTitle>
              <CardDescription>Track your SMS usage and remaining balance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Sent</div>
                  <div className="text-2xl font-bold">{usageSummary.sent}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Received</div>
                  <div className="text-2xl font-bold">{usageSummary.received}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Remaining</div>
                  <div className="text-2xl font-bold">{usageSummary.remaining}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Cost (this period)</div>
                  <div className="text-2xl font-bold">${usageSummary.cost.toFixed(2)}</div>
                </div>
              </div>
              <div className="pt-2">
                <Progress value={((usageSummary.sent + usageSummary.received) / usageSummary.planLimit) * 100} />
                <div className="text-xs text-muted-foreground pt-1">
                  {usageSummary.sent + usageSummary.received} of {usageSummary.planLimit} messages used
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Current plan and payment details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Plan</div>
                  <div className="font-semibold">{billingSummary.plan}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Next Bill</div>
                  <div className="font-semibold">{billingSummary.nextBill}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Payment Method</div>
                  <div className="font-semibold">{billingSummary.paymentMethod}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Status</div>
                  <div className="font-semibold">{billingSummary.status}</div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={() => setShowUpgrade(true)}>Upgrade Plan</Button>
                <Button variant="outline">Add Credits</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row: Usage & Billing History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Usage History */}
          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>Monthly SMS usage details.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-2 text-left font-medium">Date</th>
                    <th className="py-2 px-2 text-left font-medium">Sent</th>
                    <th className="py-2 px-2 text-left font-medium">Received</th>
                    <th className="py-2 px-2 text-left font-medium">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {usageHistory.map((row, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-2 px-2">{row.date}</td>
                      <td className="py-2 px-2">{row.sent}</td>
                      <td className="py-2 px-2">{row.received}</td>
                      <td className="py-2 px-2">${row.cost.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Past invoices and payment status.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-2 text-left font-medium">Date</th>
                    <th className="py-2 px-2 text-left font-medium">Amount</th>
                    <th className="py-2 px-2 text-left font-medium">Method</th>
                    <th className="py-2 px-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((row, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-2 px-2">{row.date}</td>
                      <td className="py-2 px-2">${row.amount.toFixed(2)}</td>
                      <td className="py-2 px-2">{row.method}</td>
                      <td className="py-2 px-2">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Plan Dialog (mock) */}
        {showUpgrade && (
          <Card className="shadow-lg border-2 border-primary">
            <CardHeader>
              <CardTitle>Upgrade Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>Upgrade options coming soon!</div>
                <Button onClick={() => setShowUpgrade(false)}>Close</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 