import React from 'react';
import * as LucideIcons from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, User!</h1>
            <p className="text-muted-foreground mt-1">Here's an overview of your account</p>
          </div>
          <button className="bg-primary/10 hover:bg-primary/20 text-primary py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
            <LucideIcons.Plus size={16} />
            Quick Action
          </button>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Balance" 
          value="$5,240.00" 
          change="+12.5%" 
          isPositive={true}
          icon="Wallet" 
        />
        <StatCard 
          title="Total Savings" 
          value="$1,840.00" 
          change="+8.2%" 
          isPositive={true}
          icon="PiggyBank" 
        />
        <StatCard 
          title="Monthly Spending" 
          value="$2,120.00" 
          change="-3.1%" 
          isPositive={false}
          icon="CreditCard" 
        />
        <StatCard 
          title="Goal Progress" 
          value="68%" 
          change="+5.3%" 
          isPositive={true}
          icon="Target" 
        />
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed (Left Column) */}
        <section className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          </div>
          <div className="p-5 space-y-5">
            <ActivityItem
              icon="ShoppingBag"
              title="Online Purchase"
              description="Amazon.com"
              amount="-$49.99"
              isExpense={true}
              time="Today, 10:30 AM"
              category="Shopping"
            />
            <ActivityItem
              icon="ArrowDownLeft"
              title="Deposit"
              description="Direct Deposit - Payroll"
              amount="+$1,250.00"
              isExpense={false}
              time="Yesterday"
              category="Income"
            />
            <ActivityItem
              icon="Coffee"
              title="Starbucks"
              description="Coffee Shop"
              amount="-$5.75"
              isExpense={true}
              time="Yesterday"
              category="Food & Drink"
            />
            <ActivityItem
              icon="Home"
              title="Rent Payment"
              description="Automated Payment"
              amount="-$1,200.00"
              isExpense={true}
              time="May 1, 2025"
              category="Housing"
            />
            <ActivityItem
              icon="Utensils"
              title="Restaurant"
              description="Cheesecake Factory"
              amount="-$84.56"
              isExpense={true}
              time="Apr 29, 2025"
              category="Dining"
            />
          </div>
          <div className="p-4 border-t border-border text-center">
            <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              View All Transactions
            </button>
          </div>
        </section>

        {/* Right Sidebar */}
        <section className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4">
              <QuickAction icon="SendHorizonal" title="Send Money" />
              <QuickAction icon="CreditCard" title="Pay Bills" />
              <QuickAction icon="PiggyBank" title="Save" />
              <QuickAction icon="BarChart2" title="Investments" />
            </div>
          </div>

          {/* Upcoming Bills */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Upcoming Bills</h2>
            </div>
            <div className="p-4 space-y-4">
              <UpcomingBill 
                title="Netflix Subscription" 
                amount="$14.99" 
                dueDate="May 15, 2025" 
                daysLeft={9} 
              />
              <UpcomingBill 
                title="Internet Service" 
                amount="$79.99" 
                dueDate="May 18, 2025" 
                daysLeft={12} 
              />
              <UpcomingBill 
                title="Electricity Bill" 
                amount="$135.28" 
                dueDate="May 22, 2025" 
                daysLeft={16} 
              />
            </div>
            <div className="p-4 border-t border-border text-center">
              <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                Manage All Bills
              </button>
            </div>
          </div>

          {/* Savings Goal */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300 p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Vacation Fund</h2>
                <p className="text-muted-foreground text-sm">$2,400 of $3,500</p>
              </div>
              <span className="text-primary font-semibold">68%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">Started: Mar 1</span>
              <span className="text-xs text-muted-foreground">Target: Jul 15</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Component for stat cards
function StatCard({ title, value, change, isPositive, icon }) {
  const IconComponent = LucideIcons[icon];

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-foreground">{value}</h3>
          <span className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
            {isPositive ? <LucideIcons.TrendingUp size={14} className="mr-1" /> : <LucideIcons.TrendingDown size={14} className="mr-1" />}
            {change}
          </span>
        </div>
        <div className="bg-primary/10 p-2 rounded-lg">
          {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
        </div>
      </div>
    </div>
  );
}

// Component for activity items
function ActivityItem({ icon, title, description, amount, isExpense, time, category }) {
  const IconComponent = LucideIcons[icon];

  return (
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${isExpense ? 'bg-red-100' : 'bg-green-100'} dark:bg-opacity-10`}>
        {IconComponent && <IconComponent className={`w-5 h-5 ${isExpense ? 'text-red-500' : 'text-green-500'}`} />}
      </div>
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium text-foreground">{title}</h4>
          <span className={`font-medium ${isExpense ? 'text-red-500' : 'text-green-500'}`}>{amount}</span>
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-sm text-muted-foreground">{description}</p>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            {category}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
}

// Component for quick actions
function QuickAction({ icon, title }) {
  const IconComponent = LucideIcons[icon];

  return (
    <button className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-muted transition-colors duration-200">
      <div className="bg-primary/10 p-3 rounded-lg">
        {IconComponent && <IconComponent className="w-5 h-5 text-primary" />}
      </div>
      <span className="text-sm font-medium text-foreground mt-2">{title}</span>
    </button>
  );
}

// Component for upcoming bills
function UpcomingBill({ title, amount, dueDate, daysLeft }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">Due on {dueDate}</p>
      </div>
      <div className="text-right">
        <span className="font-medium text-foreground">{amount}</span>
        <p className={`text-xs mt-1 ${daysLeft <= 5 ? 'text-red-500' : 'text-muted-foreground'}`}>
          {daysLeft} days left
        </p>
      </div>
    </div>
  );
}