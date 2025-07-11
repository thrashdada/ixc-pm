'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  PlusCircle,
  MoreHorizontal,
  Building2,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Edit,
  MapPin,
  Phone,
  Mail,
  Clock,
  Download,
  Upload,
  Key,
  Shield,
  UserCheck,
} from "lucide-react";

// Types for units and access info
interface Unit {
  id: number;
  number: string;
  type: string;
  status: string;
  tenant: string | null;
  tenantPhone: string | null;
  accessCodes: {
    mainEntrance: string;
    unitDoor: string;
    garage: string | null;
  };
  keys: {
    unitKey: string;
    mailboxKey: string;
    garageRemote: string | null;
  };
  notes: string;
  lastAccess: string;
}

interface Property {
  id: number;
  name: string;
  address: string;
  units: Unit[];
}

// Mock data for units and access info
const properties: Property[] = [
  {
    id: 1,
    name: "Maple Apartments",
    address: "123 Maple St, Downtown",
    units: [
      {
        id: 1,
        number: "101",
        type: "1BR",
        status: "occupied",
        tenant: "Alice Johnson",
        tenantPhone: "(555) 111-2222",
        accessCodes: {
          mainEntrance: "1234",
          unitDoor: "5678",
          garage: "9012"
        },
        keys: {
          unitKey: "MK-101-A",
          mailboxKey: "MK-101-B",
          garageRemote: "GR-101"
        },
        notes: "Tenant prefers text notifications",
        lastAccess: "2024-01-20 14:30"
      },
      {
        id: 2,
        number: "102",
        type: "2BR",
        status: "vacant",
        tenant: null,
        tenantPhone: null,
        accessCodes: {
          mainEntrance: "1234",
          unitDoor: "5679",
          garage: "9012"
        },
        keys: {
          unitKey: "MK-102-A",
          mailboxKey: "MK-102-B",
          garageRemote: null
        },
        notes: "Unit ready for new tenant",
        lastAccess: "2024-01-18 09:15"
      },
      {
        id: 3,
        number: "201",
        type: "1BR",
        status: "occupied",
        tenant: "Bob Smith",
        tenantPhone: "(555) 333-4444",
        accessCodes: {
          mainEntrance: "1234",
          unitDoor: "5680",
          garage: "9012"
        },
        keys: {
          unitKey: "MK-201-A",
          mailboxKey: "MK-201-B",
          garageRemote: "GR-201"
        },
        notes: "Tenant has 2 cats",
        lastAccess: "2024-01-20 16:45"
      }
    ]
  },
  {
    id: 2,
    name: "Oak Villas",
    address: "456 Oak Ave, Midtown",
    units: [
      {
        id: 4,
        number: "A1",
        type: "3BR",
        status: "occupied",
        tenant: "Carol Davis",
        tenantPhone: "(555) 555-6666",
        accessCodes: {
          mainEntrance: "5678",
          unitDoor: "1234",
          garage: "9012"
        },
        keys: {
          unitKey: "OV-A1-A",
          mailboxKey: "OV-A1-B",
          garageRemote: "GR-A1"
        },
        notes: "Tenant works night shift",
        lastAccess: "2024-01-19 22:30"
      },
      {
        id: 5,
        number: "A2",
        type: "2BR",
        status: "occupied",
        tenant: "David Wilson",
        tenantPhone: "(555) 777-8888",
        accessCodes: {
          mainEntrance: "5678",
          unitDoor: "1235",
          garage: "9012"
        },
        keys: {
          unitKey: "OV-A2-A",
          mailboxKey: "OV-A2-B",
          garageRemote: "GR-A2"
        },
        notes: "Tenant has parking spot #12",
        lastAccess: "2024-01-20 08:15"
      }
    ]
  }
];

