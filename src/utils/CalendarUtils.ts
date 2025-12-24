export const getMonthIndex = (monthName: string): number => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // Handle partial matches if needed, but exact is safer for now based on JSON
    return months.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
};

export const getDaysInMonth = (year: number, monthIndex: number) => {
    return new Date(year, monthIndex + 1, 0).getDate();
};

export const getStartDayOfWeek = (year: number, monthIndex: number) => {
    return new Date(year, monthIndex, 1).getDay();
};
