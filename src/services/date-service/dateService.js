export default function formattedDateTime(date) {
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }

  const timeOptions = {
    timeZone: 'Europe/Berlin',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  const formattedDate = date.toLocaleDateString('en-US', dateOptions)
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions)

  return `${formattedDate} ${formattedTime}`
}
