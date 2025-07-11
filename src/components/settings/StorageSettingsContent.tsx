"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

const storageSummary = {
  used: 3.2, // GB
  total: 10, // GB
  percent: 32,
};

const uploadSettings = {
  maxSize: 25, // MB
  allowedTypes: ["jpg", "jpeg", "png", "pdf"],
  autoCompress: true,
};

const storageLogs = [
  { date: "2024-06-10", action: "Uploaded photo.jpg", size: "2.1 MB" },
  { date: "2024-06-09", action: "Deleted old_invoice.pdf", size: "1.2 MB" },
  { date: "2024-06-08", action: "Uploaded floorplan.png", size: "3.5 MB" },
];

export default function StorageSettingsContent() {
  const [autoCompress, setAutoCompress] = useState(uploadSettings.autoCompress);

  function handleClearCache() {
    alert("Cache cleared (mock)");
  }
  function handleDeleteOld() {
    alert("Old files deleted (mock)");
  }

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Storage Usage Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
              <CardDescription>Monitor your storage usage and limits.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Used</div>
                  <div className="text-2xl font-bold">{storageSummary.used} GB</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Total</div>
                  <div className="text-2xl font-bold">{storageSummary.total} GB</div>
                </div>
              </div>
              <div className="pt-2">
                <Progress value={storageSummary.percent} />
                <div className="text-xs text-muted-foreground pt-1">
                  {storageSummary.percent}% of {storageSummary.total} GB used
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Photo Upload Settings</CardTitle>
              <CardDescription>Configure upload limits and file types.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground">Max File Size</div>
                <div className="font-semibold">{uploadSettings.maxSize} MB</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Allowed Types</div>
                <div className="font-semibold">{uploadSettings.allowedTypes.join(", ").toUpperCase()}</div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={autoCompress}
                  onCheckedChange={v => setAutoCompress(v === true)}
                  id="auto-compress"
                />
                <label htmlFor="auto-compress" className="text-sm">Auto-compress photos on upload</label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Storage Management Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Storage Management</CardTitle>
              <CardDescription>Free up space and manage files.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleClearCache} variant="outline" className="w-full">Clear Cache</Button>
              <Button onClick={handleDeleteOld} variant="destructive" className="w-full">Delete Old Files</Button>
            </CardContent>
          </Card>

          {/* Storage Logs/History */}
          <Card>
            <CardHeader>
              <CardTitle>Storage Logs</CardTitle>
              <CardDescription>Recent storage activity.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-2 text-left font-medium">Date</th>
                    <th className="py-2 px-2 text-left font-medium">Action</th>
                    <th className="py-2 px-2 text-left font-medium">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {storageLogs.map((row, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-2 px-2">{row.date}</td>
                      <td className="py-2 px-2">{row.action}</td>
                      <td className="py-2 px-2">{row.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 