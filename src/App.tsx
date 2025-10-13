// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "services",
        "simulation",
        "blog",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };
  const FloatingIcon = ({
    icon,
    className,
  }: {
    icon: string;
    className: string;
  }) => (
    <div
      className={`absolute text-yellow-400 text-2xl animate-bounce ${className}`}
    >
      <i className={icon}></i>
    </div>
  );
  const ServiceCard = ({
    icon,
    title,
    description,
    features,
    image,
  }: {
    icon: string;
    title: string;
    description: string;
    features: string[];
    image: string;
  }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <i className={`${icon} text-3xl mb-2 block`}></i>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-blue-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <i className="fas fa-check-circle text-teal-500 mr-2"></i>
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 !rounded-button whitespace-nowrap cursor-pointer">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
  const StatCard = ({
    number,
    label,
    icon,
  }: {
    number: string;
    label: string;
    icon: string;
  }) => (
    <div className="text-center p-6 bg-white rounded-lg shadow-lg">
      <i className={`${icon} text-4xl text-yellow-500 mb-4`}></i>
      <div className="text-3xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <i className="fas fa-coins text-2xl text-yellow-500 mr-2"></i>
              <span
                className={`text-xl font-bold ${
                  isScrolled ? "text-blue-600" : "text-white"
                }`}
              >
                FinEase India
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              {[
                "home",
                "about",
                "services",
                "simulation",
                "blog",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize font-medium transition-colors cursor-pointer ${
                    isScrolled
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-white hover:text-yellow-300"
                  } ${activeSection === item ? "text-blue-600" : ""}`}
                >
                  {item === "simulation" ? "Loan Calculator" : item}
                </button>
              ))}
            </nav>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold !rounded-button whitespace-nowrap cursor-pointer">
                  Apply Now
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    Loan Application - Step {formStep}/3
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {formStep === 1 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          className="border border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Enter your phone number"
                          className="border border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="border border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alternatePhone">
                          Alternate Contact Number
                        </Label>
                        <Input
                          id="alternatePhone"
                          placeholder="Enter alternate contact number"
                          className="border border-gray-300"
                        />
                      </div>
                    </>
                  )}
                  {formStep === 2 && (
                    <>
                      <div className="space-y-2">
                        <Label>Loan Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select loan type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home">Home Loan</SelectItem>
                            <SelectItem value="personal">
                              Personal Loan
                            </SelectItem>
                            <SelectItem value="business">
                              Business Loan
                            </SelectItem>
                            <SelectItem value="education">
                              Education Loan
                            </SelectItem>
                            <SelectItem value="car">Car Loan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Loan Amount (₹)</Label>
                        <Input
                          id="amount"
                          placeholder="Enter loan amount"
                          className="border border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="income">Monthly Income (₹)</Label>
                        <Input
                          id="income"
                          placeholder="Enter monthly income"
                          className="border border-gray-300"
                        />
                      </div>
                    </>
                  )}
                  {formStep === 3 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="address">Current Address</Label>
                        <Textarea
                          id="address"
                          placeholder="Enter your complete address"
                          className="border border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="purpose">Loan Purpose</Label>
                        <Textarea
                          id="purpose"
                          placeholder="Describe the purpose of your loan"
                          className="border border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Employment Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="salaried">Salaried</SelectItem>
                            <SelectItem value="self-employed">
                              Self Employed
                            </SelectItem>
                            <SelectItem value="business">
                              Business Owner
                            </SelectItem>
                            <SelectItem value="professional">
                              Professional
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between pt-4">
                    {formStep > 1 && (
                      <Button
                        variant="outline"
                        onClick={() => setFormStep(formStep - 1)}
                        className="!rounded-button whitespace-nowrap cursor-pointer"
                      >
                        Previous
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        if (formStep < 3) {
                          setFormStep(formStep + 1);
                        } else {
                          setIsModalOpen(false);
                          setFormStep(1);
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700 ml-auto !rounded-button whitespace-nowrap cursor-pointer"
                    >
                      {formStep === 3 ? "Submit Application" : "Next"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20Indian%20banker%20meeting%20with%20young%20couple%20in%20modern%20office%20discussing%20loan%20documents%20with%20warm%20lighting%20and%20contemporary%20furniture%20creating%20trustworthy%20financial%20consultation%20atmosphere&width=1440&height=1024&seq=hero-bg-001&orientation=landscape')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent"></div>
        <FloatingIcon
          icon="fas fa-rupee-sign"
          className="top-20 left-20 delay-0"
        />
        <FloatingIcon
          icon="fas fa-coins"
          className="top-40 right-32 delay-1000"
        />
        <FloatingIcon
          icon="fas fa-chart-line"
          className="bottom-40 left-32 delay-2000"
        />
        <FloatingIcon
          icon="fas fa-piggy-bank"
          className="bottom-20 right-20 delay-500"
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Making Your Dreams Possible with
            <span className="text-yellow-400"> Smarter Loans</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Fast approvals, transparent terms, and flexible repayment — all from
            FinEase India. Your trusted financial partner for every milestone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg !rounded-button whitespace-nowrap cursor-pointer"
            >
              Apply Now
            </Button>
            <Button
              onClick={() => scrollToSection("services")}
              variant="outline"
              className="border-white text-blue-900 hover:bg-white hover:text-blue-900 px-8 py-3 text-lg !rounded-button whitespace-nowrap cursor-pointer"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=Confident%20Indian%20financial%20advisor%20in%20professional%20attire%20sitting%20at%20modern%20desk%20with%20laptop%20and%20documents%20in%20bright%20office%20environment%20showcasing%20trust%20and%20expertise&width=600&height=400&seq=about-img-001&orientation=landscape"
                alt="Financial Advisor"
                className="w-full h-96 object-cover object-top rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-black p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">12+</div>
                <div className="text-sm">Years of Trust</div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Financial Partner in Every
                <span className="text-blue-600"> Dream</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With over 12 years of excellence in financial services, FinEase
                India has been the trusted partner for thousands of Indians in
                achieving their dreams. From home ownership to business
                expansion, education to personal milestones, we provide tailored
                loan solutions that fit your unique needs.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <StatCard
                  number="10,000+"
                  label="Happy Clients"
                  icon="fas fa-users"
                />
                <StatCard
                  number="₹100 Cr+"
                  label="Loans Disbursed"
                  icon="fas fa-chart-bar"
                />
                <StatCard
                  number="140+"
                  label="Partner Banks"
                  icon="fas fa-handshake"
                />
                <StatCard
                  number="98%"
                  label="Approval Rate"
                  icon="fas fa-thumbs-up"
                />
              </div>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Loan Solutions for Every
              <span className="text-blue-600">Need</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're buying your dream home, expanding your business, or
              investing in education, we have the right loan product for you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon="fas fa-home"
              title="Home Loans"
              description="Turn your dream of homeownership into reality with our competitive home loan rates and flexible terms."
              features={[
                "Interest rates starting from 7.5%",
                "Loan amount up to ₹5 Crores",
                "Tenure up to 30 years",
                "Minimal documentation",
              ]}
              image="https://readdy.ai/api/search-image?query=Beautiful%20modern%20Indian%20family%20standing%20in%20front%20of%20their%20new%20house%20with%20keys%20in%20hand%20celebrating%20homeownership%20with%20bright%20natural%20lighting%20and%20clean%20background&width=400&height=300&seq=home-loan-001&orientation=landscape"
            />
            <ServiceCard
              icon="fas fa-user"
              title="Personal Loans"
              description="Quick and hassle-free personal loans for your immediate financial needs with instant approval."
              features={[
                "Instant approval in 24 hours",
                "Loan amount up to ₹40 Lakhs",
                "No collateral required",
                "Flexible repayment options",
              ]}
              image="https://readdy.ai/api/search-image?query=Happy%20Indian%20professional%20using%20smartphone%20for%20online%20banking%20and%20financial%20transactions%20in%20modern%20office%20setting%20with%20clean%20minimalist%20background&width=400&height=300&seq=personal-loan-001&orientation=landscape"
            />
            <ServiceCard
              icon="fas fa-briefcase"
              title="Business Loans"
              description="Fuel your business growth with our tailored business loan solutions designed for entrepreneurs."
              features={[
                "Competitive interest rates",
                "Loan amount up to ₹10 Crores",
                "Quick processing",
                "Dedicated relationship manager",
              ]}
              image="https://readdy.ai/api/search-image?query=Successful%20Indian%20entrepreneur%20in%20modern%20office%20environment%20working%20on%20laptop%20with%20business%20charts%20and%20graphs%20visible%20showcasing%20growth%20and%20success&width=400&height=300&seq=business-loan-001&orientation=landscape"
            />
            <ServiceCard
              icon="fas fa-graduation-cap"
              title="Education Loans"
              description="Invest in your future with our education loans covering tuition, accommodation, and other expenses."
              features={[
                "100% finance available",
                "Covers domestic & international studies",
                "Moratorium period available",
                "Tax benefits under Section 80E",
              ]}
              image="https://readdy.ai/api/search-image?query=Young%20Indian%20student%20in%20graduation%20cap%20and%20gown%20celebrating%20academic%20achievement%20in%20university%20campus%20with%20books%20and%20diploma%20in%20bright%20educational%20setting&width=400&height=300&seq=education-loan-001&orientation=landscape"
            />
            <ServiceCard
              icon="fas fa-car"
              title="Car Loans"
              description="Drive your dream car home today with our attractive car loan offers and easy EMI options."
              features={[
                "Up to 90% financing",
                "Tenure up to 7 years",
                "New & used car financing",
                "Competitive interest rates",
              ]}
              image="https://readdy.ai/api/search-image?query=Happy%20Indian%20family%20with%20new%20car%20keys%20standing%20beside%20their%20brand%20new%20vehicle%20in%20showroom%20with%20bright%20lighting%20and%20clean%20automotive%20background&width=400&height=300&seq=car-loan-001&orientation=landscape"
            />
            <ServiceCard
              icon="fas fa-chart-pie"
              title="Investment Loans"
              description="Leverage our investment loan products to diversify your portfolio and maximize returns."
              features={[
                "Flexible loan structures",
                "Competitive rates",
                "Expert advisory services",
                "Quick approval process",
              ]}
              image="https://readdy.ai/api/search-image?query=Professional%20Indian%20financial%20advisor%20showing%20investment%20charts%20and%20graphs%20to%20client%20in%20modern%20office%20with%20laptop%20and%20financial%20documents%20on%20desk&width=400&height=300&seq=investment-loan-001&orientation=landscape"
            />
          </div>
        </div>
      </section>
      {/* Loan Simulation Section */}
      <section id="simulation" className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loan <span className="text-blue-600">Calculator</span>
            </h2>
            <p className="text-lg text-gray-600">
              Calculate your EMI and plan your finances with our easy-to-use
              loan calculator.
            </p>
          </div>
          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="loanAmount" className="text-base font-medium">
                    Loan Amount (₹)
                  </Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="Enter loan amount"
                    className="mt-2 text-lg border border-gray-300"
                    defaultValue="1000000"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="interestRate"
                    className="text-base font-medium"
                  >
                    Interest Rate (%)
                  </Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    placeholder="Enter interest rate"
                    className="mt-2 text-lg border border-gray-300"
                    defaultValue="9.5"
                  />
                </div>
                <div>
                  <Label htmlFor="tenure" className="text-base font-medium">
                    Loan Tenure (Years)
                  </Label>
                  <Input
                    id="tenure"
                    type="number"
                    placeholder="Enter tenure in years"
                    className="mt-2 text-lg border border-gray-300"
                    defaultValue="20"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3 !rounded-button whitespace-nowrap cursor-pointer">
                  Calculate EMI
                </Button>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  EMI Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded">
                    <span className="text-gray-600">Monthly EMI</span>
                    <span className="text-xl font-bold text-blue-600">
                      ₹9,321
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ₹12,37,040
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ₹22,37,040
                    </span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-info-circle text-green-600 mr-2"></i>
                    <span className="text-green-800 font-medium">
                      Pre-approval Available
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Based on your calculation, you may be eligible for
                    pre-approval. Apply now to get instant confirmation.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Financial <span className="text-blue-600">Insights</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest trends, tips, and insights from the
              world of finance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Indian%20financial%20expert%20analyzing%20market%20trends%20on%20multiple%20computer%20screens%20with%20charts%20and%20graphs%20in%20modern%20trading%20office%20environment&width=400&height=300&seq=blog-img-001&orientation=landscape"
                  alt="Financial Trends"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-blue-100 text-blue-800">
                  Market Trends
                </Badge>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Home Loan Interest Rates: What to Expect in 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Understand the current market trends and how they might affect
                  your home loan decisions...
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <i className="fas fa-calendar mr-2"></i>
                  <span>March 15, 2024</span>
                  <span className="mx-2">•</span>
                  <span>5 min read</span>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Young%20Indian%20couple%20reviewing%20financial%20documents%20and%20budget%20planning%20with%20calculator%20and%20laptop%20on%20dining%20table%20in%20bright%20home%20setting&width=400&height=300&seq=blog-img-002&orientation=landscape"
                  alt="Financial Planning"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-green-100 text-green-800">
                  Financial Tips
                </Badge>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  5 Essential Tips for First-Time Home Buyers
                </h3>
                <p className="text-gray-600 mb-4">
                  Navigate the home buying process with confidence using these
                  expert tips and strategies...
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <i className="fas fa-calendar mr-2"></i>
                  <span>March 12, 2024</span>
                  <span className="mx-2">•</span>
                  <span>7 min read</span>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Indian%20business%20owner%20working%20on%20financial%20planning%20with%20documents%20spreadsheets%20and%20calculator%20in%20modern%20office%20showcasing%20entrepreneurial%20success&width=400&height=300&seq=blog-img-003&orientation=landscape"
                  alt="Business Finance"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-purple-100 text-purple-800">
                  Business
                </Badge>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How to Secure Business Loans for Startups in India
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn about the various funding options available for startups
                  and how to improve your chances...
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <i className="fas fa-calendar mr-2"></i>
                  <span>March 10, 2024</span>
                  <span className="mx-2">•</span>
                  <span>6 min read</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 !rounded-button whitespace-nowrap cursor-pointer"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get in <span className="text-blue-600">Touch</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to take the next step? Our loan experts are here to help you
              find the perfect solution.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Card className="p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl text-gray-900">
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter first name"
                        className="mt-1 border border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        className="mt-1 border border-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Email Address</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="Enter your email"
                      className="mt-1 border border-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <Input
                      id="contactPhone"
                      placeholder="Enter your phone number"
                      className="mt-1 border border-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanType">Loan Type of Interest</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home Loan</SelectItem>
                        <SelectItem value="personal">Personal Loan</SelectItem>
                        <SelectItem value="business">Business Loan</SelectItem>
                        <SelectItem value="education">
                          Education Loan
                        </SelectItem>
                        <SelectItem value="car">Car Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your loan requirements..."
                      className="mt-1 min-h-[120px] border border-gray-300"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3 !rounded-button whitespace-nowrap cursor-pointer">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-blue-600 text-xl mr-4 mt-1"></i>
                    <div>
                      <div className="font-medium text-gray-900">
                        Head Office
                      </div>
                      <div className="text-gray-600">
                        FinEase Tower, Sector 18
                        <br />
                        Gurugram, Haryana 122015
                        <br />
                        India
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone text-blue-600 text-xl mr-4"></i>
                    <div>
                      <div className="font-medium text-gray-900">Phone</div>
                      <div className="text-gray-600">+91 1800-123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-blue-600 text-xl mr-4"></i>
                    <div>
                      <div className="font-medium text-gray-900">Email</div>
                      <div className="text-gray-600">info@fineaseindia.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-blue-600 text-xl mr-4"></i>
                    <div>
                      <div className="font-medium text-gray-900">
                        Business Hours
                      </div>
                      <div className="text-gray-600">
                        Mon - Sat: 9:00 AM - 7:00 PM
                        <br />
                        Sunday: 10:00 AM - 4:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Why Choose FinEase India?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    Quick approval process within 24-48 hours
                  </li>
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    Competitive interest rates across all loan products
                  </li>
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    Dedicated relationship manager for personalized service
                  </li>
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    Transparent terms with no hidden charges
                  </li>
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    Digital-first approach for seamless experience
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <i className="fas fa-coins text-2xl text-yellow-500 mr-2"></i>
                <span className="text-xl font-bold">FinEase India</span>
              </div>
              <p className="text-gray-400 mb-6">
                Your trusted financial partner for over 12 years. Making dreams
                possible with smart loan solutions.
              </p>
              <div className="flex space-x-4">
                <i className="fab fa-facebook text-xl text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"></i>
                <i className="fab fa-twitter text-xl text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"></i>
                <i className="fab fa-linkedin text-xl text-gray-400 hover:text-blue-600 cursor-pointer transition-colors"></i>
                <i className="fab fa-instagram text-xl text-gray-400 hover:text-pink-500 cursor-pointer transition-colors"></i>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("simulation")}
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Loan Calculator
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("blog")}
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Loan Products</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Home Loans
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Personal Loans
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Business Loans
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Education Loans
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Car Loans
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Investment Loans
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <i className="fas fa-phone mr-3"></i>
                  <span>+91 1800-123-4567</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <i className="fas fa-envelope mr-3"></i>
                  <span>info@fineaseindia.com</span>
                </div>
                <div className="flex items-start text-gray-400">
                  <i className="fas fa-map-marker-alt mr-3 mt-1"></i>
                  <span>
                    FinEase Tower, Sector 18
                    <br />
                    Gurugram, Haryana 122015
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3">We Accept</h4>
                <div className="flex space-x-3">
                  <i className="fab fa-cc-visa text-2xl text-gray-400"></i>
                  <i className="fab fa-cc-mastercard text-2xl text-gray-400"></i>
                  <i className="fab fa-cc-paypal text-2xl text-gray-400"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm">
                © 2024 FinEase India. All rights reserved.
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm cursor-pointer transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm cursor-pointer transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm cursor-pointer transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
