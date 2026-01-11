"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, MapPin, Gamepad2, CreditCard, Shield, Bell, Globe, Save } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  // Profile data
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Gamer",
    email: "john.gamer@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Passionate gamer who enjoys RPGs and action-adventure games. Always looking for the next great gaming experience!",
    username: "john_gamer",
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    promotionalEmails: true,
    gameUpdates: true,
    priceAlerts: false,
    newsletter: true,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showGamesOwned: true,
    showAchievements: true,
    showWishlist: false,
    allowFriendRequests: true,
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const toastId = toast.loading("Updating profile...");
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.dismiss(toastId);
    toast.success("Profile updated successfully!");
    
    setIsLoading(false);
  };

  const handleNotificationsUpdate = () => {
    toast.success("Notification settings updated!");
  };

  const handlePrivacyUpdate = () => {
    toast.success("Privacy settings updated!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="mb-2">
                    <h3 className="font-semibold text-lg">{profileData.firstName} {profileData.lastName}</h3>
                    <p className="text-sm text-muted-foreground">@{profileData.username}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Gamepad2 className="h-4 w-4" />
                    <span>24 Games Owned</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <nav className="space-y-2">
                  <Button
                    variant={activeTab === "profile" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Personal Info
                  </Button>
                  <Button
                    variant={activeTab === "notifications" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button
                    variant={activeTab === "privacy" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("privacy")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Personal Info</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and preferences
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleProfileUpdate}>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="firstName"
                              value={profileData.firstName}
                              onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="lastName"
                              value={profileData.lastName}
                              onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="location"
                              value={profileData.location}
                              onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={profileData.username}
                            onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          rows={4}
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={isLoading} className="gap-2">
                        <Save className="h-4 w-4" />
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Choose what notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive important updates via email
                          </p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked) => {
                            setNotifications(prev => ({ ...prev, emailNotifications: checked }));
                            handleNotificationsUpdate();
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="promotional-emails">Promotional Emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive deals, discounts, and special offers
                          </p>
                        </div>
                        <Switch
                          id="promotional-emails"
                          checked={notifications.promotionalEmails}
                          onCheckedChange={(checked) => {
                            setNotifications(prev => ({ ...prev, promotionalEmails: checked }));
                            handleNotificationsUpdate();
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="game-updates">Game Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about updates for games you own
                          </p>
                        </div>
                        <Switch
                          id="game-updates"
                          checked={notifications.gameUpdates}
                          onCheckedChange={(checked) => {
                            setNotifications(prev => ({ ...prev, gameUpdates: checked }));
                            handleNotificationsUpdate();
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="price-alerts">Price Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when games on your wishlist go on sale
                          </p>
                        </div>
                        <Switch
                          id="price-alerts"
                          checked={notifications.priceAlerts}
                          onCheckedChange={(checked) => {
                            setNotifications(prev => ({ ...prev, priceAlerts: checked }));
                            handleNotificationsUpdate();
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="newsletter">Newsletter</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive our weekly gaming newsletter
                          </p>
                        </div>
                        <Switch
                          id="newsletter"
                          checked={notifications.newsletter}
                          onCheckedChange={(checked) => {
                            setNotifications(prev => ({ ...prev, newsletter: checked }));
                            handleNotificationsUpdate();
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control your privacy and visibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="profile-visibility">Profile Visibility</Label>
                        <Select
                          value={privacy.profileVisibility}
                          onValueChange={(value) => {
                            setPrivacy(prev => ({ ...prev, profileVisibility: value }));
                            handlePrivacyUpdate();
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public (Anyone can view)</SelectItem>
                            <SelectItem value="friends">Friends Only</SelectItem>
                            <SelectItem value="private">Private (Only me)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="show-games">Show Games Owned</Label>
                          <p className="text-sm text-muted-foreground">
                            Display your game collection on your profile
                          </p>
                        </div>
                        <Switch
                          id="show-games"
                          checked={privacy.showGamesOwned}
                          onCheckedChange={(checked) => {
                            setPrivacy(prev => ({ ...prev, showGamesOwned: checked }));
                            handlePrivacyUpdate();
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="show-achievements">Show Achievements</Label>
                          <p className="text-sm text-muted-foreground">
                            Display your gaming achievements
                          </p>
                        </div>
                        <Switch
                          id="show-achievements"
                          checked={privacy.showAchievements}
                          onCheckedChange={(checked) => {
                            setPrivacy(prev => ({ ...prev, showAchievements: checked }));
                            handlePrivacyUpdate();
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="show-wishlist">Show Wishlist</Label>
                          <p className="text-sm text-muted-foreground">
                            Make your wishlist visible to others
                          </p>
                        </div>
                        <Switch
                          id="show-wishlist"
                          checked={privacy.showWishlist}
                          onCheckedChange={(checked) => {
                            setPrivacy(prev => ({ ...prev, showWishlist: checked }));
                            handlePrivacyUpdate();
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="friend-requests">Allow Friend Requests</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow other users to send you friend requests
                          </p>
                        </div>
                        <Switch
                          id="friend-requests"
                          checked={privacy.allowFriendRequests}
                          onCheckedChange={(checked) => {
                            setPrivacy(prev => ({ ...prev, allowFriendRequests: checked }));
                            handlePrivacyUpdate();
                          }}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Account Security</h4>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Manage Payment Methods
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Globe className="mr-2 h-4 w-4" />
                          Connected Accounts
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}