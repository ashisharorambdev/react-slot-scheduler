export const generateTimeSlots = () => {
  const timeSlots = [];
  let currentTime = new Date();
  currentTime.setHours(0, 0, 0, 0); // Start from midnight

  for (let i = 0; i < 48; i++) {
    // 48 time slots for 24 hours with 30-minute intervals
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    timeSlots.push(timeString);
    currentTime.setMinutes(currentTime.getMinutes() + 30); // Add 30 minutes
  }
  return timeSlots;
};

export function groupTimeSlotsByHour(timeSlots) {
  const grouped = {};
  timeSlots.forEach((timeSlot, index) => {
    const hour = timeSlot.split(":")[0];
    if (!grouped[hour]) {
      grouped[hour] = index;
    }
  });
  return grouped;
}
