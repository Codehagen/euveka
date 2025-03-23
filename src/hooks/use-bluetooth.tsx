"use client";

import { useState, useCallback, useEffect, useRef } from "react";

// TypeScript definitions for Web Bluetooth API
declare global {
  interface Navigator {
    bluetooth?: {
      requestDevice(options: RequestDeviceOptions): Promise<BluetoothDevice>;
    };
  }

  interface BluetoothDevice {
    id: string;
    name: string | null;
    gatt?: BluetoothRemoteGATTServer;
    addEventListener(
      type: "gattserverdisconnected",
      listener: (event: Event) => void
    ): void;
  }

  interface BluetoothRemoteGATTServer {
    connected: boolean;
    connect(): Promise<BluetoothRemoteGATTServer>;
    disconnect(): void;
    getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
  }

  interface BluetoothRemoteGATTService {
    getCharacteristic(
      characteristic: string
    ): Promise<BluetoothRemoteGATTCharacteristic>;
    getCharacteristics(): Promise<BluetoothRemoteGATTCharacteristic[]>;
  }

  interface BluetoothRemoteGATTCharacteristic {
    readValue(): Promise<DataView>;
    writeValue(value: BufferSource): Promise<void>;
  }

  interface RequestDeviceOptions {
    filters?: BluetoothRequestDeviceFilter[];
    optionalServices?: string[];
    acceptAllDevices?: boolean;
  }

  interface BluetoothRequestDeviceFilter {
    services?: string[];
    name?: string;
    namePrefix?: string;
  }
}

interface BluetoothDeviceInfo {
  id: string;
  name: string;
}

interface BluetoothState {
  isAvailable: boolean;
  isConnecting: boolean;
  isConnected: boolean;
  device: BluetoothDeviceInfo | null;
  error: string | null;
}

export interface UseBluetoothReturn extends BluetoothState {
  connectToDevice: () => Promise<void>;
  disconnectDevice: () => void;
  sendData: (data: number[]) => Promise<boolean>;
}

export function useBluetooth(): UseBluetoothReturn {
  const [state, setState] = useState<BluetoothState>({
    isAvailable: false,
    isConnecting: false,
    isConnected: false,
    device: null,
    error: null,
  });

  // Store references to active GATT server and characteristic
  const gattServerRef = useRef<BluetoothRemoteGATTServer | null>(null);
  const characteristicRef = useRef<BluetoothRemoteGATTCharacteristic | null>(
    null
  );

  // Check for Bluetooth availability when component mounts
  useEffect(() => {
    const isBluetoothAvailable = navigator.bluetooth !== undefined;
    setState((prev) => ({ ...prev, isAvailable: isBluetoothAvailable }));

    if (!isBluetoothAvailable) {
      setState((prev) => ({
        ...prev,
        error: "Web Bluetooth API is not available in this browser.",
      }));
    }
  }, []);

  // Handle device disconnection
  const handleDisconnection = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isConnected: false,
      error: "Device disconnected",
    }));
    gattServerRef.current = null;
    characteristicRef.current = null;
  }, []);

  // Connect to a Bluetooth device
  const connectToDevice = useCallback(async () => {
    if (!state.isAvailable || !navigator.bluetooth) {
      setState((prev) => ({
        ...prev,
        error: "Bluetooth is not available in this browser",
      }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, isConnecting: true, error: null }));

      // Request device with a generic service - we'll use a standard service UUID
      // You would replace this with your specific device's service UUID
      const device = await navigator.bluetooth.requestDevice({
        // Accept all devices for testing purposes
        acceptAllDevices: true,
        // If you know your device's services, specify them here
        // filters: [{ services: ['battery_service'] }],
        optionalServices: ["generic_access"],
      });

      // Set up disconnect listener
      device.addEventListener("gattserverdisconnected", handleDisconnection);

      // Connect to GATT server
      const server = await device.gatt?.connect();
      gattServerRef.current = server || null;

      if (server) {
        setState((prev) => ({
          ...prev,
          isConnecting: false,
          isConnected: true,
          device: {
            id: device.id,
            name: device.name || "Unknown Device",
          },
          error: null,
        }));
      }
    } catch (error) {
      console.error("Bluetooth connection error:", error);
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        isConnected: false,
        error: error instanceof Error ? error.message : "Failed to connect",
      }));
    }
  }, [state.isAvailable, handleDisconnection]);

  // Disconnect from the device
  const disconnectDevice = useCallback(() => {
    if (gattServerRef.current?.connected) {
      gattServerRef.current.disconnect();
    }

    setState((prev) => ({
      ...prev,
      isConnected: false,
      device: null,
    }));

    gattServerRef.current = null;
    characteristicRef.current = null;
  }, []);

  // Send data to the device
  const sendData = useCallback(
    async (data: number[]): Promise<boolean> => {
      if (!state.isConnected || !gattServerRef.current) {
        setState((prev) => ({
          ...prev,
          error: "Not connected to any device",
        }));
        return false;
      }

      try {
        // Try to find available services on the device
        console.log("Attempting to send data:", data);

        // List of common services to try
        const serviceUUIDs = [
          "generic_access", // Standard service
          "battery_service", // Standard service
          "device_information", // Standard service
          "0000ffe0-0000-1000-8000-00805f9b34fb", // Common for BLE modules
          "0000ff00-0000-1000-8000-00805f9b34fb", // Common for some devices
        ];

        // Try each service until we find one that works
        for (const serviceUUID of serviceUUIDs) {
          try {
            const service = await gattServerRef.current.getPrimaryService(
              serviceUUID
            );
            console.log(`Found service: ${serviceUUID}`);

            // Try to get characteristics
            const characteristics = await service.getCharacteristics();

            if (characteristics.length > 0) {
              console.log(
                `Found ${characteristics.length} characteristics in service ${serviceUUID}`
              );

              // Try the first characteristic for demo purposes
              characteristicRef.current = characteristics[0];

              // For real implementation, you'd need to find the right characteristic
              // that allows write operations. This is just for testing.

              // Create a buffer from the data
              const buffer = new Uint8Array(data).buffer;

              // Log instead of actually writing for testing
              console.log("Would write data to characteristic:", data);

              // In a real implementation, uncomment the line below:
              // await characteristicRef.current.writeValue(buffer);

              return true;
            }
          } catch (err) {
            // Just try the next service
            console.log(`Service ${serviceUUID} not found or not accessible`);
          }
        }

        setState((prev) => ({
          ...prev,
          error: "No compatible services found on the device",
        }));
        return false;
      } catch (error) {
        console.error("Error sending data:", error);
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Failed to send data",
        }));
        return false;
      }
    },
    [state.isConnected]
  );

  return {
    ...state,
    connectToDevice,
    disconnectDevice,
    sendData,
  };
}
