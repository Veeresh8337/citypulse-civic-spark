import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import StatsCard from "@/components/StatsCard";
import StatusBadge from "@/components/StatusBadge";
import { AlertTriangle, TrendingUp, Users, Clock, Filter, Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for demo - in real app this would come from Supabase
  const issues = [
    {
      id: 1,
      title: "Major pothole causing traffic delays",
      category: "Infrastructure",
      status: "urgent" as const,
      location: "Main St & 5th Ave",
      description: "Large pothole is causing significant traffic backup during rush hour",
      urgencyScore: 95,
      createdAt: "2024-01-15T10:30:00Z",
      reportedBy: "Anonymous",
    },
    {
      id: 2,
      title: "Broken streetlight creating safety concern",
      category: "Utilities",
      status: "high" as const,
      location: "Park Avenue",
      description: "Streetlight has been out for 3 days, creating unsafe walking conditions",
      urgencyScore: 78,
      createdAt: "2024-01-15T08:15:00Z",
      reportedBy: "Jane Smith",
    },
    {
      id: 3,
      title: "Noise complaint from construction site",
      category: "Public Safety",
      status: "medium" as const,
      location: "Residential District",
      description: "Construction noise exceeding permitted hours",
      urgencyScore: 52,
      createdAt: "2024-01-15T07:45:00Z",
      reportedBy: "John Doe",
    },
    {
      id: 4,
      title: "Graffiti on public building",
      category: "Vandalism",
      status: "low" as const,
      location: "City Hall",
      description: "Graffiti found on the side wall of city hall building",
      urgencyScore: 25,
      createdAt: "2024-01-14T16:20:00Z",
      reportedBy: "City Worker",
    },
  ];

  const filteredIssues = issues.filter((issue) => {
    const categoryMatch = filterCategory === "all" || issue.category === filterCategory;
    const statusMatch = filterStatus === "all" || issue.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Civic Issues Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Real-time monitoring and intelligent prioritization of city issues
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Active Issues"
            value="1,247"
            change="+8.2%"
            trend="up"
            icon={AlertTriangle}
          />
          <StatsCard
            title="Avg Response Time"
            value="4.2hrs"
            change="-12%"
            trend="down"
            icon={Clock}
          />
          <StatsCard
            title="Issues Resolved Today"
            value="89"
            change="+15%"
            trend="up"
            icon={TrendingUp}
          />
          <StatsCard
            title="Citizens Reporting"
            value="2,134"
            change="+5%"
            trend="up"
            icon={Users}
          />
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter & Search Issues</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search issues by title, location, or description..." 
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Public Safety">Public Safety</SelectItem>
                  <SelectItem value="Vandalism">Vandalism</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="sm:w-48">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Issues List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Active Issues ({filteredIssues.length})
            </h2>
            <Button variant="outline">
              Export Data
            </Button>
          </div>

          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{issue.title}</h3>
                      <StatusBadge status={issue.status} />
                      <div className="px-2 py-1 bg-primary/20 rounded text-xs font-medium text-primary">
                        Score: {issue.urgencyScore}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{issue.description}</p>
                    
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {issue.location}
                      </span>
                      <span className="px-2 py-1 bg-secondary rounded-sm">
                        {issue.category}
                      </span>
                      <span>
                        Reported by {issue.reportedBy}
                      </span>
                      <span>
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Take Action
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Issues Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more issues.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;