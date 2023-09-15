const quantityStitching = [
    [
        [{name: "Sản lượng", showCheckbox: false}],
        [{name: "Nguyên vật liệu", showCheckbox: true}],
        [{name: "Thiếu liệu từ chặt và may vi tính", showCheckbox: true}, {name: "Thiếu liệu từ kho NVL", showCheckbox: true}],
        [{name: "Làm việc với cán bộ liên quan", showCheckbox: false}, {name: "Nhờ sinh quản hối thúc", showCheckbox: false}],
        [{name: "Bộ trưởng", showCheckbox: false}, {name: "Bộ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Máy móc", showCheckbox: true}],
        [{name: "Máy hư", showCheckbox: true}, {name: "Thiếu máy / Linh kiện", showCheckbox: true}],
        [{name: "Yêu cầu bảo trì sửa chữa", showCheckbox: false}, {name: "Yêu cầu sinh quản hỗ trợ", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}, {name: "Bộ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Thiếu người", showCheckbox: true}],
        [{name: "Nghỉ ngẫu nhiên / không kế hoạch", showCheckbox: false}],
        [{name: "Mượn người từ trung tâm điều phối", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}]
    ]
]

const qualityStitching = [
    [
        [{name: "Chất lượng", showCheckbox: false}],
        [{name: "Tinh thần tự kiểm", showCheckbox: true}],
        [{name: "Thao tác kém", showCheckbox: false}],
        [{name: "Đào tạo lại chuyền", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Bỏ mũi", showCheckbox: true}],
        [{name: "Thao tác kém", showCheckbox: false}],
        [{name: "Nhờ kỹ thuật đào tạo", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Méo", showCheckbox: true}],
        [{name: "Thao tác kém", showCheckbox: false}],
        [{name: "Nhờ kỹ thuật đào tạo", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Không cắt chỉ", showCheckbox: true}],
        [{name: "Thao tác kém", showCheckbox: false}],
        [{name: "Nhờ kỹ thuật đào tạo", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Vệ sinh", showCheckbox: true}],
        [{name: "Thao tác kém", showCheckbox: false}],
        [{name: "Nhờ kỹ thuật đào tạo", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Sụp mí", showCheckbox: true}],
        [{name: "Thao tác kém", showCheckbox: false}],
        [{name: "Nhờ kỹ thuật đào tạo", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Nhăn mũi", showCheckbox: true}],
        [{name: "Thao tác kém", showCheckbox: false}],
        [{name: "Nhờ kỹ thuật đào tạo", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Nhăn gót", showCheckbox: true}],
        [{name: "Thao tác kém", showCheckbox: false}],
        [{name: "Nhờ kỹ thuật đào tạo", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Không hiểu thao tác", showCheckbox: true}],
        [{name: "Không hiểu rõ SOP", showCheckbox: false}],
        [{name: "Tổ trưởng đào tạo", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "In lệch", showCheckbox: true}],
        [{name: "In ấn lệch khuôn", showCheckbox: false}],
        [{name: "Nhờ QC hỗ trợ", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}]
    ],
    [
        [{name: "", showCheckbox: false}],
        [{name: "Mặt giày", showCheckbox: true}],
        [{name: "Méo gót, méo mũi, méo ô dê", showCheckbox: false}],
        [{name: "Kiểm tra vô phom, kiểm tra may labang", showCheckbox: false}],
        [{name: "Tổ trưởng", showCheckbox: false}]
    ]
]

export { quantityStitching, qualityStitching }