"use client";

import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Project } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, Check, Filter, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

type SortOption = "newest" | "oldest" | "az" | "za";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ProjectsClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Count technologies and sort by frequency
  const techCounts = initialProjects.reduce(
    (counts, project) => {
      project.techStacks.forEach((tech) => {
        counts[tech] = (counts[tech] || 0) + 1;
      });
      return counts;
    },
    {} as Record<string, number>,
  );

  // Extract and sort tech stacks by frequency
  const allTechStacks = Object.keys(techCounts).sort((a, b) => {
    // Sort by count (descending)
    const countDiff = techCounts[b] - techCounts[a];
    // If counts are equal, sort alphabetically
    return countDiff !== 0 ? countDiff : a.localeCompare(b);
  });

  // Extract all unique statuses
  const allStatuses = Array.from(
    new Set(initialProjects.map((project) => project.status)),
  );

  // Filter and sort projects
  useEffect(() => {
    let filteredProjects = [...initialProjects];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProjects = filteredProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.techStacks.some((tech) => tech.toLowerCase().includes(query)),
      );
    }

    // Apply tech filter
    if (selectedTechs.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        selectedTechs.some((tech) => project.techStacks.includes(tech)),
      );
    }

    // Apply status filter
    if (selectedStatus) {
      filteredProjects = filteredProjects.filter(
        (project) => project.status === selectedStatus,
      );
    }

    // Apply sorting
    filteredProjects.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return (
            new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
          );
        case "oldest":
          return (
            new Date(a.date || "").getTime() - new Date(b.date || "").getTime()
          );
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setProjects(filteredProjects);
  }, [initialProjects, searchQuery, selectedTechs, selectedStatus, sortOption]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTechs([]);
    setSelectedStatus(null);
  };

  // Toggle tech in the selected techs list
  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // Control item animation (subtle fade up for search, sort, filter)
  const controlItem = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1], // Custom easing for subtle, elegant animation
      },
    },
  };

  // Filter panel animation (unchanged)
  const filterPanelVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      overflow: "hidden",
    },
    visible: {
      opacity: 1,
      height: "auto",
      overflow: "hidden",
      transition: {
        duration: 0.25,
      },
    },
  };

  return (
    <div>
      {/* Search and filter controls with initial animations */}
      <motion.div
        className="mb-8 space-y-5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Search and filter bar */}
        <div className="flex flex-wrap gap-2">
          {/* Search input */}
          <motion.div
            className="relative flex-1 min-w-[200px]"
            variants={controlItem}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border border-border/40 bg-muted/5"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>

          {/* Sort dropdown */}
          <motion.div variants={controlItem}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-1.5 border-border/40"
                >
                  <ArrowUpDown className="h-4 w-4" /> Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSortOption("newest")}
                  className="flex items-center justify-between"
                >
                  Newest first
                  {sortOption === "newest" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOption("oldest")}
                  className="flex items-center justify-between"
                >
                  Oldest first
                  {sortOption === "oldest" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSortOption("az")}
                  className="flex items-center justify-between"
                >
                  A to Z{sortOption === "az" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOption("za")}
                  className="flex items-center justify-between"
                >
                  Z to A{sortOption === "za" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          {/* Filter toggle button */}
          <motion.div variants={controlItem}>
            <Button
              variant="outline"
              className={`border-border/40 ${showFilters ? "bg-muted" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-controls="filter-panel"
            >
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
          </motion.div>

          {/* Clear filters button */}
          {(selectedTechs.length > 0 || selectedStatus || searchQuery) && (
            <motion.div variants={controlItem}>
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </div>

        {/* Filter panel (unchanged) */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              id="filter-panel"
              variants={filterPanelVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="border border-border/30 rounded-lg p-4 bg-muted/5"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Tech stacks */}
                <div>
                  <h4 className="text-sm font-medium mb-2 border-l-2 border-primary pl-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {allTechStacks.map((tech) => (
                      <Badge
                        key={tech}
                        variant={
                          selectedTechs.includes(tech) ? "default" : "outline"
                        }
                        className="cursor-pointer transition-colors flex items-center gap-1.5"
                        onClick={() => toggleTech(tech)}
                      >
                        <span>{tech}</span>
                        <span className="text-xs opacity-70 px-1.5 py-0.5 rounded-full bg-background/20">
                          {techCounts[tech]}
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h4 className="text-sm font-medium mb-2 border-l-2 border-primary pl-2">
                    Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {allStatuses.map((status) => {
                      const statusCount = initialProjects.filter(
                        (p) => p.status === status,
                      ).length;
                      return (
                        <Badge
                          key={status}
                          variant={
                            selectedStatus === status ? "default" : "outline"
                          }
                          className={`cursor-pointer transition-colors flex items-center gap-1.5 ${
                            status === "Completed" && selectedStatus === status
                              ? "bg-green-500/90"
                              : status === "In Progress" &&
                                  selectedStatus === status
                                ? "bg-blue-500/90"
                                : status === "Maintaining" &&
                                    selectedStatus === status
                                  ? "bg-purple-500/90"
                                  : ""
                          }`}
                          onClick={() =>
                            setSelectedStatus((prev) =>
                              prev === status ? null : (status as string),
                            )
                          }
                        >
                          <span>{status}</span>
                          <span className="text-xs opacity-70 px-1.5 py-0.5 rounded-full bg-background/20">
                            {statusCount}
                          </span>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filters (unchanged) */}
        <AnimatePresence>
          {(selectedTechs.length > 0 || selectedStatus) && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {selectedTechs.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="flex items-center gap-1.5"
                >
                  <span>{tech}</span>
                  <button
                    onClick={() => toggleTech(tech)}
                    className="ml-0.5 p-0.5 rounded-full hover:bg-muted/50 transition-colors flex items-center justify-center"
                    aria-label={`Remove ${tech} filter`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </Badge>
              ))}
              {selectedStatus && (
                <Badge
                  variant="secondary"
                  className={`flex items-center gap-1.5 ${
                    selectedStatus === "Completed"
                      ? "bg-green-500/20 text-green-600 dark:text-green-400"
                      : selectedStatus === "In Progress"
                        ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                        : selectedStatus === "Maintaining"
                          ? "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                          : ""
                  }`}
                >
                  <span>{selectedStatus}</span>
                  <button
                    onClick={() => setSelectedStatus(null)}
                    className="ml-0.5 p-0.5 rounded-full hover:bg-muted/50 transition-colors flex items-center justify-center"
                    aria-label={`Remove ${selectedStatus} filter`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results summary with animation */}
      <motion.div
        className="mb-6 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        Showing {projects.length}{" "}
        {projects.length === 1 ? "project" : "projects"}
      </motion.div>

      {/* Projects grid (unchanged) */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
