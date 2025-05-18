export const getLast12Months = () => {
    const months = [];
    const currentDate = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    for (let i = 0; i < 12; i++) {
        const date = new Date();
        date.setMonth(currentDate.getMonth() - i);
        months.push({
            label: `${monthNames[date.getMonth()]} ${date.getFullYear()}`, // Ví dụ: March 2024
            month: `${monthNames[date.getMonth()]}`,
            value: date.toISOString().slice(0, 7), // Giữ nguyên format YYYY-MM cho value
        });
    }

    return months.reverse(); // Đảo ngược để hiển thị từ cũ đến mới
};

    // Hàm format ngày thành dạng "March 31st"
export const formatDate = (date, locale = "default") => {
    const day = date.getDate();
    const month = date.toLocaleString(locale, { month: "long" });

    // Xử lý hậu tố cho ngày (st, nd, rd, th)
    const suffixes = ["th", "st", "nd", "rd"];
    const relevantSuffix = (day % 10 <= 3 && day % 10 !== 0 && ![11, 12, 13].includes(day))
        ? suffixes[day % 10]
        : suffixes[0];

    return `${month} ${day}${relevantSuffix}`;
};

export const formatDateTime = (date, locale = "default", monthFormat = "short") => {
    return new Date(date).toLocaleDateString(locale, {
        day: "2-digit",
        month: monthFormat,
        year: "numeric"
      });
}

export const timeAgo = (updatedAt) => {
    const { seconds, nanoseconds } = updatedAt;

    // Chuyển đổi thành milliseconds
    const timestampMs = seconds * 1000 + nanoseconds / 1_000_000;
    const updatedDate = new Date(timestampMs);
    const now = new Date();
    
    // Tính chênh lệch thời gian (milliseconds)
    const diffMs = now - updatedDate;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);

    if (diffMinutes < 60) {
        return `${diffMinutes} phút trước`;
    } else if (diffHours < 24) {
        return `${diffHours} giờ trước`;
    } else if (diffDays < 7) {
        return `${diffDays} ngày trước`;
    } else {
        return `${diffWeeks} tuần trước`;
    }
}


