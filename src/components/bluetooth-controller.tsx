"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useBluetooth } from "@/hooks/use-bluetooth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, Bluetooth, Send, X } from "lucide-react";
import { toast } from "sonner";
import { Measurements } from "./device-controller/measurements";

interface BluetoothControllerProps {
  measurements?: Measurements;
}

export function BluetoothController({
  measurements,
}: BluetoothControllerProps = {}) {
  const {
    isAvailable,
    isConnecting,
    isConnected,
    device,
    error,
    connectToDevice,
    disconnectDevice,
    sendData,
  } = useBluetooth();

  const [isSending, setIsSending] = useState(false);

  // Send actual measurements data to the device
  const handleSendData = async () => {
    if (!isConnected) {
      toast.error("Connect to a device first");
      return;
    }

    if (!measurements) {
      toast.error("No measurements available to send");
      return;
    }

    setIsSending(true);

    try {
      // Convert measurements object to array of values for sending
      const measurementValues = Object.values(measurements);
      const success = await sendData(measurementValues);

      if (success) {
        toast.success("Parameters successfully sent to device");
      } else {
        toast.error("Failed to send parameters to device");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Error sending data to device");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bluetooth Connection</CardTitle>
        <CardDescription>
          Connect to a Bluetooth device to send parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isAvailable && (
          <Alert variant="destructive">
            <AlertDescription>
              Web Bluetooth API is not available in this browser. Please use a
              supported browser like Chrome, Edge, or Opera.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bluetooth className="h-5 w-5" />
            <div>
              <div className="font-semibold">
                {device ? device.name : "No Device Connected"}
              </div>
              {device && (
                <div className="text-xs text-muted-foreground">
                  ID: {device.id}
                </div>
              )}
            </div>
          </div>

          <div>
            {isConnected ? (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 hover:bg-green-50"
              >
                Connected
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-500 hover:bg-gray-100"
              >
                Disconnected
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {!isConnected ? (
            <Button
              onClick={connectToDevice}
              disabled={!isAvailable || isConnecting}
              className="flex-1"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Bluetooth className="mr-2 h-4 w-4" />
                  Connect to Device
                </>
              )}
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={disconnectDevice}
                className="flex-1"
              >
                <X className="mr-2 h-4 w-4" />
                Disconnect
              </Button>

              <Button
                onClick={handleSendData}
                disabled={isSending || !measurements}
                className="flex-1"
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Parameters
                  </>
                )}
              </Button>
            </>
          )}
        </div>

        {isConnected && !measurements && (
          <Alert>
            <AlertDescription>
              No measurements available. Adjust parameters in the Standard View
              tab first.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
