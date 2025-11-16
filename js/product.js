/* * Copyright © 2025 Đậu Việt Long
 * All rights reserved.
 * * Đây là "bộ não" của Trang Chi Tiết (product.html)
 */

// --- BƯỚC 1: "ĐỊA CHỈ NHÀ BẾP" (API) ---
const API_URL = "https://fakestoreapi.com/products"; // (Vẫn là nó)

// --- BƯỚC 2: "CHỌN" VÙNG ĐỂ "VẼ" ---
const productDetailContainer = document.querySelector('#product-detail-container');

// --- BƯỚC 3: [TUYỆT KỸ MỚI] "ĐỌC" ID TỪ URL ---
// Hàm này sẽ "bóc tách" cái ?id=... trên thanh địa chỉ
function layIdTuUrl() {
  // "window.location.search" sẽ lấy phần "?id=..."
  const queryString = window.location.search;

  // "URLSearchParams" là "cỗ máy" bóc tách "thần chú"
  const urlParams = new URLSearchParams(queryString);

  // "urlParams.get('id')" sẽ lấy giá trị của 'id'
  const id = urlParams.get('id');
  return id;
}

// --- BƯỚC 4: "CỖ MÁY GỌI API" (Lần này "gọi" 1 món) ---
async function goiMotSanPham(id) {
  try {
    // "Thần chú" mới: Nối ID vào URL để "gọi" 1 món
    const url = `${API_URL}/${id}`;

    const response = await fetch(url);
    const data = await response.json(); // "data" là 1 ĐỐI TƯỢNG (Object)

    // Đưa ĐỐI TƯỢNG data cho "Cỗ Máy Vẽ"
    veChiTiet(data);

  } catch (error) {
    console.error("LỖI RỒI:", error);
    productDetailContainer.innerHTML = "<p>Không tải được sản phẩm. Vui lòng thử lại!</p>";
  }
}

// --- BƯỚC 5: "CỖ MÁY VẼ CHI TIẾT" ---
function veChiTiet(sanPham) { // 'sanPham' là 1 Object

  // 1. "Bóc tách" data (giống GĐ 1)
  const ten = sanPham.title;
  const gia = sanPham.price;
  const linkAnh = sanPham.image;
  const moTa = sanPham.description;

  // 2. "Vẽ" toàn bộ HTML vào "khu vực"
  productDetailContainer.innerHTML = `
    <div class="product-detail-image">
      <img src="${linkAnh}" alt="${ten}">
    </div>
    <div class="product-detail-info">
      <h2>${ten}</h2>
      <p class="price">$${gia}</p>
      <p class="description">${moTa}</p>

      <button class="btn-add-to-cart">Thêm vào giỏ hàng</button>
    </div>
  `;
}

// --- BƯỚC 6: CHẠY "BỘ NÃO" ---
// 1. Lấy ID "thần thánh" từ URL
const productId = layIdTuUrl();

// 2. Kiểm tra xem có ID không
if (productId) {
  // Nếu CÓ, "gọi" API để lấy món đó
  goiMotSanPham(productId);
} else {
  // Nếu KHÔNG, (ví dụ: ai đó tự gõ product.html)
  productDetailContainer.innerHTML = "<p>Sản phẩm không hợp lệ!</p>";
}