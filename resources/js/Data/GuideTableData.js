const tableData = [
    { rows: 3, columns: 3 },
    { rows: 3, columns: 2 },
    { rows: 3, columns: 3 },
    { rows: 5, columns: 2 },
    { rows: 4, columns: 2 },
    { rows: 3, columns: 4 },
];

const theadData = [
    [
        "Cuộc họp",
        "Thời gian",
        "Thời lượng"
    ],
    [
        "Cuộc họp",
        "Vị trí"
    ],
    [
        "Cuộc họp",
        "Chủ trì",
        "Thành viên tham gia"
    ],
    [
        "Chủ đề",
        "Khái niệm"
    ],
    [
        "Câu hỏi",
        "Mục đích"
    ],
    [
        "Cấp",
        "PIC",
        "Thời gian",
        "Phạm vi"
    ],
];

const tbodyData = [
    [
        [
            "Cấp 1",
            "07:30 - 07:35",
            "5 phút"
        ],
        [
            "Cấp 2",
            "09:00 - 09:07",
            "7 phút"
        ],
        [
            "Cấp 3",
            "10:00 - 10:07",
            "7 phút"
        ],
    ],
    [
        [
            "Cấp 1",
            "Tại chuyền sản xuất"
        ],
        [
            "Cấp 2",
            "Bộ 1: TV chuyền 1 /n Bộ 2: TV chuyền 6, 7 /n Bộ 3: TV chuyền 8, 9"
        ],
        [
            "Cấp 3",
            "Khu vực họp Tier Meeting"
        ],
    ],
    [
        [
            "Cấp 1",
            "Chuyền trưởng",
            "Công nhân",
        ],
        [
            "Cấp 2",
            "Bộ trưởng",
            "Chuyền trưởng và bộ phận hỗ trợ",
        ],
        [
            "Cấp 3",
            "Xưởng trưởng",
            "Bộ trưởng và bộ phận hỗ trợ",
        ],
    ],
    [
        [
            "PPH",
            "Trung bình số đôi sản xuất trong 1 giờ của mỗi người trong ngày"
        ],
        [
            "Phẩm chất",
            "Tỷ kệ RFT hàng ngày"
        ],
        [
            "Giao hàng",
            "Sản lượng thực tế đạt được so với mục tiêu"
        ],
        [
            "Kaizen",
            "Số ý tưởng cải tiến"
        ],
        [
            "An toàn",
            "Số tai nạn lao động"
        ],
    ],
    [
        [
            "Tại sao KPI lại chuyển đỏ?",
            "Xác định vấn đề"
        ],
        [
            "Vấn đề liên quan trực tiếp đến bộ phận? Cá nhân?",
            "Xác định đối tượng và người hỗ trợ"
        ],
        [
            "Vấn đề đã được giải quyết chưa?",
            "Tìm hiểu thực trạng vấn đề"
        ],
        [
            "Nếu chưa, cần hỗ trợ những gì nhằm giải quyết vấn đề?",
            "Xác định nguồn lực và phương hướng xử lý vấn đề"
        ]
    ],
    [
        [
            "1",
            "Chuyền trưởng và các bộ phận liên quan",
            "Vấn đề có thể giải quyết trong 1 ngày",
            "Tại 1 chuyền"
        ],
        [
            "2",
            "Bộ trưởng và các bộ phận liên quan",
            "Vấn đề có thể giải quyết trên 1 ngày",
            "6 chuyền (3 chuyền may và 3 chuyền thành hình)"
        ],
        [
            "3",
            "Xưởng trưởng và các bộ phận liên quan",
            "Vấn đề ảnh hưởng đến đơn hàng, con người",
            "Tất cả chuyền may và thành hình trong 1 xưởng"
        ]
    ],
];

const titleTable = [
    "Thời gian họp",
    "Vị trí họp",
    "Người tham gia",
    "Các chủ đề và KPI",
    "Hướng dẫn đặt câu hỏi",
    "Yêu cầu cuộc họp tăng cấp",
]

export { tableData, theadData, tbodyData, titleTable }