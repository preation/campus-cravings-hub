
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ShoppingCart, ChartBar, MessageSquare, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  // Helper function to get dashboard path based on user role
  const getDashboardPath = () => {
    if (!currentUser) return "/login";
    
    switch(currentUser.role) {
      case "student": return "/student-dashboard";
      case "admin": return "/admin-dashboard";
      case "ngo": return "/ngo-dashboard";
      default: return "/login";
    }
  };
  
  // Features list with icons and descriptions
  const features = [
    {
      title: "Digital Menu System",
      icon: <ShoppingCart className="h-12 w-12 text-campus-orange" />,
      description: "Browse daily menu with filters for vegetarian, non-vegetarian options and calorie information."
    },
    {
      title: "Smart Pre-Ordering",
      icon: <Calendar className="h-12 w-12 text-campus-orange" />,
      description: "Place orders ahead of time and select your preferred pickup slot with AI-suggested times."
    },
    {
      title: "Donation Analytics",
      icon: <ChartBar className="h-12 w-12 text-campus-orange" />,
      description: "Track food donations, meals saved, and impact with interactive visualizations."
    },
    {
      title: "AI Notifications",
      icon: <Bell className="h-12 w-12 text-campus-orange" />,
      description: "Real-time alerts for NGOs when leftover food is available for pickup."
    },
    {
      title: "Chat Assistant",
      icon: <MessageSquare className="h-12 w-12 text-campus-orange" />,
      description: "Ask questions about the menu, log leftover food, or view donation statistics."
    }
  ];

  return (
    <div className="container-custom mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 mb-20">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Welcome to <span className="text-campus-orange">Campus Cravings</span>
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Smart canteen management with AI-powered food ordering and donation system. 
            Reducing waste while feeding more people.
          </p>
          <div className="flex flex-wrap gap-4">
            {currentUser ? (
              <Button asChild size="lg" className="bg-campus-orange hover:bg-campus-light-orange">
                <Link to={getDashboardPath()}>Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-campus-orange hover:bg-campus-light-orange">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-campus-orange text-campus-orange hover:bg-campus-orange hover:text-white">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="relative">
            <div className="bg-campus-light-orange rounded-lg p-6 shadow-lg">
              <img 
                src="/placeholder.svg" 
                alt="Campus Cravings" 
                className="rounded-lg w-full h-auto" 
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-md">
              <div className="text-campus-orange font-bold">Reducing Food Waste</div>
              <div className="text-gray-600 text-sm">Connecting Canteens with NGOs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-campus-green flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Order Smart</h3>
            <p className="text-gray-600">Students browse the digital menu and place orders for their preferred pickup time.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-campus-blue flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Log Excess Food</h3>
            <p className="text-gray-600">Canteen staff log leftover food which is made available for donation to NGOs.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-campus-orange flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect & Donate</h3>
            <p className="text-gray-600">NGOs receive notifications and can accept donations based on their capacity.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 px-6 bg-campus-gray rounded-xl shadow-inner">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Get Started?</h2>
        <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
          Join Campus Cravings today and be part of our mission to create a more efficient and sustainable food system on campus.
        </p>
        <Button asChild size="lg" className="bg-campus-orange hover:bg-campus-light-orange">
          <Link to={currentUser ? getDashboardPath() : "/register"}>
            {currentUser ? "Go to Dashboard" : "Join Now"}
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default Home;
