
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Users, HandHeart, ChartBar, MessageSquare } from 'lucide-react';

const About = () => {
  // Team member data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Former food sustainability researcher with a passion for reducing food waste on campus.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Priya Sharma",
      role: "Operations Director",
      bio: "Ex-NGO coordinator with 8+ years of experience in food distribution networks.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Marcus Chen",
      role: "Tech Lead",
      bio: "AI specialist focused on building systems that optimize food distribution.",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Impact stats
  const impactStats = [
    { label: "Meals Saved", value: "25,000+" },
    { label: "Campus Partners", value: "12" },
    { label: "NGOs Connected", value: "8" },
    { label: "CO² Reduction", value: "15 tons" }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Campus Cravings is revolutionizing campus dining by connecting canteens, students, and local NGOs to create a more efficient and sustainable food ecosystem.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-4">
              Campus Cravings began in 2022 when our founder noticed the significant amount of food waste generated in university dining halls. What started as a simple spreadsheet to track leftover food quickly evolved into a comprehensive platform.
            </p>
            <p className="text-lg">
              Today, we're proud to connect canteens across multiple campuses with students and local NGOs, creating a seamless ecosystem that reduces waste while feeding more people.
            </p>
          </div>
          <div className="bg-campus-light-orange p-6 rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80" 
              alt="Campus team planning" 
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mb-16 bg-gray-50 py-12 px-4 rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <Utensils className="w-12 h-12 mx-auto text-campus-orange mb-4" />
              <CardTitle>Food Dignity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">We believe excess food should be treated with respect and redistributed with dignity.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Users className="w-12 h-12 mx-auto text-campus-green mb-4" />
              <CardTitle>Community First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">Building stronger campus communities through better food systems and shared resources.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <HandHeart className="w-12 h-12 mx-auto text-campus-blue mb-4" />
              <CardTitle>Zero Waste</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">Working toward a future where no good food goes to waste on any campus.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white shadow-md rounded-lg border border-gray-100">
              <p className="text-3xl md:text-4xl font-bold text-campus-orange mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-campus-orange mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-campus-green"></div>
          
          {/* Timeline items */}
          <div className="grid grid-cols-1 gap-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-16 mb-6 md:mb-0 md:text-right">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Students Order Ahead</h3>
                  <p>Browse the digital menu, place orders for their preferred pickup time, and skip the lines.</p>
                </div>
              </div>
              <div className="bg-campus-green text-white rounded-full h-12 w-12 flex items-center justify-center z-10">1</div>
              <div className="md:w-1/2 md:pl-16 hidden md:block"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-16 hidden md:block"></div>
              <div className="bg-campus-blue text-white rounded-full h-12 w-12 flex items-center justify-center z-10">2</div>
              <div className="md:w-1/2 md:pl-16 mb-6 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Canteens Log Excess Food</h3>
                  <p>Staff log leftover food at the end of service periods, making it available for donation.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-16 mb-6 md:mb-0 md:text-right">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">NGOs Receive Notifications</h3>
                  <p>Partner organizations are notified about available food and can claim it based on their capacity.</p>
                </div>
              </div>
              <div className="bg-campus-orange text-white rounded-full h-12 w-12 flex items-center justify-center z-10">3</div>
              <div className="md:w-1/2 md:pl-16 hidden md:block"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-16 hidden md:block"></div>
              <div className="bg-campus-green text-white rounded-full h-12 w-12 flex items-center justify-center z-10">4</div>
              <div className="md:w-1/2 md:pl-16">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Food Gets Distributed</h3>
                  <p>NGOs pick up the food and distribute it to those in need, closing the sustainability loop.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 px-6 bg-campus-gray rounded-xl shadow-inner">
        <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Whether you're a student, canteen administrator, or NGO representative, you can be part of creating a more sustainable food ecosystem on campus.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-campus-orange hover:bg-campus-light-orange">
            <Link to="/register">Sign Up Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