export default function UnitsAndAccessContent() {
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAccessCodes, setShowAccessCodes] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'occupied':
        return <Badge variant="default" className="bg-green-100 text-green-800">Occupied</Badge>;
      case 'vacant':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Vacant</Badge>;
      case 'maintenance':
        return <Badge variant="destructive">Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredProperties = properties.filter(property => 
    selectedProperty === "all" || property.id.toString() === selectedProperty
  );

  const allUnits = filteredProperties.flatMap(property => 
    property.units.map(unit => ({ ...unit, propertyName: property.name, propertyAddress: property.address }))
  );

  const filteredUnits = allUnits.filter(unit =>
    unit.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.tenant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnits = allUnits.length;
  const occupiedUnits = allUnits.filter(unit => unit.status === 'occupied').length;
  const vacantUnits = allUnits.filter(unit => unit.status === 'vacant').length;

  const handleEditUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setIsEditDialogOpen(true);
  };

  const handleCopyAccessCode = (code: string | null) => {
    if (code) {
      navigator.clipboard.writeText(code);
      // You could add a toast notification here
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-muted/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-muted-foreground">
            Manage unit details, access codes, keys, and tenant information for all properties.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Unit
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnits}</div>
            <p className="text-xs text-muted-foreground">All units</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupiedUnits}</div>
            <p className="text-xs text-muted-foreground">Currently rented</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vacant</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vacantUnits}</div>
            <p className="text-xs text-muted-foreground">Available for rent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredProperties.length}</div>
            <p className="text-xs text-muted-foreground">Active properties</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Input
          placeholder="Search units, tenants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <div className="flex items-center gap-2">
          <Label htmlFor="property-filter">Property:</Label>
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {properties.map(property => (
                <SelectItem key={property.id} value={property.id.toString()}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAccessCodes(!showAccessCodes)}
        >
          {showAccessCodes ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {showAccessCodes ? "Hide" : "Show"} Access Codes
        </Button>
      </div>

      {/* Units Table */}
      <Card>
        <CardHeader>
          <CardTitle>Units & Access Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Access Codes</TableHead>
                <TableHead>Keys</TableHead>
                <TableHead>Last Access</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUnits.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{unit.propertyName}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {unit.propertyAddress}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{unit.number}</div>
                  </TableCell>
                  <TableCell>{unit.type}</TableCell>
                  <TableCell>{getStatusBadge(unit.status)}</TableCell>
                  <TableCell>
                    {unit.tenant ? (
                      <div className="text-sm">
                        <div className="font-medium">{unit.tenant}</div>
                        <div className="text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {unit.tenantPhone}
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No tenant</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {showAccessCodes ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium">Main:</span>
                          <span className="text-xs font-mono">{unit.accessCodes.mainEntrance}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => handleCopyAccessCode(unit.accessCodes.mainEntrance)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium">Unit:</span>
                          <span className="text-xs font-mono">{unit.accessCodes.unitDoor}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => handleCopyAccessCode(unit.accessCodes.unitDoor)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        {unit.accessCodes.garage && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium">Garage:</span>
                            <span className="text-xs font-mono">{unit.accessCodes.garage}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0"
                              onClick={() => handleCopyAccessCode(unit.accessCodes.garage)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Lock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Hidden</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Key className="h-3 w-3" />
                        <span className="text-xs">{unit.keys.unitKey}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span className="text-xs">{unit.keys.mailboxKey}</span>
                      </div>
                      {unit.keys.garageRemote && (
                        <div className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          <span className="text-xs">{unit.keys.garageRemote}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {unit.lastAccess}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditUnit(unit)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Unit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Unit Information</DialogTitle>
            <DialogDescription>
              Update unit details, access codes, and tenant information.
            </DialogDescription>
          </DialogHeader>
          {selectedUnit && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit-number">Unit Number</Label>
                  <Input id="unit-number" defaultValue={selectedUnit.number} />
                </div>
                <div>
                  <Label htmlFor="unit-type">Unit Type</Label>
                  <Select defaultValue={selectedUnit.type}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1BR">1 Bedroom</SelectItem>
                      <SelectItem value="2BR">2 Bedroom</SelectItem>
                      <SelectItem value="3BR">3 Bedroom</SelectItem>
                      <SelectItem value="Studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tenant-name">Tenant Name</Label>
                  <Input id="tenant-name" defaultValue={selectedUnit.tenant || ""} />
                </div>
                <div>
                  <Label htmlFor="tenant-phone">Tenant Phone</Label>
                  <Input id="tenant-phone" defaultValue={selectedUnit.tenantPhone || ""} />
                </div>
              </div>

              <div>
                <Label htmlFor="access-codes">Access Codes</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <Label htmlFor="main-entrance" className="text-xs">Main Entrance</Label>
                    <Input id="main-entrance" defaultValue={selectedUnit.accessCodes.mainEntrance} />
                  </div>
                  <div>
                    <Label htmlFor="unit-door" className="text-xs">Unit Door</Label>
                    <Input id="unit-door" defaultValue={selectedUnit.accessCodes.unitDoor} />
                  </div>
                  <div>
                    <Label htmlFor="garage" className="text-xs">Garage</Label>
                    <Input id="garage" defaultValue={selectedUnit.accessCodes.garage || ""} />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="keys">Keys</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <Label htmlFor="unit-key" className="text-xs">Unit Key</Label>
                    <Input id="unit-key" defaultValue={selectedUnit.keys.unitKey} />
                  </div>
                  <div>
                    <Label htmlFor="mailbox-key" className="text-xs">Mailbox Key</Label>
                    <Input id="mailbox-key" defaultValue={selectedUnit.keys.mailboxKey} />
                  </div>
                  <div>
                    <Label htmlFor="garage-remote" className="text-xs">Garage Remote</Label>
                    <Input id="garage-remote" defaultValue={selectedUnit.keys.garageRemote || ""} />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" defaultValue={selectedUnit.notes} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 