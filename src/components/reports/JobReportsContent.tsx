'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  DollarSign,
  Download,
  Filter,
  Eye,
  Activity,
  Star,
  Wrench,
  MapPin,
  ArrowUpRight
} from "lucide-react";

// Mock data for job reports
const jobReports = [
  {
    id: "JR001",
    period: "January 2024",
    totalJobs: 156,
    completedJobs: 142,
    pendingJobs: 8,
    inProgressJobs: 6,
    averageCompletionTime: "3.2 days",
    averageCost: 1250,
    totalRevenue: 178500,
    topContractor: {
      name: "ACME Plumbing",
      jobs: 45,
      rating: 4.8
    },
    topProperty: {
      name: "Sunset Apartments",
      jobs: 23,
      address: "123 Main St"
    },
    jobTypes: {
      plumbing: 45,
      electrical: 38,
      hvac: 32,
      landscaping: 25,
      general: 16
    },
    monthlyTrend: "up",
    completionRate: 91,
    customerSatisfaction: 94
  },
  {
    id: "JR002",
    period: "December 2023",
    totalJobs: 143,
    completedJobs: 135,
    pendingJobs: 5,
    inProgressJobs: 3,
    averageCompletionTime: "2.8 days",
    averageCost: 1180,
    totalRevenue: 168740,
    topContractor: {
      name: "BrightSpark Electric",
      jobs: 42,
      rating: 4.9
    },
    topProperty: {
      name: "Downtown Complex",
      jobs: 28,
      address: "456 Oak Ave"
    },
    jobTypes: {
      electrical: 42,
      plumbing: 35,
      hvac: 28,
      landscaping: 22,
      general: 16
    },
    monthlyTrend: "up",
    completionRate: 94,
    customerSatisfaction: 96
  },
  {
    id: "JR003",
    period: "November 2023",
    totalJobs: 167,
    completedJobs: 158,
    pendingJobs: 6,
    inProgressJobs: 3,
    averageCompletionTime: "3.5 days",
    averageCost: 1320,
    totalRevenue: 211440,
    topContractor: {
      name: "CoolBreeze HVAC",
      jobs: 48,
      rating: 4.7
    },
    topProperty: {
      name: "Corporate Plaza",
      jobs: 31,
      address: "789 Business Blvd"
    },
    jobTypes: {
      hvac: 48,
      plumbing: 38,
      electrical: 35,
      landscaping: 28,
      general: 18
    },
    monthlyTrend: "down",
    completionRate: 95,
    customerSatisfaction: 93
  }
];

const contractors = [
  {
    id: "C001",
    name: "ACME Plumbing",
    totalJobs: 156,
    completedJobs: 152,
    averageRating: 4.8,
    totalRevenue: 187200,
    averageCompletionTime: "2.5 days",
    specialties: ["plumbing", "hvac"],
    completionRate: 97
  },
  {
    id: "C002",
    name: "BrightSpark Electric",
    totalJobs: 134,
    completedJobs: 131,
    averageRating: 4.9,
    totalRevenue: 160800,
    averageCompletionTime: "2.1 days",
    specialties: ["electrical", "lighting"],
    completionRate: 98
  },
  {
    id: "C003",
    name: "CoolBreeze HVAC",
    totalJobs: 189,
    completedJobs: 182,
    averageRating: 4.7,
    totalRevenue: 226800,
    averageCompletionTime: "3.2 days",
    specialties: ["hvac", "air_conditioning"],
    completionRate: 96
  },
  {
    id: "C004",
    name: "GreenThumb Landscaping",
    totalJobs: 89,
    completedJobs: 85,
    averageRating: 4.6,
    totalRevenue: 106800,
    averageCompletionTime: "4.1 days",
    specialties: ["landscaping", "gardening"],
    completionRate: 96
  }
];

const properties = [
  {
    id: "P001",
    name: "Sunset Apartments",
    address: "123 Main St, Downtown",
    totalJobs: 67,
    completedJobs: 64,
    averageCost: 1180,
    totalSpent: 79120,
    jobTypes: ["plumbing", "electrical", "hvac"],
    completionRate: 96
  },
  {
    id: "P002",
    name: "Downtown Complex",
    address: "456 Oak Ave, Midtown",
    totalJobs: 89,
    completedJobs: 86,
    averageCost: 1350,
    totalSpent: 116100,
    jobTypes: ["electrical", "hvac", "general"],
    completionRate: 97
  },
  {
    id: "P003",
    name: "Corporate Plaza",
    address: "789 Business Blvd, Uptown",
    totalJobs: 45,
    completedJobs: 43,
    averageCost: 2100,
    totalSpent: 94500,
    jobTypes: ["hvac", "electrical", "plumbing"],
    completionRate: 96
  },
  {
    id: "P004",
    name: "Garden Apartments",
    address: "321 Garden Lane, Suburbs",
    totalJobs: 34,
    completedJobs: 32,
    averageCost: 980,
    totalSpent: 33320,
    jobTypes: ["landscaping", "general", "plumbing"],
    completionRate: 94
  }
];

