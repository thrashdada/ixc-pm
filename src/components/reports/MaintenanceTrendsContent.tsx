"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Calendar, TrendingUp, Wrench, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function MaintenanceTrendsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("30d");

  // Mock data for maintenance trends
  const summaryData = {
    totalRequests: 320,
    completed: 280,
    overdue: 12,
    avgCompletion: "2.8d",
    urgent: 7,
    recurring: 18,
    satisfaction: 4.4,
  };

  const trendData = [
    { label: "Completed", value: 280, color: "bg-green-500" },
    { label: "Overdue", value: 12, color: "bg-red-500" },
    { label: "Urgent", value: 7, color: "bg-yellow-500" },
    { label: "Recurring", value: 18, color: "bg-blue-500" },
  ];

  const breakdowns = [
    { type: "Plumbing", count: 92 },
    { type: "Electrical", count: 74 },
    { type: "HVAC", count: 56 },
    { type: "Landscaping", count: 38 },
    { type: "General Repairs", count: 60 },
  ];

  const analytics = [
    { metric: "Avg. Completion Time", value: "2.8d", trend: "-0.3d", status: "positive" },
    { metric: "Customer Satisfaction", value: "4.4/5", trend: "+0.1", status: "positive" },
    { metric: "Recurring Issues", value: "18", trend: "+2", status: "negative" },
    { metric: "Urgent Requests", value: "7", trend: "-1", status: "positive" },
  ];

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <TrendingUp className="mr-2 h-4 w-4" />
            Generate Insights
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.totalRequests}</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.completed}</div>
              <p className="text-xs text-muted-foreground">
                {((summaryData.completed / summaryData.totalRequests) * 100).toFixed(0)}% completion
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.overdue}</div>
              <p className="text-xs text-muted-foreground">
                {summaryData.overdue > 0 ? `+${summaryData.overdue} this month` : "No overdue"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.avgCompletion}</div>
              <p className="text-xs text-muted-foreground">
                -0.3d from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>
              Filter maintenance requests by various criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="recurring">Recurring</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Trends</CardTitle>
                <CardDescription>
                  Recent trends in maintenance requests and completions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {trendData.map((trend, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${trend.color}`}></div>
                      <span className="w-32">{trend.label}</span>
                      <Progress value={trend.value / summaryData.totalRequests * 100} className="flex-1" />
                      <span className="w-12 text-right font-semibold">{trend.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Breakdown by Type</CardTitle>
                <CardDescription>
                  Types of maintenance requests and their counts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {breakdowns.map((item, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.type}</span>
                          <Badge variant="secondary">{item.count}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Key analytics and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {analytics.map((metric, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{metric.metric}</span>
                          <Badge variant={metric.status === "positive" ? "default" : "destructive"}>
                            {metric.trend}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold mt-2">{metric.value}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 