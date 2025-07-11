'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Plus, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Users,
  CheckCircle2,
  MessageSquare,
  Edit,
  Eye,
  Trash2
} from "lucide-react";

// Mock data for contractors
const contractors = [
  {
    id: "C001",
    name: "ACME Plumbing",
    contact: {
      name: "John Smith",
      email: "john@acmeplumbing.com",
      phone: "(555) 123-4567"
    },
    specialties: ["plumbing", "hvac"],
    rating: 4.8,
    totalJobs: 156,
    completedJobs: 152,
    status: "active",
    hourlyRate: 85,
    location: "Downtown",
    insurance: "Active",
    certifications: ["Licensed Plumber", "HVAC Certified"],
    joinedAt: "2023-01-15",
    lastJob: "2024-01-20",
    averageResponseTime: "2.5 hours"
  },
  {
    id: "C002",
    name: "BrightSpark Electric",
    contact: {
      name: "Sarah Johnson",
      email: "sarah@brightspark.com",
      phone: "(555) 234-5678"
    },
    specialties: ["electrical", "lighting"],
    rating: 4.9,
    totalJobs: 89,
    completedJobs: 87,
    status: "active",
    hourlyRate: 95,
    location: "Midtown",
    insurance: "Active",
    certifications: ["Master Electrician", "Safety Certified"],
    joinedAt: "2023-03-20",
    lastJob: "2024-01-18",
    averageResponseTime: "1.8 hours"
  },
  {
    id: "C003",
    name: "CoolBreeze HVAC",
    contact: {
      name: "Mike Davis",
      email: "mike@coolbreeze.com",
      phone: "(555) 345-6789"
    },
    specialties: ["hvac", "air_conditioning"],
    rating: 4.7,
    totalJobs: 203,
    completedJobs: 198,
    status: "active",
    hourlyRate: 90,
    location: "Uptown",
    insurance: "Active",
    certifications: ["HVAC Technician", "EPA Certified"],
    joinedAt: "2022-11-10",
    lastJob: "2024-01-19",
    averageResponseTime: "3.2 hours"
  },
  {
    id: "C004",
    name: "Handy Helpers",
    contact: {
      name: "Lisa Wilson",
      email: "lisa@handyhelpers.com",
      phone: "(555) 456-7890"
    },
    specialties: ["general", "carpentry", "cleaning"],
    rating: 4.5,
    totalJobs: 67,
    completedJobs: 65,
    status: "active",
    hourlyRate: 65,
    location: "Westside",
    insurance: "Active",
    certifications: ["General Contractor", "Cleaning Certified"],
    joinedAt: "2023-06-05",
    lastJob: "2024-01-15",
    averageResponseTime: "4.1 hours"
  },
  {
    id: "C005",
    name: "RoofRight",
    contact: {
      name: "David Brown",
      email: "david@roofright.com",
      phone: "(555) 567-8901"
    },
    specialties: ["roofing", "gutter"],
    rating: 4.6,
    totalJobs: 45,
    completedJobs: 44,
    status: "active",
    hourlyRate: 75,
    location: "Eastside",
    insurance: "Active",
    certifications: ["Roofing Specialist", "Safety Trained"],
    joinedAt: "2023-08-12",
    lastJob: "2024-01-17",
    averageResponseTime: "5.5 hours"
  },
  {
    id: "C006",
    name: "PestBusters",
    contact: {
      name: "Alex Chen",
      email: "alex@pestbusters.com",
      phone: "(555) 678-9012"
    },
    specialties: ["pest_control", "cleaning"],
    rating: 4.4,
    totalJobs: 34,
    completedJobs: 32,
    status: "inactive",
    hourlyRate: 70,
    location: "Downtown",
    insurance: "Expired",
    certifications: ["Pest Control License", "Safety Certified"],
    joinedAt: "2023-09-15",
    lastJob: "2024-01-10",
    averageResponseTime: "6.2 hours"
  }
];

const specialties = ["plumbing", "electrical", "hvac", "carpentry", "cleaning", "roofing", "general", "pest_control", "air_conditioning", "lighting", "gutter"];
const statuses = ["active", "inactive", "suspended"];

