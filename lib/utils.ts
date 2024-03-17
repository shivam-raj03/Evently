import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = (error : any) => {
  console.error(error);
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
}

export const dateConverter = (inputDateString: string) => {
  const inputDate: Date = new Date(inputDateString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
    "en-US",
    options
  );
  const formattedDate: string = dateFormatter.format(inputDate);

  return formattedDate;
};

export const timeFormatConverter = (timeString: string) => {
  const [hours, minutes] = timeString.split(':');
  let formattedHours = parseInt(hours, 10);
  const ampm = formattedHours >= 12 ? 'PM' : 'AM';

  formattedHours = formattedHours % 12 || 12;
  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

  return formattedTime;
}