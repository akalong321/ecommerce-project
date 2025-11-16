/* * Copyright © 2025 Đậu Việt Long
 * All rights reserved.
 * * Đây là "bộ não" của Trang Chủ (index.html)
 */

// --- BƯỚC 1: "ĐỊA CHỈ NHÀ BẾP" (API) ---
// "Nhà bếp" này "xịn" vì không cần API Key
const API_URL = "https://fakestoreapi.com/products";

// --- BƯỚC 2: "CHỌN" VÙNG ĐỂ "VẼ" ---
const productGrid = document.querySelector("#product-grid");

// --- BƯỚC 3: "CỖ MÁY GỌI API" (Giống App Thời Tiết) ---
async function goiSanPham(){
    try {
        const response = await fetch(API_URL);
        const data = await response.json(); // "data" là một MẢNG (Array)

        // Đưa MẢNG data cho "Cỗ Máy Vẽ"
        veSanPham(data);

    } catch (error){
        console.error("LỖI RỒI:", error);
        // (Bạn có thể "vẽ" một thông báo lỗi ra màn hình ở đây)
    }
}
// --- BƯỚC 4: "CỖ MÁY VẼ LƯỚI" (Giống App Recipe) ---
function veSanPham(danhSachSP){ // 'danhSachSP' là MẢNG data
    // 1. Xóa sạch "cái bóng" (nếu có)
    productGrid.innerHTML = "";

    // 2. Dùng VÒNG LẶP (Loop) để duyệt qua MẢNG
    danhSachSP.forEach(function(sanPham){

    // 3. "Bóc tách" data của 1 sản phẩm
    const id = sanPham.id;
    const ten = sanPham.title;
    const gia = sanPham.price;
    const linkAnh = sanPham.image;

    // 4. "Nặn" ra một "Thẻ" (<div>)
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

// 5. "Nhét" HTML vào bên trong "thẻ"
    //    *** CHÚ Ý "TUYỆT KỸ" MỚI Ở DÒNG CUỐI CÙNG ***
    productCard.innerHTML = `
      <img src="${linkAnh}" alt="${ten}">
      <h3>${ten}</h3>
      <p class="price">$${gia}</p>

      <a href="product.html?id=${id}" class="btn-detail">Xem chi tiết</a>
    `;

    // 6. Gắn "thẻ" vào "Lưới"
    productGrid.appendChild(productCard);
  });
}

// --- BƯỚC 5: CHẠY "BỘ NÃO" ---
goiSanPham();