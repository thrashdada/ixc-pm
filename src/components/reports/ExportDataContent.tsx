"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, FileBarChart2, Users, ClipboardList } from "lucide-react";

export default function ExportDataContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataType, setDataType] = useState("work_orders");
  const [format, setFormat] = useState("csv");
  const [timeFilter, setTimeFilter] = useState("30d");

  // Mock summary data
  const summaryData = [
    { label: "Work Orders", value: 1240, icon: ClipboardList },
    { label: "Properties", value: 38, icon: FileBarChart2 },
    { label: "Contractors", value: 22, icon: Users },
    { label: "Messages", value: 540, icon: FileText },
  ];

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="space-y-6">
        {/* Export Options */}
        <div className="flex items-center justify-end space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summaryData.map((item, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Export Filters & Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>
              Select the data type, format, and time period to export
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Select value={dataType} onValueChange={setDataType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Data Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work_orders">Work Orders</SelectItem>
                  <SelectItem value="properties">Properties</SelectItem>
                  <SelectItem value="contractors">Contractors</SelectItem>
                  <SelectItem value="messages">Messages</SelectItem>
                </SelectContent>
              </Select>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Export Info */}
        <Card>
          <CardHeader>
            <CardTitle>How Export Works</CardTitle>
            <CardDescription>
              Data will be exported in the selected format. For large exports, a download link will be emailed to you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 text-sm">
              <li>Choose the data type and time period to export.</li>
              <li>Supported formats: CSV, Excel, PDF.</li>
              <li>Exports may take a few minutes for large datasets.</li>
              <li>For security, only authorized users can export sensitive data.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 