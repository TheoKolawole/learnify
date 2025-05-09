export default function PendingReview({ title, course, student, submitted, daysWaiting }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{course} - {student}</p>
      </div>
      <div className="text-right">
        <span className="font-medium text-foreground">{submitted}</span>
        <p className={`text-xs mt-1 ${daysWaiting >= 3 ? 'text-red-500' : 'text-muted-foreground'}`}>
          Waiting {daysWaiting} {daysWaiting === 1 ? 'day' : 'days'}
        </p>
      </div>
    </div>
  );
}