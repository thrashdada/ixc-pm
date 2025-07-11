'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MessageCircle, 
  AlertCircle,
  User,
  Building2,
  Image,
  Paperclip,
  MoreHorizontal,
  Pin,
  Mail,
  MapPin,
  Send,
  Download,
  Wrench
} from "lucide-react";

// Mock data for all messages
const messages = [
  {
    id: "MSG001",
    type: "work_order",
    subject: "Leaky Faucet Repair - Unit 3A",
    sender: {
      name: "John Smith",
      company: "ACME Plumbing",
      avatar: "",
      email: "john@acmeplumbing.com",
      role: "contractor"
    },
    recipient: {
      name: "Property Manager",
      role: "manager"
    },
    content: "I'll be there in 30 minutes with the replacement parts. The faucet model you mentioned is in stock.",
    timestamp: "2024-01-20T14:30:00Z",
    status: "unread",
    priority: "medium",
    attachments: 2,
    photos: 3,
    workOrderNumber: "WO-2024-001",
    property: {
      name: "Sunset Apartments",
      address: "123 Main St, Downtown"
    }
  },
  {
    id: "MSG002",
    type: "general",
    subject: "Monthly Maintenance Report",
    sender: {
      name: "Sarah Johnson",
      company: "BrightSpark Electric",
      avatar: "",
      email: "sarah@brightspark.com",
      role: "contractor"
    },
    recipient: {
      name: "Property Manager",
      role: "manager"
    },
    content: "Here's the monthly electrical maintenance report for all properties. All systems are functioning properly.",
    timestamp: "2024-01-19T16:45:00Z",
    status: "read",
    priority: "low",
    attachments: 1,
    photos: 0,
    workOrderNumber: null,
    property: {
      name: "All Properties",
      address: "Multiple Locations"
    }
  },
  {
    id: "MSG003",
    type: "urgent",
    subject: "Emergency: Power Outage - Building B",
    sender: {
      name: "Property Manager",
      company: "Property Management Co",
      avatar: "",
      email: "manager@pmco.com",
      role: "manager"
    },
    recipient: {
      name: "Sarah Johnson",
      role: "contractor"
    },
    content: "We have a power outage in Building B. Can you come immediately to check the electrical panel?",
    timestamp: "2024-01-20T10:15:00Z",
    status: "unread",
    priority: "urgent",
    attachments: 0,
    photos: 2,
    workOrderNumber: "WO-2024-002",
    property: {
      name: "Downtown Complex",
      address: "456 Oak Ave, Midtown"
    }
  },
  {
    id: "MSG004",
    type: "work_order",
    subject: "HVAC Maintenance Schedule",
    sender: {
      name: "Mike Davis",
      company: "CoolBreeze HVAC",
      avatar: "",
      email: "mike@coolbreeze.com",
      role: "contractor"
    },
    recipient: {
      name: "Property Manager",
      role: "manager"
    },
    content: "I can schedule the HVAC maintenance for next Tuesday at 2 PM. Does that work for you?",
    timestamp: "2024-01-20T11:15:00Z",
    status: "read",
    priority: "medium",
    attachments: 1,
    photos: 0,
    workOrderNumber: "WO-2024-003",
    property: {
      name: "Corporate Plaza",
      address: "789 Business Blvd, Uptown"
    }
  },
  {
    id: "MSG005",
    type: "general",
    subject: "Garden Maintenance Photos",
    sender: {
      name: "Lisa Wilson",
      company: "GreenThumb Landscaping",
      avatar: "",
      email: "lisa@greenthumb.com",
      role: "contractor"
    },
    recipient: {
      name: "Property Manager",
      role: "manager"
    },
    content: "I've uploaded photos of the current garden condition and the proposed improvements.",
    timestamp: "2024-01-20T13:20:00Z",
    status: "read",
    priority: "low",
    attachments: 0,
    photos: 8,
    workOrderNumber: "WO-2024-004",
    property: {
      name: "Garden Apartments",
      address: "321 Garden Lane, Suburbs"
    }
  },
  {
    id: "MSG006",
    type: "system",
    subject: "Work Order Completed - WO-2024-001",
    sender: {
      name: "System Notification",
      company: "incoXchange",
      avatar: "",
      email: "system@incoxchange.com",
      role: "system"
    },
    recipient: {
      name: "Property Manager",
      role: "manager"
    },
    content: "Work order WO-2024-001 has been marked as completed by John Smith. Please review and approve.",
    timestamp: "2024-01-20T15:45:00Z",
    status: "unread",
    priority: "medium",
    attachments: 0,
    photos: 0,
    workOrderNumber: "WO-2024-001",
    property: {
      name: "Sunset Apartments",
      address: "123 Main St, Downtown"
    }
  }
];

