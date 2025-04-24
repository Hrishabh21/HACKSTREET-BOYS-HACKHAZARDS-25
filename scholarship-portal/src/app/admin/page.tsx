"use client";
import { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Send, Wallet } from "lucide-react";

const dummyApplications = [
  {
    id: "app_1",
    name: "Rahul Kumar",
    email: "rahul@example.com",
    essay: "I want to pursue higher education because...",
    status: "pending",
    wallet: "GCFZ...XPLR"
  },
  {
    id: "app_2",
    name: "Sneha Sharma",
    email: "sneha@example.com",
    essay: "Education is the path to a better future...",
    status: "pending",
    wallet: "GDNV...RTYS"
  }
];

export default function AdminDashboard() {
  const [applications, setApplications] = useState(dummyApplications);

  const handleAnalyze = async (appId) => {
    // Trigger Groq AI analysis here
    console.log("Analyzing via Groq AI:", appId);
  };

  const handleDecision = (appId, decision) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: decision } : app
      )
    );
  };

  const handleDisbursement = (wallet) => {
    // Call Stellar disbursement logic here
    console.log("Disbursing to wallet:", wallet);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Admin Dashboard</h1>
      <Tabs defaultValue="review">
        <TabsList className="grid w-full grid-cols-3 bg-blue-100">
          <TabsTrigger value="review">1. Review Applications</TabsTrigger>
          <TabsTrigger value="decision">2. Accept / Reject</TabsTrigger>
          <TabsTrigger value="disburse">3. Disburse Funds</TabsTrigger>
        </TabsList>

        {/* Section 1: Review Applications */}
        <TabsContent value="review">
          <div className="grid gap-4 mt-6">
            {applications.map((app) => (
              <motion.div
                key={app.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="shadow-xl border-blue-200 border hover:shadow-2xl">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-blue-800">{app.name}</h2>
                    <p className="text-sm text-gray-500">{app.email}</p>
                    <p className="mt-2">{app.essay}</p>
                    <Button onClick={() => handleAnalyze(app.id)} className="mt-4 bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4 mr-2" /> Analyze with Groq
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Section 2: Accept / Reject */}
        <TabsContent value="decision">
          <div className="grid gap-4 mt-6">
            {applications.map((app) => (
              <motion.div
                key={app.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="shadow-lg border-blue-200 border hover:shadow-2xl">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800">{app.name}</h2>
                    <p>Status: <span className={`font-medium ${app.status === 'accepted' ? 'text-green-600' : app.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{app.status}</span></p>
                    <div className="flex gap-4 mt-4">
                      <Button onClick={() => handleDecision(app.id, 'accepted')} className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" /> Accept
                      </Button>
                      <Button onClick={() => handleDecision(app.id, 'rejected')} className="bg-red-500 hover:bg-red-600">
                        <XCircle className="w-4 h-4 mr-2" /> Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Section 3: Disburse Funds */}
        <TabsContent value="disburse">
          <div className="grid gap-4 mt-6">
            {applications.filter(app => app.status === 'accepted').map((app) => (
              <motion.div
                key={app.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="shadow-lg border-green-200 border hover:shadow-2xl">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800">{app.name}</h2>
                    <p>Wallet Address: <span className="font-mono text-sm">{app.wallet}</span></p>
                    <Button onClick={() => handleDisbursement(app.wallet)} className="mt-4 bg-purple-600 hover:bg-purple-700">
                      <Wallet className="w-4 h-4 mr-2" /> Disburse Funds
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
