'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MessageCircle, 
  FileText,
  Plus,
  Copy,
  Edit,
  Star,
  Clock,
  Wrench,
  AlertCircle,
  CheckCircle2,
  MoreHorizontal,
  Download,
  MessageSquare,
  Zap
} from "lucide-react";

// Mock data for message templates
const templates = [
  {
    id: "TPL001",
    name: "Work Order Assignment",
    category: "work_order",
    subject: "Work Order Assignment - {workOrderNumber}",
    content: "Hi {contractorName},\n\nYou have been assigned work order {workOrderNumber} for {propertyName}.\n\nDetails:\n- Issue: {issueDescription}\n- Priority: {priority}\n- Location: {propertyAddress}\n- Estimated completion: {estimatedDate}\n\nPlease confirm receipt and provide an estimated arrival time.\n\nBest regards,\n{managerName}",
    variables: ["workOrderNumber", "contractorName", "propertyName", "issueDescription", "priority", "propertyAddress", "estimatedDate", "managerName"],
    usageCount: 45,
    lastUsed: "2024-01-20T10:30:00Z",
    isFavorite: true,
    createdBy: "Property Manager",
    createdAt: "2024-01-15T09:00:00Z"
  },
  {
    id: "TPL002",
    name: "Emergency Response",
    category: "urgent",
    subject: "URGENT: {issueType} at {propertyName}",
    content: "EMERGENCY ALERT\n\n{issueType} reported at {propertyName}.\n\nLocation: {propertyAddress}\nSeverity: {severityLevel}\n\nPlease respond immediately.\n\nContact: {managerPhone}\n\nThis is an urgent situation requiring immediate attention.",
    variables: ["issueType", "propertyName", "propertyAddress", "severityLevel", "managerPhone"],
    usageCount: 12,
    lastUsed: "2024-01-19T16:45:00Z",
    isFavorite: true,
    createdBy: "Property Manager",
    createdAt: "2024-01-10T14:00:00Z"
  },
  {
    id: "TPL003",
    name: "Work Completion Follow-up",
    category: "follow_up",
    subject: "Work Order {workOrderNumber} - Completion Follow-up",
    content: "Hi {contractorName},\n\nThank you for completing work order {workOrderNumber}.\n\nPlease provide:\n1. Photos of completed work\n2. Invoice for services\n3. Any additional notes or recommendations\n\nWe appreciate your prompt service.\n\nBest regards,\n{managerName}",
    variables: ["workOrderNumber", "contractorName", "managerName"],
    usageCount: 28,
    lastUsed: "2024-01-18T15:20:00Z",
    isFavorite: false,
    createdBy: "Property Manager",
    createdAt: "2024-01-12T11:30:00Z"
  },
  {
    id: "TPL004",
    name: "Maintenance Schedule",
    category: "scheduling",
    subject: "Maintenance Schedule - {propertyName}",
    content: "Hi {contractorName},\n\nWe need to schedule maintenance for {propertyName}.\n\nService Type: {serviceType}\nPreferred Date: {preferredDate}\nAlternative Date: {alternativeDate}\n\nPlease confirm your availability.\n\nBest regards,\n{managerName}",
    variables: ["contractorName", "propertyName", "serviceType", "preferredDate", "alternativeDate", "managerName"],
    usageCount: 33,
    lastUsed: "2024-01-17T09:15:00Z",
    isFavorite: false,
    createdBy: "Property Manager",
    createdAt: "2024-01-08T16:45:00Z"
  },
  {
    id: "TPL005",
    name: "Welcome Message",
    category: "general",
    subject: "Welcome to Our Property Management Team",
    content: "Hi {contractorName},\n\nWelcome to our property management team!\n\nWe're excited to work with {companyName} and look forward to a great partnership.\n\nPlease review our service standards and safety protocols.\n\nContact us anytime for questions.\n\nBest regards,\n{managerName}\n{companyName}",
    variables: ["contractorName", "companyName", "managerName"],
    usageCount: 8,
    lastUsed: "2024-01-15T14:30:00Z",
    isFavorite: false,
    createdBy: "Property Manager",
    createdAt: "2024-01-05T10:00:00Z"
  }
];

// Mock data for quick replies
const quickReplies = [
  {
    id: "QR001",
    text: "Thank you for the update. I'll review and get back to you shortly.",
    category: "acknowledgment",
    usageCount: 67,
    lastUsed: "2024-01-20T11:30:00Z",
    isFavorite: true
  },
  {
    id: "QR002",
    text: "Please send photos of the completed work.",
    category: "request",
    usageCount: 89,
    lastUsed: "2024-01-19T16:20:00Z",
    isFavorite: true
  },
  {
    id: "QR003",
    text: "When can you start this work?",
    category: "scheduling",
    usageCount: 45,
    lastUsed: "2024-01-18T09:45:00Z",
    isFavorite: false
  },
  {
    id: "QR004",
    text: "Please provide an updated timeline.",
    category: "follow_up",
    usageCount: 34,
    lastUsed: "2024-01-17T14:15:00Z",
    isFavorite: false
  },
  {
    id: "QR005",
    text: "Great work! Thank you for your prompt service.",
    category: "appreciation",
    usageCount: 56,
    lastUsed: "2024-01-16T17:30:00Z",
    isFavorite: true
  },
  {
    id: "QR006",
    text: "Can you provide a cost estimate?",
    category: "request",
    usageCount: 23,
    lastUsed: "2024-01-15T12:00:00Z",
    isFavorite: false
  }
];

