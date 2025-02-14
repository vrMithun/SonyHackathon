import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card"; 
import "@/styles/global.css"
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-hsl(var(--background)) text-white p-6">
      {/* Heading */}
      <h1 className="text-4xl font-semibold text-blue-500 mb-6">Dashboard</h1>
      
      {/* Tabs */}
      <Tabs defaultValue="Overview" className="w-full mb-8">
        <TabsList className="flex space-x-4">
          <TabsTrigger value="Overview" className="text-lg text-blue-500 py-2 px-4 border-b-2 border-transparent hover:border-blue-500">Overview</TabsTrigger>
          <TabsTrigger value="Analytics" className="text-lg text-blue-500 py-2 px-4 border-b-2 border-transparent hover:border-blue-500">Analytics</TabsTrigger>
          <TabsTrigger value="Reports" className="text-lg text-blue-500 py-2 px-4 border-b-2 border-transparent hover:border-blue-500">Reports</TabsTrigger>
          <TabsTrigger value="Notifications" className="text-lg text-blue-500 py-2 px-4 border-b-2 border-transparent hover:border-blue-500">Notifications</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="Overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {/* Card 1 */}
            <Card className="bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-500">Card 1</h2>
              <p className="text-gray-300">Some content for the first card.</p>
            </Card>
            
            {/* Card 2 */}
            <Card className="bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-500">Card 2</h2>
              <p className="text-gray-300">Some content for the second card.</p>
            </Card>
            
            {/* Card 3 */}
            <Card className="bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-500">Card 3</h2>
              <p className="text-gray-300">Some content for the third card.</p>
            </Card>
            
            {/* Card 4 */}
            <Card className="bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-500">Card 4</h2>
              <p className="text-gray-300">Some content for the fourth card.</p>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-500">Component 1</h2>
              <p className="text-gray-300">Content for the first component in the second row.</p>
            </div>

            <div className="bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-500">Component 2</h2>
              <p className="text-gray-300">Content for the second component in the second row.</p>
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab Content */}
        <TabsContent value="Analytics">
          <div className="p-4 bg-gray-800 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">Analytics Content</h2>
            <p className="text-gray-300">Some content related to analytics here.</p>
          </div>
        </TabsContent>
        
        {/* Reports Tab Content */}
        <TabsContent value="Reports">
          <div className="p-4 bg-gray-800 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">Reports Content</h2>
            <p className="text-gray-300">Some content related to reports here.</p>
          </div>
        </TabsContent>
        
        {/* Notifications Tab Content */}
        <TabsContent value="Notifications">
          <div className="p-4 bg-gray-800 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">Notifications Content</h2>
            <p className="text-gray-300">Some content related to notifications here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
