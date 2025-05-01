
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AreaChart } from "@/components/ui/chart";
import type { AreaChartProps } from "@/components/ui/chart";

// Types
interface Donation {
  id: string;
  foodName: string;
  quantity: string;
  bestBeforeTime: string;
  image: string;
  status: "available" | "claimed" | "picked_up" | "expired";
  canteenName: string;
  location: string;
  createdAt: string;
  claimedAt?: string;
  pickedUpAt?: string;
}

// Mock data
const mockDonations: Donation[] = [
  {
    id: "donation1",
    foodName: "Pasta Primavera",
    quantity: "4 servings",
    bestBeforeTime: "2023-06-01T18:00:00",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    status: "available",
    canteenName: "Main Campus Canteen",
    location: "Building A, Ground Floor",
    createdAt: "2023-06-01T14:30:00"
  },
  {
    id: "donation2",
    foodName: "Vegetable Soup",
    quantity: "2 liters",
    bestBeforeTime: "2023-06-02T12:00:00",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    status: "claimed",
    canteenName: "Science Building Café",
    location: "Science Building, 2nd Floor",
    createdAt: "2023-06-01T14:45:00",
    claimedAt: "2023-06-01T15:30:00"
  },
  {
    id: "donation3",
    foodName: "Grilled Chicken",
    quantity: "6 pieces",
    bestBeforeTime: "2023-06-01T20:00:00",
    image: "https://images.unsplash.com/photo-1604908177453-7462950dfd34?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    status: "picked_up",
    canteenName: "Main Campus Canteen",
    location: "Building A, Ground Floor",
    createdAt: "2023-05-31T15:20:00",
    claimedAt: "2023-05-31T16:15:00",
    pickedUpAt: "2023-05-31T17:30:00"
  },
  {
    id: "donation4",
    foodName: "Mixed Salad",
    quantity: "3 servings",
    bestBeforeTime: "2023-05-30T19:00:00",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    status: "expired",
    canteenName: "Library Café",
    location: "Library, 1st Floor",
    createdAt: "2023-05-30T13:15:00"
  }
];

