document.addEventListener('DOMContentLoaded', () => {
    const displaySpans = document.querySelectorAll('#password-display span');
    const keypad = document.querySelector('.keypad');
    const loginContainer = document.getElementById('login-container');
    
    const CORRECT_PASS = '15072025';
    let currentInput = '';
    let isChecking = false;

    // Hàm cập nhật màn hình hiển thị
    const updateDisplay = () => {
        for (let i = 0; i < displaySpans.length; i++) {
            if (i < currentInput.length) {
                displaySpans[i].textContent = '*'; // Hiện dấu *
            } else {
                displaySpans[i].textContent = '-'; // Hiện gạch ngang
            }
        }
    };

    // Hàm xử lý khi nhấn nút
    const handleKeyPress = (key) => {
        if (isChecking) return;

        if (key === 'submit') {
            checkPassword();
        } else if (key === 'clear') {
            currentInput = '';
            updateDisplay();
        } else { // Là số
            if (currentInput.length < 8) {
                currentInput += key;
                updateDisplay();
            }
        }
    };

    // Hàm kiểm tra mật khẩu
    const checkPassword = () => {
        isChecking = true;
        if (currentInput === CORRECT_PASS) {
            // ĐÚNG: Ẩn đi và chuyển trang
            loginContainer.style.opacity = '0';
            loginContainer.style.transform = 'scale(0.9)';
            setTimeout(() => {
                // Chuyển đến trang 'home.html'
                window.location.href = 'home.html';
            }, 500);
        } else {
            // SAI: Rung lắc và reset
            loginContainer.classList.add('shake');
            currentInput = ''; // Xóa mật khẩu đã nhập
            
            // Đổi hiển thị sang "SAI RỒI"
            const errorMsg = 'SAI-ROI-';
            for (let i = 0; i < displaySpans.length; i++) {
                displaySpans[i].textContent = errorMsg[i] || '-';
            }

            setTimeout(() => {
                loginContainer.classList.remove('shake');
                updateDisplay(); // Reset về gạch ngang
                isChecking = false;
            }, 1000);
        }
    };

    // Gắn sự kiện click cho bàn phím
    keypad.addEventListener('click', (e) => {
        if (e.target.classList.contains('key')) {
            const key = e.target.dataset.key;
            handleKeyPress(key);
        }
    });

    // Khởi tạo hiển thị
    updateDisplay();
});
