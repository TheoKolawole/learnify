import React, { useState } from 'react';
import * as LucideIcons from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account preferences</p>
          </div>
          <button className="bg-primary/10 hover:bg-primary/20 text-primary py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
            <LucideIcons.Save size={16} />
            Save All Changes
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation (Left Sidebar) */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300 p-4 sticky top-4">
            <nav className="space-y-1">
              <NavItem 
                icon="User" 
                title="Account" 
                active={activeTab === 'account'} 
                onClick={() => setActiveTab('account')} 
              />
              <NavItem 
                icon="Bell" 
                title="Notifications" 
                active={activeTab === 'notifications'} 
                onClick={() => setActiveTab('notifications')} 
              />
              <NavItem 
                icon="Shield" 
                title="Security" 
                active={activeTab === 'security'} 
                onClick={() => setActiveTab('security')} 
              />
              <NavItem 
                icon="CreditCard" 
                title="Billing" 
                active={activeTab === 'billing'} 
                onClick={() => setActiveTab('billing')} 
              />
              <NavItem 
                icon="Palette" 
                title="Appearance" 
                active={activeTab === 'appearance'} 
                onClick={() => setActiveTab('appearance')} 
              />
              <NavItem 
                icon="Languages" 
                title="Language" 
                active={activeTab === 'language'} 
                onClick={() => setActiveTab('language')} 
              />
              <NavItem 
                icon="HelpCircle" 
                title="Help & Support" 
                active={activeTab === 'help'} 
                onClick={() => setActiveTab('help')} 
              />
            </nav>
          </div>
        </div>

        {/* Settings Content (Right Content) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Account Settings (visible when activeTab is 'account') */}
          {activeTab === 'account' && (
            <>
              <SettingsCard title="Personal Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <input 
                      type="text" 
                      defaultValue="John" 
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue="Doe" 
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="john.doe@example.com" 
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <input 
                      type="tel" 
                      defaultValue="(555) 123-4567" 
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard title="Profile Picture">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                      <LucideIcons.User className="w-12 h-12 text-primary" />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                      <LucideIcons.Pencil size={14} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex space-x-3">
                      <button className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm">
                        Upload New Photo
                      </button>
                      <button className="bg-muted hover:bg-muted/80 text-foreground py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm">
                        Remove
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Recommended: Square JPG, PNG, or GIF, at least 400x400 pixels.
                    </p>
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard title="Address Information">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Street Address</label>
                    <input 
                      type="text" 
                      defaultValue="123 Main Street" 
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">City</label>
                      <input 
                        type="text" 
                        defaultValue="New York" 
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">State</label>
                      <input 
                        type="text" 
                        defaultValue="NY" 
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">ZIP Code</label>
                      <input 
                        type="text" 
                        defaultValue="10001" 
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Country</label>
                    <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </SettingsCard>
            </>
          )}

          {/* Notifications Settings (visible when activeTab is 'notifications') */}
          {activeTab === 'notifications' && (
            <SettingsCard title="Notification Preferences">
              <div className="space-y-6">
                <NotificationSetting 
                  title="Email Notifications" 
                  description="Receive account updates, security alerts, and promotional content via email." 
                  enabled={true}
                />
                <NotificationSetting 
                  title="Push Notifications" 
                  description="Get real-time alerts for transactions, bill payments, and account activity." 
                  enabled={true}
                />
                <NotificationSetting 
                  title="SMS Alerts" 
                  description="Receive text messages for account activity and security alerts." 
                  enabled={false}
                />
                <NotificationSetting 
                  title="Marketing Communications" 
                  description="Stay updated on new features, promotions, and special offers." 
                  enabled={false}
                />
                <NotificationSetting 
                  title="Account Summaries" 
                  description="Receive weekly summaries of your account activity and spending." 
                  enabled={true}
                />
              </div>
            </SettingsCard>
          )}

          {/* Security Settings (visible when activeTab is 'security') */}
          {activeTab === 'security' && (
            <>
              <SettingsCard title="Change Password">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Current Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter your current password" 
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">New Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter your new password" 
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                    <input 
                      type="password" 
                      placeholder="Confirm your new password" 
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <button className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm">
                      Update Password
                    </button>
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard title="Two-Factor Authentication">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Enable 2FA</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add an extra layer of security to your account by requiring a verification code.
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      id="toggle-2fa" 
                      className="opacity-0 w-0 h-0" 
                      defaultChecked={true}
                    />
                    <label 
                      htmlFor="toggle-2fa" 
                      className="block overflow-hidden h-6 rounded-full bg-primary cursor-pointer"
                    >
                      <span className="block h-6 w-6 rounded-full bg-white transform translate-x-6 transition-transform"></span>
                    </label>
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard title="Login History">
                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">San Francisco, CA</h4>
                        <p className="text-sm text-muted-foreground mt-1">Chrome on Windows • May 5, 2025 at 2:45 PM</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 py-1 px-2 rounded-full font-medium">Current</span>
                    </div>
                  </div>
                  <div className="border-b border-border pb-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">San Francisco, CA</h4>
                        <p className="text-sm text-muted-foreground mt-1">Safari on iPhone • May 3, 2025 at 8:12 AM</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">New York, NY</h4>
                        <p className="text-sm text-muted-foreground mt-1">Chrome on MacOS • May 1, 2025 at 6:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SettingsCard>
            </>
          )}

          {/* Billing Settings (visible when activeTab is 'billing') */}
          {activeTab === 'billing' && (
            <>
              <SettingsCard title="Payment Methods">
                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <LucideIcons.CreditCard className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-foreground">Visa ending in 4242</h4>
                          <p className="text-sm text-muted-foreground mt-1">Expires 05/2026</p>
                        </div>
                      </div>
                      <span className="text-xs bg-primary/20 text-primary py-1 px-2 rounded-full font-medium">Default</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <LucideIcons.CreditCard className="w-5 h-5 text-red-500" />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-foreground">Mastercard ending in 5678</h4>
                          <p className="text-sm text-muted-foreground mt-1">Expires 11/2025</p>
                        </div>
                      </div>
                      <button className="text-xs text-primary hover:text-primary/80 font-medium">
                        Set as Default
                      </button>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button className="flex items-center text-primary hover:text-primary/80 text-sm font-medium">
                      <LucideIcons.Plus size={16} className="mr-1" />
                      Add Payment Method
                    </button>
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard title="Billing Address">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-foreground">John Doe</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        123 Main Street<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                  <div>
                    <button className="flex items-center text-primary hover:text-primary/80 text-sm font-medium">
                      <LucideIcons.Plus size={16} className="mr-1" />
                      Add Billing Address
                    </button>
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard title="Billing History">
                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Monthly Subscription</h4>
                        <p className="text-sm text-muted-foreground mt-1">May 1, 2025</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-foreground">$19.99</span>
                        <p className="text-xs text-green-500 mt-1">Paid</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-border pb-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Monthly Subscription</h4>
                        <p className="text-sm text-muted-foreground mt-1">Apr 1, 2025</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-foreground">$19.99</span>
                        <p className="text-xs text-green-500 mt-1">Paid</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Monthly Subscription</h4>
                        <p className="text-sm text-muted-foreground mt-1">Mar 1, 2025</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-foreground">$19.99</span>
                        <p className="text-xs text-green-500 mt-1">Paid</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SettingsCard>
            </>
          )}

          {/* Appearance Settings (visible when activeTab is 'appearance') */}
          {activeTab === 'appearance' && (
            <SettingsCard title="Theme Preferences">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-foreground mb-3">Theme Mode</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <ThemeOption title="Light" icon="Sun" selected={true} />
                    <ThemeOption title="Dark" icon="Moon" selected={false} />
                    <ThemeOption title="System" icon="Laptop" selected={false} />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-3">Color Scheme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <ColorOption color="blue" selected={true} />
                    <ColorOption color="purple" selected={false} />
                    <ColorOption color="green" selected={false} />
                    <ColorOption color="orange" selected={false} />
                    <ColorOption color="red" selected={false} />
                    <ColorOption color="gray" selected={false} />
                  </div>
                </div>
              </div>
            </SettingsCard>
          )}

          {/* Language Settings (visible when activeTab is 'language') */}
          {activeTab === 'language' && (
            <SettingsCard title="Language & Region">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Display Language</label>
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese (Simplified)</option>
                    <option>Japanese</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Time Zone</label>
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                    <option>(GMT-07:00) Mountain Time (US & Canada)</option>
                    <option>(GMT-06:00) Central Time (US & Canada)</option>
                    <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                    <option>(GMT) Greenwich Mean Time : London</option>
                    <option>(GMT+01:00) Central European Time</option>
                    <option>(GMT+08:00) China Standard Time</option>
                    <option>(GMT+09:00) Japan Standard Time</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Date Format</label>
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Currency</label>
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                    <option>JPY - Japanese Yen</option>
                    <option>CAD - Canadian Dollar</option>
                    <option>AUD - Australian Dollar</option>
                  </select>
                </div>
              </div>
            </SettingsCard>
          )}

          {/* Help & Support (visible when activeTab is 'help') */}
          {activeTab === 'help' && (
            <>
              <SettingsCard title="Help Center">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Need help with your account? Check out our help resources or contact support.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SupportCard 
                      icon="BookOpen" 
                      title="Documentation" 
                      description="Browse our comprehensive guides and tutorials."
                    />
                    <SupportCard 
                      icon="MessageCircle" 
                      title="Live Chat" 
                      description="Chat with our support team in real-time."
                    />
                    <SupportCard 
                      icon="Mail" 
                      title="Email Support" 
                      description="Send us a message and we'll respond within 24 hours."
                    />
                    <SupportCard 
                      icon="PhoneCall" 
                      title="Phone Support" 
                      description="Call us at (555) 123-4567, Mon-Fri 9AM-5PM ET."
                    />
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard title="Frequently Asked Questions">
                <div className="space-y-4">
                  <FaqItem 
                    question="How do I reset my password?" 
                    answer="To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email to create a new password."
                  />
                  <FaqItem 
                    question="How do I update my payment method?" 
                    answer="You can update your payment method in the Billing section of your Settings. Click on 'Add Payment Method' and follow the prompts to add a new card."
                  />
                  <FaqItem 
                    question="Can I change my username?" 
                    answer="Currently, usernames cannot be changed. However, you can update your display name in your Account Settings."
                  />
                  <FaqItem 
                    question="How do I close my account?" 
                    answer="To close your account, please contact our support team. Note that this action cannot be undone and all your data will be permanently deleted."
                  />
                </div>
              </SettingsCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Component for settings card container
function SettingsCard({ title, children }) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
      <div className="p-5 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}

// Component for navigation items
function NavItem({ icon, title, active, onClick }) {
  const IconComponent = LucideIcons[icon];

  return (
    <button 
      className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors duration-200 ${active ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground'}`}
      onClick={onClick}
    >
      {IconComponent && <IconComponent className="w-5 h-5" />}
      <span className="font-medium">{title}</span>
    </button>
  );
}

// Component for support cards
function SupportCard({ icon, title, description }) {
  const IconComponent = LucideIcons[icon];

  return (
    <div className="bg-background border border-border rounded-lg p-4 hover:border-primary/50 transition-colors duration-200">
      <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
        {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
      </div>
      <h3 className="font-medium text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

// Component for FAQ items
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button 
        className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-foreground">{question}</h3>
        <LucideIcons.ChevronDown 
          className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-muted-foreground text-sm border-t border-border">
          {answer}
        </div>
      )}
    </div>
  );
}

// Component for notification settings
function NotificationSetting({ title, description, enabled }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="relative inline-block w-12 h-6">
        <input 
          type="checkbox" 
          className="opacity-0 w-0 h-0" 
          defaultChecked={enabled}
        />
        <label className={`block overflow-hidden h-6 rounded-full ${enabled ? 'bg-primary' : 'bg-muted'} cursor-pointer`}>
          <span className={`block h-6 w-6 rounded-full bg-white transform ${enabled ? 'translate-x-6' : 'translate-x-0'} transition-transform`}></span>
        </label>
      </div>
    </div>
  );
}

// Component for theme selection options
function ThemeOption({ title, icon, selected }) {
  const IconComponent = LucideIcons[icon];

  return (
    <button className={`flex flex-col items-center justify-center p-4 rounded-lg border ${selected ? 'border-primary bg-primary/10' : 'border-border bg-card hover:bg-muted'} transition-colors duration-200`}>
      {IconComponent && <IconComponent className={`w-6 h-6 ${selected ? 'text-primary' : 'text-foreground'}`} />}
      <span className={`text-sm font-medium mt-2 ${selected ? 'text-primary' : 'text-foreground'}`}>{title}</span>
    </button>
  );
}

// Component for color scheme options
function ColorOption({ color, selected }) {
  const colorMap = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    gray: 'bg-gray-500'
  };
  
  return (
    <button className={`relative w-full aspect-square rounded-lg ${colorMap[color]} transition-all duration-200 ${selected ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
      {selected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LucideIcons.Check className="w-5 h-5 text-white" />
        </div>
      )}
    </button>
  );
}