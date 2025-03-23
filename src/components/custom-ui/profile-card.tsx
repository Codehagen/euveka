"use client";

import * as React from "react";
import { User, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "done" | "in-progress" | "pending";
  date: string;
}

interface ProfileCardProps {
  name: string;
  image?: string;
  projects?: Project[];
  className?: string;
  onProfileClick?: () => void;
  onProjectClick?: (projectId: string) => void;
}

export function ProfileCard({
  name,
  image,
  projects = [],
  className,
  onProfileClick,
  onProjectClick,
}: ProfileCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-[22rem] rounded-xl border-2 border-border overflow-hidden",
        "bg-muted/70 hover:bg-muted backdrop-blur-sm shadow-sm",
        "transition-all duration-300",
        className
      )}
    >
      {/* Profile header */}
      <div
        className={cn(
          "flex items-center gap-4 p-4 border-b border-border",
          onProfileClick && "cursor-pointer hover:bg-muted/80"
        )}
        onClick={onProfileClick}
      >
        <div className="flex-shrink-0">
          {image ? (
            <img
              src={image}
              alt={name}
              className="size-12 rounded-full object-cover border-2 border-primary/20"
            />
          ) : (
            <div className="flex items-center justify-center size-12 rounded-full bg-primary/20 text-primary">
              <User className="size-6" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-lg text-foreground truncate">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="size-3" />
            <span>Joined {new Date().toLocaleDateString()}</span>
          </p>
        </div>
      </div>

      {/* Projects list */}
      {projects.length > 0 && (
        <div className="flex-1">
          <div className="p-3 bg-muted/50 border-b border-border">
            <h4 className="text-sm font-medium text-foreground">
              Recent Projects
            </h4>
          </div>

          <div className="divide-y divide-border">
            {projects.map((project) => (
              <div
                key={project.id}
                className={cn(
                  "p-3 transition-colors hover:bg-muted/50",
                  onProjectClick && "cursor-pointer"
                )}
                onClick={() => onProjectClick?.(project.id)}
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-foreground truncate">
                    {project.title}
                  </h5>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </div>

                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {project.description}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {project.date}
                  </span>

                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      project.status === "done" &&
                        "bg-green-500/10 text-green-600",
                      project.status === "in-progress" &&
                        "bg-blue-500/10 text-blue-600",
                      project.status === "pending" &&
                        "bg-amber-500/10 text-amber-600"
                    )}
                  >
                    {project.status === "done" && "Completed"}
                    {project.status === "in-progress" && "In Progress"}
                    {project.status === "pending" && "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="p-4 text-center">
          <p className="text-sm text-muted-foreground">No projects found</p>
        </div>
      )}
    </div>
  );
}
