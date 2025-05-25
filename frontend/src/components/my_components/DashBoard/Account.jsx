import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { User, Mail, Lock, Shield, Bell, Eye, EyeOff } from "lucide-react";

function Account() {
  const [showPassword, setShowPassword] = useState(false);
  const [wantsToChangePassword, setWantsToChangePassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    currentPassword: "********",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Account Settings
        </h2>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Profile Information */}
        <motion.div variants={itemVariants}>
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-12 pl-10"
                  />
                </div>
              </div>
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div variants={itemVariants}>
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    readOnly
                    className="h-12 pl-10 pr-10 bg-secondary/20"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-10 w-10 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Change Password</p>
                  <p className="text-sm text-muted-foreground">
                    Update your account password
                  </p>
                </div>
                <Switch
                  checked={wantsToChangePassword}
                  onCheckedChange={setWantsToChangePassword}
                />
              </div>

              {wantsToChangePassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={(e) =>
                        handleInputChange("newPassword", e.target.value)
                      }
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="h-12"
                    />
                  </div>
                </motion.div>
              )}

              <Button
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={!wantsToChangePassword}
              >
                {wantsToChangePassword
                  ? "Update Password"
                  : "Password Protected"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">
                      Bid Notifications
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you're outbid
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">
                      Auction Ending
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Alerts for auctions ending soon
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">New Auctions</p>
                    <p className="text-sm text-muted-foreground">
                      Notify about new auction listings
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Email Digest</p>
                    <p className="text-sm text-muted-foreground">
                      Weekly summary of your activity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Account;