const timeRanges = ["last_7_days", "last_30_days", "last_3_months", "last_6_months", "last_year"];
const reportTypes = ["overview", "contractor_performance", "property_analysis", "financial_summary"];

export default function JobReportsContent() {
  const [timeRange, setTimeRange] = useState("last_30_days");
  const [reportType, setReportType] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const currentReport = jobReports[0]; // Most recent report

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      default: return "text-blue-600";
    }
  };

  const getCompletionRateColor = (rate: number) => {
    if (rate >= 95) return "text-green-600";
    if (rate >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">
            Comprehensive job analytics and performance reports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range.replace('_', ' ').charAt(0).toUpperCase() + range.replace('_', ' ').slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setTimeRange("last_30_days");
              setReportType("overview");
            }}>
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentReport.totalJobs}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(currentReport.monthlyTrend)}
              <span className={getTrendColor(currentReport.monthlyTrend)}>
                +{Math.round((currentReport.totalJobs / jobReports[1].totalJobs - 1) * 100)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getCompletionRateColor(currentReport.completionRate)}`}>
              {currentReport.completionRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              {currentReport.completedJobs} of {currentReport.totalJobs} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentReport.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">
                +{Math.round((currentReport.totalRevenue / jobReports[1].totalRevenue - 1) * 100)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentReport.averageCompletionTime}</div>
            <p className="text-xs text-muted-foreground">
              Average time to complete jobs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contractors">Contractor Performance</TabsTrigger>
          <TabsTrigger value="properties">Property Analysis</TabsTrigger>
          <TabsTrigger value="financial">Financial Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Job Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{currentReport.completedJobs}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((currentReport.completedJobs / currentReport.totalJobs) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{currentReport.inProgressJobs}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((currentReport.inProgressJobs / currentReport.totalJobs) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{currentReport.pendingJobs}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((currentReport.pendingJobs / currentReport.totalJobs) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Types Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(currentReport.jobTypes).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm capitalize">{type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{count}</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((count / currentReport.totalJobs) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Top Contractor</h4>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{currentReport.topContractor.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {currentReport.topContractor.jobs} jobs completed
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{currentReport.topContractor.rating}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Top Property</h4>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{currentReport.topProperty.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {currentReport.topProperty.address}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{currentReport.topProperty.jobs}</div>
                      <div className="text-sm text-muted-foreground">jobs</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contractors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contractor Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contractors.map((contractor) => (
                  <div key={contractor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{contractor.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{contractor.averageRating}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <div className="font-medium text-foreground">{contractor.totalJobs}</div>
                          <div>Total Jobs</div>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{contractor.completionRate}%</div>
                          <div>Completion Rate</div>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{contractor.averageCompletionTime}</div>
                          <div>Avg Time</div>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">${contractor.totalRevenue.toLocaleString()}</div>
                          <div>Revenue</div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{property.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.address}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <div className="font-medium text-foreground">{property.totalJobs}</div>
                          <div>Total Jobs</div>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{property.completionRate}%</div>
                          <div>Completion Rate</div>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">${property.averageCost}</div>
                          <div>Avg Cost</div>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">${property.totalSpent.toLocaleString()}</div>
                          <div>Total Spent</div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Revenue</span>
                    <span className="font-medium">${currentReport.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Job Cost</span>
                    <span className="font-medium">${currentReport.averageCost}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Revenue per Job</span>
                    <span className="font-medium">${Math.round(currentReport.totalRevenue / currentReport.totalJobs)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Growth</span>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3 text-green-600" />
                      <span className="font-medium text-green-600">
                        +{Math.round((currentReport.totalRevenue / jobReports[1].totalRevenue - 1) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Spent</span>
                    <span className="font-medium">${(currentReport.totalRevenue * 0.85).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Contractor Costs</span>
                    <span className="font-medium">${(currentReport.totalRevenue * 0.75).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Materials & Supplies</span>
                    <span className="font-medium">${(currentReport.totalRevenue * 0.10).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profit Margin</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-green-600">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 