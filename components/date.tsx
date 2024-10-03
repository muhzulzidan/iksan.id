import { parseISO, format } from 'date-fns'

interface DateProps {
  dateString: string;
}

const DateComponent: React.FC<DateProps> = ({ dateString }) => {
  const date = dateString ? parseISO(dateString.split('T')[0]) : null;
console.log(date)
  return (
    <time dateTime={dateString}>
      {date && format(date as Date, 'LLLL d, yyyy')}
    </time>
  );
}

export default DateComponent;
