"use client";

import { useState, useEffect, ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MannequinVisualization } from "./mannequin-visualization";
import { ParameterControl } from "./parameter-control";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DEFAULT_MEASUREMENTS,
  MEASUREMENT_RANGES,
  Measurements,
  calculateMannequinDimensions,
} from "./measurements";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { Save, SendHorizontal, Loader2 } from "lucide-react";

interface DeviceControllerProps {
  onMeasurementsUpdate?: (measurements: Measurements) => void;
  configManager?: ReactNode;
}

export function DeviceController({
  onMeasurementsUpdate,
  configManager,
}: DeviceControllerProps) {
  const [parameters, setParameters] =
    useState<Measurements>(DEFAULT_MEASUREMENTS);
  const [isSending, setIsSending] = useState(false);

  // Update a single parameter
  const updateParameter = (key: keyof Measurements, value: number) => {
    setParameters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Report measurements changes to parent component
  useEffect(() => {
    if (onMeasurementsUpdate) {
      onMeasurementsUpdate(parameters);
    }
  }, [parameters, onMeasurementsUpdate]);

  // Calculate mannequin dimensions
  const mannequinDimensions = calculateMannequinDimensions(parameters);

  // Handle sending to device
  const sendToDevice = () => {
    setIsSending(true);
    console.log("Sending measurements to device:", parameters);

    // Simulate network request with random success/failure
    setTimeout(() => {
      const isSuccess = Math.random() < 0.7; // 70% success rate

      if (isSuccess) {
        toast.success("Parameters successfully sent to device");
      } else {
        toast.error("Failed to send parameters to device. Please try again.");
      }

      setIsSending(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Tabs defaultValue="standard" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="standard">Standard View</TabsTrigger>
            <TabsTrigger value="advanced">Advanced View</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save / Load
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Configuration Management</SheetTitle>
                </SheetHeader>
                <div className="mt-6">{configManager}</div>
              </SheetContent>
            </Sheet>

            <Button
              size="sm"
              className="gap-2"
              onClick={sendToDevice}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <SendHorizontal className="h-4 w-4" />
                  Send to Device
                </>
              )}
            </Button>
          </div>
        </div>

        <TabsContent value="standard" className="space-y-6">
          {/* Main Layout - Parameters and Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Parameter Controls */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Device Parameters</CardTitle>
                <CardDescription>
                  Adjust measurements in centimeters
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid gap-5">
                  {Object.entries(MEASUREMENT_RANGES).map(([key, range]) => (
                    <ParameterControl
                      key={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={parameters[key as keyof Measurements]}
                      min={range.min}
                      max={range.max}
                      onChange={(value) =>
                        updateParameter(key as keyof Measurements, value)
                      }
                      description={range.description}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mannequin Visualization */}
            <div className="lg:col-span-3">
              <MannequinVisualization {...mannequinDimensions} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Configuration</CardTitle>
              <CardDescription>
                Fine-tune additional device parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Advanced controls will be available in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
