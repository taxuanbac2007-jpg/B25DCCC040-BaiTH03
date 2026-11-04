# B25DCCC040 - BaiTH03 (ShopMini)

## Giải trình cách quản lý trạng thái 

Trong dự án ShopMini, mã nguồn sử dụng kết hợp 3 phương pháp quản lý state (trạng thái) để tối ưu hóa hiệu suất, đảm bảo tính dễ bảo trì và mở rộng code:

### 1. `useState` (Quản lý trạng thái cục bộ)
- **Dữ liệu lưu trữ:** 
  - Giá trị của các ô input (ví dụ: nội dung ô tìm kiếm sản phẩm, form nhập thông tin đăng nhập/đăng ký).
  - Trạng thái các phần tử UI hiển thị tạm thời (ví dụ: cờ `isOpen` để ẩn/hiện modal, đóng/mở menu dropdown).
- **Lý do lựa chọn:** Đây là những trạng thái mang tính chất cục bộ (local), chỉ có ý nghĩa và vòng đời bên trong chính component đó. Việc sử dụng `useState` giúp xử lý nhanh, gọn nhẹ mà không cần thiết phải đẩy lên global, tránh việc các component khác bị re-render không cần thiết.

### 2. `Context API` (Quản lý trạng thái toàn cục ít thay đổi)
- **Dữ liệu lưu trữ:** 
  - Trạng thái giao diện sáng/tối (Dark/Light Mode).
  - Trạng thái xác thực người dùng (thông tin user đang đăng nhập).
- **Lý do lựa chọn:** Các thông tin này cần được chia sẻ cho rất nhiều component ở các cấp khác nhau (Header cần biết user đã đăng nhập chưa, thẻ bao bọc ngoài cùng cần biết là Dark hay Light mode) nên dùng Context để tránh tình trạng truyền props quá sâu (prop drilling). Hơn nữa, dữ liệu này ít khi bị cập nhật liên tục, nên Context API là lựa chọn nhẹ nhàng và tối ưu nhất.

### 3. `Redux` (Quản lý trạng thái toàn cục phức tạp)
- **Dữ liệu lưu trữ:** 
  - Trạng thái Giỏ hàng: Danh sách các sản phẩm đang có trong giỏ, số lượng từng sản phẩm, tính toán tổng tiền thanh toán.
  - Bộ nhớ đệm danh sách sản phẩm lấy từ API.
- **Lý do lựa chọn:** Giỏ hàng là một trạng thái rất phức tạp, liên tục bị thay đổi (các action: thêm vào giỏ, giảm số lượng, xóa sản phẩm) và được gọi ở nhiều nơi (icon giỏ hàng trên Header, trang chi tiết giỏ, trang thanh toán). Redux giúp luồng dữ liệu (data flow) trở nên thống nhất, an toàn, dễ dàng debug qua Redux DevTools và quản lý các logic tính toán (reducer) tách biệt hoàn toàn khỏi phần giao diện.
