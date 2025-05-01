
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { MapPin, Mail, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    role: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        role: ''
      });
      
      // Show success message
      toast.success("Thank you for your message! We'll get back to you soon.");
    }, 1500);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Info Cards */}
        <Card>
          <CardHeader className="text-center pb-2">
            <MapPin className="h-8 w-8 mx-auto text-campus-orange mb-2" />
            <CardTitle>Our Location</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>123 University Way</p>
            <p>Campus District</p>
            <p>Innovation City, IC 10010</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="text-center pb-2">
            <Mail className="h-8 w-8 mx-auto text-campus-blue mb-2" />
            <CardTitle>Email Us</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>info@campuscravings.com</p>
            <p>support@campuscravings.com</p>
            <p>partnerships@campuscravings.com</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="text-center pb-2">
            <Phone className="h-8 w-8 mx-auto text-campus-green mb-2" />
            <CardTitle>Call Us</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>General: (555) 123-4567</p>
            <p>Support: (555) 987-6543</p>
            <p>Mon-Fri: 9:00 AM - 5:00 PM</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Your name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">I am a...</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="admin">Canteen Administrator</SelectItem>
                    <SelectItem value="ngo">NGO Representative</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  placeholder="What's this about?" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Your message here..." 
                  className="min-h-[150px]" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-campus-orange hover:bg-campus-light-orange" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Map Section */}
        <div className="h-full flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Find Us</h2>
          <div className="bg-gray-200 rounded-lg flex-grow min-h-[400px] flex items-center justify-center">
            <p className="text-gray-600">Interactive map would be displayed here</p>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-campus-blue">How do I become an NGO partner?</h4>
                <p className="text-gray-600">Complete the NGO registration form and our team will review your application within 2-3 business days.</p>
              </div>
              <div>
                <h4 className="font-medium text-campus-blue">Can students volunteer with Campus Cravings?</h4>
                <p className="text-gray-600">Yes! We have various volunteer opportunities. Send us a message and mention your interest in volunteering.</p>
              </div>
              <div>
                <h4 className="font-medium text-campus-blue">How do canteens sign up for the platform?</h4>
                <p className="text-gray-600">Canteen administrators can register and our onboarding team will guide you through the setup process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
