
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";

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
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  status: "pending" | "ready" | "completed";
  total: number;
  createdAt: string;
  pickupTime: string;
}

// Mock data
const mockMenu: MenuItem[] = [
  {
    id: "1",
    name: "Veggie Burrito Bowl",
    description: "Rice, beans, veggies, guacamole, and salsa",
    price: 8.99,
    category: "main",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    isVegetarian: true,
    calories: 650,
  },
  {
    id: "2",
    name: "Chicken Sandwich",
    description: "Grilled chicken with lettuce, tomato on whole grain bread",
    price: 7.49,
    category: "main",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    isVegetarian: false,
    calories: 520,
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Romaine lettuce, croutons, parmesan cheese, Caesar dressing",
    price: 6.99,
    category: "side",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    isVegetarian: true,
    calories: 320,
  },
  {
    id: "4",
    name: "BBQ Pulled Pork",
    description: "Slow-cooked pulled pork with BBQ sauce and coleslaw",
    price: 9.49,
    category: "main",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    isVegetarian: false,
    calories: 710,
  },
  {
    id: "5",
    name: "Fresh Fruit Cup",
    description: "Seasonal fresh fruits",
    price: 4.99,
    category: "dessert",
    image: "https://images.unsplash.com/photo-1570696516188-ade861b84904?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    isVegetarian: true,
    calories: 120,
  },
  {
    id: "6",
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with walnuts",
    price: 3.99,
    category: "dessert",
    image: "https://images.unsplash.com/photo-1589385973461-eaa9b0ae2830?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    isVegetarian: true,
    calories: 450,
  }
];

const mockOrders: Order[] = [
  {
    id: "order1",
    items: [
      { id: "1", name: "Veggie Burrito Bowl", price: 8.99, quantity: 1 },
      { id: "3", name: "Caesar Salad", price: 6.99, quantity: 1 }
    ],
    status: "ready",
    total: 15.98,
    createdAt: "2023-06-01T10:30:00",
    pickupTime: "2023-06-01T12:15:00"
  },
  {
    id: "order2",
    items: [
      { id: "2", name: "Chicken Sandwich", price: 7.49, quantity: 2 },
      { id: "5", name: "Fresh Fruit Cup", price: 4.99, quantity: 1 }
    ],
    status: "completed",
    total: 19.97,
    createdAt: "2023-05-29T13:45:00",
    pickupTime: "2023-05-29T14:30:00"
  }
];

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [menu, setMenu] = useState<MenuItem[]>(mockMenu);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>(mockMenu);
  const [filterType, setFilterType] = useState<string>("all");
  const [cart, setCart] = useState<{id: string, name: string, price: number, quantity: number}[]>([]);
  const [pickupTime, setPickupTime] = useState<string>("12:30");
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  // Filter menu based on selection
  useEffect(() => {
    let filtered = [...menu];
    
    if (filterType === "vegetarian") {
      filtered = filtered.filter(item => item.isVegetarian);
    } else if (filterType === "non-vegetarian") {
      filtered = filtered.filter(item => !item.isVegetarian);
    } else if (filterType === "low-calorie") {
      filtered = filtered.filter(item => item.calories < 500);
    }
    
    setFilteredMenu(filtered);
  }, [filterType, menu]);

  // Add item to cart
  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { id: item.id, name: item.name, price: item.price, quantity: 1 }]);
    }
    
    toast.success(`Added ${item.name} to cart`);
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    } else {
      setCart(cart.filter(item => item.id !== id));
    }
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Place order
  const placeOrder = () => {
    if (cart.length === 0) return;
    
    // Creating a new order
    const newOrder: Order = {
      id: `order${orders.length + 1}`,
      items: [...cart],
      status: "pending",
      total: cartTotal,
      createdAt: new Date().toISOString(),
      pickupTime: new Date().toISOString() // In a real app, this would be based on the selected time
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    setOrderSuccess(true);
    
    // Reset state after 3 seconds
    setTimeout(() => {
      setOrderSuccess(false);
    }, 3000);
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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {currentUser?.name}</h1>
        <p className="text-gray-600">Explore today's menu and place your order</p>
      </div>
      
      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="menu">Today's Menu</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="menu">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-semibold">Today's Menu</h2>
              
              {/* Filter options */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={filterType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("all")}
                >
                  All
                </Button>
                <Button 
                  variant={filterType === "vegetarian" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("vegetarian")}
                >
                  Vegetarian
                </Button>
                <Button 
                  variant={filterType === "non-vegetarian" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("non-vegetarian")}
                >
                  Non-Vegetarian
                </Button>
                <Button 
                  variant={filterType === "low-calorie" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("low-calorie")}
                >
                  Low Calorie
                </Button>
              </div>
            </div>
            
            {/* Menu items grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenu.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <div>
                        <Badge variant={item.isVegetarian ? "outline" : "secondary"} className={item.isVegetarian ? "bg-green-100 text-green-800 border-green-200" : ""}>
                          {item.isVegetarian ? "Veg" : "Non-Veg"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{item.calories} calories</p>
                      </div>
                      <Button onClick={() => addToCart(item)} size="sm">Add to Order</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Cart Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            -
                          </Button>
                          <span>{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => {
                              const menuItem = menu.find(menuItem => menuItem.id === item.id);
                              if (menuItem) addToCart(menuItem);
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between mb-4">
                      <p className="font-semibold">Total:</p>
                      <p className="font-semibold">${cartTotal.toFixed(2)}</p>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Checkout</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Complete Your Order</DialogTitle>
                          <DialogDescription>
                            Choose your preferred pickup time.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="py-4">
                          <p className="mb-4 font-medium">Recommended Pickup Times:</p>
                          <RadioGroup defaultValue="12:30" onValueChange={setPickupTime}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="12:15" id="t1" />
                              <Label htmlFor="t1">12:15 PM (Low Wait)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="12:30" id="t2" />
                              <Label htmlFor="t2">12:30 PM (Recommended)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="12:45" id="t3" />
                              <Label htmlFor="t3">12:45 PM (Busy)</Label>
                            </div>
                            <div className="flex items-center space-x-2 mt-4">
                              <RadioGroupItem value="custom" id="t4" />
                              <Label htmlFor="t4">Custom:</Label>
                              <Input 
                                type="time" 
                                className="w-24" 
                                onChange={(e) => setPickupTime(e.target.value)}
                              />
                            </div>
                          </RadioGroup>
                          
                          <div className="mt-6">
                            <h4 className="font-medium mb-2">Order Summary</h4>
                            <div className="bg-gray-50 p-3 rounded-md">
                              {cart.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                  <span>{item.name} x {item.quantity}</span>
                                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                              <div className="border-t mt-2 pt-2 font-medium flex justify-between">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button className="w-full" onClick={placeOrder}>
                            Place Order for Pickup at {pickupTime}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    {orderSuccess && (
                      <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
                        Order placed successfully! You will receive a notification when it's ready.
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Order History</h2>
            
            {orders.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">You haven't placed any orders yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Order {order.id}</p>
                          <p className="text-sm text-gray-500">
                            Placed on {formatDate(order.createdAt)}
                          </p>
                        </div>
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
                              ? "Ready for Pickup" 
                              : "Completed"
                          }
                        </Badge>
                      </div>
                      
                      <div className="mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm py-1">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="border-t mt-2 pt-2 font-medium flex justify-between">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm">
                          <span className="font-medium">Pickup Time:</span> {formatDate(order.pickupTime)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
