import React from 'react';
import * as LucideIcons from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Profile Header Section */}
      <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary">
              <LucideIcons.User size={48} className="text-primary" />
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
              <LucideIcons.Camera size={16} />
            </button>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-foreground">John Doe</h1>
            <p className="text-muted-foreground mt-1">Account Member since March 2022</p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Premium Member</span>
              <span className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full">Verified</span>
            </div>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
            <LucideIcons.Edit2 size={16} />
            Edit Profile
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <section className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
              <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors flex items-center gap-1">
                <LucideIcons.Edit3 size={14} />
                Edit
              </button>
            </div>
            <div className="p-5 space-y-4">
              <InfoItem icon="Mail" label="Email" value="john.doe@example.com" />
              <InfoItem icon="Phone" label="Phone" value="+1 (555) 123-4567" />
              <InfoItem icon="MapPin" label="Address" value="123 Main Street, Apt 4B, New York, NY 10001" />
              <InfoItem icon="Calendar" label="Date of Birth" value="January 15, 1985" />
              <InfoItem icon="Briefcase" label="Occupation" value="Software Engineer" />
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Account Security</h2>
            </div>
            <div className="p-5 space-y-4">
              <SecurityItem 
                icon="Lock" 
                title="Password" 
                description="Last changed 3 months ago" 
                action="Change"
              />
              <SecurityItem 
                icon="ShieldCheck" 
                title="Two-Factor Authentication" 
                description="Enabled via Authenticator App" 
                action="Manage"
                isEnabled={true}
              />
              <SecurityItem 
                icon="Smartphone" 
                title="Trusted Devices" 
                description="3 devices currently active" 
                action="View"
              />
              <SecurityItem 
                icon="Bell" 
                title="Login Notifications" 
                description="Receive alerts for new logins" 
                action="Configure"
                isEnabled={true}
              />
            </div>
          </div>

          {/* Linked Accounts */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Linked Accounts</h2>
            </div>
            <div className="p-5 space-y-4">
              <LinkedAccount 
                icon="CreditCard" 
                provider="Visa" 
                accountName="**** 5678" 
                status="Primary"
                isConnected={true}
              />
              <LinkedAccount 
                icon="CreditCard" 
                provider="Mastercard" 
                accountName="**** 9012" 
                status="Secondary"
                isConnected={true}
              />
              <LinkedAccount 
                icon="Landmark" 
                provider="Bank of America" 
                accountName="Checking **** 3456" 
                status="Connected"
                isConnected={true}
              />
              <LinkedAccount 
                icon="Paypal" 
                provider="PayPal" 
                accountName="john.doe@example.com" 
                status="Not Connected"
                isConnected={false}
              />
            </div>
          </div>
        </section>

        {/* Right Sidebar */}
        <section className="space-y-6">
          {/* Profile Completion */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-foreground">Profile Completion</h2>
              <span className="text-primary font-semibold">85%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="mt-4">
              <CompletionItem 
                title="Verify phone number" 
                isComplete={true} 
              />
              <CompletionItem 
                title="Set up two-factor authentication" 
                isComplete={true} 
              />
              <CompletionItem 
                title="Add profile picture" 
                isComplete={false} 
              />
              <CompletionItem 
                title="Link bank account" 
                isComplete={true} 
              />
              <CompletionItem 
                title="Complete KYC verification" 
                isComplete={true} 
              />
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
            </div>
            <div className="p-4 space-y-3">
              <NotificationOption 
                title="Email Notifications" 
                description="Updates and account activity" 
                isEnabled={true} 
              />
              <NotificationOption 
                title="Push Notifications" 
                description="Real-time alerts on your device" 
                isEnabled={true} 
              />
              <NotificationOption 
                title="SMS Notifications" 
                description="Text messages for important alerts" 
                isEnabled={false} 
              />
              <NotificationOption 
                title="Marketing Communications" 
                description="Offers and promotions" 
                isEnabled={false} 
              />
            </div>
            <div className="p-4 border-t border-border text-center">
              <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                Manage All Notifications
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Account Actions</h2>
            </div>
            <div className="p-4 space-y-2">
              <ActionButton icon="Download" title="Download Personal Data" />
              <ActionButton icon="ArchiveRestore" title="Request Account History" />
              <ActionButton icon="UserX" title="Deactivate Account" isDangerous={true} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Component for personal information items
function InfoItem({ icon, label, value }) {
  const IconComponent = LucideIcons[icon];

  return (
    <div className="flex items-start">
      <div className="p-2 rounded-lg bg-primary/10">
        {IconComponent && <IconComponent className="w-5 h-5 text-primary" />}
      </div>
      <div className="ml-4 flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

// Component for security items
function SecurityItem({ icon, title, description, action, isEnabled }) {
  const IconComponent = LucideIcons[icon];

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start">
        <div className="p-2 rounded-lg bg-primary/10">
          {IconComponent && <IconComponent className="w-5 h-5 text-primary" />}
        </div>
        <div className="ml-4">
          <div className="flex items-center">
            <h4 className="font-medium text-foreground">{title}</h4>
            {isEnabled && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full dark:bg-green-800/20 dark:text-green-500">
                Enabled
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
        {action}
      </button>
    </div>
  );
}

// Component for linked accounts
function LinkedAccount({ icon, provider, accountName, status, isConnected }) {
  const IconComponent = LucideIcons[icon];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-2 rounded-lg bg-primary/10">
          {IconComponent && <IconComponent className="w-5 h-5 text-primary" />}
        </div>
        <div className="ml-4">
          <h4 className="font-medium text-foreground">{provider}</h4>
          <p className="text-sm text-muted-foreground">{accountName}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className={`text-xs px-2 py-0.5 rounded-full mr-3 ${
          isConnected 
            ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-500' 
            : 'bg-muted text-muted-foreground'
        }`}>
          {status}
        </span>
        <button className={`text-sm font-medium ${
          isConnected 
            ? 'text-red-500 hover:text-red-600' 
            : 'text-primary hover:text-primary/80'
        }`}>
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </div>
    </div>
  );
}

// Component for profile completion items
function CompletionItem({ title, isComplete }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <div className={`p-1 rounded-full mr-2 ${isComplete ? 'bg-green-500' : 'bg-muted'}`}>
          {isComplete ? (
            <LucideIcons.Check size={12} className="text-white" />
          ) : (
            <LucideIcons.Circle size={12} className="text-muted-foreground" />
          )}
        </div>
        <span className={`text-sm ${isComplete ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
          {title}
        </span>
      </div>
      {!isComplete && (
        <button className="text-primary hover:text-primary/80 text-xs font-medium transition-colors">
          Complete
        </button>
      )}
    </div>
  );
}

// Component for notification options
function NotificationOption({ title, description, isEnabled }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="relative inline-block w-10 mr-2 align-middle select-none">
        <div className={`w-10 h-5 rounded-full transition-colors duration-200 ease-in ${isEnabled ? 'bg-primary' : 'bg-muted'}`}>
          <div className={`toggle-dot absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in ${isEnabled ? 'translate-x-5' : 'translate-x-1'} top-0.5`}></div>
        </div>
      </div>
    </div>
  );
}

// Component for account action buttons
function ActionButton({ icon, title, isDangerous }) {
  const IconComponent = LucideIcons[icon];

  return (
    <button className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
      isDangerous 
        ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10' 
        : 'text-foreground hover:bg-muted'
    }`}>
      <span className="font-medium">{title}</span>
      {IconComponent && <IconComponent size={16} />}
    </button>
  );
}