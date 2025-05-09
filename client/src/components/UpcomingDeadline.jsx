import React from 'react'

export default function UpcomingDeadline({ title, course, dueDate, daysLeft }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{course}</p>
      </div>
      <div className="text-right">
        <span className="font-medium text-foreground">{dueDate}</span>
        <p className={`text-xs mt-1 ${daysLeft <= 3 ? 'text-red-500' : 'text-muted-foreground'}`}>
          {daysLeft} days left
        </p>
      </div>
    </div>
  );
}