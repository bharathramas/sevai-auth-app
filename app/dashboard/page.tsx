import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Bot, BookOpenCheck, History, Gauge, Megaphone, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-6 md:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome to SevAI Dashboard</h1>
        <p className="text-muted-foreground text-base sm:text-lg">Your enterprise AI insights, actions, and agents in one view.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overview Cards */}
        <Card className="hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle>Active Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">128</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle>Today’s Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">45</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle>Flagged Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">7</p>
          </CardContent>
        </Card>

        {/* Agent Launcher */}
        <Card className="sm:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Quick Launch
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="secondary" className="flex gap-2"><Bot /> Summarize Tickets</Button>
            <Button variant="secondary" className="flex gap-2"><Gauge /> Detect Anomaly</Button>
            <Button variant="secondary" className="flex gap-2"><BookOpenCheck /> Search Docs</Button>
          </CardContent>
        </Card>

        {/* Recent Queries Feed */}
        <Card>
          <CardHeader>
            <CardTitle><History className="inline w-5 h-5 mr-2" />Recent Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-sm">“Why did integration X fail?” <span className="text-muted-foreground">– Relevance: 5</span></li>
              <li className="text-sm">“Last month’s claim trends” <span className="text-muted-foreground">– Relevance: 4</span></li>
              <li className="text-sm">“Document with ID 3294” <span className="text-muted-foreground">– Relevance: 3</span></li>
            </ul>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle><Gauge className="inline w-5 h-5 mr-2" />System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Titan Latency: <strong>89ms</strong></p>
            <p className="text-sm">OpenSearch Docs: <strong>104,232</strong></p>
            <p className="text-sm">Snapshots: <strong>Enabled</strong></p>
          </CardContent>
        </Card>

        {/* Announcements + Tips */}
        <Card className="sm:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle><Megaphone className="inline w-5 h-5 mr-2" />Tips & Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm list-disc list-inside">
              <li>Explore LangGraph workflows for agents.</li>
              <li>Review flagged responses weekly for quality.</li>
              <li>Use the `/chat` interface for deep document search.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Chat Quick Access */}
        <Card className="sm:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle><MessageSquare className="inline w-5 h-5 mr-2" />Start Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild variant="default">
              <a href="/chat">Go to Chat Interface</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
