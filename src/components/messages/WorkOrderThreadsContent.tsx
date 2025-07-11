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
  Clock, 
  CheckCircle2,
  AlertCircle,
  User,
  Building2,
  Image,
  Paperclip,
  MoreHorizontal,
  Archive,
  Pin,
  Calendar,
  MapPin,
  Wrench
} from "lucide-react";

// Mock data for work order threads
const workOrderThreads = [
  {
    id: "WO001",
    workOrderNumber: "WO-2024-001",
    title: "Leaky Faucet Repair - Unit 3A",
    status: "in_progress",
    priority: "medium",
    assignedTo: {
      name: "John Smith",
      company: "ACME Plumbing",
      avatar: "",
      email: "john@acmeplumbing.com"
    },
    property: {
      name: "Sunset Apartments",
      address: "123 Main St, Downtown"
    },
    lastMessage: {
      sender: "John Smith",
      content: "I'll be there in 30 minutes with the replacement parts.",
      timestamp: "2024-01-20T14:30:00Z",
      type: "text"
    },
    unreadCount: 2,
    totalMessages: 15,
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    participants: [
      { name: "Property Manager", role: "manager" },
      { name: "John Smith", role: "contractor" },
      { name: "Tenant", role: "tenant" }
    ],
    attachments: 3,
    photos: 5,
    estimatedCompletion: "2024-01-21T17:00:00Z"
  },
  {
    id: "WO002",
    workOrderNumber: "WO-2024-002", 
    title: "Electrical Panel Inspection - Building B",
    status: "completed",
    priority: "high",
    assignedTo: {
      name: "Sarah Johnson",
      company: "BrightSpark Electric",
      avatar: "",
      email: "sarah@brightspark.com"
    },
    property: {
      name: "Downtown Complex",
      address: "456 Oak Ave, Midtown"
    },
    lastMessage: {
      sender: "Sarah Johnson",
      content: "Inspection completed. All systems are functioning properly.",
      timestamp: "2024-01-19T16:45:00Z",
      type: "text"
    },
    unreadCount: 0,
    totalMessages: 8,
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T16:45:00Z",
    participants: [
      { name: "Property Manager", role: "manager" },
      { name: "Sarah Johnson", role: "contractor" },
      { name: "Building Inspector", role: "inspector" }
    ],
    attachments: 2,
    photos: 12,
    estimatedCompletion: "2024-01-19T17:00:00Z"
  },
  {
    id: "WO003",
    workOrderNumber: "WO-2024-003",
    title: "HVAC Maintenance - Office Building",
    status: "pending",
    priority: "low",
    assignedTo: {
      name: "Mike Davis",
      company: "CoolBreeze HVAC",
      avatar: "",
      email: "mike@coolbreeze.com"
    },
    property: {
      name: "Corporate Plaza",
      address: "789 Business Blvd, Uptown"
    },
    lastMessage: {
      sender: "Property Manager",
      content: "When can you schedule the maintenance visit?",
      timestamp: "2024-01-20T11:15:00Z",
      type: "text"
    },
    unreadCount: 1,
    totalMessages: 4,
    createdAt: "2024-01-20T08:00:00Z",
    updatedAt: "2024-01-20T11:15:00Z",
    participants: [
      { name: "Property Manager", role: "manager" },
      { name: "Mike Davis", role: "contractor" }
    ],
    attachments: 1,
    photos: 0,
    estimatedCompletion: "2024-01-25T17:00:00Z"
  },
  {
    id: "WO004",
    workOrderNumber: "WO-2024-004",
    title: "Landscaping - Garden Maintenance",
    status: "scheduled",
    priority: "medium",
    assignedTo: {
      name: "Lisa Wilson",
      company: "GreenThumb Landscaping",
      avatar: "",
      email: "lisa@greenthumb.com"
    },
    property: {
      name: "Garden Apartments",
      address: "321 Garden Lane, Suburbs"
    },
    lastMessage: {
      sender: "Lisa Wilson",
      content: "I've uploaded photos of the current garden condition.",
      timestamp: "2024-01-20T13:20:00Z",
      type: "photo"
    },
    unreadCount: 0,
    totalMessages: 6,
    createdAt: "2024-01-20T09:30:00Z",
    updatedAt: "2024-01-20T13:20:00Z",
    participants: [
      { name: "Property Manager", role: "manager" },
      { name: "Lisa Wilson", role: "contractor" }
    ],
    attachments: 0,
    photos: 8,
    estimatedCompletion: "2024-01-22T15:00:00Z"
  }
];

