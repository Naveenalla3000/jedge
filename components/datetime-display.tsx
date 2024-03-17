import React from 'react';

export enum TimeConstrant{
  DAYS = 'days',
  HOURS = 'hours',
  MINUTES= 'minutes',
  SECONDS = 'seconds'
}
interface DateTimeDisplayProps {
  value: number;
  isDanger: boolean;
  type: TimeConstrant
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ value, isDanger,type }) => {
  return (
    <div className={`${isDanger ? 'countdown danger' : 'countdown'}`}>
    <div className="flex items-center">
      <p>{value}</p>
      <span>{type.substring(0,1)}</span>
    </div>
    </div>
  );
};

export default DateTimeDisplay;
