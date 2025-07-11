'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, User, Building2, FileText } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Mock data
const properties = [
  { id: 1, name: "Maple Apartments", units: ["101", "102", "201"] },
  { id: 2, name: "Oak Villas", units: ["A1", "A2"] },
  { id: 3, name: "Pine Estates", units: ["201"] },
  { id: 4, name: "Elm Gardens", units: ["302"] },
  { id: 5, name: "Cedar Heights", units: ["B2"] },
];
const assignees = [
  "John Contractor",
  "Sarah Fixit",
  "ACME Maintenance",
  "PestBusters",
  "RoofRight",
];
const priorities = ["normal", "high", "urgent"];

// Mock templates
const templates = [
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
  }
];

// Zod schema for validation
const formSchema = z.object({
  property: z.string().min(1, "Property is required"),
  unit: z.string().min(1, "Unit is required"),
  title: z.string().min(2, "Title is required"),
  description: z.string().min(2, "Description is required"),
  priority: z.string().min(1, "Priority is required"),
  dueDate: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date || typeof arg === "number") {
        const date = new Date(arg);
        return isNaN(date.getTime()) ? undefined : date;
      }
      return undefined;
    },
    z.date().optional().refine(val => !!val, { message: "Due date is required" })
  ),
  assignedTo: z.string().min(1, "Assignee is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateWorkOrderContent() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      property: "",
      unit: "",
      title: "",
      description: "",
      priority: "normal",
      dueDate: undefined,
      assignedTo: "",
    },
  });

  const property = form.watch("property");
  const selectedProperty = properties.find((p) => p.id.toString() === property);
  const availableUnits = selectedProperty ? selectedProperty.units : [];

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      form.setValue("title", template.name);
      form.setValue("description", template.description);
      form.setValue("priority", template.priority);
      form.setValue("assignedTo", template.assignedTo || "");
    }
  };

  function onSubmit(values: FormValues) {
    alert("Work order created! (mock)\n" + JSON.stringify(values, null, 2));
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 pt-6 bg-muted/50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Work Order</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Template Selection */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4" />
                  <h3 className="font-medium">Use Template (Optional)</h3>
                </div>
                <Select onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template to pre-fill the form" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name} - {template.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="property"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="property">
                            <SelectValue placeholder="Select property" />
                          </SelectTrigger>
                          <SelectContent>
                            {properties.map((p) => (
                              <SelectItem key={p.id} value={p.id.toString()}>
                                <Building2 className="h-4 w-4 mr-2 inline" />
                                {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange} disabled={!property}>
                          <SelectTrigger id="unit">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableUnits.map((u) => (
                              <SelectItem key={u} value={u}>{u}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Short summary (e.g. Leaky faucet)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the issue or request..." rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="priority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map((p) => (
                              <SelectItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={"w-full pl-3 text-left font-normal" + (field.value ? "" : " text-muted-foreground")}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assignedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned To</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="assigned-to">
                            <SelectValue placeholder="Select assignee" />
                          </SelectTrigger>
                          <SelectContent>
                            {assignees.map((a) => (
                              <SelectItem key={a} value={a}>
                                <User className="h-4 w-4 mr-2 inline" />
                                {a}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Creating..." : "Create Work Order"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 