$(document).ready(function () {
    $('.slider').slick({
        arrows: true,
        dots: true,
        slidesToShow: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        centerMode: true,
        centerPadding: '10px',
        variableWidth: true,
        initialSlide: 1,
        responsive: [{
            breakpoint: 768, settings: {
                arrows: false, adaptiveHeight: true

            }
        }, {
            breakpoint: 375, settings: {
                arrows: false, adaptiveHeight: true, slidesToShow: 1
            }
        }]
    });


// Получаем элементы
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('menu-toggle');
    const closeButton = document.getElementById('sidebar-close');
// Обработчик нажатия на кнопку
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('open'); // Переключаем класс "open"
    });

    closeButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    })
// Общая функция для прокрутки
    const scrollToSection = (targetId) => {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    };


    document.querySelectorAll('#scrollBtn, #scrollHome, #scrollBtnFooter, #consultBtn1, #consultBtn2, #consultBtn3, #consultBtn4, #consultBtn5')
        .forEach(button => button.addEventListener('click', () => scrollToSection('consultation')));

    // Инициализация Magnific Popup для миниатюр
    $('.popup-link').magnificPopup({
        type: 'image', gallery: {
            enabled: true, // Включаем режим галереи
            navigateByImgClick: true, // Переход к следующему изображению по клику
            preload: [0, 1] // Загружаем следующее и предыдущее изображение
        }, image: {
            // Настройки для полноэкранного отображения
            cursor: 'mfp-arrow-left mfp-arrow-right', // Стрелки навигации
            titleSrc: 'title', // Заголовок изображения
        }, mainClass: 'mfp-img-mobile', // Добавление класса для мобильных
        callbacks: {
            open: function () {
                // Открытие на весь экран
                $('body').css('overflow', 'hidden'); // Отключение прокрутки
            }, close: function () {
                $('body').css('overflow', 'auto'); // Восстановление прокрутки
            }
        }
    });

    new WOW({
        boxClass: 'wow', // Класс, который будет анимироваться
        animateClass: 'animate__animated', // Класс анимации
        offset: 100, // Смещение в пикселях (когда запускать анимацию)
        mobile: true, // Включить на мобильных устройствах
        live: true // Проверять элементы при загрузке контента (например, AJAX)
    }).init();


    const toggleCheckbox = document.getElementById('toggleProjects');
    const hiddenProjects = document.querySelectorAll('.project-card.hidden');
    const toggleButtonText = document.querySelector('.allProject .btn-text');

    toggleCheckbox.addEventListener('change', () => {
        hiddenProjects.forEach(project => {
            project.classList.toggle('hidden', !toggleCheckbox.checked);
        });

        // Меняем текст кнопки
        if (toggleCheckbox.checked) {
            toggleButtonText.textContent = 'Скрыть проекты';
        } else {
            toggleButtonText.textContent = 'Посмотреть ещё 3 проекта';
        }
    });

    $(document).ready(function () {
        const form = $('.consultation-form');
        const successMessage = $('.success-message');
        const inputs = form.find('input');
        const errorMessages = form.find('.error-input');
        const submitButton = form.find('.btn-submit');

        // Скрываем сообщения об ошибках изначально
        errorMessages.hide();

        // Функция валидации формы
        function validateForm() {
            let isValid = true;

            // Проверка имени
            const nameInput = $('#name');
            if (!nameInput.val().trim()) {
                nameInput.css('border', '1px solid red');
                nameInput.next('.error-input').show();
                isValid = false;
            } else {
                nameInput.css('border', '');
                nameInput.next('.error-input').hide();
            }

            // Проверка телефона
            const phoneInput = $('#phone');
            if (!phoneInput.val().trim()) {
                phoneInput.css('border', '1px solid red');
                phoneInput.next('.error-input').show();
                isValid = false;
            } else {
                phoneInput.css('border', '');
                phoneInput.next('.error-input').hide();
            }

            // Проверка согласия
            // Проверка согласия
            const consentCheckbox = $('#consent');
            if (!consentCheckbox.prop('checked')) {
                alert('Необходимо согласиться с условиями');
                isValid = false;
            }

            return isValid;
        }

        // Обработчик события при потере фокуса для полей ввода
        inputs.on('blur', function () {
            const input = $(this);
            if (!input.val().trim()) {
                input.css('border', '1px solid red');
                input.next('.error-input').show();
            } else {
                input.css('border', '');
                input.next('.error-input').hide();
            }
        });

        // Обработчик клика по кнопке отправки
        submitButton.on('click', function (e) {
            e.preventDefault();

            if (validateForm()) {
                const formData = {
                    name: $('#name').val().trim(),
                    phone: $('#phone').val().trim()
                };

                $.ajax({
                    url: 'https://testologia.ru/checkout',
                    method: 'POST',
                    data: formData,
                    success: function (response) {
                        if (response.success === 1) {
                            alert('Ошибка отправки формы');
                        } else {
                            form.hide();
                            successMessage.show();
                        }
                    },
                    error: function () {
                        alert('Произошла ошибка при отправке формы');
                    }
                });
            }
        });

        // Обработчик изменения состояния чекбокса
        $('#consent').on('change', function () {
            if ($(this).prop('checked')) {
                alert('Спасибо за согласие!');
            } else {
                alert('Необходимо согласиться с условиями!');
            }
        });
    });

    
    $(document).ready(function () {
        // Открытие popup
        $('.btn-register').on('click', function () {
            $('.popup').css('display', 'flex');
            $('.overlay').css('display', 'block');
        });

        // Закрытие popup при нажатии на кнопку "X"
        $('.popup-close').on('click', function () {
            $('.popup').css('display', 'none');
            $('.overlay').css('display', 'none');
        });

        // Закрытие popup при нажатии на overlay
        $('.overlay').on('click', function () {
            $('.popup').css('display', 'none');
            $('.overlay').css('display', 'none');
        });

        // Инициализация формы
        const popupForm = $('#popupForm');
        const inputs = popupForm.find('input[type="text"], input[type="tel"]');
        const errorMessages = popupForm.find('.error-input');
        const submitButton = $('#btnPopup');

        // Скрываем сообщения об ошибках изначально
        errorMessages.hide();

        // Функция валидации формы
        function validatePopupForm() {
            let isValid = true;

            // Проверка имени
            const nameInput = $('#namePopup');
            if (!nameInput.val().trim()) {
                nameInput.css('border', '1px solid red');
                nameInput.next('.error-input').show();
                isValid = false;
            } else {
                nameInput.css('border', '');
                nameInput.next('.error-input').hide();
            }

            // Проверка телефона
            const phoneInput = $('#phonePopup');
            if (!phoneInput.val().trim()) {
                phoneInput.css('border', '1px solid red');
                phoneInput.next('.error-input').show();
                isValid = false;
            } else {
                phoneInput.css('border', '');
                phoneInput.next('.error-input').hide();
            }

            // Проверка согласия
            const consentCheckbox = $('#consentPopup');
            if (!consentCheckbox.prop('checked')) {
                alert('Необходимо согласиться с условиями');
                isValid = false;
            }

            return isValid;
        }

        // Обработчик события при потере фокуса для полей ввода
        inputs.on('blur', function () {
            const input = $(this);
            if (!input.val().trim()) {
                input.css('border', '1px solid red');
                input.next('.error-input').show();
            } else {
                input.css('border', '');
                input.next('.error-input').hide();
            }
        });

        // Обработчик клика по кнопке отправки
        submitButton.on('click', function (e) {
            e.preventDefault();

            if (validatePopupForm()) {
                const formData = {
                    name: $('#namePopup').val().trim(),
                    phone: $('#phonePopup').val().trim()
                };

                $.ajax({
                    url: 'https://testologia.ru/checkout',
                    method: 'POST',
                    data: formData,
                    success: function (response) {
                        if (response.success === 0) {
                            alert('Ошибка отправки формы');
                        } else {
                            $('.popup-content h3').html('<div class="success-message">Спасибо, мы свяжемся с вами в ближайшее время!</div>');
                        }
                    },
                    error: function () {
                        alert('Произошла ошибка при отправке формы');
                    }
                });
            }
        });

        // Обработчик изменения состояния чекбокса
        $('#consentPopup').on('change', function () {
            if ($(this).prop('checked')) {
                alert('Спасибо за согласие!');
            } else {
                alert('Необходимо согласиться с условиями!');
            }
        });
    });
});