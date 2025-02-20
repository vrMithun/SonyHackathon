"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ClockIcon, StoreIcon, TrendingUpIcon, TruckIcon } from "lucide-react";

//Interface for all the tabs
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

//Hardcoded data

const testData: OverviewCard = {
  totalSales: 50000,
  numStores: 120,
  deliveryAgents: 45,
  pendingOrders: 230,
};

const analyticsData: AnalyticsData = {
  dailyOrders: 450,
  avgOrderValue: 35.75,
  returningCustomers: 320,
  conversionRate: 8.5,
};

const reportData: ReportData = {
  monthlyRevenue: 150000,
  monthlyExpenses: 85000,
  profit: 65000,
  customerSatisfaction: 92,
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
} satisfies ChartConfig;

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

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];

// const API_URL = "";

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
      <h1 className="text-6xl font-bold text-blue-500 mb-8 px-3 py-2">
        Dashboard
      </h1>

      <Tabs defaultValue="Overview" className="w-full mb-8">
        <TabsList className="flex flex-wrap justify-center md:justify-evenly bg-gray-900 p-2 rounded-xl shadow-lg w-full md:w-3/4 lg:w-1/2 mb-4">
          {["Overview", "Analytics", "Reports", "Notifications"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="px-5 py-2 text-white font-semibold rounded-xl md:px-6 transition-all duration-300 
      hover:bg-blue-700  hover:shadow-md 
      data-[state=active]:bg-blue-600 data-[state=active]:text-white 
      focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {tab}
            </TabsTrigger>
          ))}
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
                <Card className="bg-gray-900 shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:bg-gray-800">
                  <h2 className="text-lg font-medium text-blue-400 mb-2 flex items-center gap-2">
                    <TrendingUpIcon className="w-5 h-5 text-blue-500" /> Total
                    Sales
                  </h2>
                  <p className="text-4xl font-extrabold text-white tracking-tight">
                    ${data.totalSales}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Total revenue generated this month.
                  </p>
                </Card>

                <Card className="bg-gray-900 shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:bg-gray-800">
                  <div className="flex items-center gap-3 mb-2">
                    <StoreIcon className="w-6 h-6 text-blue-500" />
                    <h2 className="text-lg font-medium text-blue-400">
                      Number of Stores
                    </h2>
                  </div>
                  <p className="text-4xl font-extrabold text-white tracking-tight">
                    {data.numStores}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Total operational stores in the region.
                  </p>
                </Card>

                <Card className="bg-gray-900 shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:bg-gray-800">
                  <div className="flex items-center gap-3 mb-2">
                    <TruckIcon className="w-6 h-6 text-blue-500" />
                    <h2 className="text-lg font-medium text-blue-400">
                      Delivery Agents
                    </h2>
                  </div>
                  <p className="text-4xl font-extrabold text-white tracking-tight">
                    {data.deliveryAgents}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Total active delivery personnel.
                  </p>
                </Card>

                <Card className="bg-gray-900 shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:bg-gray-800">
                  <div className="flex items-center gap-3 mb-2">
                    <ClockIcon className="w-6 h-6 text-blue-500" />
                    <h2 className="text-lg font-medium text-blue-400">
                      Pending Orders
                    </h2>
                  </div>
                  <p className="text-4xl font-extrabold text-white tracking-tight">
                    {data.pendingOrders}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Total number of pending customer orders.
                  </p>
                </Card>
              </div>

              {/* Bottom Section - Chart and Data Table*/}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow overflow-hidden mt-18">
                <ChartContainer
                  config={chartConfig}
                  className="min-h-[500px] w-full h-full"
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
                    <ChartTooltip  content={<ChartTooltipContent />} />
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
                <DataTable columns={columns} data={payments} />
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
