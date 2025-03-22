"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DeviceController } from "@/components/device-controller";
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
import { ConfigurationManager } from "@/components/device-controller/configuration-manager";

export default function Home() {
  const [measurementState, setMeasurementState] = useState<any>(null);

  // This function will be passed to DeviceController to get the current measurement state
  const handleMeasurementsUpdate = (measurements: any) => {
    setMeasurementState(measurements);
  };

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
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-6 pt-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Mannequin Controller</h1>
            <p className="text-muted-foreground">
              Configure mannequin measurements and visualize the result
            </p>
          </div>
          <DeviceController
            onMeasurementsUpdate={handleMeasurementsUpdate}
            configManager={
              <ConfigurationManager measurements={measurementState} />
            }
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
