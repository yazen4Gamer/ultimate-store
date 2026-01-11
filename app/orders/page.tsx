"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Eye, ShoppingBag, Package, CheckCircle, Clock, XCircle, Gamepad2 } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "completed" | "processing" | "cancelled" | "refunded";
  items: number;
  games: string[];
  platform: string;
}

const orders: Order[] = [
  {
    id: "ORD-78945",
    date: "2024-01-15",
    total: 89.98,
    status: "completed",
    items: 2,
    games: ["Cyberpunk 2077", "The Witcher 3"],
    platform: "PC"
  },
  {
    id: "ORD-78944",
    date: "2024-01-10",
    total: 59.99,
    status: "completed",
    items: 1,
    games: ["Elden Ring"],
    platform: "PlayStation 5"
  },
  {
    id: "ORD-78943",
    date: "2024-01-05",
    total: 139.97,
    status: "processing",
    items: 3,
    games: ["FIFA 24", "NBA 2K24", "Madden NFL 24"],
    platform: "Xbox Series X"
  },
  {
    id: "ORD-78942",
    date: "2023-12-20",
    total: 29.99,
    status: "cancelled",
    items: 1,
    games: ["Among Us"],
    platform: "Mobile"
  },
  {
    id: "ORD-78941",
    date: "2023-12-15",
    total: 199.95,
    status: "refunded",
    items: 4,
    games: ["Call of Duty", "Battlefield", "Apex Legends", "Fortnite"],
    platform: "PC"
  },
  {
    id: "ORD-78940",
    date: "2023-12-10",
    total: 49.99,
    status: "completed",
    items: 1,
    games: ["Red Dead Redemption 2"],
    platform: "PC"
  },
];

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800 hover:bg-green-100",
    iconColor: "text-green-600"
  },
  processing: {
    label: "Processing",
    icon: Clock,
    color: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    iconColor: "text-blue-600"
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "bg-red-100 text-red-800 hover:bg-red-100",
    iconColor: "text-red-600"
  },
  refunded: {
    label: "Refunded",
    icon: Package,
    color: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    iconColor: "text-gray-600"
  },
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const getStatusBadge = (status: Order["status"]) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className={`h-3 w-3 mr-1 ${config.iconColor}`} />
        {config.label}
      </Badge>
    );
  };

  const viewOrderDetails = (orderId: string) => {
    toast.info("Viewing order details", {
      description: `Order ${orderId} details would be displayed here.`,
    });
  };

  const downloadInvoice = (orderId: string) => {
    toast.success("Invoice downloaded", {
      description: `Invoice for order ${orderId} has been downloaded.`,
    });
  };

  const getTotalSpent = () => {
    return orders
      .filter(order => order.status === "completed")
      .reduce((total, order) => total + order.total, 0);
  };

  const getTotalOrders = () => {
    return orders.length;
  };

  const getAverageOrderValue = () => {
    const completedOrders = orders.filter(order => order.status === "completed");
    if (completedOrders.length === 0) return 0;
    const total = completedOrders.reduce((sum, order) => sum + order.total, 0);
    return total / completedOrders.length;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Order History</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your game purchases
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <h3 className="text-2xl font-bold">${getTotalSpent().toFixed(2)}</h3>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold">{getTotalOrders()}</h3>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Order Value</p>
                  <h3 className="text-2xl font-bold">${getAverageOrderValue().toFixed(2)}</h3>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <Gamepad2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
                </CardDescription>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4 md:mt-0">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Games</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="truncate">{order.games.join(", ")}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.platform}</Badge>
                      </TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => viewOrderDetails(order.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => downloadInvoice(order.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                <p className="text-muted-foreground mb-6">
                  You don&apos;t have any {activeTab !== "all" ? activeTab : ""} orders yet.
                </p>
                <Link href="/">
                  <Button className="gap-2">
                    <Gamepad2 className="h-4 w-4" />
                    Browse Games
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Download All Invoices */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">Download All Invoices</h3>
                <p className="text-sm text-muted-foreground">
                  Download all your order invoices as a ZIP file
                </p>
              </div>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => {
                  toast.success("All invoices downloaded", {
                    description: "Your invoices have been downloaded as a ZIP file.",
                  });
                }}
              >
                <Download className="h-4 w-4" />
                Download All Invoices
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}