const messageTypes = ["all", "work_order", "general", "urgent", "system"];
const priorities = ["all", "low", "medium", "high", "urgent"];
const statuses = ["all", "unread", "read"];

export default function AllMessagesContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.workOrderNumber && message.workOrderNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === "all" || message.type === typeFilter;
    const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    
    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "work_order": return <Wrench className="h-4 w-4" />;
      case "urgent": return <AlertCircle className="h-4 w-4" />;
      case "system": return <MessageCircle className="h-4 w-4" />;
      case "general": return <Mail className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work_order": return "default";
      case "urgent": return "destructive";
      case "system": return "secondary";
      case "general": return "outline";
      default: return "outline";
    }
  };

  // Summary statistics
  const totalMessages = messages.length;
  const unreadMessages = messages.filter(m => m.status === "unread").length;
  const urgentMessages = messages.filter(m => m.priority === "urgent").length;
  const workOrderMessages = messages.filter(m => m.type === "work_order").length;

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">
            Manage all messages, notifications, and communications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Messages
          </Button>
          <Button size="sm">
            <Send className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              All communications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{unreadMessages}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{urgentMessages}</div>
            <p className="text-xs text-muted-foreground">
              High priority
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Work Orders</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{workOrderMessages}</div>
            <p className="text-xs text-muted-foreground">
              Related to jobs
            </p>
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
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {messageTypes.filter(t => t !== "all").map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1)}
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
                {priorities.filter(p => p !== "all").map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
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
                {statuses.filter(s => s !== "all").map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setTypeFilter("all");
              setPriorityFilter("all");
              setStatusFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Messages</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="work_orders">Work Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Messages ({filteredMessages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div key={message.id} className={`flex items-start gap-4 p-4 border rounded-lg transition-colors ${
                    message.status === "unread" ? "bg-blue-50 dark:bg-blue-950/20" : "hover:bg-muted/50"
                  }`}>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={getTypeColor(message.type)} className="text-xs">
                              {getTypeIcon(message.type)}
                              <span className="ml-1">{message.type.replace('_', ' ')}</span>
                            </Badge>
                            <Badge variant={getPriorityColor(message.priority)} className="text-xs">
                              {message.priority}
                            </Badge>
                            {message.status === "unread" && (
                              <Badge variant="destructive" className="text-xs">
                                Unread
                              </Badge>
                            )}
                            {message.workOrderNumber && (
                              <Badge variant="outline" className="text-xs">
                                {message.workOrderNumber}
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-base">{message.subject}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {message.sender.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {message.property.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {message.property.address}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Pin className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{message.content}</span>
                          <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {message.attachments > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Paperclip className="h-3 w-3" />
                              {message.attachments}
                            </div>
                          )}
                          {message.photos > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Image className="h-3 w-3" />
                              {message.photos}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredMessages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No messages found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Unread Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMessages.filter(m => m.status === "unread").map((message) => (
                  <div key={message.id} className="flex items-start gap-4 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{message.subject}</span>
                        <Badge variant="destructive" className="text-xs">
                          Unread
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        From {message.sender.name} - {message.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Urgent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMessages.filter(m => m.priority === "urgent").map((message) => (
                  <div key={message.id} className="flex items-start gap-4 p-4 border rounded-lg bg-red-50 dark:bg-red-950/20">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{message.subject}</span>
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        From {message.sender.name} - {message.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work_orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Work Order Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMessages.filter(m => m.type === "work_order").map((message) => (
                  <div key={message.id} className="flex items-start gap-4 p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{message.subject}</span>
                        <Badge variant="default" className="text-xs">
                          <Wrench className="h-3 w-3 mr-1" />
                          Work Order
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        From {message.sender.name} - {message.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 