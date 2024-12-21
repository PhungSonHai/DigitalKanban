function calculateTotalWorkHours(data) {
    const padTime = time => {
        return time
            .split(':')
            .map(unit => unit.padStart(2, '0'))
            .join(':');
    };

    let totalHours = 0;

    data.forEach(item => {
        const f_hour = padTime(item.f_hour);
        const t_hour = padTime(item.t_hour);

        const startTime = new Date(`${item.work_day.split(' ')[0]}T${f_hour}`);
        const endTime = new Date(`${item.work_day.split(' ')[0]}T${t_hour}`);

        if (!isNaN(startTime) && !isNaN(endTime)) {
            const hoursWorked = (endTime - startTime) / (1000 * 60 * 60);
            totalHours += hoursWorked;
        } else {
            console.error("Không thể phân tích thời gian:", f_hour, t_hour);
        }
    });

    return totalHours.toFixed(1);
}

export default calculateTotalWorkHours