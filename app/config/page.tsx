'use client';

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultOrgConfig = {
  org_name: "Acme Corp",
  industry: "Retail",
  customer_type: "retail",
  description: "",
};

export default function ConfigOrganizationPage() {
  const [orgConfig, setOrgConfig] = useState(defaultOrgConfig);
  const [hasChanges, setHasChanges] = useState(false);

  function handleChange(field: string, value: string) {
    setOrgConfig((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  }

  function handleSave() {
    console.log("Saving organization config:", orgConfig);
    alert("Organization config saved!");
    setHasChanges(false);
  }

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow bg-gradient-to-br from-black via-zinc-900 to-gray-950 px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-400 text-transparent bg-clip-text mb-2">
              Organization Settings
            </h1>
            <p className="text-zinc-400 text-sm">
              Configure your organization profile and domain-specific setup.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-white mb-1 block">Organization Name</Label>
              <Input
                value={orgConfig.org_name}
                onChange={(e) => handleChange("org_name", e.target.value)}
                placeholder="Enter your organization name"
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div>
              <Label className="text-white mb-1 block">Industry</Label>
              <Select
                value={orgConfig.industry}
                onValueChange={(val) => handleChange("industry", val)}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  {["Retail", "Insurance", "Real Estate", "Healthcare", "Manufacturing"].map((value) => (
                    <SelectItem key={value} value={value}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white mb-1 block">Customer Type</Label>
              <Select
                value={orgConfig.customer_type}
                onValueChange={(val) => handleChange("customer_type", val)}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select customer type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  {["retail", "insurance", "real_estate", "healthcare", "manufacturing"].map((value) => (
                    <SelectItem key={value} value={value}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white mb-1 block">Description</Label>
              <Textarea
                value={orgConfig.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Brief description of the org, goals, data focus, etc."
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>
        </div>

        {hasChanges && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-4 rounded-full shadow-xl hover:from-blue-600 hover:to-blue-500 transition duration-300"
              onClick={handleSave}
              title="Save Organization Config"
            >
              <Save className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
