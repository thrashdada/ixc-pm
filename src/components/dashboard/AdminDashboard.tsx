'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  Users,
  ShieldCheck,
  ShieldOff,
  BarChart2,
  Building2,
  Database,
  Settings2,
  LifeBuoy,
} from "lucide-react"

export default function AdminDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Platform Administration</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Manage Users
          </Button>
          <Button variant="outline" size="sm">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>

      {/* A. Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">+23 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <ShieldOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* B. User Management */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>User Management Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-2">User Types</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Property Managers</span>
                    <span className="font-semibold text-blue-600">456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contractors</span>
                    <span className="font-semibold text-green-600">623</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accountants</span>
                    <span className="font-semibold text-purple-600">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Admins</span>
                    <span className="font-semibold text-orange-600">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Verification</span>
                    <span className="font-semibold text-yellow-600">67</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Activity Metrics</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Active Today</span>
                    <span className="font-semibold text-green-600">342</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New This Week</span>
                    <span className="font-semibold text-blue-600">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Suspended</span>
                    <span className="font-semibold text-red-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Approval</span>
                    <span className="font-semibold text-orange-600">23</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View All Users</Button>
              <Button size="sm" variant="outline">User Analytics</Button>
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
                <span>New user registered</span>
                <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Security alert triggered</span>
                <span className="text-xs text-muted-foreground ml-auto">15m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>User role updated</span>
                <span className="text-xs text-muted-foreground ml-auto">1h ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Pending verification</span>
                <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System backup completed</span>
                <span className="text-xs text-muted-foreground ml-auto">3h ago</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-3">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* C. System Management */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Server Status</span>
                  <span className="font-semibold text-green-600">Online</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Database Status</span>
                  <span className="font-semibold text-green-600">Healthy</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>API Response Time</span>
                  <span className="font-semibold">142ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Storage Usage</span>
                  <span className="font-semibold text-blue-600">67%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Quick Actions</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• View system logs</div>
                    <div>• Monitor performance</div>
                    <div>• Backup database</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">System Logs</Button>
              <Button size="sm" variant="outline">Performance</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Threats</span>
                  <span className="font-semibold text-red-600">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Blocked Attempts</span>
                  <span className="font-semibold text-green-600">1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Failed Logins</span>
                  <span className="font-semibold text-orange-600">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Security Score</span>
                  <span className="font-semibold text-green-600">92/100</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Security Actions</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Review alerts</div>
                    <div>• Update policies</div>
                    <div>• Audit access</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Security Logs</Button>
              <Button size="sm" variant="outline">Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Work Orders</span>
                  <span className="font-semibold">15,234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Active Properties</span>
                  <span className="font-semibold text-blue-600">892</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Monthly Revenue</span>
                  <span className="font-semibold text-green-600">$45,230</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Platform Growth</span>
                  <span className="font-semibold text-green-600">+18%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Analytics Tools</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Generate reports</div>
                    <div>• Export data</div>
                    <div>• View trends</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Generate Report</Button>
              <Button size="sm" variant="outline">Export Data</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* D. Platform Analytics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-2">Usage Statistics</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Daily Active Users</span>
                    <span className="font-semibold">342</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Active Users</span>
                    <span className="font-semibold text-blue-600">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Session Duration</span>
                    <span className="font-semibold">24 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bounce Rate</span>
                    <span className="font-semibold text-green-600">12%</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Performance Metrics</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Page Load Time</span>
                    <span className="font-semibold">1.2s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>API Success Rate</span>
                    <span className="font-semibold text-green-600">99.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Error Rate</span>
                    <span className="font-semibold text-green-600">0.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime</span>
                    <span className="font-semibold text-green-600">99.9%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Detailed Analytics</Button>
              <Button size="sm" variant="outline">Export Reports</Button>
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
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Security Settings
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Database className="h-4 w-4 mr-2" />
                System Logs
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <BarChart2 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Settings2 className="h-4 w-4 mr-2" />
                Platform Settings
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <LifeBuoy className="h-4 w-4 mr-2" />
                Support Center
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 