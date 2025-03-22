"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Save, Trash2Icon, LoaderIcon, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface ConfigurationManagerProps {
  parameters?: Parameters;
  measurements?: Parameters;
  onLoadConfiguration?: (parameters: Parameters) => void;
}

export function ConfigurationManager({
  parameters,
  measurements,
  onLoadConfiguration,
}: ConfigurationManagerProps) {
  const [saveName, setSaveName] = useState("");
  const [savedSets, setSavedSets] = useState<ParameterSet[]>([]);
  const [configToDelete, setConfigToDelete] = useState<string | null>(null);
  const [configToEdit, setConfigToEdit] = useState<ParameterSet | null>(null);
  const [newName, setNewName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null);

  // Use either parameters or measurements, with parameters taking precedence
  const currentParameters = parameters || measurements;

  // Load saved sets from localStorage on component mount
  useEffect(() => {
    try {
      const storedSets = localStorage.getItem("deviceParameters");
      if (storedSets) {
        setSavedSets(JSON.parse(storedSets));
      }
    } catch (error) {
      console.error("Failed to load saved sets:", error);
      toast.error("Failed to load saved configurations");
    }
  }, []);

  // Save current parameters as a new configuration
  const saveParameters = () => {
    if (!saveName.trim()) {
      toast.error("Please enter a name for this configuration");
      return;
    }

    if (!currentParameters) {
      toast.error("No measurements available to save");
      return;
    }

    setIsSaving(true);

    try {
      const newSet: ParameterSet = {
        name: saveName,
        parameters: { ...currentParameters },
        createdAt: new Date().toISOString(),
      };

      // Check if a set with this name already exists
      const existingSetIndex = savedSets.findIndex(
        (set) => set.name === saveName
      );

      let updatedSets: ParameterSet[];
      if (existingSetIndex >= 0) {
        // Update existing set
        updatedSets = [...savedSets];
        updatedSets[existingSetIndex] = {
          ...newSet,
          createdAt: savedSets[existingSetIndex].createdAt,
          updatedAt: new Date().toISOString(),
        };
        toast.success("Configuration updated");
      } else {
        // Add new set
        updatedSets = [...savedSets, newSet];
        toast.success("Configuration saved");
      }

      setSavedSets(updatedSets);
      localStorage.setItem("deviceParameters", JSON.stringify(updatedSets));
      setSaveName("");

      setTimeout(() => setIsSaving(false), 500);
    } catch (error) {
      console.error("Failed to save parameters:", error);
      toast.error("Failed to save configuration");
      setIsSaving(false);
    }
  };

  // Update an existing configuration with current parameters
  const updateExistingConfiguration = () => {
    if (!selectedConfig) {
      toast.error("Please select a configuration to update");
      return;
    }

    if (!currentParameters) {
      toast.error("No measurements available to save");
      return;
    }

    setIsSaving(true);

    try {
      const updatedSets = savedSets.map((set) =>
        set.name === selectedConfig
          ? {
              ...set,
              parameters: { ...currentParameters },
              updatedAt: new Date().toISOString(),
            }
          : set
      );

      setSavedSets(updatedSets);
      localStorage.setItem("deviceParameters", JSON.stringify(updatedSets));
      toast.success(`Configuration "${selectedConfig}" updated`);

      setTimeout(() => setIsSaving(false), 500);
    } catch (error) {
      console.error("Failed to update configuration:", error);
      toast.error("Failed to update configuration");
      setIsSaving(false);
    }
  };

  // Load a saved parameter set
  const loadParameters = (setName: string) => {
    const selectedSet = savedSets.find((set) => set.name === setName);
    if (selectedSet && onLoadConfiguration) {
      onLoadConfiguration(selectedSet.parameters);
      setSelectedConfig(setName);
      toast.info(`Loaded configuration: ${setName}`);
    } else if (selectedSet) {
      setSelectedConfig(setName);
      toast.info(
        `Configuration "${setName}" selected, but no load handler provided`
      );
    }
  };

  // Delete a configuration
  const deleteConfiguration = (name: string) => {
    try {
      const updatedSets = savedSets.filter((set) => set.name !== name);
      setSavedSets(updatedSets);
      localStorage.setItem("deviceParameters", JSON.stringify(updatedSets));

      if (selectedConfig === name) {
        setSelectedConfig(null);
      }

      toast.success(`Configuration "${name}" deleted`);
      setConfigToDelete(null);
    } catch (error) {
      console.error("Failed to delete configuration:", error);
      toast.error("Failed to delete configuration");
    }
  };

  // Update configuration name
  const updateConfigName = () => {
    if (!configToEdit || !newName.trim()) return;

    try {
      const updatedSets = savedSets.map((set) =>
        set.name === configToEdit.name ? { ...set, name: newName } : set
      );

      if (selectedConfig === configToEdit.name) {
        setSelectedConfig(newName);
      }

      setSavedSets(updatedSets);
      localStorage.setItem("deviceParameters", JSON.stringify(updatedSets));
      toast.success(`Configuration renamed to "${newName}"`);
      setConfigToEdit(null);
      setNewName("");
    } catch (error) {
      console.error("Failed to update configuration name:", error);
      toast.error("Failed to rename configuration");
    }
  };

  // Format date string for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="space-y-1 pb-3">
        <CardTitle>Configurations</CardTitle>
        <CardDescription>
          Save and load device measurement configurations
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <Tabs defaultValue="load" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="save">Save New</TabsTrigger>
            <TabsTrigger value="load">Load Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="save" className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Configuration name"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveParameters();
                }}
              />
              <Button
                onClick={saveParameters}
                className="min-w-[80px]"
                disabled={isSaving || !saveName.trim()}
              >
                {isSaving ? (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" /> Save
                  </>
                )}
              </Button>
            </div>

            {selectedConfig && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Current Selection</div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8"
                    onClick={updateExistingConfiguration}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <LoaderIcon className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" /> Update
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-muted/50 rounded-md p-2">
                  <div className="font-medium">{selectedConfig}</div>
                  <div className="text-xs text-muted-foreground">
                    Use the Update button to save changes to this configuration
                  </div>
                </div>
              </div>
            )}

            {savedSets.length > 0 && (
              <div className="pt-2">
                <div className="text-sm font-medium mb-2">Recently Saved</div>
                <div className="flex flex-wrap gap-2">
                  {savedSets
                    .slice(-3)
                    .reverse()
                    .map((set) => (
                      <Badge
                        key={set.name}
                        variant="outline"
                        className={`flex items-center gap-1 py-1 cursor-pointer hover:bg-accent ${
                          selectedConfig === set.name
                            ? "border-primary bg-primary/10"
                            : ""
                        }`}
                        onClick={() => loadParameters(set.name)}
                      >
                        {set.name}
                        {set.updatedAt ? (
                          <span className="text-xs text-muted-foreground ml-1">
                            (updated: {formatDate(set.updatedAt)})
                          </span>
                        ) : set.createdAt ? (
                          <span className="text-xs text-muted-foreground ml-1">
                            ({formatDate(set.createdAt)})
                          </span>
                        ) : null}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="load" className="max-h-[300px] overflow-auto">
            {savedSets.length > 0 ? (
              <div className="space-y-2">
                {savedSets.map((set) => (
                  <div
                    key={set.name}
                    className={`flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors ${
                      selectedConfig === set.name
                        ? "bg-primary/10 border border-primary/50"
                        : ""
                    }`}
                  >
                    <div className="flex-1">
                      <div
                        className="text-sm font-medium cursor-pointer hover:underline"
                        onClick={() => loadParameters(set.name)}
                      >
                        {set.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {set.updatedAt ? (
                          <>Updated: {formatDate(set.updatedAt)}</>
                        ) : set.createdAt ? (
                          <>Created: {formatDate(set.createdAt)}</>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => {
                          setConfigToEdit(set);
                          setNewName(set.name);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                          >
                            <Trash2Icon className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Delete Configuration</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            Are you sure you want to delete the configuration "
                            {set.name}"? This action cannot be undone.
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              variant="destructive"
                              onClick={() => deleteConfiguration(set.name)}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No saved configurations</p>
                <p className="text-sm mt-1">
                  Save a configuration to see it here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Edit configuration name dialog */}
      {configToEdit && (
        <Dialog
          open={!!configToEdit}
          onOpenChange={(open) => !open && setConfigToEdit(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Rename Configuration</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="New configuration name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") updateConfigName();
                }}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={updateConfigName}
                disabled={!newName.trim() || newName === configToEdit.name}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
