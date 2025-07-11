'use client';

import React from "react";
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
import { 
  PlusCircle,
  MoreHorizontal,
  Building2,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Users,
  DollarSign,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for properties
const properties = [
  {
    id: 1,
    name: "Maple Apartments",
    address: "123 Maple St, Downtown",
    type: "Apartment Complex",
    units: 24,
    status: "active",
    activeJobs: 2,
    monthlySpend: 4200,
    lastMaintenance: "2024-01-15",
    contact: {
      name: "John Smith",
      phone: "(555) 123-4567",
      email: "john@mapleapts.com"
    }
  },
  {
    id: 2,
    name: "Oak Villas",
    address: "456 Oak Ave, Midtown",
    type: "Townhouse Complex",
    units: 12,
    status: "active",
    activeJobs: 1,
    monthlySpend: 3800,
    lastMaintenance: "2024-01-10",
    contact: {
      name: "Sarah Johnson",
      phone: "(555) 234-5678",
      email: "sarah@oakvillas.com"
    }
  },
  {
    id: 3,
    name: "Pine Estates",
    address: "789 Pine Rd, Uptown",
    type: "Single Family Homes",
    units: 8,
    status: "active",
    activeJobs: 1,
    monthlySpend: 3100,
    lastMaintenance: "2024-01-12",
    contact: {
      name: "Mike Davis",
      phone: "(555) 345-6789",
      email: "mike@pineestates.com"
    }
  },
  {
    id: 4,
    name: "Elm Gardens",
    address: "321 Elm Blvd, Westside",
    type: "Apartment Complex",
    units: 18,
    status: "maintenance",
    activeJobs: 0,
    monthlySpend: 2800,
    lastMaintenance: "2024-01-08",
    contact: {
      name: "Lisa Wilson",
      phone: "(555) 456-7890",
      email: "lisa@elmgardens.com"
    }
  },
  {
    id: 5,
    name: "Cedar Heights",
    address: "654 Cedar Ln, Eastside",
    type: "Townhouse Complex",
    units: 15,
    status: "active",
    activeJobs: 3,
    monthlySpend: 5200,
    lastMaintenance: "2024-01-18",
    contact: {
      name: "David Brown",
      phone: "(555) 567-8901",
      email: "david@cedarheights.com"
    }
  }
];

export default function AllPropertiesContent() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const propertyTypes = Array.from(new Set(properties.map(p => p.type)));
  const propertyStatuses = Array.from(new Set(properties.map(p => p.status)));

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.contact.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || property.type === typeFilter;
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'maintenance':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      case 'inactive':
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-muted/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-muted-foreground">
            Manage and view all your properties. Track maintenance, costs, and performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
            <p className="text-xs text-muted-foreground">All properties managed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {properties.reduce((sum, prop) => sum + prop.activeJobs, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Work orders in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${properties.reduce((sum, prop) => sum + prop.monthlySpend, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total maintenance costs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {properties.reduce((sum, prop) => sum + prop.units, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Residential units</p>
          </CardContent>
        </Card>
      </div>
      {/* Search and Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Input
          placeholder="Search properties, address, contact..."
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
              {propertyTypes.map((type) => (
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
              {propertyStatuses.map((status) => (
                <SelectItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>Property List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active Jobs</TableHead>
                <TableHead>Monthly Spend</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{property.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.units}</TableCell>
                  <TableCell>{getStatusBadge(property.status)}</TableCell>
                  <TableCell>
                    {property.activeJobs > 0 ? (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {property.activeJobs} active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-green-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Clear
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>${property.monthlySpend.toLocaleString()}</TableCell>
                  <TableCell>{property.lastMaintenance}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{property.contact.name}</div>
                      <div className="text-muted-foreground flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {property.contact.phone}
                      </div>
                      <div className="text-muted-foreground flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {property.contact.email}
                      </div>
                    </div>
                  </TableCell>
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