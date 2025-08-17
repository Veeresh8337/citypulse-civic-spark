import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import StatsCard from "@/components/StatsCard";
import StatusBadge from "@/components/StatusBadge";
import { AlertTriangle, TrendingUp, Users, MapPin, FileText, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-city.jpg";

const Home = () => {
  // Mock data for demo
  const recentIssues = [
    { id: 1, title: "Pothole on Main Street", category: "Infrastructure", status: "urgent" as const, location: "Downtown", time: "2 hours ago" },
    { id: 2, title: "Broken streetlight", category: "Utilities", status: "high" as const, location: "Park Ave", time: "4 hours ago" },
    { id: 3, title: "Noise complaint", category: "Public Safety", status: "medium" as const, location: "Residential Area", time: "6 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/60" />
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center shadow-glow">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="px-3 py-1 bg-primary/20 rounded-full border border-primary/30">
                <span className="text-sm font-medium text-primary">Hack Fest 2025</span>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-hero">CityPulse</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Real-time civic issue tracking and smart prioritization system. 
              Monitor, report, and resolve community issues with AI-powered insights and predictive analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90 text-white shadow-glow" asChild>
                <Link to="/dashboard">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Dashboard
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                <Link to="/report">
                  <FileText className="w-5 h-5 mr-2" />
                  Report an Issue
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Real-time City Statistics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Active Issues"
              value="1,247"
              change="+12%"
              trend="up"
              icon={AlertTriangle}
            />
            <StatsCard
              title="Resolved Today"
              value="89"
              change="+8%"
              trend="up"
              icon={TrendingUp}
            />
            <StatsCard
              title="Citizens Engaged"
              value="15,432"
              change="+5%"
              trend="up"
              icon={Users}
            />
            <StatsCard
              title="Response Time"
              value="2.4hrs"
              change="-15%"
              trend="down"
              icon={MapPin}
            />
          </div>
        </div>
      </section>

      {/* Recent Issues */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Recent Issues</h2>
            <Button variant="outline" asChild>
              <Link to="/dashboard">View All Issues</Link>
            </Button>
          </div>
          
          <div className="grid gap-4">
            {recentIssues.map((issue) => (
              <Card key={issue.id} className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-foreground">{issue.title}</h3>
                        <StatusBadge status={issue.status} />
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground space-x-4">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {issue.location}
                        </span>
                        <span>{issue.category}</span>
                        <span>{issue.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Powered by AI & Real-time Data
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Smart Prioritization</span>
                </CardTitle>
                <CardDescription>
                  AI-powered NLP analysis automatically prioritizes issues based on urgency, impact, and community sentiment.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Interactive Heatmaps</span>
                </CardTitle>
                <CardDescription>
                  Visual hotspot mapping with Leaflet.js integration showing issue density and patterns across the city.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Predictive Analytics</span>
                </CardTitle>
                <CardDescription>
                  Advanced data visualization and predictive modeling to forecast trends and optimize resource allocation.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;