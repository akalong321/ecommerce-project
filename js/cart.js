/* * Copyright © 2025 Đậu Việt Long
 * All rights reserved.
 * * Đây là "bộ não" của Trang Giỏ Hàng (cart.html)
 * * PHIÊN BẢN "GIỎ HÀNG THÔNG MINH"
 */

// --- BƯỚC 1: "CHỌN" (Giữ nguyên) ---
const cartContainer = document.querySelector('#cart-items-container');
const cartTotal = document.querySelector('#cart-total');

// --- BƯỚC 2: "CỖ MÁY VẼ GIỎ HÀNG" (NÂNG CẤP "MAX PING") ---
function veGioHang() {

  // 1. [ĐỌC "KÉT SẮT"]
  const cartText = localStorage.getItem('myCart');
  let gioHang;
  if (cartText) {
    gioHang = JSON.parse(cartText);
  } else {
    gioHang = [];
  }

  // 2. Xóa sạch "cái bóng" cũ
  cartContainer.innerHTML = "";

  // 3. [KIỂM TRA GIỎ RỖNG]
  if (gioHang.length === 0) {
    cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
    cartTotal.innerHTML = "";
    return;
  }

  // 4. [TÍNH TỔNG TIỀN]
  let tongTien = 0;

  // 5. [VÒNG LẶP]
  gioHang.forEach(function(sanPham) {

    // 6. [NÂNG CẤP] Lấy cả "soLuong"
    const id = sanPham.id;
    const ten = sanPham.ten;
    const gia = sanPham.gia;
    const anh = sanPham.anh;
    const soLuong = sanPham.soLuong;

    // 7. "Nặn" ra HTML (Thêm "p.quantity")
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    itemDiv.innerHTML = `
      <img src="${anh}" alt="${ten}">
      <h3>${ten}</h3>
      <p class="price">$${gia}</p>

      <p class="quantity">SL: ${soLuong}</p>

      <button class="btn-remove-from-cart" data-id="${id}">Xóa</button>
    `;

    // 8. Gắn "thẻ" vào "vùng chứa"
    cartContainer.appendChild(itemDiv);

    // 9. [NÂNG CẤP] Cộng dồn tiền (NHÂN với số lượng)
    tongTien = tongTien + (gia * soLuong);
  });

  // 10. "Vẽ" Tổng Tiền
  cartTotal.innerHTML = `
    <h3>Tổng tiền: $${tongTien.toFixed(2)}</h3>
  `;

  // 11. Kích hoạt nút "Xóa"
  kichHoatCacNutXoa();
}

// --- BƯỚC 3 & 4 (Hàm Xóa) (Giữ nguyên y hệt) ---
function kichHoatCacNutXoa() {
  const tatCaNutXoa = document.querySelectorAll('.btn-remove-from-cart');

  tatCaNutXoa.forEach(function(nut) {
    nut.addEventListener('click', function(event) {
      const idSanPhamCanXoa = event.target.dataset.id;
      xoaKhoiGioHang(idSanPhamCanXoa);
    });
  });
}

function xoaKhoiGioHang(idCanXoa) {
  let gioHang = JSON.parse(localStorage.getItem('myCart'));

  // [NÂNG CẤP] "Lọc" Mảng (filter)
  const gioHangMoi = gioHang.filter(function(sanPham) {
    return sanPham.id != idCanXoa;
  });

  // [LƯU VÀ VẼ LẠI]
  localStorage.setItem('myCart', JSON.stringify(gioHangMoi));
  veGioHang();
}

// --- BƯỚC 5: CHẠY "BỘ NÃO" LẦN ĐẦU ---
veGioHang();