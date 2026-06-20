(function(){
  function toggleMenu(e){
    var btn=e.target;
    var nav=document.getElementById('main-nav');
    var expanded=btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded',(!expanded).toString());
    if(nav){
      nav.style.display = expanded ? 'none' : 'flex';
      if(!expanded){
        nav.style.flexDirection='column';
        nav.style.background='#fff';
        nav.style.position='absolute';
        nav.style.right='1rem';
        nav.style.top='3.75rem';
        nav.style.padding='0.5rem';
        nav.style.boxShadow='0 6px 18px rgba(0,0,0,0.08)';
        nav.style.borderRadius='8px';
      } else {
        nav.style.removeProperty('flex-direction');
        nav.style.removeProperty('background');
        nav.style.removeProperty('position');
        nav.style.removeProperty('right');
        nav.style.removeProperty('top');
        nav.style.removeProperty('padding');
        nav.style.removeProperty('box-shadow');
        
        nav.style.removeProperty('border-radius');
      }
    }
  }

  var lightboxOverlay;

  document.addEventListener('DOMContentLoaded', function(){
    initLightbox();
    var buttons = document.querySelectorAll('.mobile-toggle');
    buttons.forEach(function(btn){
      btn.style.display='none';
      btn.addEventListener('click', toggleMenu);
    });

    function handleResize(){
      var small = window.matchMedia('(max-width:640px)').matches;
      buttons.forEach(function(btn){ btn.style.display = small ? 'inline-flex' : 'none'; });
      var nav = document.getElementById('main-nav');
      if(nav){ nav.style.display = small ? 'none' : 'flex'; nav.style.removeProperty('position'); }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    initGallery();
  });

  function initLightbox(){
    lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.setAttribute('aria-hidden', 'true');
    lightboxOverlay.innerHTML = '<div class="lightbox-frame" role="dialog" aria-modal="true"><button class="lightbox-close" aria-label="Закрыть изображение">&times;</button><img class="lightbox-image" src="" alt="" /><div class="lightbox-caption"></div></div>';
    document.body.appendChild(lightboxOverlay);

    var closeBtn = lightboxOverlay.querySelector('.lightbox-close');
    var imageEl = lightboxOverlay.querySelector('.lightbox-image');
    var captionEl = lightboxOverlay.querySelector('.lightbox-caption');

    function closeLightbox() {
      lightboxOverlay.classList.remove('visible');
      lightboxOverlay.setAttribute('aria-hidden', 'true');
      imageEl.src = '';
      imageEl.alt = '';
      captionEl.textContent = '';
    }

    lightboxOverlay.addEventListener('click', function(event){
      if(event.target === lightboxOverlay) {
        closeLightbox();
      }
    });

    closeBtn.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', function(event){
      if(event.key === 'Escape' && lightboxOverlay.classList.contains('visible')) {
        closeLightbox();
      }
    });

    document.body.addEventListener('click', function(event){
      var clickedImg = event.target.matches('.gallery-item img') ? event.target : event.target.closest('.gallery-item img');
      if(!clickedImg) return;
      event.preventDefault();
      imageEl.src = clickedImg.src;
      imageEl.alt = clickedImg.alt || '';
      captionEl.textContent = clickedImg.alt || '';
      lightboxOverlay.classList.add('visible');
      lightboxOverlay.setAttribute('aria-hidden', 'false');
    });
  }

  function initGallery(){
    var galleryGrid = document.getElementById('gallery-grid');
    var worksGallery = document.getElementById('works-gallery');

    var roadAsphaltPavingContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="asphaltSubCategory/roadAsphaltPaving/cower.png" alt="Асфальтирование дорог" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Асфальтирование дорог</h3>' +
            '<p class="service-cover-desc">Устройство и восстановление асфальтового покрытия на автомобильных дорогах: подготовка основания, укладка асфальтобетонной смеси, уплотнение и выравнивание.</p>' +
            '<p class="service-cover-lead">Надёжный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading service-detail-heading--scroll">Виды асфальтирования</h3>' +
      '<p class="service-scroll-hint">Прокрутите влево, чтобы увидеть все варианты</p>' +
      '<div class="service-types">' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/1_4.png" alt="Асфальтирование на готовом основании" />' +
          '<h4>Асфальтирование<br>на готовом основании</h4>' +
          '<p>Данный вид асфальтирования применяется при условии, что основание ровное и как правило бетонное. Предварительно поверхность обрабатывается битумной эмульсией.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/2_4.png" alt="Асфальтирование с выравнивающим слоем" />' +
          '<h4>Асфальтирование с<br>выравнивающим слоем</h4>' +
          '<p>Если на основании есть ямы, требуется предварительное вываривание технологическим слоем. После чего производится укладка финишного слоя асфальта.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/3_4.png" alt="Асфальтирование по щебёночному основанию" />' +
          '<h4>Асфальтирование по щебёночному основанию</h4>' +
          '<p>Бюджетный вариант асфальтирования, используется при необходимости создать с нуля крепкое основание в условиях ограниченного бюджета.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/4_4.png" alt="Асфальтирование по щебёночно-песчаному основанию" />' +
          '<h4>Асфальтирование по<br>щебёночно-песчаному основанию</h4>' +
          '<p>Данный вид асфальтирования применяется при условии, что основание ровное и как правило бетонное. Предварительно поверхность обрабатывается битумной эмульсией.</p>' +
        '</article>' +
      '</div>' +
      '<p class="service-lead">Надёжный результат на долгие годы службы</p>' +
      '<div class="service-steps">' +
        '<article class="service-step"><h4>Консультация и экспресс-оценка</h4><p>Обсуждаем детали проекта по телефону и сразу называем ориентировочную стоимость.</p></article>' +
        '<article class="service-step"><h4>Технический аудит объекта</h4><p>Наш специалист бесплатно оценивает состояние основания, рельеф и транспортную нагрузку на участке.</p></article>' +
        '<article class="service-step"><h4>Индивидуальный проект и бюджет</h4><p>Разрабатываем оптимальную схему укладки и подбираем марку асфальта под ваши задачи.</p></article>' +
        '<article class="service-step"><h4>Строительный процесс</h4><p>Доставляем материалы, подвозим собственную спецтехнику и выполняем укладку строго по технологии.</p></article>' +
        '<article class="service-step"><h4>Идеальный результат</h4><p>Вы получаете ровную, чистую территорию с гарантированной долговечностью покрытия.</p></article>' +
      '</div>' +
      '<h3 class="service-detail-heading">Этапы работ</h3>' +
      '<ol class="service-stages">' +
        '<li><strong>Этап 1: Первичный просчёт</strong><span>Анализируем ваши вводные данные и формируем коммерческое предложение за 5 минут.</span></li>' +
        '<li><strong>Этап 2: Профессиональная геодезия</strong><span>Проводим точную съёмку территории и определяем объём земляных и подготовительных работ.</span></li>' +
        '<li><strong>Этап 3: Утверждение спецификации</strong><span>Согласовываем детальный план, график производства работ и фиксируем финальную стоимость.</span></li>' +
        '<li><strong>Этап 4: Производство и укладка</strong><span>Контролируем качество смеси, соблюдаем температурный режим и уплотняем слои по СНиП.</span></li>' +
        '<li><strong>Этап 5: Экспертная приёмка</strong><span>Сдаём объект по акту выполненных работ с предоставлением долгосрочной гарантии качества.</span></li>' +
      '</ol>' +
      '<h3 class="service-detail-heading">Как мы работаем</h3>' +
      '<div class="service-flow">' +
        '<article><h4>Связь</h4><p>Оставляете заявку, и мы рассчитываем предварительный бюджет.</p></article>' +
        '<article><h4>Встреча</h4><p>Инженер бесплатно приезжает на объект для точных замеров.</p></article>' +
        '<article><h4>Расчёт</h4><p>Составляем прозрачную смету, где понятен каждый рубль.</p></article>' +
        '<article><h4>Работа</h4><p>Привозим технику и укладываем асфальт без задержек.</p></article>' +
        '<article><h4>Финиш</h4><p>Вы принимаете готовый объект с гарантией от компании.</p></article>' +
      '</div>' +
      '<div class="service-benefits">' +
        '<article class="service-benefit"><h4>Своя база спецтехники</h4><p>Асфальтоукладчики, дорожная фреза, катки асфальтные, грунтовые экскаваторы и другое оборудование.</p></article>' +
        '<article class="service-benefit"><h4>Экономия на материалах</h4><p>В смете по закупным — оптовым ценам. Экономия денег на поставке материалов.</p></article>' +
        '<article class="service-benefit"><h4>Гарантируем качество</h4><p>Соблюдаем все сроки и нормативные нормы. Более 150 успешных проектов.</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Довольные клиенты — наша цель</h3>' +
        '<p>Мы делаем всё, чтобы с каждым годом их становилось больше. Мы работаем на рынке благоустройства и строительства уже 25 лет. За это время реализовано множество проектов — как успешных, так и сложных. Это нормальная часть любого опыта. Главное — мы из года в год увеличиваем число довольных клиентов.</p>' +
        '<p>Мы достигаем этого за счёт постоянного совершенствования процессов строительства и внедрения современных технологий и решений. Рынок меняется — и мы развиваемся вместе с ним.</p>' +
      '</div>';

    var potholeRepairContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="asphaltSubCategory/potholeRepair/cower.png" alt="Ямочный ремонт" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Ямочный ремонт</h3>' +
            '<p class="service-cover-desc">Локальный ремонт ям, выбоин и разрушенных участков.</p>' +
            '<p class="service-cover-lead">Надёжный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Вид ремонта</h3>' +
      '<ol class="service-stages service-repair-types">' +
        '<li><span>Нарезка швов в асфальтобетонне алмазными дисками</span></li>' +
        '<li><span>Демонтаж асфальтобетонного покрытия 5 см с вывозом скола на утилизацию</span></li>' +
        '<li><span>Обработка основания и кромки карты битумной эмульсией</span></li>' +
        '<li><span>Ямочный ремонт — мелкозернистый асфальтобетон (с материалом)</span></li>' +
      '</ol>' +
      '<p class="service-lead">Ямочный ремонт вместо нового асфальта? Да!</p>' +
      '<div class="service-advantages">' +
        '<article class="service-advantage"><p>Работы проводятся<br>очень быстро</p></article>' +
        '<article class="service-advantage"><p>Не нужно полностью<br>перекрывать дороги</p></article>' +
        '<article class="service-advantage"><p>Не нужно использовать<br>тяжелую спецтехнику</p></article>' +
        '<article class="service-advantage"><p>Не требует больших<br>экономических затрат</p></article>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать асфальтирование именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Заявка<br>и расчет</h4><p>Предварительный расчет<br>стоимости за 5 минут</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Выезд<br>и замер</h4><p>Выезд специалиста и<br>точный замер участка</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Решение<br>и смета</h4><p>Подбор решения и расчет<br>точной сметы работ</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Договор<br>и работы</h4><p>Фиксируем условия и<br>приступаем к работам</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Сдача<br>и гарантия</h4><p>Сдаем объект и даем<br>гарантию на работы</p></article>' +
      '</div>' +
      '<div class="service-benefits">' +
        '<article class="service-benefit"><h4>Своя база спецтехники</h4><p>Асфальтоукладчики, дорожная фреза, катки асфальтные, грунтовые экскаваторы и другое оборудование. <strong>38 единиц спецтехники</strong>.</p></article>' +
        '<article class="service-benefit"><h4>Экономия на материалах</h4><p>Экономия денег на поставке материалов. В смете по закупным — оптовым ценам!</p></article>' +
        '<article class="service-benefit"><h4>Гарантируем качественную работу</h4><p>Соблюдаем все сроки и нормативные нормы. Более 150 успешных проектов.</p></article>' +
      '</div>';

    var asphaltPavingAreasContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="asphaltSubCategory/asphaltPavingAreas/cower.png" alt="Асфальтирование территорий" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Асфальтирование территорий</h3>' +
            '<p class="service-cover-desc">Асфальтирование парковок, складских, производственных и общественных территорий с учётом нагрузки и требований к покрытию.</p>' +
            '<p class="service-cover-lead">Надёжный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать асфальтирование именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Заявка<br>и расчет</h4><p>Предварительный расчет<br>стоимости за 5 минут</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Выезд<br>и замер</h4><p>Выезд специалиста и<br>точный замер участка</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Решение<br>и смета</h4><p>Подбор решения и расчет<br>точной сметы работ</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Договор<br>и работы</h4><p>Фиксируем условия и<br>приступаем к работам</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Сдача<br>и гарантия</h4><p>Сдаем объект и даем<br>гарантию на работы</p></article>' +
      '</div>' +
      '<div class="service-benefits">' +
        '<article class="service-benefit"><h4>Своя база спецтехники</h4><p>Асфальтоукладчики, дорожная фреза, катки асфальтные, грунтовые экскаваторы и другое оборудование. <strong>38 единиц спецтехники</strong>.</p></article>' +
        '<article class="service-benefit"><h4>Экономия на материалах</h4><p>Экономия денег на поставке материалов. В смете по закупным — оптовым ценам!</p></article>' +
        '<article class="service-benefit"><h4>Гарантируем качественную работу</h4><p>Соблюдаем все сроки и нормативные нормы. Более 150 успешных проектов.</p></article>' +
      '</div>' +
      '<h3 class="service-detail-heading service-detail-heading--scroll">Виды укладки асфальта и порядок цен</h3>' +
      '<p class="service-scroll-hint">Прокрутите влево, чтобы увидеть все варианты</p>' +
      '<div class="service-types">' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/1_4.png" alt="Асфальтирование на готовом основании" />' +
          '<h4>Асфальтирование<br>на готовом основании</h4>' +
          '<p>Данный вид асфальтирования применяется при условии, что основание ровное и как правило бетонное. Предварительно поверхность обрабатывается битумной эмульсией.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/2_4.png" alt="Асфальтирование с выравнивающим слоем" />' +
          '<h4>Асфальтирование с<br>выравнивающим слоем</h4>' +
          '<p>Если на основании есть ямы, требуется предварительное вываривание технологическим слоем. После чего производится укладка финишного слоя асфальта.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/3_4.png" alt="Асфальтирование по щебёночному основанию" />' +
          '<h4>Асфальтирование по щебёночному основанию</h4>' +
          '<p>Бюджетный вариант асфальтирования, используется при необходимости создать с нуля крепкое основание в условиях ограниченного бюджета.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/4_4.png" alt="Асфальтирование по щебёночно-песчаному основанию" />' +
          '<h4>Асфальтирование по<br>щебёночно-песчаному основанию</h4>' +
          '<p>Данный вид асфальтирования применяется при условии, что основание ровное и как правило бетонное. Предварительно поверхность обрабатывается битумной эмульсией.</p>' +
        '</article>' +
      '</div>';

    var plotAsphaltPavingContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="asphaltSubCategory/plotAsphaltPaving/cower.png" alt="Асфальтирование участков" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Асфальтирование участков</h3>' +
            '<p class="service-cover-desc">Асфальтирование частных дворов, подъездных путей и придомовых участков — аккуратно, с подготовкой основания и качественной укладкой.</p>' +
            '<p class="service-cover-lead">Надёжный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать асфальтирование именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Заявка<br>и расчет</h4><p>Предварительный расчет<br>стоимости за 5 минут</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Выезд<br>и замер</h4><p>Выезд специалиста и<br>точный замер участка</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Решение<br>и смета</h4><p>Подбор решения и расчет<br>точной сметы работ</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Договор<br>и работы</h4><p>Фиксируем условия и<br>приступаем к работам</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Сдача<br>и гарантия</h4><p>Сдаем объект и даем<br>гарантию на работы</p></article>' +
      '</div>' +
      '<div class="service-benefits">' +
        '<article class="service-benefit"><h4>Своя база спецтехники</h4><p>Асфальтоукладчики, дорожная фреза, катки асфальтные, грунтовые экскаваторы и другое оборудование. <strong>38 единиц спецтехники</strong>.</p></article>' +
        '<article class="service-benefit"><h4>Экономия на материалах</h4><p>Экономия денег на поставке материалов. В смете по закупным — оптовым ценам!</p></article>' +
        '<article class="service-benefit"><h4>Гарантируем качественную работу</h4><p>Соблюдаем все сроки и нормативные нормы. Более 150 успешных проектов.</p></article>' +
      '</div>' +
      '<h3 class="service-detail-heading service-detail-heading--scroll">Виды укладки асфальта и порядок цен</h3>' +
      '<p class="service-scroll-hint">Прокрутите влево, чтобы увидеть все варианты</p>' +
      '<div class="service-types">' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/1_4.png" alt="Асфальтирование на готовом основании" />' +
          '<h4>Асфальтирование<br>на готовом основании</h4>' +
          '<p>Данный вид асфальтирования применяется при условии, что основание ровное и как правило бетонное. Предварительно поверхность обрабатывается битумной эмульсией.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/2_4.png" alt="Асфальтирование с выравнивающим слоем" />' +
          '<h4>Асфальтирование с<br>выравнивающим слоем</h4>' +
          '<p>Если на основании есть ямы, требуется предварительное вываривание технологическим слоем. После чего производится укладка финишного слоя асфальта.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/3_4.png" alt="Асфальтирование по щебёночному основанию" />' +
          '<h4>Асфальтирование по щебёночному основанию</h4>' +
          '<p>Бюджетный вариант асфальтирования, используется при необходимости создать с нуля крепкое основание в условиях ограниченного бюджета.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/4_4.png" alt="Асфальтирование по щебёночно-песчаному основанию" />' +
          '<h4>Асфальтирование по<br>щебёночно-песчаному основанию</h4>' +
          '<p>Данный вид асфальтирования применяется при условии, что основание ровное и как правило бетонное. Предварительно поверхность обрабатывается битумной эмульсией.</p>' +
        '</article>' +
      '</div>';

    var gravelingContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="asphaltSubCategory/graveling/cower.png" alt="Отсыпка дороги или участка щебнем" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Отсыпка дороги или участка щебнем</h3>' +
            '<p class="service-cover-desc">Отсыпка и выравнивание дорог и участков щебнем различной фракции с формированием прочного основания под дальнейшее покрытие.</p>' +
            '<p class="service-cover-lead">Надёжный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Виды отсыпки щебня</h3>' +
      '<ol class="service-stages">' +
        '<li><strong>Вторичный щебень</strong></li>' +
        '<li><strong>Известняковый щебень</strong></li>' +
      '</ol>' +
      '<h3 class="service-detail-heading service-detail-heading--scroll">Виды укладки щебня</h3>' +
      '<p class="service-scroll-hint">Прокрутите влево, чтобы увидеть все варианты</p>' +
      '<div class="service-types">' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSubCategory/graveling/type1_2.png" alt="Отсыпка щебнем одной фракции" />' +
          '<h4>Отсыпка щебнем<br>одной фракции</h4>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSubCategory/graveling/type2_2.png" alt="Отсыпка щебнем двумя фракциями" />' +
          '<h4>Отсыпка щебнем<br>двумя фракциями</h4>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSubCategory/graveling/type3_2.png" alt="Отсыпка щебня с покрытием гранитного отсева" />' +
          '<h4>Отсыпка щебня с<br>покрытием гранитного<br>отсева</h4>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSubCategory/graveling/type4_2.png" alt="Отсыпка щебня на песчаную подушку двумя фракциями" />' +
          '<h4>Отсыпка щебня на<br>песчаную подушку<br>двумя фракциями</h4>' +
        '</article>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать отсыпку щебнем именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Заявка<br>и расчет</h4><p>Предварительный расчет<br>стоимости за 5 минут</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Выезд<br>и замер</h4><p>Выезд специалиста и<br>точный замер участка</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Решение<br>и смета</h4><p>Подбор решения и расчет<br>точной сметы работ</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Договор<br>и работы</h4><p>Фиксируем условия и<br>приступаем к работам</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Сдача<br>и гарантия</h4><p>Сдаем объект и даем<br>гарантию на работы</p></article>' +
      '</div>' +
      '<div class="service-benefits">' +
        '<article class="service-benefit"><h4>Своя база спецтехники</h4><p>Асфальтоукладчики, дорожная фреза, катки асфальтные, грунтовые экскаваторы и другое оборудование. <strong>38 единиц спецтехники</strong>.</p></article>' +
        '<article class="service-benefit"><h4>Экономия на материалах</h4><p>Экономия денег на поставке материалов. В смете по закупным — оптовым ценам!</p></article>' +
        '<article class="service-benefit"><h4>Гарантируем качественную работу</h4><p>Соблюдаем все сроки и нормативные нормы. Более 150 успешных проектов.</p></article>' +
      '</div>';

    var curbContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Curb/cower.jpg" alt="Установка бордюров" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Установка бордюров и разделение зон</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать установку бордюров именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Заявка<br>и расчет</h4><p>Предварительный расчет<br>стоимости за 5 минут</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Выезд<br>и замер</h4><p>Выезд специалиста и<br>точный замер участка</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Решение<br>и смета</h4><p>Подбор решения и расчет<br>точной сметы работ</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Договор<br>и работы</h4><p>Фиксируем условия и<br>приступаем к работам</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Сдача<br>и гарантия</h4><p>Сдаем объект и даем<br>гарантию на работы</p></article>' +
      '</div>' +
      '<div class="service-benefits">' +
        '<article class="service-benefit"><h4>Своя база спецтехники</h4><p>Асфальтоукладчики, дорожная фреза,<br>Катки асфальтные, грунтовые экскаваторы ...</p><strong>38 единиц спецтехники</strong></article>' +
        '<article class="service-benefit"><h4>Экономия денег на материалах</h4><p>Экономия денег на поставке материалов. В смете по закупным - оптовым ценам!</p></article>' +
        '<article class="service-benefit"><h4>Гарантируем качественную работу</h4><p>Соблюдаем все сроки и нормативные нормы.<br>Более 150 успешных проектов</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Установка садовых бордюров</h3>' +
        '<p>Вид ремонта</p>' +
        '<p>Установка садовых бордюров (поребриков, бордюрных камней)</p>' +
        '<p>«Под ключ» - установка + материалы - бордюр садовый вибропрессованный 1000х200х80, 35 кг/шт</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Установка дорожных бордюров</h3>' +
        '<p>Вид ремонта</p>' +
        '<p>Установка дорожных (бетонных) бордюров БР 100 30 15</p>' +
        '<p>«Под ключ» - установка + материалы - бортовой бордюрный камень БР 100.30 15, 97 кг/шт.</p>' +
        '<p>«Под ключ» - установка + материалы - магистральный бордюр БР 1000х300х180, 126 кг/шт.</p>' +
        '<p>«Под ключ» - установка + материалы - мостовой бордюр БР 1000х450х180, 180 кг/шт.</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Установка бетонных (тротуарных) водостоков</h3>' +
        '<p>Вид ремонта</p>' +
        '<p>Установка бетонных (тротуарных) водостоков</p>' +
        '<p>«Под ключ» - установка + материалы 500х200х70</p>' +
      '</div>';

    var paversContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Pavers/cower.jpg" alt="Укладка тротуарной плитки и брусчатки" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Укладка тротуарной плитки,<br>брусчатки</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать укладку тротуарной плитки именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Заявка<br>и расчет</h4><p>Предварительный расчет<br>стоимости за 5 минут</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Выезд<br>и замер</h4><p>Выезд специалиста и<br>точный замер участка</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Решение<br>и смета</h4><p>Подбор решения и расчет<br>точной сметы работ</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Договор<br>и работы</h4><p>Фиксируем условия и<br>приступаем к работам</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Сдача<br>и гарантия</h4><p>Сдаем объект и даем<br>гарантию на работы</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Только опытные мастера!</h3>' +
        '<p>Опытные бригады, четкая организация работ и стабильно высокий результат</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Гарантируем качественную работу</h3>' +
        '<p>Работаем по договору, фиксируем условия и даем гарантию до 2 лет</p>' +
      '</div>' +
      '<h3 class="service-detail-heading service-detail-heading--scroll">Виды укладки брусчатки</h3>' +
      '<p class="service-scroll-hint">Прокрутите влево, чтобы увидеть все варианты</p>' +
      '<div class="service-types">' +
        '<article class="service-type"><img class="service-type-image" src="Pavers/type1.png" alt="Укладка плитки на готовое основание" /><h4>Укладка плитки<br>(брусчатки) на готовое основание</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Pavers/type2.png" alt="Укладка плитки на песчаную подушку" /><h4>Укладка плитки<br>(брусчатки) на песчаную подушку</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Pavers/type3.png" alt="Укладка плитки на песчано-щебеночную подушку" /><h4>Укладка плитки<br>(брусчатки) на песчано-<br>щебеночную подушку</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Pavers/type4.png" alt="Укладка тротуарной брусчатки с бетонированием" /><h4>Укладка тротуарной<br>брусчатки с бетонированием</h4></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Популярные виды плитки / брусчатки</h3>' +
        '<div class="service-types">' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style1.png" alt="Брусчатка кирпичик" /><h4>Брусчатка кирпичик</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style2.png" alt="Тротуарная плитка" /><h4>Тротуарная плитка</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style3.png" alt="Брусчатка Старый Город" /><h4>Брусчатка Старый Город</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style4.png" alt="Брусчатка Новый Город" /><h4>Брусчатка Новый Город</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style5.png" alt="Гранитная брусчатка" /><h4>Гранитная брусчатка</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style6.png" alt="Камень песчаник" /><h4>Камень песчаник</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style7.png" alt="Клинкерная брусчатка" /><h4>Клинкерная брусчатка</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style8.png" alt="Газонная решетка" /><h4>Газонная решетка</h4></article>' +
        '</div>' +
      '</div>';

    var landscapeContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Landscape/cower.png" alt="Озеленение участка, территории" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Озеленение<br>участка, территории</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать данную услугу именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле - снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки, работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Только опытные мастера!</h3>' +
        '<p>более 127 выполненных работ и такое же количество довольных клиентов</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Гарантия на выполненные работы</h3>' +
        '<p>2 года гарантии на все выполненные работы</p>' +
      '</div>' +
      '<h3 class="service-detail-heading service-detail-heading--scroll">Виды озеленения</h3>' +
      '<p class="service-scroll-hint">Прокрутите влево, чтобы увидеть все варианты</p>' +
      '<div class="service-types">' +
        '<article class="service-type"><img class="service-type-image" src="Landscape/type1.png" alt="Укладка рулонного газона" /><h4>Укладка<br>рулонного газона<br>«Под Ключ»</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Landscape/type2.png" alt="Устройство посевного газона на готовом основании" /><h4>Устройство<br>посевного газона на<br>готовом основании</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Landscape/type3.png" alt="Устройство посевного газона «Под Ключ»" /><h4>Устройство<br>посевного газона<br>«Под Ключ»</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Landscape/type4.png" alt="Устройство посевного газона с антикротовой сеткой" /><h4>Устройство посевного газона<br>с антикротовой сеткой</h4></article>' +
      '</div>';

    var drainageContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Drainage/cower.png" alt="Дренажные работы" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Дренажные работы<br>"Под Ключ"</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать данную услугу именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Только опытные мастера!</h3>' +
        '<p>более 127 выполненных работ и такое же количество довольных клиентов</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Гарантия на выполненные работы</h3>' +
        '<p><strong>2 года гарантии</strong> на все выполненные работы</p>' +
      '</div>';

    var lightingContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Lighting/cower.png" alt="Освещение участка" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Освещение участка,<br>территории, террасы<br>"Под Ключ"</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать данную услугу именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Только опытные мастера!</h3>' +
        '<p>более 127 выполненных работ и такое же количество довольных клиентов</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Гарантия на выполненные работы</h3>' +
        '<p><strong>2 года гарантии</strong> на все выполненные работы</p>' +
      '</div>';

    var flagstoneContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Flagstone/cower.jpg" alt="Укладка дикого камня" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Укладка дикого камня</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать укладку дикого камня именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-benefits">' +
        '<article class="service-benefit"><h4>Своя база спецтехники</h4><p>Асфальтоукладчики, дорожная фреза,<br>Катки асфальтные, грунтовые экскаваторы ...</p><strong>38 единиц спецтехники</strong></article>' +
        '<article class="service-benefit"><h4>Экономия денег на<br>поставке материалов</h4><p>В смете по закупным - оптовым ценам!</p></article>' +
        '<article class="service-benefit"><h4>Гарантируем качественную работу</h4><p>Соблюдаем все сроки и нормативные нормы.<br>Более 150 успешных проектов</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Только опытные мастера!</h3>' +
        '<p>более 127 выполненных работ и такое же количество довольных клиентов</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Гарантия на выполненные работы</h3>' +
        '<p><strong>2 года гарантии</strong> на все выполненные работы</p>' +
      '</div>' +
      '<div class="gallery-grid"></div>';

    var asphaltMillingsContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="asphaltSubCategory/asphaltMillings/cower.png" alt="Укладка асфальтной крошки" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Укладка асфальтной крошки</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading service-detail-heading--scroll">Виды укладки асфальтовой крошки</h3>' +
      '<p class="service-scroll-hint">Прокрутите влево, чтобы увидеть все варианты</p>' +
      '<div class="service-types">' +
        '<article class="service-type"><img class="service-type-image" src="asphaltSubCategory/asphaltMillings/type1.png" alt="Укладка асфальтовой крошки на готовом основании" /><h4>Укладка асфальтовой крошки<br>на готовом основании</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="asphaltSubCategory/asphaltMillings/type2.png" alt="Укладка асфальтовой крошки 2 слоя на готовом основании" /><h4>Укладка асфальтовой крошки<br>2 слоя на готовом основании</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="asphaltSubCategory/asphaltMillings/type3.png" alt="Укладка асфальтовой крошки на щебеночную подушку" /><h4>Укладка асфальтовой крошки<br>на щебеночную подушку</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="asphaltSubCategory/asphaltMillings/type4.png" alt="Укладка асфальтовой крошки на песчано - щебеночную подушку" /><h4>Укладка асфальтовой крошки<br>на песчано - щебеночную подушку</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="asphaltSubCategory/asphaltMillings/type5.png" alt="Укладка асфальтовой крошки в 2 слоя на песчано - щебеночную подушку" /><h4>Укладка асфальтовой крошки<br>в 2 слоя на песчано - щебеночную подушку</h4></article>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать асфальтную крошку именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Заявка<br>и расчет</h4><p>Предварительный расчет<br>стоимости за 5 минут</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Выезд<br>и замер</h4><p>Выезд специалиста и<br>точный замер участка</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Решение<br>и смета</h4><p>Подбор решения и расчет<br>точной сметы работ</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Договор<br>и работы</h4><p>Фиксируем условия и<br>приступаем к работам</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Сдача<br>и гарантия</h4><p>Сдаем объект и даем<br>гарантию на работы</p></article>' +
      '</div>' +
      '<div class="service-benefits">' +
        '<article class="service-benefit"><h4>Своя база спецтехники</h4><p>Асфальтоукладчики, дорожная фреза,<br>Катки асфальтные, грунтовые экскаваторы ...</p><strong>38 единиц спецтехники</strong></article>' +
        '<article class="service-benefit"><h4>Экономия денег на<br>поставке материалов</h4><p>В смете по закупным - оптовым ценам!</p></article>' +
        '<article class="service-benefit"><h4>Гарантируем качественную работу</h4><p>Соблюдаем все сроки и нормативные нормы.<br>Более 150 успешных проектов</p></article>' +
      '</div>';

    var concretingContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Concreting/cower.jpg" alt="Бетонирование площадки и дорожек" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Бетонирование площадки<br>и дорожек</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать бетонирование именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Заявка<br>и расчет</h4><p>Предварительный расчет<br>стоимости за 5 минут</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Выезд<br>и замер</h4><p>Выезд специалиста и<br>точный замер участка</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Решение<br>и смета</h4><p>Подбор решения и расчет<br>точной сметы работ</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Договор<br>и работы</h4><p>Фиксируем условия и<br>приступаем к работам</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Сдача<br>и гарантия</h4><p>Сдаем объект и даем<br>гарантию на работы</p></article>' +
      '</div>' +
      '<div class="service-benefits">' +
        '<article class="service-benefit"><h4>Своя база спецтехники</h4><p>Асфальтоукладчики, дорожная фреза,<br>катки асфальтные, грунтовые экскаваторы ...</p><strong>38 единиц спецтехники</strong></article>' +
        '<article class="service-benefit"><h4>Экономия денег на поставке материалов</h4><p>В смете по закупным - оптовым ценам!</p></article>' +
        '<article class="service-benefit"><h4>Гарантируем качественную работу</h4><p>Соблюдаем все сроки и нормативные нормы.<br>Более 150 успешных проектов</p></article>' +
      '</div>' +
      '<h3 class="service-detail-heading service-detail-heading--scroll">Виды бетонирования</h3>' +
      '<p class="service-scroll-hint">Прокрутите влево, чтобы увидеть все варианты</p>' +
      '<div class="service-types">' +
        '<article class="service-type"><img class="service-type-image" src="Concreting/type1.png" alt="Бетонирование на готовом основании" /><h4>Бетонирование<br>на готовом основании</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Concreting/type2.png" alt="Бетонирование на песчаном основании" /><h4>Бетонирование<br>на песчаном основании</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Concreting/type3.png" alt="Бетонирование на песчано-щебеночном основании" /><h4>Бетонирование на<br>песчано - щебеночном основании</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Concreting/type4.png" alt="Бетонирование на песчаном основании с утеплением" /><h4>Бетонирование на песчаном основании<br>с утеплением</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Concreting/type5.png" alt="Бетонирование с утеплителем" /><h4>Бетонирование на песчано - щебеночном основании<br>с утеплителем</h4></article>' +
      '</div>';

    var rubberContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Rubber/cower.jpg" alt="Укладка бесшовного резинового покрытия" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Укладка бесшовного<br>резинового покрытия</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать данную услугу именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Только опытные мастера!</h3>' +
        '<p>более 127 выполненных работ и такое же количество довольных клиентов</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Гарантия на выполненные работы</h3>' +
        '<p>2 года гарантии на все выполненные работы</p>' +
      '</div>';

    var rolledLawnContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="RolledLawn/cower.jpg" alt="Укладка рулонного газона" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Укладка рулонного газона</h3>' +
            '<p class="service-cover-desc">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать укладку рулонного газона именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Все предварительные и финишные работы</h3>' +
        '<ul class="service-list"><li>уборка сорняков, выравнивание площадки под газон, планировка</li><li>укатка готовой поверхности газона катком и рекомендации по уходу</li></ul>' +
        '<h3>Экономия денег на поставке материалов</h3>' +
        '<p>В смете по закупным - оптовым ценам!</p>' +
      '</div>' +
      '<h3 class="service-detail-heading">Гарантия на выполненные работы</h3>' +
      '<div class="service-about"><p><strong>2 года гарантии</strong> на все выполненные работы</p></div>' +
      '<h3 class="service-detail-heading service-detail-heading--scroll">Виды укладки рулонного газона</h3>' +
      '<p class="service-scroll-hint">Прокрутите влево, чтобы увидеть все варианты</p>' +
      '<div class="service-types">' +
        '<article class="service-type">' +
          '<h4>На готовое основание</h4>' +
          '<ul><li>доставка газона</li><li>подготовка поверхности</li><li>разгрузка и укладка</li><li>прикатывание</li><li>полив и уборка</li><li>рекомендация по уходу</li></ul>' +
        '</article>' +
        '<article class="service-type">' +
          '<h4>C заменой грунта<br>ПОД КЛЮЧ</h4>' +
          '<ul><li>доставка газона</li><li>плодородный грунт (10-12 см)</li><li>планировка и выравнивание</li><li>уплотнение</li><li>разгрузка и укладка</li><li>прикатывание</li><li>полив и уборка</li><li>рекомендация по уходу</li></ul>' +
        '</article>' +
        '<article class="service-type">' +
          '<h4>Со срезкой верхнего слоя</h4>' +
          '<ul><li>доставка газона</li><li>срезка верхнего слоя</li><li>вывоз срезанного материала</li><li>плодородный грунт (10-12 см)</li><li>планировка и выравнивание</li><li>плотнение</li><li>разгрузка и укладка</li><li>прикатывание</li><li>полив и уборка</li><li>рекомендация по уходе</li></ul>' +
        '</article>' +
        '<article class="service-type">' +
          '<h4>Элитная подготовка<br>ПОД КЛЮЧ</h4>' +
          '<ul><li>доставка газона</li><li>срезка верхнего слоя</li><li>вывоз срезанного материала</li><li>культивация и чистка</li><li>уплотнение</li><li>песчаная подушка (5-10 см)</li><li>плодородный грунт (10-12 см)</li><li>планировка и выравнивание</li><li>дополнительная трамбовка</li><li>разгрузка и укладка</li><li>прикатывание</li><li>полив и уборка</li><li>рекомендации по уходу</li></ul>' +
        '</article>' +
      '</div>' +
      '<h3 class="service-detail-heading service-detail-heading--scroll">Основные виды газона</h3>' +
      '<p class="service-scroll-hint">Прокрутите влево, чтобы увидеть все варианты</p>' +
      '<div class="service-types">' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="RolledLawn/Городской.png" alt="Газон Городской" />' +
          '<h4>«Городской»</h4>' +
          '<p><strong>Цвет:</strong> Светло-зеленый</p>' +
          '<p><strong>Состав:</strong> Мятлик луговой 100%, Canada, 3-х летний</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="RolledLawn/Универсальный.png" alt="Газон Универсальный" />' +
          '<h4>«Универсальный»</h4>' +
          '<p><strong>Цвет:</strong> Равномерно однородный зеленый</p>' +
          '<p><strong>Состав:</strong> Мятлик луговой 80%, овсяница красная 20% Canada, 3-х летний</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="RolledLawn/Эталон.png" alt="Газон Эталон" />' +
          '<h4>«Эталон»</h4>' +
          '<p><strong>Цвет:</strong> Однородный темно-зеленый</p>' +
          '<p><strong>Состав:</strong> Мятлик луговой 100%, Canada, 3-х летний</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="RolledLawn/Спортивный.png" alt="Газон Спортивный" />' +
          '<h4>«Спортивный»</h4>' +
          '<p><strong>Цвет:</strong> Насыщенный изумрудный</p>' +
          '<p><strong>Состав:</strong> Мятлик луговой 100%, USA, 3-х летний</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="RolledLawn/Парковый.png" alt="Газон Парковый" />' +
          '<h4>«Парковый»</h4>' +
          '<p><strong>Цвет:</strong> Темно-зеленый с изумрудным оттенком</p>' +
          '<p><strong>Состав:</strong> 80% газонные сорта овсяницы, 20% мятлик луговой</p>' +
        '</article>' +
      '</div>' +
      '<h3 class="service-detail-heading">Этапы проведения работ по укладки газона</h3>' +
      '<ol class="service-stages">' +
        '<li><strong>Этап 1: Выезд</strong><span>на объект для замера участка, оценки состояния почвы. Бесплатно!</span></li>' +
        '<li><strong>Этап 2: Снятие</strong><span>старого грунта</span></li>' +
        '<li><strong>Этап 3: Планировка</strong><span>участка</span></li>' +
        '<li><strong>Этап 4: Установка</strong><span>автополива</span></li>' +
        '<li><strong>Этап 5: Доставка</strong><span>и укладка рулонного газона</span></li>' +
        '<li><strong>Этап 6: Подписываем</strong><span>акт выполненных работ и даем гарантию на 2 года</span></li>' +
      '</ol>';

    var demolitionContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Demolition/cower.jpg" alt="Снос, демонтаж дома" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Снос, демонтаж дома</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Что мы можем снести</h3>' +
        '<div class="service-types">' +
          '<article class="service-type"><img class="service-type-image" src="Demolition/demolition-service1.png" alt="Снос деревянных домов" /><h4>Деревянные</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Demolition/demolition-service2.png" alt="Снос дачных домов" /><h4>Дачные</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Demolition/demolition-service3.png" alt="Снос домов после пожара" /><h4>После пожара</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Demolition/demolition-service4.png" alt="Снос кирпичных домов" /><h4>Кирпичные</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Demolition/demolition-service5.png" alt="Снос каркасных домов" /><h4>Каркасные</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Demolition/demolition-service6.png" alt="Снос бань" /><h4>Бани</h4></article>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему лучше заказать снос дома именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Своя база<br>спецтехники</h3>' +
        '<p>- экскаваторы - разрушители 24м, 32м, 46м<br>- крашер на базе гусеничного экскаватора<br>- экскаватор с гидромолотом<br>- самосвалы</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Вывоз строительного<br>мусора после сноса<br>зданий</h3>' +
        '<p>При желании клиента, сохраним материалы<br>для повторного использования</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Разработка и согласование<br>полного пакета документации<br>(ППР) для выполнения работ<br>по сносу - от разработки проекта<br>до снятия здания с баланса</h3>' +
      '</div>' +
      '<h3 class="service-detail-heading">Вид дома/строение</h3>' +
      '<div class="service-types">' +
        '<article class="service-type"><h4>Снос каркасно-щитового дома</h4></article>' +
        '<article class="service-type"><h4>Снос частного дома из бревна или бруса</h4></article>' +
        '<article class="service-type"><h4>Снос кирпичного дома</h4></article>' +
        '<article class="service-type"><h4>Снос части жилого дома</h4></article>' +
        '<article class="service-type"><h4>Снос строений</h4></article>' +
        '<article class="service-type"><h4>Снос сараев и пристроек</h4></article>' +
        '<article class="service-type"><h4>Снос металлоконструкций</h4></article>' +
      '</div>';

    var garbageContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Garbage/cower.jpg" alt="Вывоз строительного мусора" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Вывоз строительного<br>мусора Москва и МО</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать данную услугу именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Только<br>опытные мастера!</h3>' +
        '<p>более 127 выполненных работ и такое<br>же количество довольных клиентов</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Экономия денег на<br>поставке материалов.</h3>' +
        '<p>В смете по закупным<br>- оптовым ценам!</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Гарантия на выполненные<br>работы</h3>' +
        '<p><strong>2 года гарантии</strong><br>на все выполненные работы</p>' +
      '</div>';

    var snowRemovalContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="SnowRemoval/cower.jpg" alt="Вывоз снега" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Вывоз снега Москва и МО</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать данную услугу именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Только<br>опытные мастера!</h3>' +
        '<p>более 127 выполненных работ и такое<br>же количество довольных клиентов</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Экономия денег на<br>поставке материалов.</h3>' +
        '<p>В смете по закупным<br>- оптовым ценам!</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Гарантия на выполненные<br>работы</h3>' +
        '<p><strong>2 года гарантии</strong><br>на все выполненные работы</p>' +
      '</div>';

    var excavationContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Excavation/cower.jpg" alt="Вывоз грунта" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Вывоз грунта с<br>утилизацией</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать вывоз грунта именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Собственный автопарк<br>спецтехники</h3>' +
        '<p>Более 350 тыс.м3 тонн грунта было<br>утилизировано нами за 2020 год!</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Подача техники на<br>объект от</h3>' +
        '<p>30 минут</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Вывоз грунта на официальные<br>полигоны Москвы и МО с<br>закрывающими документами<br>и талонами</h3>' +
      '</div>' +
      '<h3 class="service-detail-heading">Варианты вывоза грунта (полный или поэтапный)</h3>' +
      '<div class="service-about">' +
        '<h3>Вывоз и утилизация грунта<br>с погрузкой</h3>' +
        '<p>Наша компания осуществляет полный комплекс работ по вывозу грунта, мы готовы предоставить услуги вывоза с погрузкой. Для этого на объект подается мощный гусеничный экскаватор или экскаватор-погрузчик нашей компании. Это значительно сэкономит время.</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Вывоз и утилизация грунта с<br>Вашей погрузкой</h3>' +
        '<p>Если техника, которая, будет осуществлять погрузку Вам не требуется, то мы просто отправим самосвалы и оперативно освоим весь объем. Наша техника готова работать круглосуточно, что позволяет вывозить более тысячи метров кубических материала за один день.</p>' +
      '</div>';

    var apronContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Apron/cower.jpg" alt="Отмостка вокруг дома" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Отмостка вокруг дома</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать отмостку вокруг дома именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Только<br>опытные мастера!</h3>' +
        '<p>более 200 выполненных работ и такое<br>же количество довольных клиентов</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Экономия денег на<br>поставке материалов.</h3>' +
        '<p>В смете по закупным -<br>оптовым ценам!</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Гарантия на выполненные<br>работы</h3>' +
        '<p><strong>2 года гарантии</strong><br>на все выполненные работы</p>' +
      '</div>' +
      '<h3 class="service-detail-heading">Виды отмосток и порядок</h3>' +
      '<div class="service-types">' +
        '<article class="service-type">' +
          '<h4>Отмостка из брусчатки<br>Под Ключ</h4>' +
          '<ul>' +
            '<li>выемка грунта 25 - 35 см</li>' +
            '<li>подготовка основания</li>' +
            '<li>укладка геотекстиля</li>' +
            '<li>отсыпка песка (8-12 см) и трамбовка</li>' +
            '<li>отсыпка щебня (8-12 см) и трамбовка</li>' +
            '<li>подготовка основания цементно-песчаной смесью</li>' +
            '<li>укладка брусчатки</li>' +
          '</ul>' +
        '</article>' +
        '<article class="service-type">' +
          '<h4>Отмостка вокруг дома из<br>тротуарной плитки Под Ключ</h4>' +
          '<ul>' +
            '<li>выемка грунта 25 - 35 см</li>' +
            '<li>подготовка основания</li>' +
            '<li>укладка геотекстиля</li>' +
            '<li>отсыпка песка (8-12 см) и трамбовка</li>' +
            '<li>отсыпка щебня (8-12 см) и трамбовка</li>' +
            '<li>подготовка основания цементно-песчаной смесью</li>' +
            '<li>укладка брусчатки</li>' +
            '<li>затирка швов</li>' +
          '</ul>' +
        '</article>' +
        '<article class="service-type">' +
          '<h4>Отмостка вокруг дома<br>из асфальта Под Ключ</h4>' +
          '<ul>' +
            '<li>выемка грунта 25 - 35 см</li>' +
            '<li>подготовка основания</li>' +
            '<li>укладка геотекстиля</li>' +
            '<li>отсыпка песка (8-12 см) и трамбовка</li>' +
            '<li>отсыпка щебня (8-12 см) и трамбовка</li>' +
            '<li>нанесение битумной эмульсии</li>' +
            '<li>асфальтобетонная смесь</li>' +
          '</ul>' +
        '</article>' +
        '<article class="service-type">' +
          '<h4>Отмостка вокруг дома<br>из бетона Под Ключ</h4>' +
          '<ul>' +
            '<li>выемка грунта 25 - 35 см</li>' +
            '<li>подготовка основания</li>' +
            '<li>укладка геотекстиля</li>' +
            '<li>отсыпка песка (8-12 см) и трамбовка</li>' +
            '<li>отсыпка щебня (8-12 см) и трамбовка</li>' +
            '<li>укладка дорожной сетки 3х50х50</li>' +
            '<li>монтаж деформационных швов из досок</li>' +
            '<li>бетонирование в ручную 10 см (М350)</li>' +
          '</ul>' +
        '</article>' +
        '<article class="service-type">' +
          '<h4>Отмостка вокруг дома<br>из бетона (утепленная) Под Ключ</h4>' +
          '<ul>' +
            '<li>выемка грунта 25 - 35 см</li>' +
            '<li>подготовка основания</li>' +
            '<li>укладка геотекстиля</li>' +
            '<li>отсыпка песка (8-12 см) и трамбовка</li>' +
            '<li>отсыпка щебня (8-12 см) и трамбовка</li>' +
            '<li>укладка утеплителя 10 см</li>' +
            '<li>укладка дорожной сетки 3х50х50</li>' +
            '<li>монтаж деформационных швов из досок</li>' +
            '<li>бетонирование в ручную 10 см (М350)</li>' +
          '</ul>' +
        '</article>' +
        '<article class="service-type">' +
          '<h4>Отмостка вокруг дома из<br>резинового покрытия Под Ключ</h4>' +
          '<ul>' +
            '<li>выемка грунта 25 - 35 см</li>' +
            '<li>подготовка основания</li>' +
            '<li>укладка геотекстиля</li>' +
            '<li>отсыпка песка (8-12 см) и трамбовка</li>' +
            '<li>отсыпка щебня (8-12 см) и трамбовка</li>' +
            '<li>нанесение клея</li>' +
            '<li>резиновое покрытие</li>' +
          '</ul>' +
        '</article>' +
      '</div>' +
      '<h3 class="service-detail-heading service-detail-heading--scroll">Дополнительные работы</h3>' +
      '<p class="service-scroll-hint">Прокрутите влево, чтобы увидеть все варианты</p>' +
      '<p>При строительстве устройства отмоски часто возникают следующие дополнительные работы</p>' +
      '<div class="service-types">' +
        '<article class="service-type service-type--bottom-text"><img class="service-type-image" src="Apron/type1_garden_border2.png" alt="Установка садового бордюра" /><h4>Установка<br>садового<br>бордюра</h4></article>' +
        '<article class="service-type service-type--bottom-text"><img class="service-type-image" src="Apron/type2_rain2.png" alt="Установка водоотводных лотков или дождеприемников" /><h4>Установка<br>водоотводных<br>лотков или<br>дождеприемников</h4></article>' +
        '<article class="service-type service-type--bottom-text"><img class="service-type-image" src="Apron/type3_geomembrane2.png" alt="Гидроизоляция фундамента геомембраной" /><h4>Гидроизоляция<br>фундамента<br>геомембраной</h4></article>' +
      '</div>';

    var gradingContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Grading/cower.jpg" alt="Планировка участка в отметку" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Планировка участка<br>в отметку</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать планировку участка именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-benefits">' +
        '<article class="service-benefit"><h4>Выполняем выравнивание участка с помощью трактора, мотоблока или погрузчиком JCB</h4></article>' +
        '<article class="service-benefit"><h4>Выравним Ваш участок, площадью 10-15 соток, за 1 день</h4></article>' +
        '<article class="service-benefit"><h4>Кардинально изменим внешний вид Вашей территории</h4></article>' +
      '</div>' +
      '<h3 class="service-detail-heading">Способы планирования участка</h3>' +
      '<div class="service-about">' +
        '<h3>Выравнивание участка с помощью трактора или мотоблока</h3>' +
        '<p>Данный способ дробит почву с использованием различной техники, а затем его разравнивает. Для выравнивания участков мы используем трактор Avant или мотоблок Husqvarna. Рыхление почвы не превышает глубину двадцати сантиметров ( в противном случаи , более глубинная раскопка может поднять низлежащие слои супеси и суглинка).</p>' +
        '<p>После рыхления вручную удаляется ненужная растительность и разравнивается территория.</p>' +
        '<p>Таким способом выравнивается участок и удаляются все ямы и кочки. Также подготавливается основание под газон. В цену входит только уплотнение грунта. Чтобы разровнять свободные от построек участки мы используем погрузчик JCB.</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Отсыпка участка грунтом</h3>' +
        '<p>Единственный и оптимальный способ выравнивания уклона и повышения уровня земли -отсыпка участка грунтом. Тип грунта зависит от намерений и перепадов. Материал для выравниваний доставляем на своём транспорте.</p>' +
        '<p>Распределение происходит ручным методом или с помощью прогрузчика. При помощи высотной съемки нивелиром, вычисляется объем и стоимость грунта для выравнивания территории.</p>' +
        '<p>Стоимость услуги формируется из количества материала и метода разделения.</p>' +
      '</div>';

    var stepsContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Steps/cower.jpg" alt="Облицовка крыльца" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Облицовка крыльца, ступеней<br>"Под Ключ"</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать облицовку крыльца именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-benefits">' +
        '<article class="service-benefit"><h4>Своя база спецтехники</h4><p>Асфальтоукладчики, дорожная фреза,<br>Катки асфальтные, грунтовые экскаваторы ...</p><strong>38 единиц спецтехники</strong></article>' +
        '<article class="service-benefit"><h4>Экономия денег на<br>поставке материалов</h4><p>В смете по закупным - оптовым ценам!</p></article>' +
        '<article class="service-benefit"><h4>Гарантируем качественную работу</h4><p>Соблюдаем все сроки и нормативные нормы.<br>Более 150 успешных проектов</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Только опытные мастера!</h3>' +
        '<p>более 127 выполненных работ и такое же количество довольных клиентов</p>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Гарантия на выполненные работы</h3>' +
        '<p><strong>2 года гарантии</strong> на все выполненные работы</p>' +
      '</div>' +
      '<div class="gallery-grid"></div>';

    var pitContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Pit/cower.jpg" alt="Разработка котлована" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Рытье котлованов под<br>фундамент</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="service-detail-heading">Почему выгоднее заказать рытье котлованов именно у нас?</h3>' +
      '<div class="service-flow">' +
        '<article><span class="service-flow-num">01</span><h4>Гарантия<br>лучшей цены!</h4><p>Найдете дешевле -<br>снизим цену</p></article>' +
        '<article><span class="service-flow-num">02</span><h4>Все виды<br>оплат</h4><p>Оплата наличным и<br>безналичным расчетом</p></article>' +
        '<article><span class="service-flow-num">03</span><h4>Стоимость<br>работ по смете</h4><p>Никаких лишних оплат во<br>время и после работы</p></article>' +
        '<article><span class="service-flow-num">04</span><h4>Быстрое<br>решение задач</h4><p>Не срываем сроки,<br>работаем 24/7</p></article>' +
        '<article><span class="service-flow-num">05</span><h4>Высокое<br>качество работ</h4><p>Строго соблюдаем<br>требования ГОСТ, СНиП</p></article>' +
      '</div>' +
      '<div class="service-benefits">' +
        '<article class="service-benefit"><h4>Своя база спецтехники</h4><p>Асфальтоукладчики, дорожная фреза,<br>Катки асфальтные, грунтовые экскаваторы ...</p><strong>38 единиц спецтехники</strong></article>' +
        '<article class="service-benefit"><h4>Рытьё котлована<br>под любые цели</h4><p>- при фундаментных работах<br>- для установки септиков<br>- при организации погреба<br>- для обустройства искусственного водоёма</p></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Вид ремонта</h3>' +
        '<ul class="service-list">' +
          '<li>Разработка котлована механизированным способом в отвал</li>' +
          '<li>Разработка котлована механизированным способом с погрузкой</li>' +
          '<li>Перевозка грунта на расстояние до 1км (по месту)</li>' +
          '<li>Вывоз грунта на расстояние до 50 км</li>' +
          '<li>Обратная засыпка котлована грунтом из отвала с послойным уплотнением</li>' +
          '<li>Обратная засыпка котлована песком с послойным уплотнением</li>' +
          '<li>Доработка грунта вручную</li>' +
        '</ul>' +
      '</div>' +
      '<h3 class="service-detail-heading">Этапы проведения работ по рытью</h3>' +
      '<ol class="service-stages">' +
        '<li><strong>Этап 1: Выезд на объект</strong><span>для оценки фронта работ, разработки сметы проекта. Бесплатно!</span></li>' +
        '<li><strong>Этап 2: Геодезическая разбивка</strong><span>определяется точное местоположение выемки, ее размеры и углы.</span></li>' +
        '<li><strong>Этап 3: Разведочные траншеи</strong><span>Производится копание разведочных траншей</span></li>' +
        '<li><strong>Этап 4: Обноска</strong><span>Цель - зафиксировать контуры будущей постройки</span></li>' +
        '<li><strong>Этап 5: Откопка</strong><span>вручную или с помощью экскаваторов</span></li>' +
        '<li><strong>Этап 6: Выемка земли</strong><span></span></li>' +
        '<li><strong>Этап 7: Вывоз грунта</strong><span>Часть грунта вывозится за пределы населенного пункта, часть – остается на площадке для обратной засыпки</span></li>' +
        '<li><strong>Этап 8: Засыпка грунта</strong><span>Выполняется по завершении монтажа фундамента с двух сторон возводимой постройки</span></li>' +
      '</ol>' +
      '<div class="service-about">' +
        '<h3>Только<br>опытные мастера!</h3>' +
        '<p>более 200 выполненных работ и такое<br>же количество довольных клиентов</p>' +
      '</div>';

    var asphaltSubcategories = {
      roadAsphaltPaving: {
        title: 'Асфальтирование дорог',
        folder: 'asphaltSubCategory/roadAsphaltPaving/',
        thumbnail: 'asphaltSubCategory/roadAsphaltPaving/RoadAsphaltPaving.png',
        description: 'Устройство и восстановление асфальтового покрытия на автомобильных дорогах: подготовка основания, укладка асфальтобетонной смеси, уплотнение и выравнивание.',
        content: roadAsphaltPavingContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
      asphaltPavingAreas: {
        title: 'Асфальтирование территорий',
        folder: 'asphaltSubCategory/asphaltPavingAreas/',
        thumbnail: 'asphaltSubCategory/asphaltPavingAreas/AsphaltPavingAreas.png',
        description: 'Асфальтирование парковок, складских, производственных и общественных территорий с учётом нагрузки и требований к покрытию.',
        content: asphaltPavingAreasContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
      plotAsphaltPaving: {
        title: 'Асфальтирование участков',
        folder: 'asphaltSubCategory/plotAsphaltPaving/',
        thumbnail: 'asphaltSubCategory/plotAsphaltPaving/PlotAsphaltPaving.png',
        description: 'Асфальтирование частных дворов, подъездных путей и придомовых участков — аккуратно, с подготовкой основания и качественной укладкой.',
        content: plotAsphaltPavingContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
      potholeRepair: {
        title: '',
        folder: 'asphaltSubCategory/potholeRepair/',
        thumbnail: 'asphaltSubCategory/potholeRepair/PotholeRepair.png',
        description: '',
        content: potholeRepairContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
      asphaltMillings: {
        title: 'Укладка асфальтной крошки',
        folder: 'asphaltSubCategory/asphaltMillings/',
        thumbnail: 'asphaltSubCategory/asphaltMillings/asphaltMillings.png',
        description: '',
        content: asphaltMillingsContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
    };

    var categories = {
      'Pavers': {
        title: 'Брусчатка',
        folder: 'Pavers/',
        description: 'Работы по укладке брусчатки.',
        thumbnail: 'thumbnails/Брусчатка.png',
        content: paversContent,
        images: ['pavers1.jpeg','pavers2.jpeg','pavers3.jpeg','pavers4.jpeg','pavers5.jpeg','pavers6.jpeg','pavers7.jpeg','pavers8.jpeg','pavers9.jpeg']
      },
      'Asphalt': {
        title: 'Асфальт',
        folder: 'Asphalt/',
        description: 'Примеры асфальтирования дворов и участков.',
        thumbnail: 'thumbnails/Асфальт.png',
        images: ['Asphalt1.jpg']
      },
      'Landscape': {
        title: '',
        folder: 'Landscape/',
        description: '',
        thumbnail: 'thumbnails/Ландшафт.png',
        content: landscapeContent,
        images: ['Landscape1.jpg','Landscape2.jpg','Landscape3.jpg','Landscape4.jpg']
      },
      'Lawn': {
        title: 'Газон и полив',
        folder: 'Lawn/',
        description: 'Устройство газона и систем полива.',
        thumbnail: 'thumbnails/Газон и полив.png',
        images: ['Lawn1.jpg']
      },
      'RolledLawn': {
        title: '',
        folder: 'RolledLawn/',
        description: '',
        thumbnail: 'thumbnails/RolledLawn.png',
        content: rolledLawnContent,
        images: ['1.jpg','2.jpg','3.jpg','4.jpg']
      },
      'Flagstone': {
        title: '',
        folder: 'Flagstone/',
        description: '',
        thumbnail: 'thumbnails/Дикий камень.png',
        content: flagstoneContent,
        images: ['1.jpeg','2.jpeg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg']
      },
      'Lighting': {
        title: 'Освещение',
        folder: 'Lighting/',
        description: 'Освещение участка, территории, террасы.',
        thumbnail: 'thumbnails/Lighting.png',
        content: lightingContent,
        images: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.png']
      },
      'Steps': {
        title: '',
        folder: 'Steps/',
        description: '',
        thumbnail: 'thumbnails/steps.png',
        content: stepsContent,
        images: []
      },
      'Pit': {
        title: '',
        folder: 'Pit/',
        description: '',
        thumbnail: 'thumbnails/pit.png',
        content: pitContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
      'Apron': {
        title: 'Отмостка вокруг дома',
        folder: 'Apron/',
        description: 'Устройство и ремонт отмостки вокруг дома и зданий.',
        thumbnail: 'thumbnails/Apron.png',
        content: apronContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
      'Demolition': {
        title: 'Снос, демонтаж дома',
        folder: 'Demolition/',
        description: 'Снос и демонтаж домов, зданий и сооружений.',
        thumbnail: 'thumbnails/Demolition.png',
        content: demolitionContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
      'Garbage': {
        title: 'Вывоз строй мусора',
        folder: 'Garbage/',
        description: 'Вывоз строительного мусора в Москве и МО.',
        thumbnail: 'thumbnails/Garbage.png',
        content: garbageContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
      'SnowRemoval': {
        title: 'Вывоз снега',
        folder: 'SnowRemoval/',
        description: 'Вывоз снега и уборка территории.',
        thumbnail: 'thumbnails/SnowRemoval.png',
        content: snowRemovalContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
      'Excavation': {
        title: 'Вывоз грунта',
        folder: 'Excavation/',
        description: 'Вывоз грунта и земляные работы.',
        thumbnail: 'thumbnails/Excavation.png',
        content: excavationContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
      'Grading': {
        title: 'Планировка участка',
        folder: 'Grading/',
        description: 'Планировка и выравнивание участка.',
        thumbnail: 'thumbnails/grading.png',
        content: gradingContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
      'Gravelling': {
        title: 'Отсыпка дороги или участка щебнем',
        folder: 'asphaltSubCategory/graveling/',
        description: 'Отсыпка и выравнивание дорог и участков щебнем различной фракции.',
        thumbnail: 'asphaltSubCategory/graveling/graveling.png',
        content: gravelingContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
      },
      'Curb': {
        title: 'Бордюр',
        folder: 'Curb/',
        description: 'Установка бордюров и разделение зон.',
        thumbnail: 'thumbnails/бордюр.png',
        content: curbContent,
        images: ['curb1.jpeg','2.jpg','3.jpg','4.jpg']
      },
      'Drainage': {
        title: 'Дренаж',
        folder: 'Drainage/',
        description: 'Дренажные работы «Под Ключ».',
        thumbnail: 'thumbnails/Дренаж и септик.png',
        content: drainageContent,
        images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']
      },
      'Concreting': {
        title: '',
        folder: 'Concreting/',
        description: '',
        thumbnail: 'thumbnails/Бетонирование.png',
        content: concretingContent,
        images: ['1.jpg','2.jpg','3.jpg','4.jpg','5.png']
      },
      'Rubber': {
        title: '',
        folder: 'Rubber/',
        description: '',
        thumbnail: 'thumbnails/резин.png',
        content: rubberContent,
        images: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg']
      }
    };

    var params = new URLSearchParams(window.location.search);
    var category = params.get('category');
    var sub = params.get('sub');
    var title = document.getElementById('gallery-title');
    var description = document.getElementById('gallery-description');
    var help = document.getElementById('gallery-help');
    var galleryBack = document.getElementById('gallery-back');
    var galleryContent = document.getElementById('gallery-content');
    var subcategoriesEl = document.getElementById('gallery-subcategories');
    var sectionHeading = document.getElementById('gallery-section-heading');

    function renderGalleryImages(folder, images, alt){
      return images.map(function(img){
        return '<div class="gallery-item"><img src="' + folder + img + '" alt="' + alt + '"></div>';
      }).join('');
    }

    function clearAsphaltExtras(){
      if(subcategoriesEl) subcategoriesEl.innerHTML = '';
      if(galleryBack) galleryBack.innerHTML = '';
      if(galleryContent) galleryContent.innerHTML = '';
      if(sectionHeading){ sectionHeading.textContent = 'Примеры выполненных нами работ'; sectionHeading.hidden = false; }
      if(title) title.hidden = false;
      if(description) description.hidden = false;
    }

    if(worksGallery){
      var worksCategories = ['Pavers','Asphalt','Landscape','Lawn','RolledLawn','Flagstone','Curb','Drainage', 'Lighting', 'Steps', 'Pit', 'Apron', 'Grading', 'Demolition', 'Garbage', 'SnowRemoval', 'Excavation'];
      var items = [];
      worksCategories.forEach(function(key){
        var cat = categories[key];
        if(!cat || !cat.images) return;
        cat.images.forEach(function(img){
          items.push('<div class="gallery-item"><img src="' + cat.folder + img + '" alt="' + cat.title + '"></div>');
        });
      });
      worksGallery.innerHTML = items.join('');
      return;
    }

    if(category === 'Asphalt' && sub && asphaltSubcategories[sub]){
      var currentSub = asphaltSubcategories[sub];
      if(title){
        if(sub === 'plotAsphaltPaving' || sub === 'potholeRepair' || sub === 'asphaltPavingAreas' || sub === 'roadAsphaltPaving' || sub === 'graveling' || sub === 'asphaltMillings'){
          title.hidden = true;
        } else {
          title.hidden = false;
          title.textContent = currentSub.title;
        }
      }
      if(description){
        if(sub === 'plotAsphaltPaving' || sub === 'potholeRepair' || sub === 'asphaltPavingAreas' || sub === 'roadAsphaltPaving' || sub === 'graveling' || sub === 'asphaltMillings'){
          description.hidden = true;
        } else {
          description.hidden = false;
          description.textContent = currentSub.description;
        }
      }
      if(galleryContent) galleryContent.innerHTML = currentSub.content || '';
      if(help) help.innerHTML = '';
      if(sectionHeading){ sectionHeading.textContent = 'Примеры выполненных нами работ'; sectionHeading.hidden = false; }
      if(galleryBack) galleryBack.innerHTML = '<a href="gallery.html?category=Asphalt">← Назад к асфальту</a>';
      if(subcategoriesEl) subcategoriesEl.innerHTML = '';
      if(sectionHeading){
        sectionHeading.textContent = 'Примеры работ';
        sectionHeading.hidden = false;
      }
      galleryGrid.innerHTML = renderGalleryImages(currentSub.folder, currentSub.images, currentSub.title);
      return;
    }

    if(category && categories[category]){
      var current = categories[category];
      if(category === 'Asphalt' || category === 'Curb' || category === 'Pavers' || category === 'Gravelling' || category === 'Lighting' || category === 'Drainage' || category === 'Apron' || category === 'Demolition' || category === 'Garbage' || category === 'SnowRemoval' || category === 'Excavation' || category === 'Flagstone' || category === 'Landscape' || category === 'RolledLawn' || category === 'Concreting' || category === 'Rubber' || category === 'Steps' || category === 'Pit'){
        if(title) title.hidden = true;
        if(description) description.hidden = true;
      } else {
        if(title) title.textContent = current.title + ' — Галерея';
        if(description) description.textContent = current.description;
      }
      if(help) help.innerHTML = '';

      if(category === 'Asphalt'){
        if(galleryBack) galleryBack.innerHTML = '';
        if(subcategoriesEl){
          subcategoriesEl.innerHTML = Object.keys(asphaltSubcategories).map(function(key){
            var subCat = asphaltSubcategories[key];
            return '<a class="card" href="gallery.html?category=Asphalt&sub=' + key + '"><figure><img src="' + subCat.thumbnail + '" alt="' + subCat.title + '"><figcaption>' + subCat.title + '</figcaption></figure></a>';
          }).join('');
        }
        if(sectionHeading) sectionHeading.hidden = false;
        var roadGallery = asphaltSubcategories.roadAsphaltPaving;
        galleryGrid.innerHTML = renderGalleryImages(current.folder, current.images, current.title) +
          renderGalleryImages(roadGallery.folder, roadGallery.images, roadGallery.title);
        return;
      }

      clearAsphaltExtras();
      if(galleryContent) galleryContent.innerHTML = current.content || '';
      galleryGrid.innerHTML = renderGalleryImages(current.folder, current.images, current.title);
    } else {
      clearAsphaltExtras();
      if(title) title.textContent = 'Галерея работ';
      if(description) description.textContent = 'Выберите категорию, чтобы посмотреть примеры выполненных работ.';
      if(help) help.innerHTML = '';
      galleryGrid.innerHTML = Object.keys(categories).map(function(key){
        var cat = categories[key];
        return '<a class="card" href="gallery.html?category=' + encodeURIComponent(key) + '"><figure><img src="' + cat.thumbnail + '" alt="' + cat.title + '"><figcaption>' + cat.title + '</figcaption></figure></a>';
      }).join('');
    }
  }
})();
