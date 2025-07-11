"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialMembers = [
  { id: 1, name: "Alice Johnson", email: "alice@company.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@company.com", role: "Manager", status: "Active" },
  { id: 3, name: "Carol Lee", email: "carol@company.com", role: "Staff", status: "Invited" },
];

const roles = ["Admin", "Manager", "Staff"];

export default function TeamMembersContent() {
  const [members, setMembers] = useState(initialMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Staff");

  function handleRoleChange(id: number, newRole: string) {
    setMembers(members => members.map(m => m.id === id ? { ...m, role: newRole } : m));
  }

  function handleRemove(id: number) {
    setMembers(members => members.filter(m => m.id !== id));
  }

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setMembers(members => [
      ...members,
      { id: Date.now(), name: inviteName, email: inviteEmail, role: inviteRole, status: "Invited" },
    ]);
    setInviteName("");
    setInviteEmail("");
    setInviteRole("Staff");
    setInviteOpen(false);
  }

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage your team, roles, and invitations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-end">
              <Button onClick={() => setInviteOpen(true)}>Invite Member</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-2 text-left font-medium">Name</th>
                    <th className="py-2 px-2 text-left font-medium">Email</th>
                    <th className="py-2 px-2 text-left font-medium">Role</th>
                    <th className="py-2 px-2 text-left font-medium">Status</th>
                    <th className="py-2 px-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(member => (
                    <tr key={member.id} className="border-b last:border-0">
                      <td className="py-2 px-2">{member.name}</td>
                      <td className="py-2 px-2">{member.email}</td>
                      <td className="py-2 px-2">
                        <Select value={member.role} onValueChange={role => handleRoleChange(member.id, role)}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map(role => (
                              <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-2 px-2">{member.status}</td>
                      <td className="py-2 px-2 text-right">
                        <Button variant="destructive" size="sm" onClick={() => handleRemove(member.id)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {inviteOpen && (
          <Card className="shadow-lg border-2 border-primary">
            <CardHeader>
              <CardTitle>Invite New Member</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input value={inviteName} onChange={e => setInviteName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="submit">Send Invite</Button>
                  <Button type="button" variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 