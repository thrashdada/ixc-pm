'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  PlusCircle,
  Users,
  ClipboardList,
  Building2,
  AlertTriangle,
  BarChart2,
  MessageCircle,
  Settings2,
} from "lucide-react"

export default function PropertyManagerDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Property Manager Overview</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Work Order
          </Button>
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Invite Contractor
          </Button>
        </div>
      </div>

      {/* A. Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Work Orders</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">3 en route, 5 in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 with open jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contractors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 active today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Priority Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      {/* B. Work Order Management */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Work Order Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-2">Work Order Status</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Pending Assignment</span>
                    <span className="font-semibold text-yellow-600">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>In Progress</span>
                    <span className="font-semibold text-blue-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>En Route</span>
                    <span className="font-semibold text-orange-600">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed</span>
                    <span className="font-semibold text-green-600">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>On Hold</span>
                    <span className="font-semibold text-gray-500">2</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Performance Metrics</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Avg. Response Time</span>
                    <span className="font-semibold">2.1 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completion Rate</span>
                    <span className="font-semibold text-green-600">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Satisfaction</span>
                    <span className="font-semibold text-green-600">4.7★</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Spend</span>
                    <span className="font-semibold">$12,450</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View All Work Orders</Button>
              <Button size="sm" variant="outline">Create New</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>WO-1025: Completed</span>
                <span className="text-xs text-muted-foreground ml-auto">5m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>WO-1026: Contractor assigned</span>
                <span className="text-xs text-muted-foreground ml-auto">15m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>WO-1027: Photos uploaded</span>
                <span className="text-xs text-muted-foreground ml-auto">1h ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>WO-1028: Priority alert</span>
                <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>WO-1024: Invoice approved</span>
                <span className="text-xs text-muted-foreground ml-auto">3h ago</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-3">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* C. Property & Contractor Management */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Property Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Properties</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>With Active Jobs</span>
                  <span className="font-semibold text-blue-600">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Maintenance Due</span>
                  <span className="font-semibold text-orange-600">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Emergency Alerts</span>
                  <span className="font-semibold text-red-600">1</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Quick Actions</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Add new property</div>
                    <div>• Schedule maintenance</div>
                    <div>• View property details</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Add Property</Button>
              <Button size="sm" variant="outline">View All</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contractor Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Contractors</span>
                  <span className="font-semibold text-green-600">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Available Today</span>
                  <span className="font-semibold text-blue-600">5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg. Rating</span>
                  <span className="font-semibold text-yellow-600">4.6★</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pending Approvals</span>
                  <span className="font-semibold text-orange-600">2</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Top Performers</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• ABC Plumbing (4.9★)</div>
                    <div>• XYZ Electric (4.8★)</div>
                    <div>• 123 HVAC (4.7★)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Invite Contractor</Button>
              <Button size="sm" variant="outline">View All</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Unread Messages</span>
                  <span className="font-semibold text-blue-600">7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pending Replies</span>
                  <span className="font-semibold text-orange-600">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Today&apos;s Notifications</span>
                  <span className="font-semibold text-green-600">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Urgent Alerts</span>
                  <span className="font-semibold text-red-600">2</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Quick Actions</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Send bulk message</div>
                    <div>• Create template</div>
                    <div>• View message history</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Send Message</Button>
              <Button size="sm" variant="outline">View All</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* D. Analytics & Reports */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-2">Cost Analysis</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Spend</span>
                    <span className="font-semibold">$12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>vs Last Month</span>
                    <span className="font-semibold text-green-600">+8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Job Cost</span>
                    <span className="font-semibold">$692</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency Costs</span>
                    <span className="font-semibold text-red-600">$1,200</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Efficiency Metrics</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Response Time</span>
                    <span className="font-semibold">2.1 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completion Rate</span>
                    <span className="font-semibold text-green-600">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Satisfaction</span>
                    <span className="font-semibold text-green-600">4.7★</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contractor Utilization</span>
                    <span className="font-semibold text-blue-600">78%</span>
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
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Work Order
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Invite Contractor
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                Add Property
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <BarChart2 className="h-4 w-4 mr-2" />
                Generate Report
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