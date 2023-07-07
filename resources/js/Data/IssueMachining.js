const quantityMachining = [
    [
        [{name: "Sản lượng", showCheckbox: false}],
        [{name: "Thiếu liệu", showCheckbox: true}],
        [{name: "Thiếu đế", showCheckbox: true}, {name: "Thiếu mặt giày", showCheckbox: true}, {name: "Thiếu mặt giày (gia công ngoài)", showCheckbox: true}],
        [{name: "Nhờ sinh quản hối thúc", showCheckbox: false}, {name: "Nhờ chuyền may hỗ trợ", showCheckbox: false}, {name: "Nhờ sinh quản hối thúc", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}, {name: "Tổ trưởng", showCheckbox: false}, {name: "Tổ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Thiếu người", showCheckbox: true}],
        [{name: "Do công nhân nghỉ đột xuất", showCheckbox: false}],
        [{name: "Nhờ bộ phận điều phối", showCheckbox: true}, {name: "Nhờ chuyền khác hỗ trợ", showCheckbox: true}, {name: "Đa năng chuyền thay thế", showCheckbox: true}],
        [{name: "Tổ trưởng", showCheckbox: false}, {name: "Tổ trưởng", showCheckbox: false}, {name: "Trợ lý", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Máy móc", showCheckbox: true}],
        [{name: "Máy hư", showCheckbox: true}, {name: "Thiếu công cụ hỗ trợ", showCheckbox: true}],
        [{name: "Nhờ bảo trì sửa chữa", showCheckbox: false}, {name: "Lên sinh quản lãnh công cụ / Linh kiện", showCheckbox: true}, {name: "Đặt mua linh kiện / công cụ", showCheckbox: true}],
        [{name: "Tổ trưởng", showCheckbox: false}, {name: "Trợ lý", showCheckbox: false}, {name: "6S xưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Kỹ năng", showCheckbox: true}],
        [{name: "Người mới", showCheckbox: false}],
        [{name: "Đào tạo", showCheckbox: false}],
        [{name: "Tổ trưởng / Trợ lý", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Hệ thống", showCheckbox: true}],
        [{name: "Hệ thống bị lỗi", showCheckbox: false}],
        [{name: "Báo trợ lý xưởng hỗ trợ liên hệ IT", showCheckbox: false}],
        [{name: "Trợ lý", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Chuyển đổi hình thể", showCheckbox: true}],
        [{name: "Mất thời gian chuyển đổi", showCheckbox: false}],
        [{name: "Báo sinh quản hỗ trợ", showCheckbox: false}],
        [{name: "Trợ lý", showCheckbox: false}]
    ]
]

const qualityMachining = [
    [
        [{ name: "Chất lượng", showCheckbox: false }],
        [{ name: "Hở keo", showCheckbox: true }],
        [{ name: "Thao tác", showCheckbox: true }, { name: "Nước xử lý không đạt", showCheckbox: true }, { name: "Nhiệt độ máy không đủ", showCheckbox: true }],
        [{ name: "Hướng dẫn lại thao tác", showCheckbox: false }, { name: "Báo cho nhà keo", showCheckbox: false }, { name: "Báo QC đo và chỉnh nhiệt độ", showCheckbox: false }],
        [{ name: "Tổ trưởng", showCheckbox: false }, { name: "Trợ lý", showCheckbox: false }, { name: "Trợ lý", showCheckbox: false }],
    ],
    [
        [{ name: "", showCheckbox: false }],
        [{ name: "Mặt giày", showCheckbox: true }],
        [{ name: "May méo, đứt chỉ", showCheckbox: false }],
        [{ name: "Báo cho chuyền may hỗ trợ", showCheckbox: false }],
        [{ name: "Tổ trưởng / Trợ lý", showCheckbox: false }]
    ],
    [
        [{ name: "", showCheckbox: false }],
        [{ name: "Mài đế", showCheckbox: true }],
        [{ name: "Phẩm chất mài kém", showCheckbox: false }],
        [{ name: "Báo cán bộ mài đế", showCheckbox: false }],
        [{ name: "Tổ trưởng", showCheckbox: false }]
    ]
]

export { quantityMachining, qualityMachining }