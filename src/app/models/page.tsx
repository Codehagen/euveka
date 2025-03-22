"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Eye, FileText, Layers, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { MannequinVisualization } from "@/components/device-controller/mannequin-visualization";
import { calculateModelMannequinDimensions } from "@/components/device-controller/measurements";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface Parameters {
  torsoHeight: number;
  bust: number;
  waist: number;
  hips: number;
  thighs: number;
  shoulders: number;
  neck: number;
}

interface ParameterSet {
  name: string;
  parameters: Parameters;
  createdAt?: string;
  updatedAt?: string;
}

export default function ModelsPage() {
  const [savedConfigurations, setSavedConfigurations] = useState<
    ParameterSet[]
  >([]);
  const [selectedConfig, setSelectedConfig] = useState<ParameterSet | null>(
    null
  );
  const [configToDelete, setConfigToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadConfigurations();
  }, []);

  const loadConfigurations = () => {
    try {
      const storedSets = localStorage.getItem("deviceParameters");
      if (storedSets) {
        const parsedSets = JSON.parse(storedSets);
        setSavedConfigurations(parsedSets);
        // Auto-select the first configuration if available
        if (parsedSets.length > 0) {
          // Keep current selection if it exists and is still in the list
          if (
            selectedConfig &&
            parsedSets.some(
              (set: ParameterSet) => set.name === selectedConfig.name
            )
          ) {
            const current = parsedSets.find(
              (set: ParameterSet) => set.name === selectedConfig.name
            );
            setSelectedConfig(current);
          } else {
            setSelectedConfig(parsedSets[0]);
          }
        } else {
          setSelectedConfig(null);
        }
      }
    } catch (error) {
      console.error("Failed to load saved configurations:", error);
      toast.error("Failed to load saved configurations");
    }
  };

  // Format date string for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    } catch (e) {
      return "Invalid date";
    }
  };

  // Delete a configuration
  const deleteConfiguration = (name: string) => {
    try {
      const storedSets = localStorage.getItem("deviceParameters");
      if (storedSets) {
        const parsedSets = JSON.parse(storedSets);
        const updatedSets = parsedSets.filter(
          (set: ParameterSet) => set.name !== name
        );

        localStorage.setItem("deviceParameters", JSON.stringify(updatedSets));
        setSavedConfigurations(updatedSets);

        // Update selected config if it was deleted
        if (selectedConfig?.name === name) {
          setSelectedConfig(updatedSets.length > 0 ? updatedSets[0] : null);
        }

        toast.success(`Model "${name}" deleted`);
      }
    } catch (error) {
      console.error("Failed to delete configuration:", error);
      toast.error("Failed to delete model");
    } finally {
      setConfigToDelete(null);
    }
  };

  // Calculate mannequin dimensions for the selected configuration
  const mannequinDimensions = selectedConfig
    ? calculateModelMannequinDimensions(selectedConfig.parameters)
    : null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Models</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-6 pt-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Saved Models</h1>
            <Link href="/">
              <Button>
                <Layers className="mr-2 h-4 w-4" />
                Create New Model
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Model Library</CardTitle>
                  <CardDescription>
                    Select a saved model configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[500px] overflow-y-auto">
                  {savedConfigurations.length > 0 ? (
                    <div className="space-y-2">
                      {savedConfigurations.map((config) => (
                        <div
                          key={config.name}
                          className={`p-3 rounded-md cursor-pointer transition-colors ${
                            selectedConfig?.name === config.name
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent/50"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div
                              className="flex-1"
                              onClick={() => setSelectedConfig(config)}
                            >
                              <div className="font-medium">{config.name}</div>
                              {config.updatedAt ? (
                                <div className="text-xs text-muted-foreground">
                                  Updated: {formatDate(config.updatedAt)}
                                </div>
                              ) : config.createdAt ? (
                                <div className="text-xs text-muted-foreground">
                                  Created: {formatDate(config.createdAt)}
                                </div>
                              ) : null}
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfigToDelete(config.name);
                              }}
                            >
                              <Trash2Icon className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-2 opacity-20" />
                      <p>No saved models found</p>
                      <p className="text-xs mt-1">
                        Create and save a model from the dashboard
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {selectedConfig ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedConfig.name}</CardTitle>
                    <CardDescription>
                      Model details and visualization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="visualization">
                      <TabsList className="mb-4">
                        <TabsTrigger value="visualization">
                          Visualization
                        </TabsTrigger>
                        <TabsTrigger value="parameters">Parameters</TabsTrigger>
                      </TabsList>

                      <TabsContent
                        value="visualization"
                        className="min-h-[400px]"
                      >
                        {selectedConfig && (
                          <div className="flex justify-center items-center h-full">
                            <MannequinVisualization
                              torsoHeight={
                                selectedConfig.parameters.torsoHeight
                              }
                              shoulderWidth={
                                selectedConfig.parameters.shoulders
                              }
                              bustWidth={
                                selectedConfig.parameters.bust / Math.PI
                              }
                              waistWidth={
                                selectedConfig.parameters.waist / Math.PI
                              }
                              hipWidth={
                                selectedConfig.parameters.hips / Math.PI
                              }
                              neckRadius={
                                selectedConfig.parameters.neck / (2 * Math.PI)
                              }
                              thighWidth={
                                selectedConfig.parameters.thighs / (2 * Math.PI)
                              }
                            />
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="parameters">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(selectedConfig.parameters).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="bg-muted/50 p-3 rounded-md"
                              >
                                <div className="text-sm font-medium capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </div>
                                <div className="text-lg font-semibold">
                                  {value} cm
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/25 px-6 py-4">
                    <div className="flex justify-between w-full">
                      <div className="text-sm text-muted-foreground">
                        {selectedConfig.updatedAt ? (
                          <>Updated: {formatDate(selectedConfig.updatedAt)}</>
                        ) : selectedConfig.createdAt ? (
                          <>Created: {formatDate(selectedConfig.createdAt)}</>
                        ) : null}
                      </div>
                      <Link href="/">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Edit in Dashboard
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="min-h-[400px] flex items-center justify-center">
                  <div className="text-center p-8 text-muted-foreground">
                    <Layers className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <h3 className="text-xl font-medium mb-2">
                      No Model Selected
                    </h3>
                    <p>
                      Select a model from the library to view details and
                      visualization
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Delete confirmation dialog */}
      {configToDelete && (
        <Dialog
          open={!!configToDelete}
          onOpenChange={(open) => !open && setConfigToDelete(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Model</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              Are you sure you want to delete the model "{configToDelete}"? This
              action cannot be undone.
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={() =>
                  configToDelete && deleteConfiguration(configToDelete)
                }
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </SidebarProvider>
  );
}
