'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock, 
  AlertTriangle, 
  DollarSign, 
  User, 
  Building2,
  Calendar,
  MessageSquare
} from "lucide-react";

// Mock data for work orders requiring approval
const approvalWorkOrders = [
  {
    id: "WO-001",
    property: "Maple Apartments",
    unit: "101",
    title: "Emergency Plumbing Repair",
    description: "Major leak in bathroom requiring immediate attention",
    category: "plumbing",
    priority: "urgent",
    estimatedCost: 850,
    requestedBy: "John Smith",
    requestedAt: "2024-01-20 14:30",
    assignedTo: "ACME Plumbing",
    reason: "Cost exceeds $500 threshold",
    status: "pending_approval",
    urgency: "high"
  },
  {
    id: "WO-002",
    property: "Oak Villas",
    unit: "A1",
    title: "HVAC System Replacement",
    description: "Complete HVAC system replacement due to age and inefficiency",
    category: "hvac",
    priority: "high",
    estimatedCost: 3200,
    requestedBy: "Sarah Johnson",
    requestedAt: "2024-01-19 09:15",
    assignedTo: "CoolBreeze HVAC",
    reason: "Major equipment replacement",
    status: "pending_approval",
    urgency: "medium"
  },
  {
    id: "WO-003",
    property: "Pine Estates",
    unit: "201",
    title: "Electrical Panel Upgrade",
    description: "Upgrade electrical panel to meet current code requirements",
    category: "electrical",
    priority: "high",
    estimatedCost: 1800,
    requestedBy: "Mike Davis",
    requestedAt: "2024-01-18 16:45",
    assignedTo: "BrightSpark Electric",
    reason: "Safety compliance requirement",
    status: "pending_approval",
    urgency: "high"
  },
  {
    id: "WO-004",
    property: "Elm Gardens",
    unit: "302",
    title: "Roof Repair and Coating",
    description: "Comprehensive roof repair and protective coating application",
    category: "roofing",
    priority: "medium",
    estimatedCost: 4500,
    requestedBy: "Lisa Wilson",
    requestedAt: "2024-01-17 11:20",
    assignedTo: "RoofRight",
    reason: "Preventive maintenance",
    status: "pending_approval",
    urgency: "medium"
  },
  {
    id: "WO-005",
    property: "Cedar Heights",
    unit: "B2",
    title: "Kitchen Remodel",
    description: "Complete kitchen renovation including cabinets and appliances",
    category: "renovation",
    priority: "medium",
    estimatedCost: 12000,
    requestedBy: "David Brown",
    requestedAt: "2024-01-16 13:10",
    assignedTo: "Modern Kitchens Inc",
    reason: "Major renovation project",
    status: "pending_approval",
    urgency: "low"
  }
];

interface ApprovalWorkOrder {
  id: string;
  property: string;
  unit: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  estimatedCost: number;
  requestedBy: string;
  requestedAt: string;
  assignedTo: string;
  reason: string;
  status: string;
  urgency: string;
}

const categories = ["plumbing", "hvac", "electrical", "roofing", "renovation", "cleaning", "other"];
const priorities = ["low", "medium", "high", "urgent"];
const urgencyLevels = ["low", "medium", "high"];

export default function WorkOrderApprovalsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<ApprovalWorkOrder | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [approvalNotes, setApprovalNotes] = useState("");

  const filteredWorkOrders = approvalWorkOrders.filter(wo => {
    const matchesSearch = 
      wo.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || wo.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || wo.priority === priorityFilter;
    const matchesUrgency = urgencyFilter === "all" || wo.urgency === urgencyFilter;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesUrgency;
  });

  const handleApprove = (workOrderId: string) => {
    const workOrder = approvalWorkOrders.find(wo => wo.id === workOrderId);
    if (workOrder) {
      setSelectedWorkOrder(workOrder);
      setIsApprovalDialogOpen(true);
    }
  };

  const handleReject = (workOrderId: string) => {
    if (confirm("Are you sure you want to reject this work order?")) {
      alert(`Work order ${workOrderId} rejected`);
    }
  };

  const handleViewDetails = (workOrder: ApprovalWorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsViewDialogOpen(true);
  };

  const confirmApproval = () => {
    if (selectedWorkOrder) {
      alert(`Work order ${selectedWorkOrder.id} approved with notes: ${approvalNotes}`);
      setIsApprovalDialogOpen(false);
      setApprovalNotes("");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "plumbing": return "blue";
      case "electrical": return "yellow";
      case "hvac": return "green";
      case "roofing": return "orange";
      case "renovation": return "purple";
      case "cleaning": return "gray";
      default: return "gray";
    }
  };

  // Summary statistics
  const totalPending = approvalWorkOrders.length;
  const highUrgency = approvalWorkOrders.filter(wo => wo.urgency === "high").length;
  const totalValue = approvalWorkOrders.reduce((sum, wo) => sum + wo.estimatedCost, 0);

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">
            Review and approve work orders that require authorization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Reminders
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPending}</div>
            <p className="text-xs text-muted-foreground">Work orders awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Urgency</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highUrgency}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Combined estimated cost</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search work orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency Levels</SelectItem>
                {urgencyLevels.map((urgency) => (
                  <SelectItem key={urgency} value={urgency}>
                    {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
              setPriorityFilter("all");
              setUrgencyFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Approvals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals ({filteredWorkOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Work Order</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Estimated Cost</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkOrders.map((wo) => (
                <TableRow key={wo.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{wo.title}</div>
                      <div className="text-sm text-muted-foreground">{wo.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{wo.property}</div>
                      <div className="text-sm text-muted-foreground">{wo.unit}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`bg-${getCategoryColor(wo.category)}/10 text-${getCategoryColor(wo.category)}-700 border-${getCategoryColor(wo.category)}/20`}>
                      {wo.category.charAt(0).toUpperCase() + wo.category.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(wo.priority) as "default" | "secondary" | "destructive" | "outline"}>
                      {wo.priority.charAt(0).toUpperCase() + wo.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getUrgencyColor(wo.urgency) as "default" | "secondary" | "destructive" | "outline"}>
                      {wo.urgency.charAt(0).toUpperCase() + wo.urgency.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${wo.estimatedCost.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {wo.requestedBy}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(wo.requestedAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(wo)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleApprove(wo.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReject(wo.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4" />
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
            <DialogTitle>Work Order Details - {selectedWorkOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedWorkOrder && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{selectedWorkOrder.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Property</h3>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {selectedWorkOrder.property} - {selectedWorkOrder.unit}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <Badge variant="outline">{selectedWorkOrder.category}</Badge>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Priority</h3>
                  <Badge variant={getPriorityColor(selectedWorkOrder.priority) as "default" | "secondary" | "destructive" | "outline"}>
                    {selectedWorkOrder.priority}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Estimated Cost</h3>
                  <div className="font-medium">${selectedWorkOrder.estimatedCost.toLocaleString()}</div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Requested By</h3>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {selectedWorkOrder.requestedBy}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Requested At</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedWorkOrder.requestedAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Approval Reason</h3>
                <p className="text-muted-foreground">{selectedWorkOrder.reason}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Assigned To</h3>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {selectedWorkOrder.assignedTo}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleApprove(selectedWorkOrder.id);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Work Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Work Order: {selectedWorkOrder?.id}</h3>
              <p className="text-muted-foreground">{selectedWorkOrder?.title}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Approval Notes (Optional)</label>
              <Textarea
                placeholder="Add any notes about this approval..."
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                rows={3}
                className="mt-2"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmApproval} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Work Order
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 