"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Bar, BarChart ,CartesianGrid, XAxis} from "recharts";


import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// Define TypeScript interface for API response
interface OverviewCard {
  totalSales: number;
  numStores: number;
  deliveryAgents: number;
  pendingOrders: number;
}
interface AnalyticsData {
  dailyOrders: number;
  avgOrderValue: number;
  returningCustomers: number;
  conversionRate: number;
}

interface ReportData {
  monthlyRevenue: number;
  monthlyExpenses: number;
  profit: number;
  customerSatisfaction: number;
}

interface Notification {
  id: number;
  message: string;
  date: string;
}

const testData: OverviewCard = {
  totalSales: 50000, // $50,000
  numStores: 120, // 120 Stores
  deliveryAgents: 45, // 45 Agents
  pendingOrders: 230, // 230 Orders
};

const analyticsData: AnalyticsData = {
  dailyOrders: 450,
  avgOrderValue: 35.75,
  returningCustomers: 320,
  conversionRate: 8.5, // percentage
};

// Hardcoded data for Reports
const reportData: ReportData = {
  monthlyRevenue: 150000,
  monthlyExpenses: 85000,
  profit: 65000,
  customerSatisfaction: 92, // percentage
};

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

// Hardcoded notifications
const notifications: Notification[] = [
  { id: 1, message: "New order placed: #12345", date: "2025-02-15" },
  { id: 2, message: "Low stock alert for Store #24", date: "2025-02-14" },
  {
    id: 3,
    message: "Delivery agent #12 completed order #67890",
    date: "2025-02-14",
  },
  { id: 4, message: "New customer feedback received", date: "2025-02-13" },
];

const API_URL = "https://your-backend-api.com/dashboard-stats";

const Dashboard: React.FC = () => {
  const [data] = useState<OverviewCard>(testData);
  const [analytics] = useState<AnalyticsData>(analyticsData);
  const [reports] = useState<ReportData>(reportData);
  const [notif] = useState<Notification[]>(notifications);

  //WAITING FOR BACKEND :)))

  // const [data, setData] = useState<O
  // verviewCard | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(API_URL);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const result: OverviewCard = await response.json();
  //       setData(result);
  //     } catch (err) {
  //       setError((err as Error).message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="min-h-screen bg-hsl(var(--background)) text-white p-6">
      <h1 className="text-4xl font-semibold text-blue-500 mb-6">Dashboard</h1>

      <Tabs defaultValue="Overview" className="w-full mb-8">
        <TabsList className="flex space-x-4 bg-gray-900 p-2 rounded-lg shadow-lg">
          <TabsTrigger
            value="Overview"
            className="px-6 py-2 text-white font-medium rounded-md transition-all duration-300 hover:bg-blue-600 hover:text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="Analytics"
            className="px-6 py-2 text-white font-medium rounded-md transition-all duration-300 hover:bg-blue-600 hover:text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="Reports"
            className="px-6 py-2 text-white font-medium rounded-md transition-all duration-300 hover:bg-blue-600 hover:text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Reports
          </TabsTrigger>
          <TabsTrigger
            value="Notifications"
            className="px-6 py-2 text-white font-medium rounded-md transition-all duration-300 hover:bg-blue-600 hover:text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Overview">
          {/* Loading State
          {loading && <p className="text-blue-500 text-lg">Loading...</p>}

         
          {error && <p className="text-red-500 text-lg">Error: {error}</p>} */}

          {/* Display Data */}
          {data && (
            <div className="h-screen flex flex-col gap-6 overflow-hidden p-6">
              {/* Top Section - Four Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 h-1/4">
                <Card className="bg-gray-800 shadow-md rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-2 text-blue-500">
                    Total Sales
                  </h2>
                  <p className="text-3xl font-bold text-white">
                    ${data.totalSales}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Total revenue generated this month.
                  </p>
                </Card>

                <Card className="bg-gray-800 shadow-md rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-2 text-blue-500">
                    Number of Stores
                  </h2>
                  <p className="text-3xl font-bold text-white">
                    {data.numStores}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Total operational stores in the region.
                  </p>
                </Card>

                <Card className="bg-gray-800 shadow-md rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-2 text-blue-500">
                    Delivery Agents
                  </h2>
                  <p className="text-3xl font-bold text-white">
                    {data.deliveryAgents}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Total active delivery personnel.
                  </p>
                </Card>

                <Card className="bg-gray-800 shadow-md rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-2 text-blue-500">
                    Pending Orders
                  </h2>
                  <p className="text-3xl font-bold text-white">
                    {data.pendingOrders}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Total number of pending customer orders.
                  </p>
                </Card>
              </div>

              {/* Bottom Section - Chart and Another Component */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow overflow-hidden">
                <ChartContainer
                  config={chartConfig}
                  className="min-h-[300px] w-full h-full"
                >
                  <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
     <ChartTooltip content={<ChartTooltipContent />} />
     <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={4}
                    />
                    <Bar
                      dataKey="mobile"
                      fill="var(--color-mobile)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>

                {/* Replace this with your second component */}
                <div className="bg-gray-800 shadow-md rounded-lg p-6 min-h-[300px]">
                  <h2 className="text-xl font-semibold mb-2 text-blue-500">
                    Another Component
                  </h2>
                  <p className="text-white">
                    You can place any other component or additional insights
                    here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
        {/* Analytics Tab */}
        <TabsContent value="Analytics">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                Daily Orders
              </h2>
              <p className="text-3xl font-bold text-white">
                {analytics.dailyOrders}
              </p>
            </Card>
            <Card className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                Avg. Order Value
              </h2>
              <p className="text-3xl font-bold text-white">
                ${analytics.avgOrderValue.toFixed(2)}
              </p>
            </Card>
            <Card className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                Returning Customers
              </h2>
              <p className="text-3xl font-bold text-white">
                {analytics.returningCustomers}
              </p>
            </Card>
            <Card className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                Conversion Rate
              </h2>
              <p className="text-3xl font-bold text-white">
                {analytics.conversionRate}%
              </p>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="Reports">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                Monthly Revenue
              </h2>
              <p className="text-3xl font-bold text-white">
                ${reports.monthlyRevenue.toLocaleString()}
              </p>
            </Card>
            <Card className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                Monthly Expenses
              </h2>
              <p className="text-3xl font-bold text-white">
                ${reports.monthlyExpenses.toLocaleString()}
              </p>
            </Card>
            <Card className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                Profit
              </h2>
              <p className="text-3xl font-bold text-white">
                ${reports.profit.toLocaleString()}
              </p>
            </Card>
            <Card className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-blue-500">
                Customer Satisfaction
              </h2>
              <p className="text-3xl font-bold text-white">
                {reports.customerSatisfaction}%
              </p>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="Notifications">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              Recent Notifications
            </h2>
            <ul className="space-y-3">
              {notif.map((note) => (
                <li key={note.id} className="border-b border-gray-600 pb-2">
                  <p className="text-white">{note.message}</p>
                  <p className="text-gray-400 text-sm">{note.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
