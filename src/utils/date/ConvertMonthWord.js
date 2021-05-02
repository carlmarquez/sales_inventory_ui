 export const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

export const MonthsWord = (dateTime) => {
    const dateParts = dateTime.split("-");
    const monthsWord = months[dateParts[1]-1]
    return monthsWord + " " + dateParts[2].substr(0,2) + " " + dateParts[0]
}