const NgoDashboard = () => {
  const { currentUser } = useAuth();
  const [donations, setDonations] = useState<Donation[]>(mockDonations);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState<boolean>(false);

  // Update donation status
  const updateDonationStatus = (donationId: string, newStatus: Donation["status"]) => {
    setDonations(donations.map(donation => {
      if (donation.id === donationId) {
        const updatedDonation = { ...donation, status: newStatus };
        
        if (newStatus === "claimed") {
          updatedDonation.claimedAt = new Date().toISOString();
        } else if (newStatus === "picked_up") {
          updatedDonation.pickedUpAt = new Date().toISOString();
        }
        
        return updatedDonation;
      }
      return donation;
    }));
    
    const statusText = newStatus === "claimed" 
      ? "claimed for pickup" 
      : newStatus === "picked_up" 
        ? "marked as picked up" 
        : newStatus;
        
    toast.success(`Donation ${statusText} successfully`);
  };

  // View donation details
  const viewDonationDetails = (donation: Donation) => {
    setSelectedDonation(donation);
    setShowDetailsDialog(true);
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

  // Check if donation is about to expire (within 3 hours)
  const isAboutToExpire = (bestBeforeTime: string) => {
    const bestBefore = new Date(bestBeforeTime).getTime();
    const now = new Date().getTime();
    const threeHoursInMs = 3 * 60 * 60 * 1000;
    
    return bestBefore - now < threeHoursInMs && bestBefore > now;
  };

  // Analytics data
  const impactData: AreaChartProps["data"] = [
    {
      date: "Jan",
      "Food Rescued (kg)": 12,
    },
    {
      date: "Feb",
      "Food Rescued (kg)": 18,
    },
    {
      date: "Mar",
      "Food Rescued (kg)": 15,
    },
    {
      date: "Apr",
      "Food Rescued (kg)": 21,
    },
    {
      date: "May",
      "Food Rescued (kg)": 28,
    },
    {
      date: "Jun",
      "Food Rescued (kg)": 23,
    },
  ];

  // Table columns definitions
  const availableColumns = [
    {
      header: "Item",
      cell: (donation: Donation) => (
        <div className="flex items-center gap-3">
          <img 
            src={donation.image} 
            alt={donation.foodName} 
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <div className="font-medium">{donation.foodName}</div>
            <div className="text-sm text-gray-500">{donation.quantity}</div>
          </div>
        </div>
      ),
      key: "item"
    },
    {
      header: "Location",
      cell: (donation: Donation) => (
        <div>
          <div>{donation.canteenName}</div>
          <div className="text-sm text-gray-500">{donation.location}</div>
        </div>
      ),
      key: "location"
    },
    {
      header: "Best Before",
      cell: (donation: Donation) => (
        <div className={isAboutToExpire(donation.bestBeforeTime) ? "text-red-500 font-medium" : ""}>
          {formatDate(donation.bestBeforeTime)}
          {isAboutToExpire(donation.bestBeforeTime) && (
            <div className="text-xs mt-1">Expiring soon!</div>
          )}
        </div>
      ),
      key: "bestBefore"
    },
    {
      header: "Actions",
      cell: (donation: Donation) => (
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            size="sm" 
            onClick={() => viewDonationDetails(donation)}
          >
            View
          </Button>
          {donation.status === "available" && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => updateDonationStatus(donation.id, "claimed")}
            >
              Claim
            </Button>
          )}
          {donation.status === "claimed" && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => updateDonationStatus(donation.id, "picked_up")}
            >
              Mark Picked Up
            </Button>
          )}
        </div>
      ),
      key: "actions"
    }
  ];

  const historyColumns = [
    {
      header: "Item",
      cell: (donation: Donation) => (
        <div className="flex items-center gap-3">
          <img 
            src={donation.image} 
            alt={donation.foodName} 
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <div className="font-medium">{donation.foodName}</div>
            <div className="text-sm text-gray-500">{donation.quantity}</div>
          </div>
        </div>
      ),
      key: "item"
    },
    {
      header: "Status",
      cell: (donation: Donation) => (
        <Badge 
          variant={
            donation.status === "available" 
              ? "outline" 
              : donation.status === "claimed" 
                ? "default" 
                : donation.status === "picked_up"
                  ? "secondary"
                  : "outline"
          }
          className={
            donation.status === "available" 
              ? "bg-blue-100 text-blue-800 border-blue-200" 
              : donation.status === "claimed" 
                ? "bg-yellow-100 text-yellow-800 border-yellow-200" 
                : donation.status === "picked_up"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-red-100 text-red-800 border-red-200"
          }
        >
          {donation.status === "available" 
            ? "Available" 
            : donation.status === "claimed" 
              ? "Claimed" 
              : donation.status === "picked_up"
                ? "Picked Up"
                : "Expired"
          }
        </Badge>
      ),
      key: "status"
    },
    {
      header: "Timeline",
      cell: (donation: Donation) => (
        <div className="text-sm">
          <div>Created: {formatDate(donation.createdAt)}</div>
          {donation.claimedAt && (
            <div>Claimed: {formatDate(donation.claimedAt)}</div>
          )}
          {donation.pickedUpAt && (
            <div>Picked up: {formatDate(donation.pickedUpAt)}</div>
          )}
        </div>
      ),
      key: "timeline"
    },
    {
      header: "Actions",
      cell: (donation: Donation) => (
        <Button 
          size="sm" 
          onClick={() => viewDonationDetails(donation)}
        >
          View Details
        </Button>
      ),
      key: "actions"
    }
  ];

  // Filter donations by status
  const availableDonations = donations.filter(
    donation => donation.status === "available" || donation.status === "claimed"
  );
  
  const historyDonations = donations.filter(
    donation => donation.status === "picked_up" || donation.status === "expired"
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">NGO Partner Dashboard</h1>
        <p className="text-gray-600">Find and claim available food donations</p>
      </div>
      
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="available">Available Donations</TabsTrigger>
          <TabsTrigger value="history">Donation History</TabsTrigger>
          <TabsTrigger value="impact">Impact Report</TabsTrigger>
        </TabsList>
        
        {/* Available Donations Tab */}
        <TabsContent value="available">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-6">Available & Claimed Donations</h2>
            
            {availableDonations.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">No available donations at the moment.</p>
                  <p className="text-gray-500">Check back later or view your donation history.</p>
                </CardContent>
              </Card>
            ) : (
              <DataTable columns={availableColumns} data={availableDonations} />
            )}
          </div>
        </TabsContent>
        
        {/* Donation History Tab */}
        <TabsContent value="history">
          <h2 className="text-2xl font-semibold mb-6">Donation History</h2>
          
          {historyDonations.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No donation history yet.</p>
              </CardContent>
            </Card>
          ) : (
            <DataTable columns={historyColumns} data={historyDonations} />
          )}
        </TabsContent>
        
        {/* Impact Report Tab */}
        <TabsContent value="impact">
          <h2 className="text-2xl font-semibold mb-6">Your Impact</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Food Rescue Impact</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <AreaChart 
                  data={impactData}
                  index="date"
                  categories={["Food Rescued (kg)"]}
                  colors={["#4CAF50"]}
                  yAxisWidth={30}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Impact Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-campus-green">117kg</div>
                      <div className="text-sm text-gray-500">Total Food Rescued</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-campus-orange">35</div>
                      <div className="text-sm text-gray-500">Donations Collected</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-campus-blue">234</div>
                      <div className="text-sm text-gray-500">Meals Provided</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-campus-light-blue">3</div>
                      <div className="text-sm text-gray-500">Canteens Partnered</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Environmental Impact</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-campus-green mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Reduced CO2 emissions: approx. 468 kg
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-campus-green mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Water saved: approx. 117,000 liters
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-campus-green mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Land use impact reduced: approx. 234 m²
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Donation Details Dialog */}
      {selectedDonation && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Donation Details</DialogTitle>
              <DialogDescription>
                Information about this food donation
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={selectedDonation.image} 
                  alt={selectedDonation.foodName}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">{selectedDonation.foodName}</h3>
                <p className="text-gray-500">{selectedDonation.quantity}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge 
                    variant={
                      selectedDonation.status === "available" 
                        ? "outline" 
                        : selectedDonation.status === "claimed" 
                          ? "default" 
                          : selectedDonation.status === "picked_up"
                            ? "secondary"
                            : "outline"
                    }
                    className={
                      selectedDonation.status === "available" 
                        ? "bg-blue-100 text-blue-800 border-blue-200" 
                        : selectedDonation.status === "claimed" 
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200" 
                          : selectedDonation.status === "picked_up"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                    }
                  >
                    {selectedDonation.status === "available" 
                      ? "Available" 
                      : selectedDonation.status === "claimed" 
                        ? "Claimed" 
                        : selectedDonation.status === "picked_up"
                          ? "Picked Up"
                          : "Expired"
                    }
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Best Before</p>
                  <p>{formatDate(selectedDonation.bestBeforeTime)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Pickup Location</p>
                <p>{selectedDonation.canteenName}</p>
                <p className="text-gray-500">{selectedDonation.location}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Timeline</p>
                <div className="space-y-1 text-sm">
                  <p>Created: {formatDate(selectedDonation.createdAt)}</p>
                  {selectedDonation.claimedAt && (
                    <p>Claimed: {formatDate(selectedDonation.claimedAt)}</p>
                  )}
                  {selectedDonation.pickedUpAt && (
                    <p>Picked up: {formatDate(selectedDonation.pickedUpAt)}</p>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:justify-between">
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Close
              </Button>
              
              {selectedDonation.status === "available" && (
                <Button
                  onClick={() => {
                    updateDonationStatus(selectedDonation.id, "claimed");
                    setShowDetailsDialog(false);
                  }}
                >
                  Claim Donation
                </Button>
              )}
              
              {selectedDonation.status === "claimed" && (
                <Button
                  onClick={() => {
                    updateDonationStatus(selectedDonation.id, "picked_up");
                    setShowDetailsDialog(false);
                  }}
                >
                  Mark as Picked Up
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default NgoDashboard;
