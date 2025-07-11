'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Star, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle2,
  BarChart3,
  Download,
  Eye,
  MessageSquare,
  Calendar,
  DollarSign,
  Users,
  Award,
  Target
} from "lucide-react";

// Mock data for contractor ratings and performance
const contractors = [
  {
    id: "C001",
    name: "ACME Plumbing",
    contact: {
      name: "John Smith",
      email: "john@acmeplumbing.com",
      phone: "(555) 123-4567"
    },
    specialties: ["plumbing", "hvac"],
    overallRating: 4.8,
    totalReviews: 156,
    completedJobs: 152,
    totalJobs: 156,
    averageResponseTime: "2.5 hours",
    averageCompletionTime: "3.2 days",
    onTimeCompletion: 94,
    customerSatisfaction: 96,
    repeatCustomerRate: 78,
    hourlyRate: 85,
    monthlyRevenue: 12500,
    lastMonthJobs: 12,
    thisMonthJobs: 8,
    performanceTrend: "up",
    recentReviews: [
      { rating: 5, comment: "Excellent work, very professional", date: "2024-01-20" },
      { rating: 4, comment: "Good service, completed on time", date: "2024-01-18" },
      { rating: 5, comment: "Highly recommend, great communication", date: "2024-01-15" }
    ]
  },
  {
    id: "C002",
    name: "BrightSpark Electric",
    contact: {
      name: "Sarah Johnson",
      email: "sarah@brightspark.com",
      phone: "(555) 234-5678"
    },
    specialties: ["electrical", "lighting"],
    overallRating: 4.9,
    totalReviews: 89,
    completedJobs: 87,
    totalJobs: 89,
    averageResponseTime: "1.8 hours",
    averageCompletionTime: "2.1 days",
    onTimeCompletion: 98,
    customerSatisfaction: 99,
    repeatCustomerRate: 85,
    hourlyRate: 95,
    monthlyRevenue: 18200,
    lastMonthJobs: 15,
    thisMonthJobs: 12,
    performanceTrend: "up",
    recentReviews: [
      { rating: 5, comment: "Outstanding electrical work", date: "2024-01-19" },
      { rating: 5, comment: "Very knowledgeable and efficient", date: "2024-01-16" },
      { rating: 4, comment: "Good work, would hire again", date: "2024-01-14" }
    ]
  },
  {
    id: "C003",
    name: "CoolBreeze HVAC",
    contact: {
      name: "Mike Davis",
      email: "mike@coolbreeze.com",
      phone: "(555) 345-6789"
    },
    specialties: ["hvac", "air_conditioning"],
    overallRating: 4.7,
    totalReviews: 203,
    completedJobs: 198,
    totalJobs: 203,
    averageResponseTime: "3.2 hours",
    averageCompletionTime: "4.1 days",
    onTimeCompletion: 91,
    customerSatisfaction: 94,
    repeatCustomerRate: 72,
    hourlyRate: 90,
    monthlyRevenue: 15800,
    lastMonthJobs: 18,
    thisMonthJobs: 14,
    performanceTrend: "stable",
    recentReviews: [
      { rating: 4, comment: "Good HVAC service", date: "2024-01-19" },
      { rating: 5, comment: "Fixed the issue quickly", date: "2024-01-17" },
      { rating: 4, comment: "Professional service", date: "2024-01-13" }
    ]
  },
  {
    id: "C004",
    name: "GreenThumb Landscaping",
    contact: {
      name: "Lisa Wilson",
      email: "lisa@greenthumb.com",
      phone: "(555) 456-7890"
    },
    specialties: ["landscaping", "gardening"],
    overallRating: 4.6,
    totalReviews: 67,
    completedJobs: 65,
    totalJobs: 67,
    averageResponseTime: "4.1 hours",
    averageCompletionTime: "5.3 days",
    onTimeCompletion: 88,
    customerSatisfaction: 92,
    repeatCustomerRate: 65,
    hourlyRate: 75,
    monthlyRevenue: 8900,
    lastMonthJobs: 8,
    thisMonthJobs: 6,
    performanceTrend: "down",
    recentReviews: [
      { rating: 4, comment: "Good landscaping work", date: "2024-01-18" },
      { rating: 4, comment: "Satisfied with the service", date: "2024-01-15" },
      { rating: 3, comment: "Work was okay", date: "2024-01-12" }
    ]
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

export default function ContractorRatingsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = 
      contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "all" || contractor.specialties.includes(specialtyFilter);
    const matchesRating = ratingFilter === "all" || 
      (ratingFilter === "excellent" && contractor.overallRating >= 4.5) ||
      (ratingFilter === "good" && contractor.overallRating >= 4.0 && contractor.overallRating < 4.5) ||
      (ratingFilter === "average" && contractor.overallRating < 4.0);
    const matchesPerformance = performanceFilter === "all" ||
      (performanceFilter === "improving" && contractor.performanceTrend === "up") ||
      (performanceFilter === "declining" && contractor.performanceTrend === "down") ||
      (performanceFilter === "stable" && contractor.performanceTrend === "stable");
    
    return matchesSearch && matchesSpecialty && matchesRating && matchesPerformance;
  });

  const getPerformanceTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "stable": return <BarChart3 className="h-4 w-4 text-blue-600" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-yellow-600";
    return "text-red-600";
  };

  // Summary statistics
  const averageRating = contractors.reduce((sum, c) => sum + c.overallRating, 0) / contractors.length;
  const topPerformers = contractors.filter(c => c.overallRating >= 4.5).length;

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">
            Monitor contractor performance, ratings, and customer satisfaction
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Performance Analytics
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Across all contractors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{topPerformers}</div>
            <p className="text-xs text-muted-foreground">
              4.5+ star rating
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {contractors.reduce((sum, c) => sum + c.totalReviews, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Customer feedback
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(contractors.reduce((sum, c) => sum + (c.completedJobs / c.totalJobs), 0) / contractors.length * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Jobs completed successfully
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
                placeholder="Search contractors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty.replace('_', ' ').charAt(0).toUpperCase() + specialty.replace('_', ' ').slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="excellent">Excellent (4.5+)</SelectItem>
                <SelectItem value="good">Good (4.0-4.4)</SelectItem>
                <SelectItem value="average">Average (&lt;4.0)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance</SelectItem>
                <SelectItem value="improving">Improving</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="declining">Declining</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSpecialtyFilter("all");
              setRatingFilter("all");
              setPerformanceFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="reviews">Recent Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contractor Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contractor</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>Monthly Jobs</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContractors.map((contractor) => (
                    <TableRow key={contractor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="" />
                            <AvatarFallback>{contractor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{contractor.name}</div>
                            <div className="text-sm text-muted-foreground">{contractor.contact.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className={`font-medium ${getRatingColor(contractor.overallRating)}`}>
                            {contractor.overallRating}
                          </span>
                          <span className="text-sm text-muted-foreground">({contractor.totalReviews})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPerformanceTrendIcon(contractor.performanceTrend)}
                          <span className="text-sm capitalize">{contractor.performanceTrend}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="font-medium">
                            {Math.round((contractor.completedJobs / contractor.totalJobs) * 100)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{contractor.averageResponseTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">{contractor.thisMonthJobs}</span>
                          <span className="text-sm text-muted-foreground">/ {contractor.lastMonthJobs}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium">${contractor.monthlyRevenue.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredContractors.map((contractor) => (
                    <div key={contractor.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{contractor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {contractor.contact.name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{contractor.overallRating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {contractor.customerSatisfaction}% satisfied
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredContractors.map((contractor) => (
                    <div key={contractor.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{contractor.name}</span>
                        <div className="flex items-center gap-2">
                          {getPerformanceTrendIcon(contractor.performanceTrend)}
                          <span className="text-sm capitalize">{contractor.performanceTrend}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-muted-foreground">On-time</div>
                          <div className="font-medium">{contractor.onTimeCompletion}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Repeat</div>
                          <div className="font-medium">{contractor.repeatCustomerRate}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Response</div>
                          <div className="font-medium">{contractor.averageResponseTime}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContractors.map((contractor) => (
                  <div key={contractor.id} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>{contractor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{contractor.name}</div>
                        <div className="text-sm text-muted-foreground">{contractor.contact.name}</div>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{contractor.overallRating}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {contractor.recentReviews.map((review, index) => (
                        <div key={index} className="pl-11 p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      ))}
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