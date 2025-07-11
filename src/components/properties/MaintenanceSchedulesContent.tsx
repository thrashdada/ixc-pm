'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  MoreHorizontal,
  Download,
  Upload,
} from "lucide-react";

// Mock data for maintenance schedules
const schedules = [
  {
    id: 1,
    property: "Maple Apartments",
    unit: "101",
    type: "HVAC",
    status: "scheduled",
    scheduledDate: "2024-02-10",
    lastCompleted: "2023-08-10",
    assignedTo: "ACME Maintenance",
    notes: "Annual inspection. Replace filters."
  },
  {
    id: 2,
    property: "Oak Villas",
    unit: "A1",
    type: "Plumbing",
    status: "overdue",
    scheduledDate: "2024-01-15",
    lastCompleted: "2023-01-10",
    assignedTo: "FlowPro Plumbing",
    notes: "Check for leaks."
  },
  {
    id: 3,
    property: "Pine Estates",
    unit: "201",
    type: "Electrical",
    status: "completed",
    scheduledDate: "2024-01-05",
    lastCompleted: "2024-01-05",
    assignedTo: "BrightSpark Electric",
    notes: "Test smoke detectors."
  },
  {
    id: 4,
    property: "Elm Gardens",
    unit: "302",
    type: "General",
    status: "scheduled",
    scheduledDate: "2024-02-20",
    lastCompleted: "2023-02-20",
    assignedTo: "Handy Helpers",
    notes: "General inspection."
  },
  {
    id: 5,
    property: "Cedar Heights",
    unit: "B2",
    type: "Roof",
    status: "scheduled",
    scheduledDate: "2024-03-01",
    lastCompleted: "2023-03-01",
    assignedTo: "RoofRight",
    notes: "Check for damage."
  }
];

export default function MaintenanceSchedulesContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const scheduleTypes = Array.from(new Set(schedules.map(s => s.type)));
  const scheduleStatuses = Array.from(new Set(schedules.map(s => s.status)));

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch =
      schedule.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || schedule.type === typeFilter;
    const matchesStatus = statusFilter === "all" || schedule.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-muted/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-muted-foreground">
            View and manage all scheduled, completed, and overdue maintenance for your properties.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Schedule
          </Button>
        </div>
      </div>
      {/* Summary Cards */}
      {/* (If you want summary cards for maintenance, add them here) */}
      {/* Search and Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Input
          placeholder="Search property, unit, type, vendor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm">Type:</span>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {scheduleTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {scheduleStatuses.map((status) => (
                <SelectItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Schedules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Last Completed</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.property}</TableCell>
                  <TableCell>{schedule.unit}</TableCell>
                  <TableCell>{schedule.type}</TableCell>
                  <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                  <TableCell>{schedule.scheduledDate}</TableCell>
                  <TableCell>{schedule.lastCompleted}</TableCell>
                  <TableCell>{schedule.assignedTo}</TableCell>
                  <TableCell>{schedule.notes}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 