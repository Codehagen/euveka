"use client";

import { useState } from "react";
import {
  Ruler,
  Scissors,
  Shirt,
  Clock,
  Search,
  Heart,
  PenTool,
  Move,
  ChevronRight,
  ArrowRight,
  Download,
  Send,
  Save,
  Palette,
  Sliders,
  Expand,
  Info,
  MessageCircle,
  Bell,
  Settings,
  User,
  Mail,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { MeasurementCard } from "@/components/custom-ui/measurement-card";
import { SizingCard } from "@/components/custom-ui/sizing-card";
import { ProfileCard } from "@/components/custom-ui/profile-card";
import { EuvekaButton } from "@/components/custom-ui/euveka-button";
import { ColorPicker } from "@/components/custom-ui/color-picker";
import { MannequinControl } from "@/components/custom-ui/mannequin-control";
import {
  EuvekaDialog,
  EuvekaDialogTrigger,
  EuvekaDialogContent,
  EuvekaDialogHeader,
  EuvekaDialogTitle,
  EuvekaDialogDescription,
  EuvekaDialogFooter,
  EuvekaDialogClose,
  useEuvekaDialog,
} from "@/components/custom-ui/euveka-dialog";
import {
  EuvekaBadge,
  EuvekaBadgeWithCounter,
} from "@/components/custom-ui/euveka-badge";
import { DisplayCard } from "@/components/custom-ui/display-card";
import { EuvekaDropdown } from "@/components/custom-ui/euveka-dropdown";
import {
  EuvekaDrawer,
  EuvekaDrawerTrigger,
} from "@/components/custom-ui/euveka-drawer";
import { useToast } from "@/components/custom-ui/euveka-toast";
import Link from "next/link";

function DialogFooterButtons({
  cancelText = "Cancel",
  confirmText = "Save Changes",
  onConfirm = () => {},
  confirmDisabled = false,
}: {
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
}) {
  const { close } = useEuvekaDialog();

  const handleConfirm = () => {
    onConfirm();
    close();
  };

  return (
    <EuvekaDialogFooter>
      <EuvekaButton variant="outline" size="sm" onClick={close}>
        {cancelText}
      </EuvekaButton>
      <EuvekaButton
        variant="primary"
        size="sm"
        onClick={handleConfirm}
        disabled={confirmDisabled}
      >
        {confirmText}
      </EuvekaButton>
    </EuvekaDialogFooter>
  );
}

export default function CustomComponentsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedMultiOptions, setSelectedMultiOptions] = useState<string[]>(
    []
  );
  const [drawerPosition, setDrawerPosition] = useState<
    "left" | "right" | "top" | "bottom"
  >("right");
  const { addToast, removeAllToasts } = useToast();

  const startLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="container mx-auto py-12 space-y-16">
      <div className="flex flex-col space-y-6">
        <div className="self-start">
          <Link href="/">
            <EuvekaButton
              variant="outline"
              size="sm"
              icon={<ArrowLeft className="size-4" />}
            >
              Back to Application
            </EuvekaButton>
          </Link>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Euveka Design System
          </h1>
          <p className="text-muted-foreground">
            Custom components with elegant animations and frosted glass
            aesthetic
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Measurement & Project Cards
          </h2>
          <div className="h-[1px] flex-1 bg-border mx-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Project Cards</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <MeasurementCard
                icon={<Ruler className="size-4" />}
                title="Wedding Dress"
                description="Custom lace wedding gown with embroidery details."
                status="in-progress"
                date="14 FEB, 2025"
              />

              <MeasurementCard
                icon={<Scissors className="size-4" />}
                title="Evening Gown"
                description="Black satin dress with lace detail"
                status="done"
                date="23 SEP, 2024"
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Measurement Cards</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <MeasurementCard
                icon={<Shirt className="size-4" />}
                title="Bust Measurement"
                value="92 CM"
                description="Standard bust circumference"
                date="Updated today"
              />

              <MeasurementCard
                icon={<PenTool className="size-4" />}
                title="Sleeve Length"
                value="65 CM"
                description="Extended sleeve pattern"
                date="Updated yesterday"
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6 col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-medium">Profile Card</h3>
            <ProfileCard
              name="Alice Johnson"
              projects={[
                {
                  id: "1",
                  title: "Wedding dress project",
                  description:
                    "Custom lace wedding gown with embroidery details.",
                  status: "in-progress",
                  date: "14 FEB, 2025",
                },
                {
                  id: "2",
                  title: "Evening Gown",
                  description: "Black satin dress with lace detail",
                  status: "done",
                  date: "23 SEP, 2024",
                },
              ]}
              onProfileClick={() => alert("Profile clicked")}
              onProjectClick={(id) => alert(`Project ${id} clicked`)}
            />
          </div>
        </div>
      </section>

      {/* Measurement Controls Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Measurement Controls
          </h2>
          <div className="h-[1px] flex-1 bg-border mx-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          <SizingCard label="Waist" defaultValue={78} min={60} max={95} />

          <SizingCard label="Bust" defaultValue={92} min={75} max={110} />

          <MannequinControl
            label="Shoulder Width"
            defaultValue={42}
            min={35}
            max={55}
            icon={<Expand className="size-4" />}
          />

          <MannequinControl
            label="Hip Circumference"
            defaultValue={88}
            min={75}
            max={120}
            icon={<Sliders className="size-4" />}
            sectionName="Mannequin Settings"
          />
        </div>
      </section>

      {/* Design Tools Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Design Tools
          </h2>
          <div className="h-[1px] flex-1 bg-border mx-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          <ColorPicker label="Fabric Color" defaultColor="#dbeafe" />

          <ColorPicker
            label="Accent Color"
            defaultColor="#f9fafb"
            colors={[
              "#f9fafb", // White
              "#1f2937", // Dark gray
              "#7f1d1d", // Dark red
              "#0c4a6e", // Dark blue
              "#064e3b", // Dark green
              "#713f12", // Brown
              "#581c87", // Purple
              "#831843", // Pink
              "#1e293b", // Slate
              "#422006", // Dark brown
            ]}
          />
        </div>
      </section>

      {/* Buttons Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Buttons</h2>
          <div className="h-[1px] flex-1 bg-border mx-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Primary</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <EuvekaButton
                variant="primary"
                size="lg"
                icon={<Save className="size-4" />}
                onClick={startLoading}
                isLoading={isLoading}
              >
                Save Project
              </EuvekaButton>

              <EuvekaButton
                variant="primary"
                icon={<ArrowRight className="size-4" />}
                iconPosition="right"
              >
                Continue
              </EuvekaButton>

              <EuvekaButton
                variant="primary"
                size="sm"
                icon={<Download className="size-4" />}
              >
                Export
              </EuvekaButton>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Secondary & Outline</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <EuvekaButton
                variant="secondary"
                icon={<Search className="size-4" />}
              >
                Search
              </EuvekaButton>

              <EuvekaButton
                variant="outline"
                icon={<Heart className="size-4" />}
              >
                Favorite
              </EuvekaButton>

              <EuvekaButton
                variant="ghost"
                icon={<ChevronRight className="size-4" />}
                iconPosition="right"
              >
                View All
              </EuvekaButton>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">States</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <EuvekaButton disabled>Disabled</EuvekaButton>

              <EuvekaButton
                variant="secondary"
                icon={<Send className="size-4" />}
                isLoading={true}
              >
                Sending...
              </EuvekaButton>

              <EuvekaButton variant="outline" size="sm">
                Cancel
              </EuvekaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Dialog Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Dialogs</h2>
          <div className="h-[1px] flex-1 bg-border mx-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Basic Dialog</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <EuvekaDialog>
                <EuvekaDialogTrigger>
                  <EuvekaButton
                    variant="primary"
                    icon={<Info className="size-4" />}
                  >
                    Open Dialog
                  </EuvekaButton>
                </EuvekaDialogTrigger>
                <EuvekaDialogContent>
                  <EuvekaDialogClose />
                  <EuvekaDialogHeader>
                    <EuvekaDialogTitle>
                      Measurement Information
                    </EuvekaDialogTitle>
                    <EuvekaDialogDescription>
                      View details about your mannequin's measurements and make
                      adjustments.
                    </EuvekaDialogDescription>
                  </EuvekaDialogHeader>

                  <div className="py-4">
                    <p className="text-sm text-foreground/90">
                      Your current measurements are within the standard size
                      range. You can make fine adjustments to customize the fit
                      according to your specific requirements.
                    </p>
                    <div className="mt-4 p-3 bg-primary/10 rounded-md text-sm">
                      <p className="font-medium text-primary">
                        Size recommendation:
                      </p>
                      <p className="mt-1">European: 38 | US: 8 | UK: 10</p>
                    </div>
                  </div>

                  <DialogFooterButtons
                    cancelText="Cancel"
                    confirmText="Save Changes"
                    onConfirm={() => {
                      console.log("Saved changes");
                      // Here you would save your changes and then close the dialog
                    }}
                  />
                </EuvekaDialogContent>
              </EuvekaDialog>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Form Dialog</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <EuvekaDialog>
                <EuvekaDialogTrigger>
                  <EuvekaButton
                    variant="secondary"
                    icon={<MessageCircle className="size-4" />}
                  >
                    Contact Support
                  </EuvekaButton>
                </EuvekaDialogTrigger>
                <EuvekaDialogContent className="sm:max-w-[425px]">
                  <EuvekaDialogClose />
                  <EuvekaDialogHeader>
                    <EuvekaDialogTitle>Contact Support</EuvekaDialogTitle>
                    <EuvekaDialogDescription>
                      Fill out the form below to get help from our support team.
                    </EuvekaDialogDescription>
                  </EuvekaDialogHeader>

                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="issue" className="text-sm font-medium">
                        Issue Type
                      </label>
                      <select
                        id="issue"
                        className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm"
                      >
                        <option value="technical">Technical Problem</option>
                        <option value="account">Account Issue</option>
                        <option value="billing">Billing Question</option>
                        <option value="feature">Feature Request</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="min-h-24 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm"
                        placeholder="Describe your issue..."
                      ></textarea>
                    </div>
                  </div>

                  <DialogFooterButtons
                    cancelText="Cancel"
                    confirmText="Submit Request"
                    onConfirm={() => {
                      console.log("Support request submitted");
                      // Here you would submit the form and then close the dialog
                    }}
                  />
                </EuvekaDialogContent>
              </EuvekaDialog>
            </div>
          </div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Badges</h2>
          <div className="h-[1px] flex-1 bg-border mx-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Badge Variants</h3>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <EuvekaBadge variant="primary">Primary</EuvekaBadge>
              <EuvekaBadge variant="secondary">Secondary</EuvekaBadge>
              <EuvekaBadge variant="success">Success</EuvekaBadge>
              <EuvekaBadge variant="warning">Warning</EuvekaBadge>
              <EuvekaBadge variant="danger">Danger</EuvekaBadge>
              <EuvekaBadge variant="neutral">Neutral</EuvekaBadge>
            </div>

            <h3 className="text-xl font-medium mt-8">Badge Sizes</h3>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <EuvekaBadge variant="primary" size="sm">
                Small
              </EuvekaBadge>
              <EuvekaBadge variant="primary" size="md">
                Medium
              </EuvekaBadge>
              <EuvekaBadge variant="primary" size="lg">
                Large
              </EuvekaBadge>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Counter & Dot Badges</h3>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <EuvekaBadgeWithCounter
                label={
                  <EuvekaButton
                    variant="outline"
                    icon={<Bell className="size-4" />}
                  >
                    Notifications
                  </EuvekaButton>
                }
                count={5}
                variant="danger"
              />

              <EuvekaBadgeWithCounter
                label={
                  <EuvekaButton
                    variant="outline"
                    icon={<Mail className="size-4" />}
                  >
                    Messages
                  </EuvekaButton>
                }
                count={99}
                variant="primary"
              />

              <EuvekaBadgeWithCounter
                label={
                  <EuvekaButton
                    variant="outline"
                    icon={<User className="size-4" />}
                  >
                    Profile
                  </EuvekaButton>
                }
                count={3}
                position="bottom-right"
                variant="success"
              />
            </div>

            <h3 className="text-xl font-medium mt-8">Status Dots</h3>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <EuvekaBadge variant="success" dot />
                <span className="text-sm">Online</span>
              </div>

              <div className="flex items-center gap-2">
                <EuvekaBadge variant="warning" dot pulsating />
                <span className="text-sm">Away</span>
              </div>

              <div className="flex items-center gap-2">
                <EuvekaBadge variant="danger" dot />
                <span className="text-sm">Offline</span>
              </div>

              <div className="flex items-center gap-2">
                <EuvekaBadge variant="neutral" dot />
                <span className="text-sm">Unknown</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdowns Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Dropdowns</h2>
          <div className="h-[1px] flex-1 bg-border mx-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Basic Dropdowns</h3>
            <div className="flex flex-col justify-center items-center gap-6 w-full max-w-xs">
              <EuvekaDropdown
                label="Select Fabric Type"
                options={[
                  { value: "cotton", label: "Cotton" },
                  { value: "silk", label: "Silk" },
                  { value: "linen", label: "Linen" },
                  { value: "wool", label: "Wool" },
                  { value: "polyester", label: "Polyester" },
                ]}
                value={selectedOption}
                onChange={(value) => setSelectedOption(value as string)}
                icon={<Shirt className="size-4" />}
                fullWidth
              />

              <EuvekaDropdown
                label="Theme Color"
                options={[
                  {
                    value: "blue",
                    label: "Blue",
                    icon: <div className="size-3 rounded-full bg-blue-500" />,
                  },
                  {
                    value: "red",
                    label: "Red",
                    icon: <div className="size-3 rounded-full bg-red-500" />,
                  },
                  {
                    value: "green",
                    label: "Green",
                    icon: <div className="size-3 rounded-full bg-green-500" />,
                  },
                  {
                    value: "purple",
                    label: "Purple",
                    icon: <div className="size-3 rounded-full bg-purple-500" />,
                  },
                ]}
                value={selectedOption}
                onChange={(value) => setSelectedOption(value as string)}
                variant="secondary"
                fullWidth
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Advanced Dropdowns</h3>
            <div className="flex flex-col justify-center items-center gap-6 w-full max-w-xs">
              <EuvekaDropdown
                label="Search Patterns"
                options={[
                  { value: "a-line", label: "A-line Dress" },
                  { value: "shift", label: "Shift Dress" },
                  { value: "empire", label: "Empire Waist" },
                  { value: "wrap", label: "Wrap Dress" },
                  { value: "bodycon", label: "Bodycon Dress" },
                  { value: "slip", label: "Slip Dress" },
                  { value: "peplum", label: "Peplum Dress" },
                  { value: "tent", label: "Tent Dress" },
                ]}
                value={selectedOption}
                onChange={(value) => setSelectedOption(value as string)}
                searchable
                icon={<Search className="size-4" />}
                fullWidth
              />

              <EuvekaDropdown
                label="Multi-Select Features"
                options={[
                  { value: "pockets", label: "Pockets" },
                  { value: "collar", label: "Collar" },
                  { value: "zipper", label: "Zipper Closure" },
                  { value: "buttons", label: "Button Details" },
                  { value: "pleats", label: "Pleats" },
                  { value: "cuffs", label: "Cuffs" },
                ]}
                value={selectedMultiOptions}
                onChange={(value) => setSelectedMultiOptions(value as string[])}
                multiple
                variant="outline"
                fullWidth
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Dropdown Variations</h3>
            <div className="flex flex-col justify-center items-center gap-6 w-full max-w-xs">
              <div className="grid grid-cols-2 gap-4 w-full">
                <EuvekaDropdown
                  options={[
                    { value: "xs", label: "XS" },
                    { value: "s", label: "S" },
                    { value: "m", label: "M" },
                    { value: "l", label: "L" },
                    { value: "xl", label: "XL" },
                  ]}
                  value={selectedOption}
                  onChange={(value) => setSelectedOption(value as string)}
                  placeholder="Size"
                  size="sm"
                />

                <EuvekaDropdown
                  options={[
                    { value: "eu", label: "EU" },
                    { value: "us", label: "US" },
                    { value: "uk", label: "UK" },
                  ]}
                  value={selectedOption}
                  onChange={(value) => setSelectedOption(value as string)}
                  placeholder="Region"
                  size="sm"
                  variant="outline"
                />
              </div>

              <EuvekaDropdown
                label="Status"
                options={[
                  {
                    value: "draft",
                    label: "Draft",
                    icon: <EuvekaBadge variant="neutral" dot />,
                  },
                  {
                    value: "in-progress",
                    label: "In Progress",
                    icon: <EuvekaBadge variant="warning" dot pulsating />,
                  },
                  {
                    value: "review",
                    label: "In Review",
                    icon: <EuvekaBadge variant="primary" dot />,
                  },
                  {
                    value: "completed",
                    label: "Completed",
                    icon: <EuvekaBadge variant="success" dot />,
                  },
                  {
                    value: "cancelled",
                    label: "Cancelled",
                    icon: <EuvekaBadge variant="danger" dot />,
                  },
                ]}
                value={selectedOption}
                onChange={(value) => setSelectedOption(value as string)}
                error={
                  selectedOption === "" ? "Please select a status" : undefined
                }
                fullWidth
              />
            </div>
          </div>
        </div>
      </section>

      {/* Drawer Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Drawers</h2>
          <div className="h-[1px] flex-1 bg-border mx-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Drawer Positions</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <EuvekaButton
                variant="secondary"
                icon={<ArrowRight className="size-4 -rotate-180" />}
                onClick={() => {
                  setDrawerPosition("left");
                  setIsDrawerOpen(true);
                }}
              >
                Left Drawer
              </EuvekaButton>

              <EuvekaButton
                variant="secondary"
                icon={<ArrowRight className="size-4" />}
                iconPosition="right"
                onClick={() => {
                  setDrawerPosition("right");
                  setIsDrawerOpen(true);
                }}
              >
                Right Drawer
              </EuvekaButton>

              <EuvekaButton
                variant="secondary"
                icon={<ArrowRight className="size-4 -rotate-90" />}
                onClick={() => {
                  setDrawerPosition("top");
                  setIsDrawerOpen(true);
                }}
              >
                Top Drawer
              </EuvekaButton>

              <EuvekaButton
                variant="secondary"
                icon={<ArrowRight className="size-4 rotate-90" />}
                onClick={() => {
                  setDrawerPosition("bottom");
                  setIsDrawerOpen(true);
                }}
              >
                Bottom Drawer
              </EuvekaButton>
            </div>

            <EuvekaDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              position={drawerPosition}
              title="Measurement Tools"
              footer={
                <EuvekaButton
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Apply Changes
                </EuvekaButton>
              }
            >
              <div className="space-y-4">
                <p className="text-sm text-foreground/80">
                  Adjust measurements and settings for your mannequin.
                </p>

                <div className="space-y-3">
                  <SizingCard
                    label="Waist"
                    defaultValue={78}
                    min={60}
                    max={95}
                  />
                  <SizingCard
                    label="Bust"
                    defaultValue={92}
                    min={75}
                    max={110}
                  />
                </div>
              </div>
            </EuvekaDrawer>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Drawer With Trigger</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {/* Tools Drawer */}
              <div className="flex flex-col items-center">
                <DisplayCard
                  icon={<Settings className="size-4" />}
                  title="Design Tools"
                  description="Access all design and measurement tools."
                  width="w-64"
                  height="h-48"
                  footer={
                    <EuvekaDrawerTrigger
                      onClick={() => {
                        setDrawerPosition("right");
                        setIsDrawerOpen(true);
                      }}
                    >
                      <EuvekaButton
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        icon={<Sliders className="size-4" />}
                      >
                        Open Tools
                      </EuvekaButton>
                    </EuvekaDrawerTrigger>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notifications Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Toast Notifications
          </h2>
          <div className="h-[1px] flex-1 bg-border mx-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Notification Types</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <EuvekaButton
                variant="primary"
                icon={<CheckCircle className="size-4" />}
                onClick={() =>
                  addToast({
                    type: "success",
                    message: "Operation successful",
                    description: "Your changes have been saved successfully.",
                  })
                }
              >
                Success Toast
              </EuvekaButton>

              <EuvekaButton
                variant="outline"
                icon={<AlertCircle className="size-4" />}
                onClick={() =>
                  addToast({
                    type: "error",
                    message: "Operation failed",
                    description: "There was an error saving your changes.",
                  })
                }
              >
                Error Toast
              </EuvekaButton>

              <EuvekaButton
                variant="outline"
                icon={<AlertTriangle className="size-4" />}
                onClick={() =>
                  addToast({
                    type: "warning",
                    message: "Warning",
                    description: "This action cannot be undone.",
                  })
                }
              >
                Warning Toast
              </EuvekaButton>

              <EuvekaButton
                variant="outline"
                icon={<Info className="size-4" />}
                onClick={() =>
                  addToast({
                    type: "info",
                    message: "Information",
                    description: "Your session will expire in 5 minutes.",
                  })
                }
              >
                Info Toast
              </EuvekaButton>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl font-medium">Customized Toasts</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <EuvekaButton
                variant="secondary"
                onClick={() =>
                  addToast({
                    type: "success",
                    message: "Measurement saved",
                    description: "Bust measurement updated to 92cm.",
                    duration: 3000,
                  })
                }
              >
                Quick Toast (3s)
              </EuvekaButton>

              <EuvekaButton
                variant="secondary"
                onClick={() =>
                  addToast({
                    type: "info",
                    message: "Important notice",
                    description: "This toast will stay until dismissed.",
                    duration: Infinity,
                  })
                }
              >
                Persistent Toast
              </EuvekaButton>

              <EuvekaButton
                variant="outline"
                className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/30"
                onClick={removeAllToasts}
              >
                Clear All Toasts
              </EuvekaButton>
            </div>

            <div className="mt-4 w-full max-w-md">
              <DisplayCard
                icon={<Bell className="size-4" />}
                iconColor="bg-purple-600"
                title="Update Notifications"
                titleColor="text-purple-600"
                description="Click buttons to see different toast notifications appear."
                width="w-full"
                height="h-auto"
                grayscale={false}
                footer={
                  <div className="flex gap-2 mt-3">
                    <EuvekaButton
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        addToast({
                          type: "success",
                          message: "Profile updated",
                          description:
                            "Your profile information has been updated successfully.",
                        })
                      }
                    >
                      Update Profile
                    </EuvekaButton>
                    <EuvekaButton
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        addToast({
                          type: "success",
                          message: "Settings saved",
                          description:
                            "Your notification preferences have been saved.",
                        })
                      }
                    >
                      Save Settings
                    </EuvekaButton>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
