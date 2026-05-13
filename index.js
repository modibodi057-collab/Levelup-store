// استهداف جميع أزرار الحجز بالكلاس btn-primary
const preOrderBtns = document.querySelectorAll('.btn-primary');

preOrderBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // الوصول إلى الصف الأب (tour-row)
        const row = e.target.closest('.tour-row'); 
        
        // استخراج اسم القاعة باستخدام الكلاس tour-arena الموجود في الكود عندك
        const venueName = row.querySelector('.tour-arena').innerText;

        // إنشاء النافذة المنبثقة (Modal)
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2 style="color: #00ffcc; margin-top: 0;">BOOKING CONFIRMED</h2>
                <p>You have successfully reserved a spot at:</p>
                <h3 style="color: #ff00ff; text-transform: uppercase;">${venueName}</h3>
                <div class="ticket-id">SYSTEM_ID: #LU-${Math.floor(Math.random() * 90000) + 10000}</div>
                <button id="close-booking">ACKNOWLEDGE</button>
            </div>
        `;

        document.body.appendChild(modal);

        // وظيفة الإغلاق وتحديث الزر
        document.getElementById('close-booking').onclick = function() {
            modal.remove();
            btn.innerText = "RESERVED";
            btn.style.backgroundColor = "transparent";
            btn.style.color = "#ff00ff";
            btn.style.borderColor = "#ff00ff";
            btn.disabled = true;
        };
    });
});