const statuses = ["all", "pending", "in_progress", "completed", "scheduled"];
const priorities = ["all", "low", "medium", "high", "urgent"];

export default function WorkOrderThreadsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredThreads = workOrderThreads.filter(thread => {
    const matchesSearch = 
      thread.workOrderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.assignedTo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.property.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || thread.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || thread.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "default";
      case "in_progress": return "default";
      case "completed": return "default";
      case "scheduled": return "secondary";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "in_progress": return <Wrench className="h-4 w-4" />;
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      case "scheduled": return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case "photo": return <Image className="h-4 w-4" aria-label="Photo" />;
      case "text": return <MessageCircle className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  // Summary statistics
  const totalThreads = workOrderThreads.length;
  const unreadThreads = workOrderThreads.filter(t => t.unreadCount > 0).length;
  const activeThreads = workOrderThreads.filter(t => t.status === "in_progress").length;

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">
            Manage work order conversations and communication threads
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive Threads
          </Button>
          <Button size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Threads</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalThreads}</div>
            <p className="text-xs text-muted-foreground">
              Work order conversations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{unreadThreads}</div>
            <p className="text-xs text-muted-foreground">
              Threads with new messages
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeThreads}</div>
            <p className="text-xs text-muted-foreground">
              In-progress work orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">2.3h</div>
            <p className="text-xs text-muted-foreground">
              Average response time
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
                placeholder="Search threads..."
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
                {statuses.filter(s => s !== "all").map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
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
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setPriorityFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Threads</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Work Order Threads ({filteredThreads.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredThreads.map((thread) => (
                  <div key={thread.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={thread.assignedTo.avatar} alt={`${thread.assignedTo.name} avatar`} />
                      <AvatarFallback>{thread.assignedTo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{thread.workOrderNumber}</span>
                            <Badge variant={getStatusColor(thread.status)} className="text-xs">
                              {getStatusIcon(thread.status)}
                              <span className="ml-1">{thread.status.replace('_', ' ')}</span>
                            </Badge>
                            <Badge variant={getPriorityColor(thread.priority)} className="text-xs">
                              {thread.priority}
                            </Badge>
                            {thread.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {thread.unreadCount} new
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-base">{thread.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {thread.assignedTo.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {thread.property.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {thread.property.address}
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
                          <div className="flex items-center gap-1">
                            {getMessageTypeIcon(thread.lastMessage.type)}
                            <span>{thread.lastMessage.sender}</span>
                          </div>
                          <span>{thread.lastMessage.content}</span>
                          <span>{new Date(thread.lastMessage.timestamp).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {thread.attachments > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Paperclip className="h-3 w-3" />
                              {thread.attachments}
                            </div>
                          )}
                          {thread.photos > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Image className="h-3 w-3" aria-label="Photos" />
                              {thread.photos}
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MessageCircle className="h-3 w-3" />
                            {thread.totalMessages}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredThreads.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No work order threads found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Unread Threads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredThreads.filter(t => t.unreadCount > 0).map((thread) => (
                  <div key={thread.id} className="flex items-start gap-4 p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={thread.assignedTo.avatar} alt={`${thread.assignedTo.name} avatar`} />
                      <AvatarFallback>{thread.assignedTo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{thread.workOrderNumber}</span>
                        <Badge variant="destructive" className="text-xs">
                          {thread.unreadCount} unread
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-base">{thread.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {thread.lastMessage.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredThreads.filter(t => t.status === "in_progress").map((thread) => (
                  <div key={thread.id} className="flex items-start gap-4 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={thread.assignedTo.avatar} alt={`${thread.assignedTo.name} avatar`} />
                      <AvatarFallback>{thread.assignedTo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{thread.workOrderNumber}</span>
                        <Badge variant="default" className="text-xs">
                          <Wrench className="h-3 w-3 mr-1" />
                          In Progress
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-base">{thread.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Assigned to {thread.assignedTo.name} - {thread.property.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredThreads.filter(t => t.status === "completed").map((thread) => (
                  <div key={thread.id} className="flex items-start gap-4 p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={thread.assignedTo.avatar} alt={`${thread.assignedTo.name} avatar`} />
                      <AvatarFallback>{thread.assignedTo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{thread.workOrderNumber}</span>
                        <Badge variant="default" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-base">{thread.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Completed by {thread.assignedTo.name} - {thread.property.name}
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