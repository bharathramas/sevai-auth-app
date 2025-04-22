'use client';

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConfigSlider from "@/components/ConfigSlider";
import ConfigSection from "@/components/ConfigSection";
import { Save } from "lucide-react";

const defaultConfig = {
  embedding_dimensions: [512, 1024, 1536],
  embedding_models: ["Amazon Titan", "OpenAI Ada", "Cohere v3"],
  llm_models: ["GPT-4", "Claude 3", "Titan Text G1"],
  customer_types: ["Retail", "Insurance", "Real Estate", "Healthcare"],
  default_roles: ["customer_admin", "customer_user", "viewer"],
};

const sections = [
  { key: "embedding_models", title: "Embedding Models" },
  { key: "llm_models", title: "LLM Models" },
  { key: "customer_types", title: "Customer Types" },
  { key: "default_roles", title: "Default Roles" },
];

export default function MasterConfigPage() {
  const [config, setConfig] = useState(defaultConfig);
  const [hasChanges, setHasChanges] = useState(false);

  function handleConfigChange(section: string, updatedValues: string[]) {
    setConfig((prev) => ({ ...prev, [section]: updatedValues }));
    setHasChanges(true);
  }

  function handleSave() {
    console.log("Saving config:", config);
    alert("Configuration saved!");
    setHasChanges(false);
  }

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow bg-gradient-to-br from-black via-zinc-900 to-gray-950 px-6 pt-28 pb-12">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">
            Master Admin Configuration
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Define dropdown options step-by-step for each category.
          </p>
        </div>

        <ConfigSlider
          sections={sections}
          renderSection={(key) => (
            <ConfigSection
              section={key}
              values={config[key]}
              onChange={handleConfigChange}
              labelPrefix=""
              placeholder="Enter value"
            />
          )}
          showDots
        />

        {hasChanges && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-4 rounded-full shadow-xl hover:from-blue-600 hover:to-blue-500 transition duration-300"
              onClick={handleSave}
              title="Update Config"
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
