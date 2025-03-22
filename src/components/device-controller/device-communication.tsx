"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2Icon, SendHorizontalIcon } from "lucide-react";

interface Parameters {
  torsoHeight: number;
  bust: number;
  waist: number;
  hips: number;
  thighs: number;
  shoulders: number;
  neck: number;
}

interface DeviceCommunicationProps {
  measurements?: Parameters;
}

export function DeviceCommunication({
  measurements,
}: DeviceCommunicationProps) {
  const [isSending, setIsSending] = useState(false);

  // Simulate sending parameters to device
  const sendToDevice = () => {
    if (!measurements) {
      toast.error("No measurements available to send");
      return;
    }

    setIsSending(true);

    // Log the measurements that would be sent
    console.log("Sending measurements to device:", measurements);

    setTimeout(() => {
      const isSuccess = Math.random() < 0.8; // 80% success rate

      if (isSuccess) {
        toast.success("Parameters successfully sent to device");
      } else {
        toast.error("Failed to send parameters to device");
      }

      setIsSending(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Device Communication</CardTitle>
        <CardDescription>
          Send the current measurements to the physical mannequin device
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button
          onClick={sendToDevice}
          disabled={isSending || !measurements}
          className="w-full"
          size="lg"
        >
          {isSending ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <SendHorizontalIcon className="mr-2 h-4 w-4" />
              Send to Device
            </>
          )}
        </Button>
        {!measurements && (
          <p className="text-sm text-muted-foreground mt-2">
            No measurements available. Adjust parameters in the main view first.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