const categories = ["all", "work_order", "urgent", "follow_up", "scheduling", "general"];
const quickReplyCategories = ["all", "acknowledgment", "request", "scheduling", "follow_up", "appreciation"];

export default function MessageTemplatesContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [quickReplyCategoryFilter, setQuickReplyCategoryFilter] = useState("all");
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [showCreateQuickReply, setShowCreateQuickReply] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "",
    subject: "",
    content: ""
  });
  const [newQuickReply, setNewQuickReply] = useState({
    text: "",
    category: ""
  });

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const filteredQuickReplies = quickReplies.filter(reply => {
    const matchesSearch = reply.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = quickReplyCategoryFilter === "all" || reply.category === quickReplyCategoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "urgent": return "destructive";
      case "work_order": return "default";
      case "follow_up": return "secondary";
      case "scheduling": return "outline";
      case "general": return "outline";
      default: return "outline";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "work_order": return <Wrench className="h-4 w-4" />;
      case "urgent": return <AlertCircle className="h-4 w-4" />;
      case "follow_up": return <CheckCircle2 className="h-4 w-4" />;
      case "scheduling": return <Clock className="h-4 w-4" />;
      case "general": return <MessageCircle className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const handleCreateTemplate = () => {
    // Simulate API call
    alert(`Template "${newTemplate.name}" created successfully!`);
    setNewTemplate({ name: "", category: "", subject: "", content: "" });
    setShowCreateTemplate(false);
  };

  const handleCreateQuickReply = () => {
    // Simulate API call
    alert(`Quick reply created successfully!`);
    setNewQuickReply({ text: "", category: "" });
    setShowCreateQuickReply(false);
  };

  // Summary statistics
  const totalTemplates = templates.length;
  const totalQuickReplies = quickReplies.length;
  const favoriteTemplates = templates.filter(t => t.isFavorite).length;
  const favoriteQuickReplies = quickReplies.filter(q => q.isFavorite).length;

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">
            Manage message templates and quick replies for efficient communication
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Templates
          </Button>
          <Button size="sm" onClick={() => setShowCreateTemplate(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTemplates}</div>
            <p className="text-xs text-muted-foreground">
              Message templates
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Replies</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalQuickReplies}</div>
            <p className="text-xs text-muted-foreground">
              Short responses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{favoriteTemplates + favoriteQuickReplies}</div>
            <p className="text-xs text-muted-foreground">
              Starred items
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {templates.reduce((sum, t) => sum + t.usageCount, 0) + quickReplies.reduce((sum, q) => sum + q.usageCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Times used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates and replies..."
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
                {categories.filter(c => c !== "all").map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.replace('_', ' ').charAt(0).toUpperCase() + category.replace('_', ' ').slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
              setQuickReplyCategoryFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="quick_replies">Quick Replies</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates ({filteredTemplates.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={getCategoryColor(template.category)} className="text-xs">
                              {getCategoryIcon(template.category)}
                              <span className="ml-1">{template.category.replace('_', ' ')}</span>
                            </Badge>
                            {template.isFavorite && (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            )}
                            <span className="text-sm text-muted-foreground">
                              Used {template.usageCount} times
                            </span>
                          </div>
                          <h3 className="font-semibold text-base">{template.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Subject: {template.subject}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {template.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            <span>Variables: {template.variables.length}</span>
                            <span>Created by {template.createdBy}</span>
                            <span>Last used {new Date(template.lastUsed).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredTemplates.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No templates found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quick_replies" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Quick Replies</h3>
            <Button size="sm" onClick={() => setShowCreateQuickReply(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Quick Reply
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuickReplies.map((reply) => (
              <Card key={reply.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {reply.category}
                    </Badge>
                    {reply.isFavorite && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-sm mb-3">{reply.text}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Used {reply.usageCount} times</span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredQuickReplies.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No quick replies found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Templates & Replies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...templates.filter(t => t.isFavorite), ...quickReplies.filter(q => q.isFavorite)].map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-base">{'name' in item ? item.name : item.text}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {'name' in item ? item.category : item.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Template Dialog */}
      {showCreateTemplate && (
        <Card className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>Create New Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Template Name</label>
                <Input
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  placeholder="Enter template name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={newTemplate.category} onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "all").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.replace('_', ' ').charAt(0).toUpperCase() + category.replace('_', ' ').slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                  placeholder="Enter subject line"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                  placeholder="Enter template content"
                  rows={6}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateTemplate}>Create Template</Button>
                <Button variant="outline" onClick={() => setShowCreateTemplate(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </Card>
      )}

      {/* Create Quick Reply Dialog */}
      {showCreateQuickReply && (
        <Card className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Create Quick Reply</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Reply Text</label>
                <Textarea
                  value={newQuickReply.text}
                  onChange={(e) => setNewQuickReply({...newQuickReply, text: e.target.value})}
                  placeholder="Enter quick reply text"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={newQuickReply.category} onValueChange={(value) => setNewQuickReply({...newQuickReply, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {quickReplyCategories.filter(c => c !== "all").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateQuickReply}>Create Quick Reply</Button>
                <Button variant="outline" onClick={() => setShowCreateQuickReply(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </Card>
      )}
    </div>
  );
} 