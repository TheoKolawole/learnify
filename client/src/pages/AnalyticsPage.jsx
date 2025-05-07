import React, { useState } from 'react';
import * as LucideIcons from "lucide-react";
import { LineChart, BarChart, PieChart, Cell, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie } from 'recharts';

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('month');

  const expenseData = [
    { name: 'Jan', amount: 1800 },
    { name: 'Feb', amount: 2200 },
    { name: 'Mar', amount: 1900 },
    { name: 'Apr', amount: 2400 },
    { name: 'May', amount: 2120 },
    { name: 'Jun', amount: 0 },
    { name: 'Jul', amount: 0 },
    { name: 'Aug', amount: 0 },
    { name: 'Sep', amount: 0 },
    { name: 'Oct', amount: 0 },
    { name: 'Nov', amount: 0 },
    { name: 'Dec', amount: 0 },
  ];

  const incomeData = [
    { name: 'Jan', amount: 3200 },
    { name: 'Feb', amount: 3200 },
    { name: 'Mar', amount: 3500 },
    { name: 'Apr', amount: 3200 },
    { name: 'May', amount: 3200 },
    { name: 'Jun', amount: 0 },
    { name: 'Jul', amount: 0 },
    { name: 'Aug', amount: 0 },
    { name: 'Sep', amount: 0 },
    { name: 'Oct', amount: 0 },
    { name: 'Nov', amount: 0 },
    { name: 'Dec', amount: 0 },
  ];

  const savingsData = [
    { name: 'Jan', amount: 1400 },
    { name: 'Feb', amount: 1000 },
    { name: 'Mar', amount: 1600 },
    { name: 'Apr', amount: 800 },
    { name: 'May', amount: 1080 },
    { name: 'Jun', amount: 0 },
    { name: 'Jul', amount: 0 },
    { name: 'Aug', amount: 0 },
    { name: 'Sep', amount: 0 },
    { name: 'Oct', amount: 0 },
    { name: 'Nov', amount: 0 },
    { name: 'Dec', amount: 0 },
  ];

  const categoryData = [
    { name: 'Housing', value: 1200, color: '#3b82f6' },
    { name: 'Food', value: 430, color: '#10b981' },
    { name: 'Transportation', value: 230, color: '#f59e0b' },
    { name: 'Entertainment', value: 150, color: '#8b5cf6' },
    { name: 'Utilities', value: 110, color: '#ec4899' },
  ];

  const merchantData = [
    { name: 'Amazon', amount: 120, count: 5 },
    { name: 'Starbucks', amount: 45, count: 8 },
    { name: 'Walmart', amount: 95, count: 3 },
    { name: 'Netflix', amount: 15, count: 1 },
    { name: 'Uber', amount: 65, count: 4 },
  ];

  const billForecastData = [
    { name: 'May', amount: 450 },
    { name: 'Jun', amount: 475 },
    { name: 'Jul', amount: 450 },
    { name: 'Aug', amount: 510 },
  ];

  const spendingInsights = [
    {
      title: "Higher grocery spending",
      description: "Your grocery spending is up 15% compared to last month",
      icon: "ShoppingCart",
      type: "warning"
    },
    {
      title: "Savings goal on track",
      description: "You're on track to reach your vacation fund goal by July",
      icon: "CheckCircle2",
      type: "success"
    },
    {
      title: "Restaurant spending decreased",
      description: "You spent $120 less on dining out compared to last month",
      icon: "TrendingDown",
      type: "success"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Financial Analytics</h1>
            <p className="text-muted-foreground mt-1">Track and analyze your financial activity</p>
          </div>
          <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeframe === 'month' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setTimeframe('month')}
            >
              Month
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeframe === 'quarter' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setTimeframe('quarter')}
            >
              Quarter
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeframe === 'year' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setTimeframe('year')}
            >
              Year
            </button>
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Average Monthly Expenses" 
          value="$2,084.00" 
          change="+5.2%" 
          isPositive={false}
          icon="CreditCard" 
        />
        <StatCard 
          title="Average Monthly Income" 
          value="$3,260.00" 
          change="+3.5%" 
          isPositive={true}
          icon="DollarSign" 
        />
        <StatCard 
          title="Average Monthly Savings" 
          value="$1,176.00" 
          change="+1.2%" 
          isPositive={true}
          icon="PiggyBank" 
        />
        <StatCard 
          title="Savings Rate" 
          value="36%" 
          change="-1.5%" 
          isPositive={false}
          icon="Percent" 
        />
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans) */}
        <section className="lg:col-span-2 space-y-6">
          {/* Income vs. Expenses Chart */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300 p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-foreground">Income vs. Expenses</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                  <span className="text-xs text-muted-foreground">Income</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-xs text-muted-foreground">Expenses</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-muted-foreground">Savings</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expenseData.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${value}`} />
                  <Tooltip formatter={(value) => [`$${value}`, '']} />
                  <Line type="monotone" dataKey="amount" name="Expenses" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" data={incomeData.slice(0, 5)} dataKey="amount" name="Income" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" data={savingsData.slice(0, 5)} dataKey="amount" name="Savings" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Spending by Category */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300 p-5">
            <h2 className="text-lg font-semibold text-foreground mb-6">Spending by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Top Categories</h3>
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                        <span className="text-sm text-foreground">{category.name}</span>
                      </div>
                      <div className="text-sm font-medium text-foreground">${category.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Merchants */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Top Merchants</h2>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {merchantData.map((merchant, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <LucideIcons.Store className="w-5 h-5 text-primary" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-foreground">{merchant.name}</h4>
                        <p className="text-xs text-muted-foreground">{merchant.count} transactions</p>
                      </div>
                    </div>
                    <div className="text-foreground font-medium">${merchant.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Right Column */}
        <section className="space-y-6">
          {/* Insights */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Spending Insights</h2>
            </div>
            <div className="p-5 space-y-4">
              {spendingInsights.map((insight, index) => {
                const IconComponent = LucideIcons[insight.icon];
                const bgColor = insight.type === 'success' ? 'bg-green-100' : 'bg-amber-100';
                const textColor = insight.type === 'success' ? 'text-green-500' : 'text-amber-500';
                
                return (
                  <div key={index} className="flex items-start">
                    <div className={`p-2 rounded-lg ${bgColor} dark:bg-opacity-10`}>
                      {IconComponent && <IconComponent className={`w-5 h-5 ${textColor}`} />}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-foreground">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bill Forecast */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Bill Forecast</h2>
            </div>
            <div className="p-5">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={billForecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Expected increase in utility bills during summer months.</p>
              </div>
            </div>
          </div>

          {/* Budget Status */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300 p-5">
            <h2 className="text-lg font-semibold text-foreground mb-4">Monthly Budget Status</h2>
            
            <div className="space-y-4">
              <BudgetItem 
                category="Housing" 
                current={1200} 
                limit={1300} 
                percentage={92} 
                color="#3b82f6" 
              />
              <BudgetItem 
                category="Food & Groceries" 
                current={430} 
                limit={400} 
                percentage={108} 
                color="#10b981" 
                isOverBudget={true}
              />
              <BudgetItem 
                category="Transportation" 
                current={230} 
                limit={300} 
                percentage={77} 
                color="#f59e0b" 
              />
              <BudgetItem 
                category="Entertainment" 
                current={150} 
                limit={200} 
                percentage={75} 
                color="#8b5cf6" 
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Reusing StatCard component from dashboard
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

// Budget status component
function BudgetItem({ category, current, limit, percentage, color, isOverBudget = false }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">{category}</span>
        <span className="text-sm font-medium text-foreground">${current} of ${limit}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : ''}`} 
          style={{ 
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: isOverBudget ? '' : color
          }}
        ></div>
      </div>
      <div className="flex justify-end mt-1">
        <span className={`text-xs ${isOverBudget ? 'text-red-500' : 'text-muted-foreground'}`}>
          {isOverBudget ? 'Over budget' : `${percentage}%`}
        </span>
      </div>
    </div>
  );
}