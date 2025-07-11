'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  UploadCloud,
  FileInput,
  ClipboardList,
  CheckCircle2,
  DollarSign,
  StarHalf,
  BarChart2,
  MessageCircle,
  Settings2,
} from "lucide-react"

export default function ContractorDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Contractor Overview</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <UploadCloud className="h-4 w-4 mr-2" />
            Upload Photos
          </Button>
          <Button variant="outline" size="sm">
            <FileInput className="h-4 w-4 mr-2" />
            Submit Invoice
          </Button>
        </div>
      </div>

      {/* A. Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 in progress, 1 pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,450</div>
            <p className="text-xs text-muted-foreground">3 invoices pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <StarHalf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">4.8★</div>
            <p className="text-xs text-muted-foreground">Based on 24 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* B. Job Management */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Job Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-2">Job Status</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>In Progress</span>
                    <span className="font-semibold text-blue-600">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Acceptance</span>
                    <span className="font-semibold text-yellow-600">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed</span>
                    <span className="font-semibold text-green-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Declined/Canceled</span>
                    <span className="font-semibold text-gray-500">0</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Performance Metrics</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Avg. Completion Time</span>
                    <span className="font-semibold">2.3 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Acceptance Rate</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Invoices</span>
                    <span className="font-semibold text-orange-600">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Earnings</span>
                    <span className="font-semibold">$4,200</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View All Jobs</Button>
              <Button size="sm" variant="outline">Job History</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>WO-1025: Invoice paid</span>
                <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>WO-1026: New message</span>
                <span className="text-xs text-muted-foreground ml-auto">15m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>WO-1027: Job assigned</span>
                <span className="text-xs text-muted-foreground ml-auto">1h ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>WO-1024: Photos approved</span>
                <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>WO-1023: Started work</span>
                <span className="text-xs text-muted-foreground ml-auto">3h ago</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-3">
              View All Updates
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* C. Upload Center & Payments */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upload Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Photos Pending</span>
                  <span className="font-semibold text-orange-600">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Invoices Pending</span>
                  <span className="font-semibold text-yellow-600">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completed Uploads</span>
                  <span className="font-semibold text-green-600">12</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Quick Actions</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Upload job photos</div>
                    <div>• Submit invoice</div>
                    <div>• Mark job complete</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Upload Photos</Button>
              <Button size="sm" variant="outline">Submit Invoice</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pending Payments</span>
                  <span className="font-semibold text-orange-600">$2,450</span>
                </div>
                <div className="flex justify-between text-sm">
                                      <span>This Month&apos;s Earnings</span>
                  <span className="font-semibold text-green-600">$4,200</span>
                </div>
                <div className="flex justify-between text-sm">
                                      <span>Last Month&apos;s Earnings</span>
                  <span className="font-semibold text-blue-600">$3,800</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg. Payment Time</span>
                  <span className="font-semibold">3.2 days</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Payment Methods</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Direct deposit</div>
                    <div>• PayPal</div>
                    <div>• Check</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Invoices</Button>
              <Button size="sm" variant="outline">Payment History</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Unread Messages</span>
                  <span className="font-semibold text-blue-600">5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pending Replies</span>
                  <span className="font-semibold text-orange-600">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Today&apos;s Notifications</span>
                  <span className="font-semibold text-green-600">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Urgent Alerts</span>
                  <span className="font-semibold text-red-600">1</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Quick Actions</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Reply to messages</div>
                    <div>• Update job status</div>
                    <div>• Request clarification</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Messages</Button>
              <Button size="sm" variant="outline">Send Update</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* D. Analytics & Performance */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-2">Earnings Analysis</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-semibold">$4,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>vs Last Month</span>
                    <span className="font-semibold text-green-600">+10.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Per Job</span>
                    <span className="font-semibold">$525</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Amount</span>
                    <span className="font-semibold text-orange-600">$2,450</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Performance Metrics</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Response Time</span>
                    <span className="font-semibold">1.8 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completion Rate</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Rating</span>
                    <span className="font-semibold text-green-600">4.8★</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jobs This Month</span>
                    <span className="font-semibold text-blue-600">8</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Detailed Report</Button>
              <Button size="sm" variant="outline">Export Data</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button size="sm" variant="outline" className="w-full justify-start">
                <UploadCloud className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <FileInput className="h-4 w-4 mr-2" />
                Submit Invoice
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark Complete
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <BarChart2 className="h-4 w-4 mr-2" />
                View Reports
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Settings2 className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 