export const validateEmail = (value: string) =>
  value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const momthTitile = date.toLocaleString("en-us", { month: "short" });
  const day = date.getDate().toString().padStart(2, "0");
  return `${hours}:${minutes} ${day} ${momthTitile}`;
};
