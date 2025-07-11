'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  DollarSign,
  CreditCard,
  BarChart2,
  TrendingUp,
  FileText,
  Download,
  Settings2,
} from "lucide-react"

export default function AccountantDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Financial Overview</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* A. Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,500</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$23,450</div>
            <p className="text-xs text-muted-foreground">15 invoices pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89,200</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">28.4%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* B. Financial Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-2">Revenue Breakdown</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Work Order Revenue</span>
                    <span className="font-semibold">$98,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subscription Fees</span>
                    <span className="font-semibold text-blue-600">$18,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Charges</span>
                    <span className="font-semibold text-green-600">$7,900</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Income</span>
                    <span className="font-semibold text-purple-600">$2,100</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Expense Categories</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Contractor Payments</span>
                    <span className="font-semibold text-red-600">$67,300</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Costs</span>
                    <span className="font-semibold text-orange-600">$12,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Administrative</span>
                    <span className="font-semibold text-yellow-600">$6,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marketing</span>
                    <span className="font-semibold text-blue-600">$3,300</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Detailed Report</Button>
              <Button size="sm" variant="outline">Export Financial Data</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Payment received - $2,450</span>
                <span className="text-xs text-muted-foreground ml-auto">5m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Contractor payment - $1,200</span>
                <span className="text-xs text-muted-foreground ml-auto">15m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Subscription renewal - $450</span>
                <span className="text-xs text-muted-foreground ml-auto">1h ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Invoice generated - $3,200</span>
                <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Payment received - $1,800</span>
                <span className="text-xs text-muted-foreground ml-auto">3h ago</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-3">
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* C. Invoice & Payment Management */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pending Invoices</span>
                  <span className="font-semibold text-orange-600">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Overdue Invoices</span>
                  <span className="font-semibold text-red-600">7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Paid This Month</span>
                  <span className="font-semibold text-green-600">156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Outstanding</span>
                  <span className="font-semibold text-blue-600">$23,450</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Quick Actions</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Generate invoice</div>
                    <div>• Send reminders</div>
                    <div>• Process payments</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Create Invoice</Button>
              <Button size="sm" variant="outline">Send Reminders</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pending Approvals</span>
                  <span className="font-semibold text-yellow-600">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processed Today</span>
                  <span className="font-semibold text-green-600">34</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Failed Payments</span>
                  <span className="font-semibold text-red-600">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg. Processing Time</span>
                  <span className="font-semibold">2.1 days</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Payment Methods</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Credit Card: 45%</div>
                    <div>• ACH Transfer: 35%</div>
                    <div>• Check: 20%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Process Payments</Button>
              <Button size="sm" variant="outline">Payment History</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax & Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tax Liability</span>
                  <span className="font-semibold text-red-600">$18,450</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax Collected</span>
                  <span className="font-semibold text-green-600">$12,300</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Deductions</span>
                  <span className="font-semibold text-blue-600">$6,200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Net Tax Due</span>
                  <span className="font-semibold text-orange-600">$950</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Compliance Status</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Tax filing: Up to date</div>
                    <div>• 1099s: Pending</div>
                    <div>• Audit: Clear</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Tax Reports</Button>
              <Button size="sm" variant="outline">Compliance</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* D. Analytics & Reporting */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Financial Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-2">Cash Flow Analysis</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Cash Inflow</span>
                    <span className="font-semibold text-green-600">$124,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash Outflow</span>
                    <span className="font-semibold text-red-600">$89,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Cash Flow</span>
                    <span className="font-semibold text-green-600">$35,300</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash Reserve</span>
                    <span className="font-semibold text-blue-600">$67,800</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Key Performance Indicators</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Gross Profit Margin</span>
                    <span className="font-semibold text-green-600">28.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Profit Margin</span>
                    <span className="font-semibold text-green-600">18.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accounts Receivable</span>
                    <span className="font-semibold text-orange-600">$23,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Days Sales Outstanding</span>
                    <span className="font-semibold">12.3 days</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Generate Report</Button>
              <Button size="sm" variant="outline">Export Analytics</Button>
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
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Process Payments
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <BarChart2 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Tax Reports
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Settings2 className="h-4 w-4 mr-2" />
                Financial Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 