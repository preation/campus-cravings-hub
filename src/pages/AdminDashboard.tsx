
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { BarChart } from "@/components/ui/chart";
import { type BarChartProps } from "@/components/ui/chart";

// Types
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVegetarian: boolean;
  calories: number;
}

interface Order {
  id: string;
  studentName: string;
  items: { name: string; quantity: number }[];
  status: "pending" | "ready" | "completed";
  total: number;
  createdAt: string;
  pickupTime: string;
}

interface LeftoverFood {
  id: string;
  name: string;
  quantity: string;
  bestBeforeTime: string;
  image: string;
  status: "available" | "claimed" | "donated";
  ngoName?: string;
  createdAt: string;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: "order1",
    studentName: "Alex Johnson",
    items: [
      { name: "Veggie Burrito Bowl", quantity: 1 },
      { name: "Caesar Salad", quantity: 1 }
    ],
    status: "pending",
    total: 15.98,
    createdAt: "2023-06-01T10:30:00",
    pickupTime: "2023-06-01T12:15:00"
  },
  {
    id: "order2",
    studentName: "Sam Williams",
    items: [
      { name: "Chicken Sandwich", quantity: 2 },
      { name: "Fresh Fruit Cup", quantity: 1 }
    ],
    status: "ready",
    total: 19.97,
    createdAt: "2023-06-01T09:45:00",
    pickupTime: "2023-06-01T11:30:00"
  },
  {
    id: "order3",
    studentName: "Taylor Smith",
    items: [
      { name: "BBQ Pulled Pork", quantity: 1 },
      { name: "Chocolate Brownie", quantity: 2 }
    ],
    status: "completed",
    total: 17.47,
    createdAt: "2023-05-31T14:20:00",
    pickupTime: "2023-05-31T15:45:00"
  }
];

const mockLeftovers: LeftoverFood[] = [
  {
    id: "leftover1",
    name: "Pasta Primavera",
    quantity: "4 servings",
    bestBeforeTime: "2023-06-01T18:00:00",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    status: "available",
    createdAt: "2023-06-01T14:30:00"
  },
  {
    id: "leftover2",
    name: "Vegetable Soup",
    quantity: "2 liters",
    bestBeforeTime: "2023-06-02T12:00:00",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    status: "claimed",
    ngoName: "Food For All",
    createdAt: "2023-06-01T14:45:00"
  },
  {
    id: "leftover3",
    name: "Grilled Chicken",
    quantity: "6 pieces",
    bestBeforeTime: "2023-06-01T20:00:00",
    image: "https://images.unsplash.com/photo-1604908177453-7462950dfd34?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    status: "donated",
    ngoName: "Hunger Relief",
    createdAt: "2023-05-31T15:20:00"
  }
];

// Form schema for adding menu item
const menuItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string(),
  image: z.string().url("Must be a valid URL"),
  isVegetarian: z.boolean(),
  calories: z.coerce.number().positive("Calories must be positive")
});

