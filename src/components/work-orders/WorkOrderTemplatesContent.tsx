'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Eye, Copy } from "lucide-react";
import { WorkOrderTemplate } from "@/lib/types";
import Link from "next/link";

// Mock data for work order templates
const mockTemplates: WorkOrderTemplate[] = [
  {
    id: "1",
    name: "Plumbing Leak Repair",
    description: "Standard procedure for fixing plumbing leaks",
    category: "plumbing",
    priority: "high",
    estimatedDuration: 2,
    estimatedCost: 150,
    instructions: "1. Locate the source of the leak\n2. Turn off water supply\n3. Repair or replace damaged pipe\n4. Test the repair\n5. Clean up work area",
    checklist: [
      "Water supply turned off",
      "Leak source identified",
      "Repair completed",
      "Water supply restored",
      "No leaks detected",
      "Area cleaned up"
    ],
    requiredMaterials: ["Pipe wrench", "Teflon tape", "Replacement pipe", "Pipe cutter"],
    assignedTo: "John Contractor",
    isActive: true,
    createdBy: "admin",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    usageCount: 12,
    lastUsedAt: new Date("2024-03-10")
  },
  {
    id: "2",
    name: "HVAC Filter Replacement",
    description: "Regular HVAC filter maintenance",
    category: "hvac",
    priority: "medium",
    estimatedDuration: 1,
    estimatedCost: 50,
    instructions: "1. Turn off HVAC system\n2. Locate filter compartment\n3. Remove old filter\n4. Install new filter\n5. Turn system back on",
    checklist: [
      "HVAC system turned off",
      "Old filter removed",
      "New filter installed correctly",
      "System turned back on",
      "Airflow checked"
    ],
    requiredMaterials: ["New air filter", "Screwdriver"],
    assignedTo: "Sarah Fixit",
    isActive: true,
    createdBy: "admin",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    usageCount: 8,
    lastUsedAt: new Date("2024-03-05")
  },
  {
    id: "3",
    name: "Electrical Outlet Repair",
    description: "Fix faulty electrical outlets",
    category: "electrical",
    priority: "high",
    estimatedDuration: 1.5,
    estimatedCost: 100,
    instructions: "1. Turn off power to circuit\n2. Remove outlet cover\n3. Test for power\n4. Replace outlet if needed\n5. Restore power and test",
    checklist: [
      "Power turned off",
      "Outlet cover removed",
      "Outlet tested",
      "Replacement completed",
      "Power restored",
      "Outlet tested"
    ],
    requiredMaterials: ["Voltage tester", "Screwdriver", "Replacement outlet", "Wire nuts"],
    assignedTo: "ACME Maintenance",
    isActive: true,
    createdBy: "admin",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    usageCount: 5,
    lastUsedAt: new Date("2024-02-28")
  },
  {
    id: "4",
    name: "Carpet Cleaning",
    description: "Deep carpet cleaning service",
    category: "cleaning",
    priority: "low",
    estimatedDuration: 3,
    estimatedCost: 200,
    instructions: "1. Move furniture\n2. Vacuum thoroughly\n3. Apply cleaning solution\n4. Steam clean\n5. Allow to dry",
    checklist: [
      "Furniture moved",
      "Area vacuumed",
      "Cleaning solution applied",
      "Steam cleaning completed",
      "Area dried",
      "Furniture returned"
    ],
    requiredMaterials: ["Carpet cleaner", "Cleaning solution", "Vacuum", "Fans"],
    assignedTo: "PestBusters",
    isActive: true,
    createdBy: "admin",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
    usageCount: 3,
    lastUsedAt: new Date("2024-02-15")
  }
];

const categories = ["plumbing", "electrical", "hvac", "carpentry", "cleaning", "other"];
const priorities = ["low", "medium", "high", "urgent"];

export default function WorkOrderTemplatesContent() {
  const [templates, setTemplates] = useState<WorkOrderTemplate[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<WorkOrderTemplate | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || !categoryFilter || template.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || !priorityFilter || template.priority === priorityFilter;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const handleDeleteTemplate = (id: string) => {
    if (confirm("Are you sure you want to delete this template?")) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  const handleUseTemplate = (template: WorkOrderTemplate) => {
    // Navigate to create work order page with template data
    alert(`Using template: ${template.name}`);
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "plumbing": return "blue";
      case "electrical": return "yellow";
      case "hvac": return "green";
      case "carpentry": return "orange";
      case "cleaning": return "purple";
      default: return "gray";
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Work Order Templates</h1>
          <p className="text-muted-foreground">
            Manage reusable templates for common maintenance tasks
          </p>
        </div>
        <Link href="/dashboard/work-orders/templates/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Template
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
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
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
              setPriorityFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Templates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Templates ({filteredTemplates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Est. Cost</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-muted-foreground">{template.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`bg-${getCategoryColor(template.category)}/10 text-${getCategoryColor(template.category)}-700 border-${getCategoryColor(template.category)}/20`}>
                      {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(template.priority) as "default" | "secondary" | "destructive" | "outline"}>
                      {template.priority.charAt(0).toUpperCase() + template.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{template.estimatedDuration}h</TableCell>
                  <TableCell>${template.estimatedCost}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{template.usageCount} times</div>
                      {template.lastUsedAt && (
                        <div className="text-muted-foreground">
                          {template.lastUsedAt.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={template.isActive ? "default" : "secondary"}>
                      {template.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUseTemplate(template)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => alert("Edit template")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTemplate(template.id)}
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

      {/* View Template Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{selectedTemplate.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <Badge variant="outline">{selectedTemplate.category}</Badge>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Priority</h3>
                                      <Badge variant={getPriorityColor(selectedTemplate.priority) as "default" | "secondary" | "destructive" | "outline"}>
                      {selectedTemplate.priority}
                    </Badge>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Estimated Duration</h3>
                  <p>{selectedTemplate.estimatedDuration} hours</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Estimated Cost</h3>
                  <p>${selectedTemplate.estimatedCost}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Instructions</h3>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="whitespace-pre-wrap text-sm">{selectedTemplate.instructions}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Checklist</h3>
                <ul className="space-y-2">
                  {selectedTemplate.checklist.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 border rounded border-muted-foreground/20" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Required Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.requiredMaterials.map((material, index) => (
                    <Badge key={index} variant="secondary">{material}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => handleUseTemplate(selectedTemplate)}>
                  Use This Template
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 