function generateTimeSlots(startTime, endTime) {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const timeSlots = [];

    while (start < end) {
        const next = new Date(start.getTime() + 60 * 60 * 1000); // +1 giờ

        // Nếu next vượt quá end, thì lấy end làm giới hạn cuối cùng
        const formattedNext = next > end ? end : next;

        const timeSlot = `${formatTime(start)}-${formatTime(formattedNext)}`;
        timeSlots.push(timeSlot);

        start.setTime(formattedNext.getTime());
    }

    return timeSlots;


    // --- old ---
    // const start = new Date(`1970-01-01T${startTime}:00`);
    // const end = new Date(`1970-01-01T${endTime}:00`);
    // const timeSlots = [];

    // while (start < end) {
    //     let next;
    //     // Nếu khung giờ là "10:30", tăng 1 giờ 30 phút
    //     if (start.toTimeString().slice(0, 5) === "10:30") {
    //         next = new Date(start.getTime() + 90 * 60 * 1000); // 1 giờ 30 phút
    //     } 
    //     // Nếu khung giờ là "12:00", tăng 1 giờ 30 phút
    //     else if (start.toTimeString().slice(0, 5) === "12:00") {
    //         next = new Date(start.getTime() + 90 * 60 * 1000); // 1 giờ 30 phút
    //     } 
    //     // Tăng 1 giờ cho các trường hợp còn lại
    //     else {
    //         next = new Date(start.getTime() + 60 * 60 * 1000); // 1 giờ
    //     }

    //     // Đảm bảo khung thời gian không kết thúc trước `endTime`
    //     if (next > end && next.getTime() - start.getTime() < 60 * 60 * 1000) {
    //         next.setTime(end.getTime() + 60 * 60 * 1000); // Bảo đảm cách nhau đúng 1 giờ
    //     }

    //     // Format khung thời gian và thêm vào mảng
    //     const timeSlot = `${start.toTimeString().slice(0, 5)}-${next.toTimeString().slice(0, 5)}`;
    //     timeSlots.push(timeSlot);

    //     // Cập nhật thời gian bắt đầu
    //     start.setTime(next.getTime());
    // }

    // return timeSlots;
}

function formatTime(date) {
    return date.toTimeString().slice(0, 5);
}

export default generateTimeSlots