function getWorkHoursMax(data) {
    // Nhóm dữ liệu theo ngày
    const groupedByDay = data.reduce((acc, curr) => {
        const day = curr.work_day.split(" ")[0];
        if (!acc[day]) acc[day] = [];
        acc[day].push(curr);
        return acc;
    }, {});

    // Tìm thời gian cuối lớn nhất trong từng ngày
    const maxTHourPerDay = Object.entries(groupedByDay).map(([day, group]) => ({
        day,
        maxTHour: Math.max(...group.map(item => parseInt(item.t_hour.replace(":", ""), 10))),
    }));

    // Tìm thời gian lớn nhất trong tất cả các ngày
    const globalMaxTHour = Math.max(...maxTHourPerDay.map(item => item.maxTHour));

    // Lọc ra các ngày có `t_hour` lớn nhất
    const resultDays = maxTHourPerDay
        .filter(item => item.maxTHour === globalMaxTHour)
        .map(item => item.day);

    // Lấy ngày lớn nhất trong các ngày có `t_hour` lớn nhất
    const latestDay = resultDays.sort().pop();

    // Lấy toàn bộ dữ liệu của ngày lớn nhất
    const result = data.filter(item => item.work_day.split(" ")[0] === latestDay);

    return result
}

export default getWorkHoursMax