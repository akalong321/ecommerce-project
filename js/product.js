/* * Copyright © 2025 Đậu Việt Long
 * All rights reserved.
 * * Đây là "bộ não" của Trang Chi Tiết (product.html)
 * * PHIÊN BẢN "GIỎ HÀNG THÔNG MINH"
 */

// --- BƯỚC 1 -> 4 (Giữ nguyên) ---
const API_URL = "https://fakestoreapi.com/products";
const productDetailContainer = document.querySelector('#product-detail-container');

function layIdTuUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  return id;
}

async function goiMotSanPham(id) {
  try {
    const url = `${API_URL}/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    veChiTiet(data);
  } catch (error) {
    console.error("LỖI RỒI:", error);
    productDetailContainer.innerHTML = "<p>Không tải được sản phẩm.</p>";
  }
}

// --- BƯỚC 5: "CỖ MÁY VẼ" (Giữ nguyên) ---
function veChiTiet(sanPham) {
  const ten = sanPham.title;
  const gia = sanPham.price;
  const linkAnh = sanPham.image;
  const moTa = sanPham.description;

  productDetailContainer.innerHTML = `
    <div class="product-detail-image">
      <img src="${linkAnh}" alt="${ten}">
    </div>
    <div class="product-detail-info">
      <h2>${ten}</h2>
      <p class="price">$${gia}</p>
      <p class="description">${moTa}</p>
      <button class="btn-add-to-cart" data-id="${sanPham.id}">Thêm vào giỏ hàng</button>
    </div>
  `;

  // "Kích hoạt" nút
  kichHoatNutThem(sanPham);
}

// --- [NÂNG CẤP "HACK NÃO"] BƯỚC 6: HÀM LƯU "KÉT SẮT" ---
function kichHoatNutThem(sanPham) {
  const nutThem = document.querySelector('.btn-add-to-cart');

  nutThem.addEventListener('click', function() {

    // 1. [ĐỌC "KÉT SẮT"]
    const cartText = localStorage.getItem('myCart');
    let gioHang;
    if (cartText) {
      gioHang = JSON.parse(cartText);
    } else {
      gioHang = [];
    }

    // 2. [TUYỆT KỸ "LÙNG SỤC": .find()]
    //    "Lùng sục" trong "trí nhớ" (gioHang)
    //    để TÌM (find) xem có món nào
    //    có "id" TRÙNG với "id" của sản phẩm vừa bấm
    const sanPhamDaCo = gioHang.find(function(item) {
      return item.id == sanPham.id;
    });

    // 3. [RA QUYẾT ĐỊNH]
    if (sanPhamDaCo) {
      // [QUYẾT ĐỊNH A: ĐÃ CÓ]
      //    Nếu tìm thấy (sanPhamDaCo là "true")
      //    -> Chỉ tăng "soLuong" lên 1
      sanPhamDaCo.soLuong = sanPhamDaCo.soLuong + 1;

    } else {
      // [QUYẾT ĐỊNH B: CHƯA CÓ]
      //    Nếu không tìm thấy (sanPhamDaCo là "undefined")
      //    -> Thêm 1 "đối tượng" MỚI (có 'soLuong: 1')
      const sanPhamMoi = {
        id: sanPham.id,
        ten: sanPham.title,
        gia: sanPham.price,
        anh: sanPham.image,
        soLuong: 1 // [NÂNG CẤP] Lần đầu thêm, số lượng là 1
      };
      gioHang.push(sanPhamMoi);
    }

    // 4. [LƯU VÀO "KÉT SẮT"]
    localStorage.setItem('myCart', JSON.stringify(gioHang));

    // 5. Báo cho người dùng
    alert("Đã thêm/cập nhật sản phẩm!");
  });
}

// --- BƯỚC 7: CHẠY "BỘ NÃO" (Giữ nguyên) ---
const productId = layIdTuUrl();
if (productId) {
  goiMotSanPham(productId);
} else {
  productDetailContainer.innerHTML = "<p>Sản phẩm không hợp lệ!</p>";
}