// Form schema for logging leftover food
const leftoverSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  quantity: z.string().min(1, "Quantity is required"),
  bestBeforeTime: z.string().min(1, "Best before time is required"),
  image: z.string().url("Must be a valid URL")
});

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [leftovers, setLeftovers] = useState<LeftoverFood[]>(mockLeftovers);
  
  // Forms
  const menuItemForm = useForm<z.infer<typeof menuItemSchema>>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "main",
      image: "",
      isVegetarian: false,
      calories: 0
    }
  });

  const leftoverForm = useForm<z.infer<typeof leftoverSchema>>({
    resolver: zodResolver(leftoverSchema),
    defaultValues: {
      name: "",
      quantity: "",
      bestBeforeTime: "",
      image: ""
    }
  });

  // Submit handlers
  const onAddMenuItem = (values: z.infer<typeof menuItemSchema>) => {
    toast.success("Menu item added");
    menuItemForm.reset();
  };

  const onLogLeftover = (values: z.infer<typeof leftoverSchema>) => {
    const newLeftover: LeftoverFood = {
      id: `leftover${leftovers.length + 1}`,
      name: values.name,
      quantity: values.quantity,
      bestBeforeTime: values.bestBeforeTime,
      image: values.image,
      status: "available",
      createdAt: new Date().toISOString()
    };

    setLeftovers([newLeftover, ...leftovers]);
    toast.success("Leftover food logged for donation");
    leftoverForm.reset();
  };

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: "pending" | "ready" | "completed") => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} marked as ${newStatus}`);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  // Analytics data
  const donationData: BarChartProps["data"] = [
    {
      name: "This Week",
      "Food Donated (kg)": 23,
      "Food Saved (kg)": 18,
    },
    {
      name: "Last Week",
      "Food Donated (kg)": 19,
      "Food Saved (kg)": 15,
    },
    {
      name: "2 Weeks Ago",
      "Food Donated (kg)": 15,
      "Food Saved (kg)": 12,
    },
    {
      name: "3 Weeks Ago",
      "Food Donated (kg)": 17,
      "Food Saved (kg)": 13,
    },
  ];

  // Table columns definitions
  const orderColumns = [
    {
      header: "ID",
      cell: (order: Order) => order.id,
      key: "id"
    },
    {
      header: "Student",
      cell: (order: Order) => order.studentName,
      key: "student"
    },
    {
      header: "Items",
      cell: (order: Order) => (
        <div>
          {order.items.map((item, i) => (
            <div key={i}>{item.name} x {item.quantity}</div>
          ))}
        </div>
      ),
      key: "items"
    },
    {
      header: "Total",
      cell: (order: Order) => `$${order.total.toFixed(2)}`,
      key: "total"
    },
    {
      header: "Pickup Time",
      cell: (order: Order) => formatDate(order.pickupTime),
      key: "pickupTime"
    },
    {
      header: "Status",
      cell: (order: Order) => (
        <div className="flex flex-col gap-2">
          <Badge 
            variant={
              order.status === "pending" 
                ? "outline" 
                : order.status === "ready" 
                  ? "default" 
                  : "secondary"
            }
            className={
              order.status === "pending" 
                ? "bg-yellow-100 text-yellow-800 border-yellow-200" 
                : order.status === "ready" 
                  ? "bg-green-100 text-green-800 border-green-200" 
                  : ""
            }
          >
            {order.status === "pending" 
              ? "Pending" 
              : order.status === "ready" 
                ? "Ready" 
                : "Completed"
            }
          </Badge>

          {order.status === "pending" && (
            <Button 
              size="sm" 
              onClick={() => updateOrderStatus(order.id, "ready")}
            >
              Mark Ready
            </Button>
          )}
          {order.status === "ready" && (
            <Button 
              size="sm" 
              variant="secondary"
              onClick={() => updateOrderStatus(order.id, "completed")}
            >
              Mark Complete
            </Button>
          )}
        </div>
      ),
      key: "status"
    }
  ];

  const leftoverColumns = [
    {
      header: "Image",
      cell: (leftover: LeftoverFood) => (
        <img 
          src={leftover.image} 
          alt={leftover.name} 
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
      key: "image"
    },
    {
      header: "Name",
      cell: (leftover: LeftoverFood) => leftover.name,
      key: "name"
    },
    {
      header: "Quantity",
      cell: (leftover: LeftoverFood) => leftover.quantity,
      key: "quantity"
    },
    {
      header: "Best Before",
      cell: (leftover: LeftoverFood) => formatDate(leftover.bestBeforeTime),
      key: "bestBefore"
    },
    {
      header: "Status",
      cell: (leftover: LeftoverFood) => (
        <Badge
          variant={
            leftover.status === "available" 
              ? "outline" 
              : leftover.status === "claimed" 
                ? "default" 
                : "secondary"
          }
          className={
            leftover.status === "available" 
              ? "bg-blue-100 text-blue-800 border-blue-200" 
              : leftover.status === "claimed" 
                ? "bg-yellow-100 text-yellow-800 border-yellow-200" 
                : "bg-green-100 text-green-800 border-green-200"
          }
        >
          {leftover.status === "available" 
            ? "Available" 
            : leftover.status === "claimed" 
              ? "Claimed" 
              : "Donated"
          }
        </Badge>
      ),
      key: "status"
    },
    {
      header: "NGO",
      cell: (leftover: LeftoverFood) => leftover.ngoName || "-",
      key: "ngo"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Canteen Admin Dashboard</h1>
        <p className="text-gray-600">Manage orders, menu items and food donations</p>
      </div>
      
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="menu">Manage Menu</TabsTrigger>
          <TabsTrigger value="leftovers">Log Leftovers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        {/* Orders Tab */}
        <TabsContent value="orders">
          <h2 className="text-2xl font-semibold mb-6">Current Orders</h2>
          <DataTable columns={orderColumns} data={orders} />
        </TabsContent>
        
        {/* Menu Tab */}
        <TabsContent value="menu">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Add New Menu Item</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...menuItemForm}>
                  <form onSubmit={menuItemForm.handleSubmit(onAddMenuItem)} className="space-y-4">
                    <FormField
                      control={menuItemForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Item Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Veggie Burger" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={menuItemForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Brief description of the dish" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={menuItemForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price ($)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={menuItemForm.control}
                        name="calories"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Calories</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={menuItemForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="main">Main</SelectItem>
                              <SelectItem value="side">Side</SelectItem>
                              <SelectItem value="dessert">Dessert</SelectItem>
                              <SelectItem value="drink">Drink</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={menuItemForm.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={menuItemForm.control}
                      name="isVegetarian"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Vegetarian Option</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Add to Menu</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Menu Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full" variant="outline">Import Menu from Template</Button>
                    <Button className="w-full" variant="outline">Export Current Menu</Button>
                    <Button className="w-full" variant="outline">Add Multiple Items</Button>
                  </div>
                  
                  <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium text-yellow-800 mb-2">AI Menu Assistant</h3>
                    <p className="text-sm text-yellow-700 mb-4">
                      Need help creating menu items? Try our AI Assistant to quickly add items using natural language.
                    </p>
                    <Textarea 
                      placeholder="Example: 'Add a vegetarian pasta with marinara sauce for $8.99, around 550 calories'"
                      className="mb-2"
                    />
                    <Button className="w-full">Generate Menu Item</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Leftovers Tab */}
        <TabsContent value="leftovers">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Log Leftover Food for Donation</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...leftoverForm}>
                  <form onSubmit={leftoverForm.handleSubmit(onLogLeftover)} className="space-y-4">
                    <FormField
                      control={leftoverForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Food Item Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Pasta Primavera" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={leftoverForm.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity/Servings</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 4 servings, 2 liters" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={leftoverForm.control}
                      name="bestBeforeTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Best Before Time</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={leftoverForm.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full bg-campus-green hover:bg-campus-light-green">Log for Donation</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Logged Leftovers</h3>
              <DataTable columns={leftoverColumns} data={leftovers} />
            </div>
          </div>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Food Waste Reduction</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart 
                  data={donationData}
                  index="name"
                  categories={["Food Donated (kg)", "Food Saved (kg)"]}
                  colors={["#4CAF50", "#FF7A50"]}
                  yAxisWidth={30}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Donation Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-campus-green">52kg</div>
                      <div className="text-sm text-gray-500">Food Donated This Month</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-campus-orange">15</div>
                      <div className="text-sm text-gray-500">Successful Donations</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-campus-blue">86%</div>
                      <div className="text-sm text-gray-500">Food Saved from Waste</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-campus-light-blue">5</div>
                      <div className="text-sm text-gray-500">NGO Partners Helped</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Top Waste Reduction Tips</h3>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-campus-green mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Track popular menu items vs. less ordered ones
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-campus-green mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Plan menus based on pre-order data
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-campus-green mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Log leftovers immediately for faster collection
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
