// التحكم في قائمة الهاتف
const menuToggle = document.getElementById('menuToggle');
const navigation = document.getElementById('navigation');

if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
        navigation.classList.toggle('active');

        const icon = menuToggle.querySelector('i');
        if (navigation.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// إغلاق القائمة عند النقر على رابط
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navigation.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// تأثير التمرير
let lastScroll = 0;
const mainNav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        mainNav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        mainNav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        mainNav.style.backdropFilter = 'blur(10px)';
    } else {
        mainNav.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        mainNav.style.backgroundColor = 'white';
        mainNav.style.backdropFilter = 'none';
    }

    lastScroll = currentScroll;
});

// إعادة ضبط القائمة عند تغيير حجم الشاشة
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navigation.classList.remove('active');
        if (menuToggle) {
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        navigation.style.display = '';
    } else {
        if (!navigation.classList.contains('active')) {
            navigation.style.display = 'none';
        } else {
            navigation.style.display = 'block';
        }
    }
});

// تصحيح الـ display عند تحميل الصفحة
if (window.innerWidth <= 768) {
    navigation.style.display = 'none';
} else {
    navigation.style.display = 'flex';
}

// تأثير ظهور تدريجي للعناصر
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ تم تحميل الموقع بنجاح!');
    console.log('📷 الصور المستخدمة:');
    console.log('- Logo: banner1.png');
    console.log('- خلفية الهيرو: banner1.png');
    console.log('- صورة متحركة 1: banner2.png');
    console.log('- صورة متحركة 2: banner4.png');

    // تأثير ظهور تدريجي
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // تحميل الصور والتأكد من وجودها
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function () {
            console.warn(`⚠️ الصورة غير موجودة: ${this.src}`);
        });
    });
});

// انتظار تحميل DOM بالكامل
document.addEventListener('DOMContentLoaded', function () {
    const categoryCards = document.querySelectorAll('.category-card');
    const toast = document.getElementById('toastMsg');

    // وظيفة عرض رسالة短暂ة
    function showMessage(text, duration = 1500) {
        toast.textContent = text;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    // إضافة حدث النقر لكل كارد
    categoryCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // منع انتشار الحدث لو بدنا
            e.stopPropagation();
            // الحصول على رابط المنتجات من data-link
            let targetLink = this.getAttribute('data-link');
            let categoryName = this.querySelector('.category-name')?.innerText || 'الفئة';

            if (targetLink) {
                // عرض رسالة تفاعلية
                showMessage(`🔍 جاري التوجيه إلى ${categoryName} ...`, 1200);
                // بعد رسالة قصيرة التوجيه (أو فوري)
                setTimeout(() => {
                    window.location.href = targetLink;
                }, 300);
            } else {
                // إذا لم يوجد رابط محدد، يمكن إظهار رسالة تجريبية
                showMessage(`⚠️ الرابط غير مخصص بعد: ${categoryName}`, 1500);
                console.warn(`لا يوجد رابط محدد للفئة: ${categoryName}`);
            }
        });
    });

    // إضافة تأثير إضافي للصور - تحقق من وجود الصورة
    const shapeImg = document.querySelector('.image-section img');
    if (shapeImg) {
        // لو حابب تضيف fallback للصورة في حال ما كانت موجودة
        shapeImg.onerror = function () {
            this.src = 'https://placehold.co/400x500/e9ecef/2c3e50?text=Shape+Not+Found';
            this.alt = 'Shape placeholder';
        };
    }
});