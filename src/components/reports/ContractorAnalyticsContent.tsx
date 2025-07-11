"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, DollarSign, TrendingUp, Users, Star, AlertTriangle, CheckCircle } from "lucide-react";

export default function ContractorAnalyticsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("30d");

  // Mock data for contractor analytics
  const summaryData = {
    totalContractors: 24,
    activeContractors: 18,
    avgRating: 4.2,
    totalRevenue: 125000,
    avgResponseTime: "2.4h",
    completionRate: 87,
    topPerformers: 8,
    needsAttention: 3,
  };

  const contractors = [
    {
      id: 1,
      name: "Mike's Plumbing",
      rating: 4.8,
      completedJobs: 45,
      totalRevenue: 12500,
      responseTime: "1.2h",
      completionRate: 95,
      specialties: ["Plumbing", "HVAC"],
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Elite Electrical",
      rating: 4.5,
      completedJobs: 32,
      totalRevenue: 8900,
      responseTime: "3.1h",
      completionRate: 88,
      specialties: ["Electrical", "Security"],
      status: "active",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Green Landscaping",
      rating: 4.2,
      completedJobs: 28,
      totalRevenue: 7200,
      responseTime: "4.5h",
      completionRate: 82,
      specialties: ["Landscaping", "Maintenance"],
      status: "active",
      lastActive: "3 days ago",
    },
    {
      id: 4,
      name: "Quick Fix Repairs",
      rating: 3.8,
      completedJobs: 15,
      totalRevenue: 4200,
      responseTime: "6.2h",
      completionRate: 75,
      specialties: ["General Repairs"],
      status: "needs_attention",
      lastActive: "1 week ago",
    },
  ];

  const performanceMetrics = [
    { metric: "Average Response Time", value: "2.4h", trend: "+0.3h", status: "neutral" },
    { metric: "Job Completion Rate", value: "87%", trend: "+2.1%", status: "positive" },
    { metric: "Customer Satisfaction", value: "4.2/5", trend: "+0.1", status: "positive" },
    { metric: "Revenue per Contractor", value: "$5,208", trend: "+$320", status: "positive" },
    { metric: "On-Time Performance", value: "91%", trend: "-1.2%", status: "negative" },
    { metric: "Repeat Customer Rate", value: "68%", trend: "+3.4%", status: "positive" },
  ];

  const recentReviews = [
    {
      id: 1,
      contractor: "Mike's Plumbing",
      rating: 5,
      comment: "Excellent work! Fixed the leak quickly and professionally.",
      date: "2 days ago",
      jobType: "Plumbing Repair",
    },
    {
      id: 2,
      contractor: "Elite Electrical",
      rating: 4,
      comment: "Good work but took longer than expected.",
      date: "3 days ago",
      jobType: "Electrical Installation",
    },
    {
      id: 3,
      contractor: "Green Landscaping",
      rating: 5,
      comment: "Beautiful landscaping work. Highly recommend!",
      date: "1 week ago",
      jobType: "Landscaping",
    },
  ];

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || contractor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              <CardTitle className="text-sm font-medium">Total Contractors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.totalContractors}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Contractors</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.activeContractors}</div>
              <p className="text-xs text-muted-foreground">
                {((summaryData.activeContractors / summaryData.totalContractors) * 100).toFixed(0)}% active rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.avgRating}/5</div>
              <p className="text-xs text-muted-foreground">
                +0.2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryData.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>
              Filter contractors by various criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search contractors..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="needs_attention">Needs Attention</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
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
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            <TabsTrigger value="contractors">Contractor Details</TabsTrigger>
            <TabsTrigger value="reviews">Recent Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>
                    Key performance indicators for all contractors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Time</span>
                    <span className="text-sm text-muted-foreground">{summaryData.avgResponseTime}</span>
                  </div>
                  <Progress value={75} className="w-full" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-sm text-muted-foreground">{summaryData.completionRate}%</span>
                  </div>
                  <Progress value={summaryData.completionRate} className="w-full" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                    <span className="text-sm text-muted-foreground">{summaryData.avgRating}/5</span>
                  </div>
                  <Progress value={summaryData.avgRating * 20} className="w-full" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common actions for contractor management
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Invite New Contractors
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Review Low Performers
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="mr-2 h-4 w-4" />
                    Reward Top Performers
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Generate Performance Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Detailed performance metrics and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {performanceMetrics.map((metric, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{metric.metric}</span>
                          <Badge variant={metric.status === "positive" ? "default" : metric.status === "negative" ? "destructive" : "secondary"}>
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

          <TabsContent value="contractors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contractor Details</CardTitle>
                <CardDescription>
                  Detailed view of all contractors and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredContractors.map((contractor) => (
                    <div key={contractor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`/api/avatar/${contractor.id}`} />
                          <AvatarFallback>{contractor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{contractor.name}</h4>
                            <Badge variant={contractor.status === "active" ? "default" : "destructive"}>
                              {contractor.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Star className="mr-1 h-3 w-3" />
                              {contractor.rating}
                            </span>
                            <span className="flex items-center">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              {contractor.completedJobs} jobs
                            </span>
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {contractor.responseTime}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {contractor.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">${contractor.totalRevenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {contractor.completionRate}% completion
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last active: {contractor.lastActive}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>
                  Latest customer reviews and feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{review.contractor}</h4>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{review.jobType}</p>
                        <p className="text-sm mt-2">{review.comment}</p>
                      </div>
                    </div>
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