// Chờ cho toàn bộ nội dung trang được tải xong
document.addEventListener('DOMContentLoaded', () => {

    // --- CODE MỚI ĐỂ BẬT NHẠC ---
    const music = document.getElementById('myMusic');
    
    // Thử phát nhạc ngay lập tức
    let playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Tự động phát thành công!
            console.log("Nhạc tự động phát thành công.");
        }).catch(error => {
            // Tự động phát thất bại
            console.log("Tự động phát bị chặn, chờ người dùng click...");
            
            // Thêm một thông báo nhỏ (TÙY CHỌN)
            const clickPrompt = document.createElement('div');
            clickPrompt.innerHTML = 'Nhấp vào bất kỳ đâu để bật nhạc ❤️';
            clickPrompt.style = 'position:fixed; top:10px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.5); color:white; padding:10px 20px; border-radius:10px; z-index:1000; font-family: Montserrat; cursor: pointer;';
            document.body.appendChild(clickPrompt);

            // Chờ người dùng click vào bất cứ đâu trên trang
            document.body.addEventListener('click', () => {
                music.play();
                // Ẩn thông báo đi sau khi click
                if (document.body.contains(clickPrompt)) {
                    document.body.removeChild(clickPrompt);
                }
            }, { once: true }); // { once: true } nghĩa là nó chỉ chạy 1 lần
        });
    }
    // --- KẾT THÚC CODE MỚI ---


    // --- CÀI ĐẶT CÁC MỐC THỜI GIAN ---
    const relationshipStartDate = new Date('2025-07-15T00:00:00'); // Ngày bắt đầu yêu
    const targetAnniversaryDate = new Date('2025-11-15T00:00:00'); // Ngày kỷ niệm để đếm ngược TỚI

    // --- LẤY CÁC KHỐI GIAO DIỆN ---
    const countdownContainer = document.getElementById('countdown');
    const loveCounterContainer = document.getElementById('love-counter');

    // --- LẤY CÁC Ô SỐ (ĐẾM NGƯỢC) ---
    const countdownDaysEl = document.getElementById('countdown-days');
    const countdownHoursEl = document.getElementById('countdown-hours');
    const countdownMinutesEl = document.getElementById('countdown-minutes');
    const countdownSecondsEl = document.getElementById('countdown-seconds');

    // --- LẤY CÁC Ô SỐ (ĐẾM LÊN) ---
    const loveDaysEl = document.getElementById('love-days');
    const loveHoursEl = document.getElementById('love-hours');
    const loveMinutesEl = document.getElementById('love-minutes');
    const loveSecondsEl = document.getElementById('love-seconds');

    // Hàm tiện ích: Thêm số 0 phía trước nếu số < 10
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // --- HÀM CẬP NHẬT CHÍNH (CHẠY MỖI GIÂY) ---
    function updateTimers() {
        const now = new Date(); // Lấy thời gian hiện tại

        // Tính khoảng cách đến ngày kỷ niệm (để xem nên đếm ngược hay đếm lên)
        const diffToAnniversary = targetAnniversaryDate.getTime() - now.getTime();

        if (diffToAnniversary > 0) {
            // --- CHẾ ĐỘ 1: ĐẾM NGƯỢC (vẫn chưa tới ngày 15/11/2025) ---
            
            // Ẩn/hiện đúng đồng hồ
            if (countdownContainer.style.display !== 'block') {
                countdownContainer.style.display = 'block';
                // Cập nhật lại tiêu đề (nếu cần)
                countdownContainer.querySelector('.timer-title').textContent = "Ngày 15/11/2025 Sắp Đến...";
            }
            if (loveCounterContainer.style.display !== 'none') {
                loveCounterContainer.style.display = 'none';
            }

            // Tính toán đếm ngược
            const d = Math.floor(diffToAnniversary / (1000 * 60 * 60 * 24));
            const h = Math.floor((diffToAnniversary % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diffToAnniversary % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diffToAnniversary % (1000 * 60)) / 1000);

            // Cập nhật lên HTML
            countdownDaysEl.textContent = d;
            countdownHoursEl.textContent = formatTime(h);
            countdownMinutesEl.textContent = formatTime(m);
            countdownSecondsEl.textContent = formatTime(s);

        } else {
            // --- CHẾ ĐỘ 2: ĐẾM LÊN (đã từ ngày 15/11/2025 trở đi) ---

            // Ẩn/hiện đúng đồng hồ
            if (countdownContainer.style.display !== 'none') {
                countdownContainer.style.display = 'none';
            }
            if (loveCounterContainer.style.display !== 'block') {
                loveCounterContainer.style.display = 'block';
            }

            // Tính toán đếm LÊN từ ngày bắt đầu
            const diffSinceStart = now.getTime() - relationshipStartDate.getTime();

            // Chuyển đổi
            const d = Math.floor(diffSinceStart / (1000 * 60 * 60 * 24));
            const h = Math.floor((diffSinceStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diffSinceStart % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diffSinceStart % (1000 * 60)) / 1000);

            // Cập nhật lên HTML
            loveDaysEl.textContent = d;
            loveHoursEl.textContent = formatTime(h);
            loveMinutesEl.textContent = formatTime(m);
            loveSecondsEl.textContent = formatTime(s);
        }
    }

    // --- KHỞI CHẠY ---
    
    // Gọi hàm 1 lần ngay lập tức để xác định đúng trạng thái
    updateTimers();

    // Thiết lập vòng lặp chạy mỗi 1 giây
    setInterval(updateTimers, 1000);
});
