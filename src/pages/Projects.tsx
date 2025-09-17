import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Code, Globe, Filter } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { getPersonalProjects, getOpenSourceProjects } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState<'all' | 'personal' | 'opensource'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'archived'>('all');

  // Initialize filter from URL params
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam === 'personal' || filterParam === 'opensource') {
      setFilter(filterParam);
    }
  }, [searchParams]);

  const personalProjects = getPersonalProjects();
  const openSourceProjects = getOpenSourceProjects();

  const allProjects = [...personalProjects, ...openSourceProjects];

  const filteredProjects = allProjects.filter(project => {
    const categoryMatch = filter === 'all' || project.category === filter;
    const statusMatch = statusFilter === 'all' || project.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  const personalFiltered = personalProjects.filter(project => 
    statusFilter === 'all' || project.status === statusFilter
  );

  const openSourceFiltered = openSourceProjects.filter(project => 
    statusFilter === 'all' || project.status === statusFilter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 pt-24">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of personal projects and open source contributions that showcase my skills and passion for development.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={(value: any) => {
              setFilter(value);
              if (value === 'all') {
                setSearchParams({});
              } else {
                setSearchParams({ filter: value });
              }
            }}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="opensource">Open Source</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* All Projects View */}
        {filter === 'all' && (
          <div className="space-y-12">
            {/* Personal Projects Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Personal Projects</h2>
                    <p className="text-muted-foreground">
                      Side projects and personal experiments
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {personalFiltered.length} projects
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personalFiltered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            {/* Open Source Projects Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Open Source Contributions</h2>
                    <p className="text-muted-foreground">
                      Projects where I've made a meaningful impact
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {openSourceFiltered.length} projects
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {openSourceFiltered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Filtered View */}
        {filter !== 'all' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {filter === 'personal' ? 'Personal Projects' : 'Open Source Projects'}
              </h2>
              <Badge variant="secondary" className="text-sm">
                {filteredProjects.length} projects
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-muted/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to see more projects.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setFilter('all');
                setStatusFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
