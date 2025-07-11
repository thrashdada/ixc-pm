"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CompanyProfileContent() {
  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Save logic here
    alert("Company profile saved (mock)");
  }

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 bg-muted/50">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>Update your company information and branding.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <Input
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Logo</label>
              <Input type="file" accept="image/*" onChange={handleLogoChange} />
              {logo && <p className="text-xs mt-1">Selected: {logo.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <Input
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Email or Phone</label>
              <Input
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="Enter contact info"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe your company"
                rows={4}
              />
            </div>
            <div className="pt-2">
              <Button type="submit" className="w-full">Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
} 