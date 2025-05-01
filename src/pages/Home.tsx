
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  // Helper to get dashboard URL based on user role
  const getDashboardUrl = () => {
    if (!currentUser) return "/login";
    
    switch(currentUser.role) {
      case "student": return "/student-dashboard";
      case "admin": return "/admin-dashboard";
      case "ngo": return "/ngo-dashboard";
      default: return "/login";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-campus-orange to-campus-light-orange py-20 md:py-28">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="text-white order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Smart Food Management for Campus Canteens
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Pre-order meals, reduce waiting time, and help eliminate food waste through our NGO donation system
              </p>
              <div className="flex flex-wrap gap-4">
                {currentUser ? (
                  <Link to={getDashboardUrl()}>
                    <Button size="lg" className="bg-white text-campus-orange hover:bg-gray-100">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-campus-orange hover:bg-gray-100">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Log In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" 
                alt="Campus food" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart Features for Everyone</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform connects students, campus administrators, and NGO partners to create a sustainable food ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Features */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 p-3 bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-campus-blue">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Students</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-campus-green mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  View digital menu with dietary filters
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-campus-green mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Smart pre-order system
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-campus-green mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Order history and notifications
                </li>
              </ul>
            </div>

            {/* Admin Features */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 p-3 bg-orange-100 rounded-full w-14 h-14 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-campus-orange">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.38a48.474 48.474 0 0 0-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1 .53 0L12.5 3.5l.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0L18 3.5l.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0L24 3.5l.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39.265-.39a.375.375 0 0 1 .53 0l.265.39" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Canteen Admins</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-campus-green mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Update daily menu
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-campus-green mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Log leftover food for donation
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-campus-green mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Track waste reduction analytics
                </li>
              </ul>
            </div>

            {/* NGO Features */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 p-3 bg-green-100 rounded-full w-14 h-14 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-campus-green">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">For NGO Partners</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-campus-green mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Browse available food donations
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-campus-green mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Accept/reject donation requests
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-campus-green mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  View pickup details and history
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-4xl font-bold text-campus-orange mb-2">200+</div>
              <div className="text-gray-600">Daily Meals Served</div>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-4xl font-bold text-campus-orange mb-2">50kg</div>
              <div className="text-gray-600">Food Waste Saved Weekly</div>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-4xl font-bold text-campus-orange mb-2">15+</div>
              <div className="text-gray-600">NGO Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-campus-gray">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-campus-orange to-campus-light-orange rounded-xl p-8 md:p-12 shadow-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join Campus Cravings?</h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Sign up today and be part of our sustainable food ecosystem. Reduce waiting times, discover great food, and help minimize food waste.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-campus-orange hover:bg-gray-100">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