export default function MyContractorsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContractor, setSelectedContractor] = useState<typeof contractors[0] | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = 
      contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.contact.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "all" || contractor.specialties.includes(specialtyFilter);
    const matchesStatus = statusFilter === "all" || contractor.status === statusFilter;
    
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  const handleViewDetails = (contractor: typeof contractors[0]) => {
    setSelectedContractor(contractor);
    setIsViewDialogOpen(true);
  };

  const handleEditContractor = (contractorId: string) => {
    alert(`Edit contractor: ${contractorId}`);
  };

  const handleDeleteContractor = (contractorId: string) => {
    if (confirm("Are you sure you want to remove this contractor?")) {
      alert(`Contractor ${contractorId} removed`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "inactive": return "secondary";
      case "suspended": return "destructive";
      default: return "outline";
    }
  };



  // Summary statistics
  const totalContractors = contractors.length;
  const activeContractors = contractors.filter(c => c.status === "active").length;
  const averageRating = contractors.reduce((sum, c) => sum + c.rating, 0) / contractors.length;

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">
            Manage your trusted contractors and service providers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Contractor
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contractors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContractors}</div>
            <p className="text-xs text-muted-foreground">All contractors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeContractors}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Out of 5 stars</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contractors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty.replace('_', ' ').charAt(0).toUpperCase() + specialty.replace('_', ' ').slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSpecialtyFilter("all");
              setStatusFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contractors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contractors ({filteredContractors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contractor</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Last Job</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContractors.map((contractor) => (
                <TableRow key={contractor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>{contractor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{contractor.name}</div>
                        <div className="text-sm text-muted-foreground">{contractor.contact.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {contractor.specialties.slice(0, 2).map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty.replace('_', ' ')}
                        </Badge>
                      ))}
                      {contractor.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{contractor.specialties.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{contractor.rating}</span>
                      <span className="text-muted-foreground">({contractor.totalJobs})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(contractor.status) as "default" | "secondary" | "destructive" | "outline"}>
                      {contractor.status.charAt(0).toUpperCase() + contractor.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{contractor.completedJobs}/{contractor.totalJobs}</div>
                      <div className="text-muted-foreground">
                        {((contractor.completedJobs / contractor.totalJobs) * 100).toFixed(0)}% success
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${contractor.hourlyRate}/hr</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {new Date(contractor.lastJob).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {contractor.averageResponseTime}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(contractor)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditContractor(contractor.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteContractor(contractor.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contractor Details - {selectedContractor?.name}</DialogTitle>
          </DialogHeader>
          {selectedContractor && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg">{selectedContractor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedContractor.name}</h3>
                  <p className="text-muted-foreground">{selectedContractor.contact.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedContractor.rating}</span>
                    <span className="text-muted-foreground">({selectedContractor.totalJobs} jobs)</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {selectedContractor.contact.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {selectedContractor.contact.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {selectedContractor.location}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Business Details</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Hourly Rate:</span>
                      <div className="font-medium">${selectedContractor.hourlyRate}/hr</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge variant={getStatusColor(selectedContractor.status) as "default" | "secondary" | "destructive" | "outline"}>
                        {selectedContractor.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Insurance:</span>
                      <div className="font-medium">{selectedContractor.insurance}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedContractor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline">
                      {specialty.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Certifications</h3>
                <div className="space-y-1">
                  {selectedContractor.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Performance</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Success Rate:</span>
                      <div className="font-medium">
                        {((selectedContractor.completedJobs / selectedContractor.totalJobs) * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Average Response:</span>
                      <div className="font-medium">{selectedContractor.averageResponseTime}</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Last Job:</span>
                      <div className="font-medium">{new Date(selectedContractor.lastJob).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">History</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Joined:</span>
                      <div className="font-medium">{new Date(selectedContractor.joinedAt).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Total Jobs:</span>
                      <div className="font-medium">{selectedContractor.totalJobs}</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Completed:</span>
                      <div className="font-medium">{selectedContractor.completedJobs}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => handleEditContractor(selectedContractor.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Contractor
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 