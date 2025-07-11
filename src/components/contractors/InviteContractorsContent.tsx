'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Mail, 
  Phone, 
  Building2, 
  UserPlus2,
  Send,
  Copy,
  CheckCircle2,
  AlertCircle,
  Users,
  Clock
} from "lucide-react";

// Mock data for recent invites
const recentInvites = [
  {
    id: "INV001",
    email: "john@acmeplumbing.com",
    name: "John Smith",
    company: "ACME Plumbing",
    specialties: ["plumbing", "hvac"],
    status: "pending",
    invitedAt: "2024-01-20T10:30:00Z",
    expiresAt: "2024-01-27T10:30:00Z"
  },
  {
    id: "INV002", 
    email: "sarah@brightspark.com",
    name: "Sarah Johnson",
    company: "BrightSpark Electric",
    specialties: ["electrical", "lighting"],
    status: "accepted",
    invitedAt: "2024-01-19T14:15:00Z",
    acceptedAt: "2024-01-20T09:45:00Z"
  },
  {
    id: "INV003",
    email: "mike@coolbreeze.com", 
    name: "Mike Davis",
    company: "CoolBreeze HVAC",
    specialties: ["hvac", "air_conditioning"],
    status: "expired",
    invitedAt: "2024-01-15T16:20:00Z",
    expiresAt: "2024-01-22T16:20:00Z"
  }
];

const specialties = [
  "plumbing",
  "electrical", 
  "hvac",
  "air_conditioning",
  "lighting",
  "carpentry",
  "painting",
  "landscaping",
  "roofing",
  "flooring",
  "appliance_repair",
  "cleaning",
  "security",
  "general_maintenance"
];

export default function InviteContractorsContent() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    phone: "",
    specialties: [] as string[],
    message: "",
    sendWelcomeEmail: true,
    requireInsurance: true,
    requireCertifications: false
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    alert(`Invitation sent to ${formData.email}`);
    // Reset form
    setFormData({
      email: "",
      name: "",
      company: "",
      phone: "",
      specialties: [],
      message: "",
      sendWelcomeEmail: true,
      requireInsurance: true,
      requireCertifications: false
    });
  };

  const filteredInvites = recentInvites.filter(invite => {
    const matchesSearch = 
      invite.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invite.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invite.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "default";
      case "accepted": return "default";
      case "expired": return "secondary";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "accepted": return <CheckCircle2 className="h-4 w-4" />;
      case "expired": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  // Summary statistics
  const totalInvites = recentInvites.length;
  const pendingInvites = recentInvites.filter(i => i.status === "pending").length;
  const acceptedInvites = recentInvites.filter(i => i.status === "accepted").length;

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">
            Invite contractors to join your network and manage your properties
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copy Invite Link
          </Button>
          <Button size="sm">
            <Users className="h-4 w-4 mr-2" />
            Bulk Invite
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invites</CardTitle>
            <UserPlus2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvites}</div>
            <p className="text-xs text-muted-foreground">
              All time invitations sent
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingInvites}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting response
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{acceptedInvites}</div>
            <p className="text-xs text-muted-foreground">
              Successfully joined
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Invite Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Invitation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="contractor@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      placeholder="ACME Plumbing"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Specialties</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {specialties.map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialty}
                        checked={formData.specialties.includes(specialty)}
                        onCheckedChange={() => handleSpecialtyToggle(specialty)}
                      />
                      <Label htmlFor={specialty} className="text-sm">
                        {specialty.replace('_', ' ').charAt(0).toUpperCase() + specialty.replace('_', ' ').slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal message to your invitation..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="welcome-email"
                    checked={formData.sendWelcomeEmail}
                    onCheckedChange={(checked) => handleInputChange("sendWelcomeEmail", checked as boolean)}
                  />
                  <Label htmlFor="welcome-email" className="text-sm">
                    Send welcome email with platform overview
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="require-insurance"
                    checked={formData.requireInsurance}
                    onCheckedChange={(checked) => handleInputChange("requireInsurance", checked as boolean)}
                  />
                  <Label htmlFor="require-insurance" className="text-sm">
                    Require insurance information during registration
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="require-certifications"
                    checked={formData.requireCertifications}
                    onCheckedChange={(checked) => handleInputChange("requireCertifications", checked as boolean)}
                  />
                  <Label htmlFor="require-certifications" className="text-sm">
                    Require certifications during registration
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Invites */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invitations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invites..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Invites List */}
              <div className="space-y-3">
                {filteredInvites.map((invite) => (
                  <div key={invite.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{invite.name || invite.email}</span>
                        <Badge variant={getStatusColor(invite.status)} className="text-xs">
                          {getStatusIcon(invite.status)}
                          <span className="ml-1">{invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}</span>
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {invite.company && `${invite.company} • `}{invite.email}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {invite.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <div>Invited {new Date(invite.invitedAt).toLocaleDateString()}</div>
                      {invite.status === "pending" && (
                        <div>Expires {invite.expiresAt ? new Date(invite.expiresAt).toLocaleDateString() : "-"}</div>
                      )}
                      {invite.status === "accepted" && invite.acceptedAt && (
                        <div>Accepted {invite.acceptedAt ? new Date(invite.acceptedAt).toLocaleDateString() : "-"}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredInvites.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <UserPlus2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No invitations found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 