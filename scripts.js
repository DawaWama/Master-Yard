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

  function initClientReviewToggles(container){
    if(!container) return;
    container.querySelectorAll('.client-review-toggle').forEach(function(btn){
      btn.addEventListener('click', function(){
        var card = btn.closest('.client-review-card');
        var text = card && card.querySelector('.client-review-text');
        if(!text) return;
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', (!expanded).toString());
        text.classList.toggle('is-expanded', !expanded);
        btn.textContent = expanded ? 'читать дальше' : 'скрыть';
      });
    });
  }

  function renderClientReviews(reviewsEl, reviews){
    if(!reviewsEl) return;
    if(!reviews || !reviews.length){
      reviewsEl.hidden = true;
      reviewsEl.innerHTML = '';
      return;
    }
    reviewsEl.hidden = false;
    reviewsEl.innerHTML =
      '<h3 class="gallery-section-heading">Реальные отзывы довольных клиентов</h3>' +
      '<div class="client-reviews-grid">' +
      reviews.map(function(review){
        var stars = '';
        for(var i = 0; i < review.rating; i++) stars += '★';
        var avatarHtml = review.avatar
          ? '<img class="client-review-avatar" src="' + review.avatar + '" alt="' + review.name + '" width="64" height="64" />'
          : '';
        return '<article class="client-review-card">' +
          '<div class="client-review-header">' +
            avatarHtml +
            '<div class="client-review-info">' +
              '<h4 class="client-review-name">' + review.name + '</h4>' +
              '<div class="client-review-stars" aria-label="' + review.rating + ' из 5">' + stars + '</div>' +
              '<p class="client-review-meta">' + review.location + '</p>' +
              '<p class="client-review-service">' + review.service + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="client-review-text">' +
            '<p>' + review.text + '</p>' +
          '</div>' +
          '<button type="button" class="client-review-toggle" aria-expanded="false">читать дальше</button>' +
        '</article>';
      }).join('') +
      '</div>';
    initClientReviewToggles(reviewsEl);
  }

  function initGallery(){
    var galleryGrid = document.getElementById('gallery-grid');
    var worksGallery = document.getElementById('works-gallery');
    var galleryReviews = document.getElementById('gallery-reviews');

    var roadAsphaltPavingContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="asphaltSubCategory/roadAsphaltPaving/cower_asphalt.avif" alt="Асфальтирование дорог" />' +
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
          '<img class="service-type-image" src="asphaltSizes/1_4.avif" alt="Асфальтирование на готовом основании" />' +
          '<h4>Асфальтирование<br>на готовом основании</h4>' +
          '<p>Данный вид асфальтирования применяется при условии, что основание ровное и как правило бетонное. Предварительно поверхность обрабатывается битумной эмульсией.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/2_4.avif" alt="Асфальтирование с выравнивающим слоем" />' +
          '<h4>Асфальтирование с<br>выравнивающим слоем</h4>' +
          '<p>Если на основании есть ямы, требуется предварительное вываривание технологическим слоем. После чего производится укладка финишного слоя асфальта.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/3_4.avif" alt="Асфальтирование по щебёночному основанию" />' +
          '<h4>Асфальтирование по щебёночному основанию</h4>' +
          '<p>Бюджетный вариант асфальтирования, используется при необходимости создать с нуля крепкое основание в условиях ограниченного бюджета.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/4_4.avif" alt="Асфальтирование по щебёночно-песчаному основанию" />' +
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
          '<img class="service-cover" src="asphaltSubCategory/potholeRepair/cower.avif" alt="Ямочный ремонт" />' +
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
          '<img class="service-cover" src="asphaltSubCategory/asphaltPavingAreas/cower.avif" alt="Асфальтирование территорий" />' +
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
          '<img class="service-type-image" src="asphaltSizes/1_4.avif" alt="Асфальтирование на готовом основании" />' +
          '<h4>Асфальтирование<br>на готовом основании</h4>' +
          '<p>Данный вид асфальтирования применяется при условии, что основание ровное и как правило бетонное. Предварительно поверхность обрабатывается битумной эмульсией.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/2_4.avif" alt="Асфальтирование с выравнивающим слоем" />' +
          '<h4>Асфальтирование с<br>выравнивающим слоем</h4>' +
          '<p>Если на основании есть ямы, требуется предварительное вываривание технологическим слоем. После чего производится укладка финишного слоя асфальта.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/3_4.avif" alt="Асфальтирование по щебёночному основанию" />' +
          '<h4>Асфальтирование по щебёночному основанию</h4>' +
          '<p>Бюджетный вариант асфальтирования, используется при необходимости создать с нуля крепкое основание в условиях ограниченного бюджета.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/4_4.avif" alt="Асфальтирование по щебёночно-песчаному основанию" />' +
          '<h4>Асфальтирование по<br>щебёночно-песчаному основанию</h4>' +
          '<p>Данный вид асфальтирования применяется при условии, что основание ровное и как правило бетонное. Предварительно поверхность обрабатывается битумной эмульсией.</p>' +
        '</article>' +
      '</div>';

    var plotAsphaltPavingContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="asphaltSubCategory/plotAsphaltPaving/cower_plotAsphaltPaving.avif" alt="Асфальтирование участков" />' +
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
          '<img class="service-type-image" src="asphaltSizes/1_4.avif" alt="Асфальтирование на готовом основании" />' +
          '<h4>Асфальтирование<br>на готовом основании</h4>' +
          '<p>Данный вид асфальтирования применяется при условии, что основание ровное и как правило бетонное. Предварительно поверхность обрабатывается битумной эмульсией.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/2_4.avif" alt="Асфальтирование с выравнивающим слоем" />' +
          '<h4>Асфальтирование с<br>выравнивающим слоем</h4>' +
          '<p>Если на основании есть ямы, требуется предварительное вываривание технологическим слоем. После чего производится укладка финишного слоя асфальта.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/3_4.avif" alt="Асфальтирование по щебёночному основанию" />' +
          '<h4>Асфальтирование по щебёночному основанию</h4>' +
          '<p>Бюджетный вариант асфальтирования, используется при необходимости создать с нуля крепкое основание в условиях ограниченного бюджета.</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="asphaltSizes/4_4.avif" alt="Асфальтирование по щебёночно-песчаному основанию" />' +
          '<h4>Асфальтирование по<br>щебёночно-песчаному основанию</h4>' +
          '<p>Данный вид асфальтирования применяется при условии, что основание ровное и как правило бетонное. Предварительно поверхность обрабатывается битумной эмульсией.</p>' +
        '</article>' +
      '</div>';

    var gravellingReviews = [{
      name: 'Жданов Олег',
      avatar: 'Avatars/Жданов%20Олег.png',
      rating: 5,
      location: 'Деревня Никифорово 2024',
      service: 'Отсыпка щебнем 35 м²',
      text: 'Заказывал отсыпку щебнем машиноместа на дачном участке. Специалист компании «Мастер двора» приехал на замер на следующий день после звонка в удобное для меня время. Расчет стоимости сделали за 5 минут прямо на месте. После заключения договора провели подготовку основания и отсыпку за 1 день. Щебень качественный, работу выполнили быстро и аккуратно. Результатом полностью доволен!'
    }, {
      name: 'Давиденко Юрий',
      avatar: 'Avatars/Давиденко%20Юрий.png',
      rating: 5,
      location: 'Город Раменское 2025',
      service: 'Отсыпка дороги двумя фракциями 870 м²',
      text: 'Хотим поблагодарить компанию «Мастер двора». Мы с соседями заказывали отсыпку щебнем подъездной дороги к нашим участкам. Сначала сформировали прочное основание, засыпали известняковым щебнем двумя фракциями и тщательно укатали собственным катком. Дорога получилась идеально ровной, все ямы и выбоины закрылись. Приятно удивили оптовые цены на материалы в смете и то, что ремонтные работы закончили даже раньше указанного в договоре срока. Соотношение цены и качества отличное!'
    }, {
      name: 'Роман Андреев',
      avatar: 'Avatars/Роман%20Андреев.png',
      rating: 5,
      location: 'СНТ Барыбино 2026',
      service: 'Отсыпка участка щебнем с покрытием гранитного отсева',
      text: 'Обращались в «Мастер двора» по поводу отсыпки и выравнивания придомовой территории с финишным покрытием гранитным отсевом. Рассматривали разные фирмы, но здесь нам предложили самый прозрачный расчет и гарантию на выполненные работы. У нас была пустая неровная земля — ребята сделали грамотную подготовку, уложили песок и щебень, сверху прошлись отсевом. Участок стал выглядеть очень аккуратно, комфортно и ухоженно. Никаких доплат сверх сметы. Огромное спасибо за качественную работу!'
    }];

    var gravelingContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Gravelling/graveling_cower.avif" alt="Отсыпка дороги или участка щебнем" />' +
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
          '<img class="service-type-image" src="Gravelling/type1_2.avif" alt="Отсыпка щебнем одной фракции" />' +
          '<h4>Отсыпка щебнем<br>одной фракции</h4>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="Gravelling/type2_2.avif" alt="Отсыпка щебнем двумя фракциями" />' +
          '<h4>Отсыпка щебнем<br>двумя фракциями</h4>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="Gravelling/type3_2.avif" alt="Отсыпка щебня с покрытием гранитного отсева" />' +
          '<h4>Отсыпка щебня с<br>покрытием гранитного<br>отсева</h4>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="Gravelling/type4_2.avif" alt="Отсыпка щебня на песчаную подушку двумя фракциями" />' +
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
          '<img class="service-cover" src="Curb/curb_cower.avif" alt="Установка бордюров" />' +
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

    var curbReviews = [{
      name: 'Соколов Александр',
      avatar: 'Avatars/Соколов%20Александр.png',
      rating: 5,
      location: 'г. Балашиха 2023',
      service: 'Установка садовых бордюров и мощение',
      text: 'Обращались в компанию «Мастер двора» для обустройства садовых дорожек и установки садовых бордюров (вибропрессованных 1000х200х80) на участке. Очень порадовало отношение к делу: замерщик выехал в день обращения, смету составили четко по закупным оптовым ценам, без неприятных сюрпризов в процессе. Бордюры поставили идеально ровно, бетонирование основания сделали на совесть. Своя спецтехника у компании реально дает о себе знать — работа кипит, бригады оснащены всем необходимым. Большое спасибо за качественную работу под ключ!'
    }, {
      name: 'Екатерина Морозов',
      avatar: 'Avatars/Екатерина%20Морозов.png',
      rating: 5,
      location: 'г. Красногорск 2024',
      service: 'Установка дорожных бордюров БР 100.30.15',
      text: 'От лица жителей нашего коттеджного поселка выражаем благодарность компании «Мастер двора». Заказывали у них под ключ установку дорожных бордюров БР 100.30.15 и бетонных водостоков вдоль проезжей части. Ребята приехали со своей техникой, материалы доставили строго в оговоренное время по оптовой стоимости. Все сделали аккуратно, соблюдая строительные нормы и уклоны для стока воды. Прошел уже год — нигде ничего не просело и не перекосилось. Настоящие профессионалы своего дела!'
    }, {
      name: 'Михаил Петрович',
      avatar: 'Avatars/Михаил%20Петрович.png',
      rating: 5,
      location: 'г. Одинцово 2024',
      service: 'Установка магистральных и садовых бордюров',
      text: 'Долго выбирали подрядчика для благоустройства придомовой территории и парковки. Остановились на «Мастер двора» и ни разу не пожалели. Фиксированная смета в договоре, официальная гарантия на работы. Сделали все четко: от выезда и точного замера до финальной сдачи объекта. Дорожные и садовые бордюры стоят как влитые. Особая благодарность бригадиру за оперативные консультации и соблюдение сроков. Будем обязательно рекомендовать соседям и друзьям!'
    }];

    var paversReviews = [{
      name: 'Дмитрий Ковалев',
      avatar: 'Avatars/Дмитрий%20Ковалев.png',
      rating: 5,
      location: 'Город Лобня 2024',
      service: 'Укладка газонной решетки и бордюрного камня 310 м²',
      text: 'Нужно было обустроить эко-парковку для двух машин и садовые дорожки. Ребята из «Мастер двора» предложили отличное решение с использованием газонной решетки и вибропрессованных бордюров. Подготовку основания провели на совесть, протрамбовали каждый слой. За один визит закрыли все задачи «под ключ», включая уборку территории после завершения. Отличный сервис и честные цены!'
    }, {
      name: 'Григорий Назаров',
      avatar: 'Avatars/Григорий%20Назаров.png',
      rating: 5,
      location: 'Город Истра 2024',
      service: 'Укладка гранитной брусчатки и установка бордюров 160 м²',
      text: 'Заказывали комплексную укладку брусчатки и водостоков вокруг коттеджа. Сразу чувствуется десятилетний опыт компании — бригада оснащена всем необходимым оборудованием, работа идет четко по технологии. Бордюры вывели ровно по нивелиру, плитку подрезали без сколов. На все работы оформили официальную гарантию на 2 года. Редко сейчас встретишь настолько ответственный подход к делу. Большое спасибо!'
    }, {
      name: 'Артем Васильев',
      avatar: 'Avatars/Артем%20Васильев.png',
      rating: 5,
      location: 'Рабочий поселок Томилино 2024',
      service: 'Укладка брусчатки «Старый Город» 280 м²',
      text: 'Строили дом в Томилино, и к осени встал вопрос благоустройства въезда и пешеходных дорожек. По рекомендации знакомых обратились в «Мастер двора». Специалист замерил объект и буквально за 5 минут сориентировал по всем этапам. Понравилось, что не было никаких скрытых наценок — зафиксировали смету в договоре и приступили. Ребята уложили брусчатку «Старый Город» на песчано-щебеночное основание, установили водостоки и бордюрные камни. Работали слаженно, каждый день за собой убирали. Результатом более чем доволен, покрытие стоит крепко, уклон сделан идеально!'
    }];

    var paversContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Pavers/pavers_cower_image.avif" alt="Укладка тротуарной плитки и брусчатки" />' +
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
        '<article class="service-type"><img class="service-type-image" src="Pavers/type_1.avif" alt="Укладка плитки на готовое основание" /><h4>Укладка плитки<br>(брусчатки) на готовое основание</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Pavers/type_2.avif" alt="Укладка плитки на песчаную подушку" /><h4>Укладка плитки<br>(брусчатки) на песчаную подушку</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Pavers/type_3.avif" alt="Укладка плитки на песчано-щебеночную подушку" /><h4>Укладка плитки<br>(брусчатки) на песчано-<br>щебеночную подушку</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Pavers/type_4.avif" alt="Укладка тротуарной брусчатки с бетонированием" /><h4>Укладка тротуарной<br>брусчатки с бетонированием</h4></article>' +
      '</div>' +
      '<div class="service-about">' +
        '<h3>Популярные виды плитки / брусчатки</h3>' +
        '<div class="service-types">' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style_1.avif" alt="Брусчатка кирпичик" /><h4>Брусчатка кирпичик</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style_2.avif" alt="Тротуарная плитка" /><h4>Тротуарная плитка</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style_3.avif" alt="Брусчатка Старый Город" /><h4>Брусчатка Старый Город</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style_4.avif" alt="Брусчатка Новый Город" /><h4>Брусчатка Новый Город</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style_5.avif" alt="Гранитная брусчатка" /><h4>Гранитная брусчатка</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style_6.avif" alt="Камень песчаник" /><h4>Камень песчаник</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style_7.avif" alt="Клинкерная брусчатка" /><h4>Клинкерная брусчатка</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Pavers/style_8.avif" alt="Газонная решетка" /><h4>Газонная решетка</h4></article>' +
        '</div>' +
      '</div>';

    var landscapeReviews = [{
      name: 'Анатолий Белов',
      avatar: 'Avatars/Анатолий%20Белов.png',
      rating: 5,
      location: 'Город Солнечногорск 2024',
      service: 'Укладка рулонного газона «Под Ключ» 450 м²',
      text: 'Обратились в компанию «Мастер двора» для полного озеленения придомовой территории. Участок был неровный, после строительства оставался мусор и сорняки. Ребята взяли все задачи на себя: провели культивацию, выровняли грунт, постелили специальную сетку от кротов и уложили изумрудный рулонный газон под ключ. Завезли плодородный грунт по оптовым ценам, смету зафиксировали сразу в договоре без скрытых платежей. Прошел месяц — газон прижился идеально, густой и ровный. Огромная благодарность за профессионализм!'
    }, {
      name: 'Наталья и Виктор Жуковы',
      avatar: 'Avatars/Наталья%20и%20Виктор%20Жуковы.png',
      rating: 5,
      location: 'Город Серпухов 2025',
      service: 'Устройство посевного газона с антикротовой сеткой 320 м²',
      text: 'Долго искали подрядчиков для озеленения дачи, так как у нас на участке постоянная проблема с кротами. Специалисты из «Мастер двора» предложили отличный вариант — устройство посевного газона с укладкой антикротовой сетки. Расчет стоимости сделали буквально за пару минут, предложили удобную для нас оплату безналичным расчетом. Бригада работала очень слаженно и быстро, соблюдая все нормы. Дали 2 года гарантии на выполненные работы и дали ценные рекомендации по поливу и уходу. Двор преобразился до неузнаваемости!'
    }];

    var landscapeContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Landscape/landscape_cower.avif" alt="Озеленение участка, территории" />' +
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
        '<article class="service-type"><img class="service-type-image" src="Landscape/type1.avif" alt="Укладка рулонного газона" /><h4>Укладка<br>рулонного газона<br>«Под Ключ»</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Landscape/type2.avif" alt="Устройство посевного газона на готовом основании" /><h4>Устройство<br>посевного газона на<br>готовом основании</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Landscape/type3.avif" alt="Устройство посевного газона «Под Ключ»" /><h4>Устройство<br>посевного газона<br>«Под Ключ»</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Landscape/type4.avif" alt="Устройство посевного газона с антикротовой сеткой" /><h4>Устройство посевного газона<br>с антикротовой сеткой</h4></article>' +
      '</div>';

    var drainageReviews = [{
      name: 'Фадеев Юрий',
      avatar: 'Avatars/Фадеев%20Юрий.png',
      rating: 5,
      location: 'Поселок Селятино 2024',
      service: 'Дренаж участка «Под Ключ»',
      text: 'О собственном доме мечтал давно, но после покупки участка столкнулся с проблемой — из-за высоких грунтовых вод весной и после дождей земля превращалась в болото. Некоторые работы пытался выполнить сам, но без опыта и техники тут делать нечего. Обратился в компанию «Мастер двора». Специалист выехал на замер, оценил особенности почвы и предложил оптимальную дренажную систему. Все сделали под ключ строго по договору и по закупным ценам на материалы. Результатом очень доволен, участок наконец-то сухой!'
    }, {
      name: 'Дубровская Инна',
      avatar: 'Avatars/Дубровская%20Инна.png',
      rating: 5,
      location: 'Город Люберцы 2023',
      service: 'Устройство дренажной системы и водоотвода',
      text: 'Купили дом в Люберцах, и в первую же осень обнаружили, что в цокольном этаже скапливается вода. Для решения проблемы искали проверенных специалистов, знающих грунты Подмосковья. Остановили свой выбор на «Мастер двора». Инженер подробно объяснил технологию, смета оказалась фиксированной и без лишних наценок, плюс оформили официальную гарантию на 2 года. Работу выполнили аккуратно и точно в срок. В подвале теперь сухо при любых ливнях. Рекомендую эту компанию!'
    }, {
      name: 'Игнатов Никита',
      avatar: 'Avatars/Игнатов%20Никита.png',
      rating: 5,
      location: 'Рабочий поселок Овражки 2025',
      service: 'Комплексный дренаж участка и отвод вод',
      text: 'Выражаю благодарность компании «Мастер двора» за проведение гидроизоляционных и дренажных работ на моем участке. Все этапы были выполнены качественно, с соблюдением строительных норм и СНиП. В процессе работы возникали мелкие пожелания по трассировке труб — бригадир все учел без проблем. Смета не выросла ни на рубль, по завершении за собой все убрали. Отличный сервис и честное отношение к клиенту!'
    }];

    var drainageContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Drainage/drainage_cower.avif" alt="Дренажные работы" />' +
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

    var lightingReviews = [{
      name: 'Григорьев Вадим',
      avatar: 'Avatars/Григорьев%20Вадим.png',
      rating: 5,
      location: 'Рабочий поселок Нахабино 2024',
      service: 'Подсветка ландшафта и зоны отдыха',
      text: 'Давно планировал сделать архитектурную подсветку дома и мягкое освещение вдоль садовых дорожек. По совету коллеги обратился в «Мастер двора». Электрик и дизайнер выехали на участок, сняли замеры и предложили отличный проект с энергосберегающими светильниками. Кабель прокладывали под землей в защитных гофрах, аккуратно приподнимая дерн, чтобы не испортить газон. Все материалы завезли по оптовым ценам, смету зафиксировали в договоре. Результат превзошел ожидания — вечером двор выглядит просто волшебно!'
    }, {
      name: 'Алина Колесникова',
      avatar: 'Avatars/Алина%20Колесникова.png',
      rating: 5,
      location: 'Город Дмитров 2025',
      service: 'Комплексное освещение террасы и въездной группы',
      text: 'Хочу поблагодарить коллектив компании «Мастер двора» за прекрасную работу! Нужно было установить автоматическую подсветку въездных ворот и смонтировать контурное освещение открытой террасы. Все сделали «под ключ»: от закупки оборудования до финальной настройки датчиков движения и таймеров. Оплату приняли по безналичному расчету, предоставили гарантию 2 года. Приятно иметь дело с организацией, где ценят время клиента и держат слово по срокам.'
    }, {
      name: 'Егоров Станислав',
      avatar: 'Avatars/Егоров%20Станислав.png',
      rating: 5,
      location: 'Деревня Покровское 2026',
      service: 'Уличная подсветка дорожек и парковки',
      text: 'Искал надежного подрядчика для разводки электрики по участку и установки уличных фонарей. В «Мастер двора» зацепило то, что работают строго по ГОСТ и СНиП, плюс дают гарантию лучшей цены. На замере инженер учел все особенности нашей электросети, помог с выбором влагозащищенных светильников. Бригада сработала быстро и слаженно, за три дня закрыли весь объем, а после себя оставили идеальную чистоту. Освещение работает без сбоев при любой погоде. Однозначно рекомендую!'
    }];

    var lightingContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Lighting/cower.avif" alt="Освещение участка" />' +
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

    var flagstoneReviews = [{
      name: 'Константин Власов',
      avatar: 'Avatars/Константин%20Власов.png',
      rating: 5,
      location: 'Город Раменское 2024',
      service: 'Укладка дикого камня и облицовка цоколя 140 м²',
      text: 'Искали опытных мастеров для укладки песчаника на цоколь дома и садовые дорожки. Обратились в компанию «Мастер двора» и остались в полном восторге. Замерщик приехал оперативно, просчитал смету, и цена оказалась именно такой, на которую мы рассчитывали — за счет поставок камня по оптовым ценам вышло очень выгодно! Работали строжайше по технологии, соблюдая все нормы, швы затерли аккуратно. Дали официальную гарантию 2 года. Камень лежит намертво, вид у участка теперь просто роскошный!'
    }, {
      name: 'Марина и Андрей Шестаковы',
      avatar: 'Avatars/Марина%20и%20Андрей%20Шестаковы.png',
      rating: 5,
      location: 'Город Подольск 2023',
      service: 'Мощение площадки диким камнем 220 м²',
      text: 'Хотели выложить въездную зону и площадку под беседку природным диким камнем. Очень переживали за надежность основания, так как грунт у нас сложный. Специалисты из «Мастер двора» подошли к задаче профессионально: подготовили основание, привезли свою спецтехнику и уложили плитняк идеально ровно. Никаких доплат в процессе не потребовали — все строго по изначально согласованной смете. Оплатили безналичным расчетом, что для нас было очень удобно. Спасибо за отличную работу!'
    }, {
      name: 'Игорь Самойлов',
      avatar: 'Avatars/Игорь%20Самойлов.png',
      rating: 5,
      location: 'Рабочий поселок Ногинск 2025',
      service: 'Укладка плитняка на дорожки и отмостку 175 м²',
      text: 'Выражаю благодарность бригаде «Мастер двора» за оперативность и мастерство. Сроки поджимали, нужно было закончить объект до дождей, и ребята работали действительно быстро и слаженно. Дикий камень подобран идеально по толщине и текстуре, подрезка минимальная и очень аккуратная. Приятно порадовало отношение к клиенту: прозрачный договор, четкое соблюдение СНиП и гарантия на 2 года. Соседи уже ходили смотреть и спрашивали контакты. Однозначно рекомендую!'
    }];

    var flagstoneContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Flagstone/flagstone_cower.avif" alt="Укладка дикого камня" />' +
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
          '<img class="service-cover" src="asphaltSubCategory/asphaltMillings/cower.avif" alt="Укладка асфальтной крошки" />' +
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
        '<article class="service-type"><img class="service-type-image" src="asphaltSubCategory/asphaltMillings/type1.avif" alt="Укладка асфальтовой крошки на готовом основании" /><h4>Укладка асфальтовой крошки<br>на готовом основании</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="asphaltSubCategory/asphaltMillings/type2.avif" alt="Укладка асфальтовой крошки 2 слоя на готовом основании" /><h4>Укладка асфальтовой крошки<br>2 слоя на готовом основании</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="asphaltSubCategory/asphaltMillings/type3.avif" alt="Укладка асфальтовой крошки на щебеночную подушку" /><h4>Укладка асфальтовой крошки<br>на щебеночную подушку</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="asphaltSubCategory/asphaltMillings/type4.avif" alt="Укладка асфальтовой крошки на песчано - щебеночную подушку" /><h4>Укладка асфальтовой крошки<br>на песчано - щебеночную подушку</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="asphaltSubCategory/asphaltMillings/type5.avif" alt="Укладка асфальтовой крошки в 2 слоя на песчано - щебеночную подушку" /><h4>Укладка асфальтовой крошки<br>в 2 слоя на песчано - щебеночную подушку</h4></article>' +
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

    var concretingReviews = [{
      name: 'Наталья Сергеевна',
      avatar: 'Avatars/Наталья%20Сергеевна.png',
      rating: 5,
      location: 'Поселок Северный 2023',
      service: 'Бетонирование площадки 230 м²',
      text: 'На дачном участке много лет простаивала старая бетонная площадка от прежних владельцев — неровная, потрескавшаяся и заросшая травой. Всё не доходили руки ее демонтировать и сделать нормальную зону под беседку и отдыха. В интернете наткнулась на сайт компании «Мастер двора», изучила услуги и позвонила. Самой разобраться в объемах и закупках бетона было сложно, но мне буквально за 5 минут все подробно рассчитали и объяснили. В тот же день приехал специалист на замер, фиксированную смету прописали в договоре. Работу сделали быстро и на совесть: аккуратно залили раствор, выровняли идеальную площадку и убрали мусор. Отличные мастера!'
    }, {
      name: 'Артем Зайцев',
      avatar: 'Avatars/Артем%20Зайцев.png',
      rating: 5,
      location: 'Деревня Жостово 2025',
      service: 'Бетонирование площадки под авто на песчано-щебеночном основании 110 м²',
      text: 'Нужна была прочная бетонная парковка перед домом. Обратился в «Мастер двора», так как привлекла честная смета по оптовым ценам на материалы и наличие собственной спецтехники. Бригада приехала точно в оговоренное время. Сняли грунт, уложили геотекстиль, сделали полноценное песчано-щебеночное основание, установили опалубку с армирующей сеткой и залили бетон строго по технологии. Порадовала прозрачность оплаты и четкое соблюдение СНиП. Площадка получилась идеально ровной и крепкой. Буду обращаться к ним еще и для бетонирования садовых дорожек!'
    }, {
      name: 'Вадим Карташов',
      avatar: 'Avatars/Вадим%20Карташов.png',
      rating: 5,
      location: 'Город Солнечногорск 2026',
      service: 'Бетонирование площадки с утеплением 145 м²',
      text: 'Давно планировал привести в порядок придомовую территорию и въездную зону. Перебрал кучу вариантов в сети, но остановился на «Мастер двора» — у них адекватный ценник, официальный договор и официальная гарантия на работы. Порекомендовали бетонирование на песчано-щебеночной подушке с утеплителем, чтобы избежать морозного пучения грунта. Залили весь объем всего за 5 дней — сработали очень оперативно! Поверхность ровная, материалы привезли сами по оптовой стоимости, лишних разговоров и скрытых наценок не было. Настоящие профи своего дела!'
    }];

    var concretingContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Concreting/cower.avif" alt="Бетонирование площадки и дорожек" />' +
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
        '<article class="service-type"><img class="service-type-image" src="Concreting/type1.avif" alt="Бетонирование на готовом основании" /><h4>Бетонирование<br>на готовом основании</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Concreting/type2.avif" alt="Бетонирование на песчаном основании" /><h4>Бетонирование<br>на песчаном основании</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Concreting/type3.avif" alt="Бетонирование на песчано-щебеночном основании" /><h4>Бетонирование на<br>песчано - щебеночном основании</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Concreting/type4.avif" alt="Бетонирование на песчаном основании с утеплением" /><h4>Бетонирование на песчаном основании<br>с утеплением</h4></article>' +
        '<article class="service-type"><img class="service-type-image" src="Concreting/type5.avif" alt="Бетонирование с утеплителем" /><h4>Бетонирование на песчано - щебеночном основании<br>с утеплителем</h4></article>' +
      '</div>';

    var rubberReviews = [{
      name: 'Воронов Алексей',
      avatar: 'Avatars/Воронов%20Алексей.png',
      rating: 5,
      location: 'Поселок Красково 2025',
      service: 'Устройство бесшовного резинового покрытия для спортивной зоны',
      text: 'Наконец-то обустроили во дворе отличную спортивную площадку с безопасным резиновым покрытием. Большое спасибо команде «Мастер двора» за профессионально выполненную укладку! Все сделали строго по технологии, покрытие легло монолитно, без единого шва или неровности. Ребята дали 2 года гарантии и зафиксировали цену в договоре. Дети и взрослые теперь с радостью занимаются спортом на свежем воздухе!'
    }, {
      name: 'Соколова Марина',
      avatar: 'Avatars/Соколова%20Марина.png',
      rating: 5,
      location: 'Город Домодедово 2024',
      service: 'Бесшовное резиновое покрытие на детской площадке',
      text: 'Искренняя благодарность компании «Мастер двора» от родителей нашего ЖК! Намучились со старым плиточным покрытием — плитка постоянно отходила, края задирались, а после дождей в ямах стояла вода. Обратились к специалистам за бесшовным покрытием «под ключ». Мастера пришли со своей техникой, подготовили основание и качественно залили резиновую крошку. Площадка стала безопасной, мягкой и очень яркой. Смета осталась строго по договору, без лишних переплат.'
    }, {
      name: 'Мельников Денис',
      avatar: 'Avatars/Мельников%20Денис.png',
      rating: 5,
      location: 'Остров 2026',
      service: 'Укладка травмобезопасного резинового покрытия на даче',
      text: 'Искал надежную бригаду для укладки резинового покрытия вокруг зоны бассейна и под уличные тренажеры. Вышел на «Мастер двора» по совету соседа. Специалист проконсультировал по выбору оптимальной толщины и состава, быстро прислал точную смету. За два дня команда полностью выполнила весь объем. Оплата была только после сдачи объекта. Качество на высоте — покрытие не скользит и отлично выдерживает нагрузки. Обязательно буду рекомендовать вас друзьям!'
    }];

    var rubberContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Rubber/cower.avif" alt="Укладка бесшовного резинового покрытия" />' +
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

    var rolledLawnReviews = [{
      name: 'Максим Грачев',
      avatar: 'Avatars/Максим%20Грачев.png',
      rating: 5,
      location: 'Город Звенигород 2024',
      service: 'Укладка рулонного газона «Спортивный» под ключ',
      text: 'После завершения строительства дома в Звенигороде участок выглядел печально — кругом бурьян и неровности. Позвонил в «Мастер двора», в тот же день бесплатно приехал замерщик, оценил грунт и предложил вариант со срезкой старого слоя и засыпкой плодородной земли. Остановились на устойчивом газоне «Спортивный». Все материалы завезли по оптовой стоимости, смету зафиксировали в договоре. За три дня ребята выполнили весь объем: срезали дерн, спланировали площадку, постелили газон и прокатали катком. Выглядит просто отлично!'
    }, {
      name: 'Наталья Ковалева',
      avatar: 'Avatars/Наталья%20Ковалева.png',
      rating: 5,
      location: 'Поселок Снегири 2025',
      service: 'Укладка газона «Универсальный» с заменой грунта',
      text: 'Давно мечтала об аккуратном зеленом газоне без сорняков и бесконечных прополок. Обратилась в «Мастер двора» по рекомендации знакомых. Специалисты подошли к работе очень ответственно: сняли верхний слой, завезли 12 см плодородного грунта, идеально выровняли и уложили рулоны. Работали слаженно и аккуратно, после себя всё убрали и подробно рассказали, как правильно поливать в первые недели. Отдельный плюс — цена осталась строго по смете, и оформили гарантию на 2 года. Огромное спасибо!'
    }, {
      name: 'Владислав Рябов',
      avatar: 'Avatars/Владислав%20Рябов.png',
      rating: 5,
      location: 'Город Раменское 2026',
      service: 'Элитная подготовка и укладка газона «Эталон»',
      text: 'Заказывал в «Мастер двора» полный комплекс работ с элитной подготовкой основания и монтажом автополива. Участок был сложный, потребовалась культивация, песчаная подушка и трамбовка. Ребята справились на ура, сразу видно большой опыт. Трава плотная, темно-зеленая, легла ровным ковром без видимых стыков. Очень порадовало, что сдержали все заявленные сроки и не потребовали ни одного рубля сверх согласованной сметы. Качественная работа настоящих профи!'
    }];

    var rolledLawnContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="RolledLawn/rolledlawn_cower.avif" alt="Укладка рулонного газона" />' +
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
          '<img class="service-type-image" src="RolledLawn/Городской.avif" alt="Газон Городской" />' +
          '<h4>«Городской»</h4>' +
          '<p><strong>Цвет:</strong> Светло-зеленый</p>' +
          '<p><strong>Состав:</strong> Мятлик луговой 100%, Canada, 3-х летний</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="RolledLawn/Универсальный.avif" alt="Газон Универсальный" />' +
          '<h4>«Универсальный»</h4>' +
          '<p><strong>Цвет:</strong> Равномерно однородный зеленый</p>' +
          '<p><strong>Состав:</strong> Мятлик луговой 80%, овсяница красная 20% Canada, 3-х летний</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="RolledLawn/Эталон.avif" alt="Газон Эталон" />' +
          '<h4>«Эталон»</h4>' +
          '<p><strong>Цвет:</strong> Однородный темно-зеленый</p>' +
          '<p><strong>Состав:</strong> Мятлик луговой 100%, Canada, 3-х летний</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="RolledLawn/Спортивный.avif" alt="Газон Спортивный" />' +
          '<h4>«Спортивный»</h4>' +
          '<p><strong>Цвет:</strong> Насыщенный изумрудный</p>' +
          '<p><strong>Состав:</strong> Мятлик луговой 100%, USA, 3-х летний</p>' +
        '</article>' +
        '<article class="service-type">' +
          '<img class="service-type-image" src="RolledLawn/Парковый.avif" alt="Газон Парковый" />' +
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

    var demolitionReviews = [{
      name: 'Максим Дорохов',
      avatar: 'Avatars/Максим%20Дорохов.png',
      rating: 5,
      location: 'Поселок Лесной 2024',
      service: 'Снос старого деревянного дома с вывозом мусора',
      text: 'На купленном участке стоял ветхий бревенчатый дом под снос. Сам демонтажем заниматься не рискнул — слишком много хлопот с разбором и погрузкой. Обратился в компанию «Мастер двора». Замерщик выехал бесплатно, оценил объем и на следующий день прислал точную смету. Ребята подогнали спецтехнику и контейнер, аккуратно разобрали строение, а весь строительный мусор погрузили и вывезли. Работу выполнили быстро и четко, цена в процессе не выросла ни на рубль!'
    }, {
      name: 'Елена Тарасова',
      avatar: 'Avatars/Елена%20Тарасова.png',
      rating: 5,
      location: 'Город Истра 2025',
      service: 'Демонтаж каркасной дачи и хозяйственных построек',
      text: 'Нужно было полностью освободить участок от старого каркасно-щитового дома и нескольких сараев для нового строительства. Отдельно просила по возможности сохранить часть целого бруса для повторного использования на участке — мастера отнеслись с пониманием и всё аккуратно отсортировали. Работают слаженно, техника собственная, поэтому цену предложили отличную. Участок оставили идеально чистым, ровным и готовым к стройке. Большое спасибо!'
    }, {
      name: 'Константин Воронов',
      avatar: 'Avatars/Константин%20Воронов.png',
      rating: 5,
      location: 'Деревня Кобылино 2026',
      service: 'Снос кирпичного дома после пожара «Под Ключ»',
      text: 'После пожара встал тяжелый вопрос сноса кирпичных остатков дома и завалов. В «Мастер двора» зацепила оперативность и наличие мощных экскаваторов с гидромолотом. Специалисты взяли на себя полный комплекс: от безопасного демонтажа опасных конструкций до выгрузки и вывоза крупных обломков. Все документы оформили по договору, оплата по безналу. Сработали профессионально, без лишних слов и строго в оговоренные сроки. Настоящие мастера своего дела!'
    }];

    var demolitionContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Demolition/cower.avif" alt="Снос, демонтаж дома" />' +
          '<div class="service-cover-overlay" aria-hidden="true"></div>' +
          '<div class="service-cover-content">' +
            '<h3 class="service-cover-title">Снос, демонтаж дома</h3>' +
            '<p class="service-cover-lead">Надежный результат на долгие годы службы</p>' +
            '<p class="service-cover-consultation">Бесплатная консультация</p>' +
            '<a class="service-cover-phone phone" href="tel:+79510006100">+7 951 000 6100</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="service-detail-heading">' +
        '<h3>Что мы можем снести</h3>' +
        '<div class="service-types">' +
          '<article class="service-type"><img class="service-type-image" src="Demolition/demolition-service1.avif" alt="Снос деревянных домов" /><h4>Деревянные</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Demolition/demolition-service2.avif" alt="Снос дачных домов" /><h4>Дачные</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Demolition/demolition-service3.avif" alt="Снос домов после пожара" /><h4>После пожара</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Demolition/demolition-service4.avif" alt="Снос кирпичных домов" /><h4>Кирпичные</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Demolition/demolition-service5.avif" alt="Снос каркасных домов" /><h4>Каркасные</h4></article>' +
          '<article class="service-type"><img class="service-type-image" src="Demolition/demolition-service6.avif" alt="Снос бань" /><h4>Бани</h4></article>' +
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

    var garbageReviews = [{
      name: 'Ольга Мельникова',
      avatar: 'Avatars/Ольга%20Мельникова.png',
      rating: 5,
      location: 'Город Химки 2024',
      service: 'Вывоз крупногабаритного строительного мусора после ремонта',
      text: 'После капитального ремонта в доме накопилась огромная гора битого кирпича, старой штукатурки и демонтированных оконных рам. Самой организовать погрузку и вывоз было нереально. Позвонила в «Мастер двора», менеджер сразу сориентировал по стоимости и предложил контейнер. Машина с грузчиками приехала точно в назначенное время. Ребята сработали очень быстро и аккуратно: всё упаковали в мешки, вынесли и погрузили, а после себя даже подмели площадку! Смета осталась ровно такой, как обговаривали по телефону. Большое спасибо за оперативный сервис!'
    }, {
      name: 'Наталья Григорьева',
      avatar: 'Avatars/Наталья%20Григорьева.png',
      rating: 5,
      location: 'Рабочий поселок Быково 2025',
      service: 'Вывоз грунта и хлама с дачного участка «Под Ключ»',
      text: 'Заказывала в компании «Мастер двора» расчистку участка и вывоз остатков ветхих построек вместе со строительным грунтом. Очень порадовало отношение к клиенту: диспетчер проконсультировал по всем вопросам, оплату приняли по безналичному расчету, а цена оказалась ниже, чем у других компаний в нашем районе. Рабочие приехали со своими погрузочными средствами, всё быстро укомплектовали и вывезли на полигон. Никаких задержек и лишних доплат. Очень довольна результатом, буду обращаться еще!'
    }];

    var garbageContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Garbage/cower.avif" alt="Вывоз строительного мусора" />' +
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

    var snowRemovalReviews = [{
      name: 'Павел Нестеров',
      avatar: 'Avatars/Павел%20Нестеров.png',
      rating: 5,
      location: 'Город Красногорск 2024',
      service: 'Механизированная уборка и вывоз снега с парковки',
      text: 'После сильных снегопадов территория перед нашим коммерческим объектом оказалась полностью заблокирована сугробами. Срочно потребовалась организация уборки и вывоза снега. Обратился в компанию «Мастер двора» — ребята сработали оперативно, технику подали буквально через час после звонка. Быстро погрузили весь объем экскаватором-погрузчиком в самосвалы и вывезли на снегоплавильный пункт. Оплату оформили по безналичному расчету, все закрывающие документы предоставили вовремя. Отличная работа в режиме 24/7!'
    }, {
      name: 'Анатолий Кириллов',
      avatar: 'Avatars/Анатолий%20Кириллов.png',
      rating: 5,
      location: 'Поселок Власиха 2025',
      service: 'Комплексный вывоз снега с дачного участка и подъездной дороги',
      text: 'Заказывал вывоз снега с придомовой территории и расчистку подъезда к дому в зимний период. У компании собственная база спецтехники, поэтому ценник вышел абсолютно адекватным и строго по фиксированной смете. Мастера сработали аккуратно, не задев ни заборы, ни садовые бордюры. Вывезли несколько контейнеров снега за пару часов. Никаких задержек и лишних переплат. Настоящие профессионалы своего дела!'
    }, {
      name: 'Игорь Селезнев',
      avatar: 'Avatars/Игорь%20Селезнев.png',
      rating: 5,
      location: 'Деревня Горки 2026',
      service: 'Очистка территории и вывоз снега самосвалами',
      text: 'Заключили договор с компанией «Мастер двора» на регулярный вывоз снега с территории нашего коттеджного поселка. Очень порадовала пунктуальность: работают строго по графику, даже в самые сильные бураны не срывают сроки. Техника всегда исправная, погрузка проходит быстро. Цена за куб зафиксирована в договоре, никаких скрытых наценок. Приятно иметь дело с надежным подрядчиком. Рекомендую!'
    }];

    var snowRemovalContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="SnowRemoval/cower.avif" alt="Вывоз снега" />' +
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

    var excavationReviews = [{
      name: 'Алексей Гусев',
      avatar: 'Avatars/Алексей%20Гусев.png',
      rating: 5,
      location: 'Город Чехов 2024',
      service: 'Вывоз грунта с погрузкой экскаватором',
      text: 'После выемки котлована под фундамент на участке образовалась огромная гора глины и грунта. Своей техники для погрузки не было, поэтому искал подрядчика с полным комплексом услуг. В «Мастер двора» предложили отличную цену за куб с нашей погрузкой и оперативно подали гусеничный экскаватор с самосвалами. Работали практически непрерывно, вывезли весь объем на официальный полигон и предоставили все талоны и закрывающие документы. Смета осталась строго по договору, без сюрпризов. Отличная работа!'
    }, {
      name: 'Дмитрий Белов',
      avatar: 'Avatars/Дмитрий%20Белов.png',
      rating: 5,
      location: 'Рабочий поселок Томилино 2025',
      service: 'Поэтапный вывоз грунта с участка',
      text: 'Заказывал в компании «Мастер двора» поэтапный вывоз лишнего грунта при планировке и выравнивании дачного участка. Погрузку осуществляли своими силами, от компании требовалась только своевременная подача самосвалов. Машины приходили строго по графику, без простоев и задержек. Оплату оформили по безналичному расчету, а итоговая стоимость оказалась даже ниже средней по рынку за счет собственного автопарка компании. Настоящие профессионалы, рекомендую к сотрудничеству!'
    }];

    var excavationContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Excavation/cower.avif" alt="Вывоз грунта" />' +
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

    var apronReviews = [{
      name: 'Сергей Ковалёв',
      avatar: 'Avatars/Сергей%20Ковалёв.png',
      rating: 5,
      location: 'Поселок Апрелевка 2024',
      service: 'Устройство утепленной бетонной отмостки вокруг дома',
      text: 'После зимы встал вопрос о защите фундамента от промерзания и воды. Обратился в «Мастер двора» за утепленной отмосткой под ключ. Специалист приехал на бесплатный замер, сразу составил смету с учетом оптовых цен на материалы. Работу выполнили на совесть: выемка грунта, песчано-щебеночная подушка с трамбовкой, укладка утеплителя 10 см, дорожная сетка и деформационные швы. Залили качественный бетон М350. Все сделали быстро, аккуратно и в рамках сметы. На руки получили договор и гарантию на 2 года!'
    }, {
      name: 'Ирина Соколова',
      avatar: 'Avatars/Ирина%20Соколова.png',
      rating: 5,
      location: 'Город Бронницы 2025',
      service: 'Отмостка из брусчатки с установкой дождеприемников',
      text: 'Хотели не просто защитить фундамент, а сделать красивое оформление вокруг дома. Ребята из «Мастер двора» предложили отмостку из брусчатки в едином стиле с дорожками. В процессе сразу установили водоотводные лотки и дождеприемники под водостоки, чтобы вода не застаивалась. Материалы завезли сами, смету зафиксировали до начала работ. Плитку уложили идеально ровно, швы тщательно затерли. Участок преобразился! Огромная благодарность за профессионализм.'
    }, {
      name: 'Дмитрий Морозов',
      avatar: 'Avatars/Дмитрий%20Морозов.png',
      rating: 5,
      location: 'Деревня Андреевка 2026',
      service: 'Бетонная отмостка и установка садового бордюра',
      text: 'Заказывал отмостку из бетона вокруг дачного дома. У компании своя спецтехника и опытные мастера, поэтому ценник вышел очень адекватным. Выемку грунта 30 см, пирог из геотекстиля, песка, щебня и бетонирование 10 см выполнили строго по технологиям ГОСТ и СНиП. Дополнительно установили садовый бордюр по периметру. Оплату производил по безналичному расчету после сдачи работы. Сроки выдержали идеально, ни одного рубля сверх согласованной суммы не потребовали. Отличная работа!'
    }];

    var apronContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Apron/cower.avif" alt="Отмостка вокруг дома" />' +
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
      '</div>' +
      '<h3 class="service-detail-heading service-detail-heading--scroll">Дополнительные работы</h3>' +
      '<p class="service-scroll-hint">Прокрутите влево, чтобы увидеть все варианты</p>' +
      '<p>При строительстве устройства отмоски часто возникают следующие дополнительные работы</p>' +
      '<div class="service-types">' +
        '<article class="service-type service-type--bottom-text"><img class="service-type-image" src="Apron/type1_garden_border2.avif" alt="Установка садового бордюра" /><h4>Установка<br>садового<br>бордюра</h4></article>' +
        '<article class="service-type service-type--bottom-text"><img class="service-type-image" src="Apron/type2_rain2.avif" alt="Установка водоотводных лотков или дождеприемников" /><h4>Установка<br>водоотводных<br>лотков или<br>дождеприемников</h4></article>' +
      '</div>';

    var gradingReviews = [{
      name: 'Илья Самсонов',
      avatar: 'Avatars/Илья%20Самсонов.png',
      rating: 5,
      location: 'Поселок Нахабино 2024',
      service: 'Выравнивание участка 12 соток под газон трактором Avant',
      text: 'Купили участок с сильными кочками, ямами и старым дерном. Перед укладкой газона нужно было сделать идеальную планировку. Обратился в «Мастер двора», специалист приехал с нивелиром, провел высотную съемку и рассчитал смету. На следующий день привезли трактор Avant и мотоблок. Ребята качественно вспахали верхний слой, вручную выбрали сорняки, разравняли землю в ноль и укатали катком. Справились ровно за один день! Поверхность идеальная, цена зафиксирована в договоре. Большое спасибо!'
    }, {
      name: 'Виктор Кравцов',
      avatar: 'Avatars/Виктор%20Кравцов.png',
      rating: 5,
      location: 'Город Солнечногорск 2025',
      service: 'Планировка погрузчиком JCB и отсыпка участка грунтом',
      text: 'Участок был с сильным уклоном и в низине, после дождей постоянно стояла вода. Единственным решением была отсыпка и нивелирование в отметку. Заказал комплексную услугу в компании «Мастер двора». Ребята на собственном транспорте завезли планировочный грунт по оптовой цене, а погрузчиком JCB быстро распределили его по всей территории под нужные уклоны. Все сделано строго по ГОСТ и СНиП, оплату приняли по безналичному расчету. Качеством и сроками остался полностью доволен!'
    }, {
      name: 'Денис Тарасов',
      avatar: 'Avatars/Денис%20Тарасов.png',
      rating: 5,
      location: 'Деревня Абушково 2026',
      service: 'Комплексная планировка территории под строительство и ландшафт',
      text: 'Заказывал планировку придомовой территории 15 соток после завершения строительства дома. Очень порадовало наличие собственной техники у компании и прозрачная смета без скрытых доплат. Инженер профессионально сделал высотную съемку, определил точные отметки и объемы земли. За день с помощью спецтехники и ручной доработки преобразили участок до узнаваемости — ни одной кочки не осталось. Все четко, быстро и на совесть. Рекомендую «Мастер двора»!'
    }];

    var gradingContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Grading/cower.avif" alt="Планировка участка в отметку" />' +
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

    var stepsReviews = [{
      name: 'Павел Климов',
      avatar: 'Avatars/Павел%20Климов.png',
      rating: 5,
      location: 'Город Мытищи 2024',
      service: 'Облицовка входной группы и ступеней клинкером',
      text: 'После зимы старое покрытие на крыльце потрескалось и стало осыпаться, поэтому встал вопрос о капитальной облицовке. По совету знакомых обратился в «Мастер двора». Замерщик выехал бесплатно, оценил состояние бетонного основания и предложил клинкерную плитку с противоскользящим покрытием. Все материалы завезли по оптовым ценам, смету зафиксировали в договоре. Мастера сработали на совесть: идеально вывели геометрию ступеней, сделали гидроизоляцию и затерли швы специальным морозостойким составом. Огромная благодарность за мастерство!'
    }, {
      name: 'Екатерина Волкова',
      avatar: 'Avatars/Екатерина%20Волкова.png',
      rating: 5,
      location: 'Рабочий поселок Обухово 2025',
      service: 'Облицовка крыльца керамогранитом «Под Ключ»',
      text: 'Хочу выразить огромную признательность бригаде компании «Мастер двора» за реставрацию и отделку крыльца нашего загородного дома. Самой покупать материалы и высчитывать углы подрезки было бы нереально, но ребята взяли весь процесс на себя — от демонтажа старого слоя до финальной уборки. Оплату провели по безналичному расчету, всё строго по смете без скрытых платежей. Крыльцо выглядит великолепно, плитку уложили ровно и аккуратно. Отдельный плюс — официальная гарантия на 2 года!'
    }, {
      name: 'Роман Власов',
      avatar: 'Avatars/Роман%20Власов.png',
      rating: 5,
      location: 'Город Подольск 2026',
      service: 'Отделка ступеней и террасы натуральным камнем',
      text: 'Искал проверенных специалистов для облицовки высокого крыльца и прилегающей террасы. В «Мастер двора» зацепило то, что они строго соблюдают технологии ГОСТ и СНиП при работе с уличными покрытиями. Инженер составил точный расчет за несколько минут, а к укладке приступили сразу после согласования. Уложили ступенчатый плиточный камень безупречно, углы и уклоны для стока воды вывели идеально. За два дня полностью закрыли объект. Настоящие профи своего дела, рекомендую!'
    }];

    var stepsContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="Steps/cower.avif" alt="Облицовка крыльца" />' +
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

    var pitReviews = [{
      name: 'Денис Назаров',
      avatar: 'Avatars/Денис%20Назаров.png',
      rating: 5,
      location: 'Город Ногинск 2024',
      service: 'Разработка котлована под цокольный этаж с вывозом грунта',
      text: 'Предстояло сложное строительство дома с полноценным цокольным этажом, поэтому нужен был надежный подрядчик со своей спецтехникой. Обратился в «Мастер двора». Бесплатно приехал геодезист, оценил фронт работ и сделал точную разбивку осей. На следующий день подогнали гусеничный экскаватор и самосвалы. Работали слаженно и круглосуточно: быстро выкопали котлован, часть грунта оставили под обратную засыпку, а остальное сразу вывезли. Смета не изменилась ни на рубль. Отличная организация процесса!'
    }, {
      name: 'Алена Чернова',
      avatar: 'Avatars/Алена%20Чернова.png',
      rating: 5,
      location: 'Поселок Селятино 2025',
      service: 'Рытье котлована под плитный фундамент',
      text: 'Заказывали в компании «Мастер двора» комплексную подготовку котлована под плитный фундамент загородного дома. Сразу понравилось отношение к делу: специалисты провели геодезическую разбивку, выставили обноску и ювелирно выполнили выемку земли экскаватором. Дно котлована доработали вручную точно по отметкам. Всё сделали строго по ГОСТ и СНиП, соблюдая все заявленные сроки. Большое спасибо за квалифицированную работу и честную цену!'
    }, {
      name: 'Артем Медведев',
      avatar: 'Avatars/Артем%20Медведев.png',
      rating: 5,
      location: 'Деревня Истра 2026',
      service: 'Разработка котлована и обратная засыпка песком',
      text: 'Нужно было выкопать котлован под ленточный фундамент и организацию погреба. У компании «Мастер двора» своя база спецтехники, поэтому цены оказались существенно ниже, чем у посредников. Выемку грунта сделали за два дня, аккуратно сформировали откосы. Позже обратился к ним же для обратной засыпки песком с послойным уплотнением виброплитой. Все документы и договор оформили на месте, оплата по безналу. Качественная работа настоящих профессионалов!'
    }];

    var pitContent =
      '<div class="service-hero service-hero--cover">' +
        '<div class="service-cover-wrap">' +
          '<img class="service-cover" src="pit/cower.avif" alt="Разработка котлована" />' +
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

    var asphaltReviews = [{
      name: 'Артем Марков',
      avatar: 'Avatars/Артем%20Марков.png',
      rating: 5,
      location: 'Город Серпухов 2024',
      service: 'Асфальтирование въездной группы и подъездной дороги по щебеночно-песчаному основанию',
      text: 'Нужно было заново сделать подъездную дорогу к загородному дому и вымостить площадку перед воротами. Обратился в «Мастер двора». Инженер бесплатно приехал на объект, оценил рельеф и рассчитал смету за несколько минут. Выбрали вариант асфальтирования по щебеночно-песчаному основанию. Ребята привезли собственную технику (экскаватор, каток) и уложили асфальт строго по СНиП с соблюдением температурного режима. Качество отличное — полотно гладкое, вода не застаивается.'
    }, {
      name: 'Василий Панкратов',
      avatar: 'Avatars/Василий%20Панкратов.png',
      rating: 5,
      location: 'Поселок Селятино 2025',
      service: 'Асфальтирование парковочной территории складского комплекса',
      text: 'Заказывали асфальтирование коммерческой парковки около 600 м² под постоянные нагрузки грузового транспорта. Порадовало, что у компании своя база спецтехники из 38 единиц и закупка материалов идет по оптовым ценам — смета получилась ощутимо выгоднее, чем у конкурентов. Выполнили укладку с выравнивающим слоем и финишным асфальтобетоном. Работают оперативно, график не сорвали, дали официальную гарантию. Покрытие держит нагрузку безупречно!'
    }, {
      name: 'Константин Громов',
      avatar: 'Avatars/Константин%20Громов.png',
      rating: 5,
      location: 'Деревня Абушково 2026',
      service: 'Асфальтирование частного двора и придомового участка',
      text: 'Хотел привести в порядок территорию загородного участка — надоело постоянное грязевое месиво после дождей. Выбрал «Мастер двора» по отзывам и не прогадал. Специалист оперативно провел геодезию и предложил укладку по готовому основанию с проливкой битумной эмульсией. Сделали все под ключ буквально за два дня. Оплатил по безналу после приема объекта. Участок выглядит очень аккуратно и ухоженно. Большое спасибо за честный подход и отличный результат!'
    }];

    var asphaltSubcategories = {
      roadAsphaltPaving: {
        title: 'Асфальтирование дорог',
        folder: 'asphaltSubCategory/roadAsphaltPaving/',
        thumbnail: 'asphaltSubCategory/roadAsphaltPaving/RoadAsphaltPaving.avif',
        description: 'Строительство и ремонт асфальтовых дорог.',
        content: roadAsphaltPavingContent,
        images: ['1.avif', '2.avif', '3.avif', '4.avif']
      },
      asphaltPavingAreas: {
        title: 'Асфальтирование территорий',
        folder: 'asphaltSubCategory/asphaltPavingAreas/',
        thumbnail: 'asphaltSubCategory/asphaltPavingAreas/AsphaltPavingAreas.avif',
        description: 'Асфальтирование парковок, складских, производственных и общественных территорий с учётом нагрузки и требований к покрытию.',
        content: asphaltPavingAreasContent,
        images: ['1.avif', '2.avif', '3.avif', '4.avif', '5.avif']
      },
      plotAsphaltPaving: {
        title: 'Асфальтирование участков',
        folder: 'asphaltSubCategory/plotAsphaltPaving/',
        thumbnail: 'asphaltSubCategory/plotAsphaltPaving/PlotAsphaltPaving.avif',
        description: 'Асфальтирование частных дворов, подъездных путей и придомовых участков — аккуратно, с подготовкой основания и качественной укладкой.',
        content: plotAsphaltPavingContent,
        images: ['1.avif', '2.avif', '3.avif', '4.avif']
      },
      potholeRepair: {
        title: 'Ямочный ремонт',
        folder: 'asphaltSubCategory/potholeRepair/',
        thumbnail: 'asphaltSubCategory/potholeRepair/PotholeRepair.avif',
        description: '',
        content: potholeRepairContent,
        images: ['1.avif', '2.avif', '3.avif', '4.avif']
      },
      asphaltMillings: {
        title: 'Укладка асфальтной крошки',
        folder: 'asphaltSubCategory/asphaltMillings/',
        thumbnail: 'asphaltSubCategory/asphaltMillings/asphaltMillings.avif',
        description: '',
        content: asphaltMillingsContent,
        images: ['1.avif', '2.avif', '3.avif', '4.avif']
      },
    };

    var categories = {
      'Pavers': {
        title: 'Брусчатка',
        folder: 'Pavers/',
        description: 'Работы по укладке брусчатки.',
        thumbnail: 'thumbnails/pavers.webp',
        content: paversContent,
        images: ['pavers_1.avif', 'pavers_2.avif', 'pavers_3.avif', 'pavers_4.avif', 'pavers_5.avif', 'pavers_6.avif', 'pavers_7.avif', 'pavers_8.avif', 'pavers_9.avif', 'pavers_10.avif', 'pavers_11.avif', 'pavers_12.avif', 'pavers_13.avif', 'pavers_14.avif']
      },
      'Asphalt': {
        title: 'Асфальт',
        folder: 'Asphalt/',
        description: 'Примеры асфальтирования дворов и участков.',
        thumbnail: 'thumbnails/asphalt.webp',
        images: []
      },
      'Landscape': {
        title: '',
        folder: 'Landscape/',
        description: '',
        thumbnail: 'thumbnails/landscape.webp',
        content: landscapeContent,
        images: ['landscape_1.avif','landscape_2.avif','landscape_3.avif','Landscape4.avif']
      },
      'RolledLawn': {
        title: '',
        folder: 'RolledLawn/',
        description: '',
        thumbnail: 'thumbnails/rolledlawn.webp',
        content: rolledLawnContent,
        images: ['rolledlawn_1.avif','rolledlawn_2.avif','rolledlawn_3.avif','rolledlawn_4.avif']
      },
      'Flagstone': {
        title: '',
        folder: 'Flagstone/',
        description: '',
        thumbnail: 'thumbnails/flagstone.webp',
        content: flagstoneContent,
        images: ['flagstone_1.avif','flagstone_2.avif','flagstone_3.avif','flagstone_4.avif','flagstone_5.avif','flagstone_6.avif','flagstone_7.avif']
      },
      'Lighting': {
        title: 'Освещение',
        folder: 'Lighting/',
        description: 'Освещение участка, территории, террасы.',
        thumbnail: 'thumbnails/lighting.webp',
        content: lightingContent,
        images: ['1.avif','2.avif','3.avif','4.avif','5.avif','6.avif','7.avif','8.avif']
      },
      'Steps': {
        title: '',
        folder: 'Steps/',
        description: '',
        thumbnail: 'thumbnails/steps.webp',
        content: stepsContent,
        images: ['1.avif','2.avif','3.avif','4.avif','5.avif']
      },
      'Pit': {
        title: '',
        folder: 'pit/',
        description: '',
        thumbnail: 'thumbnails/pit.webp',
        content: pitContent,
        images: ['1.avif','2.avif','3.avif','4.avif']
      },
      'Apron': {
        title: 'Отмостка вокруг дома',
        folder: 'Apron/',
        description: 'Устройство и ремонт отмостки вокруг дома и зданий.',
        thumbnail: 'thumbnails/apron.webp',
        content: apronContent,
        images: ['1.avif', '2.avif', '3.avif', '4.avif', '5.avif']
      },
      'Demolition': {
        title: 'Снос, демонтаж дома',
        folder: 'Demolition/',
        description: 'Снос и демонтаж домов, зданий и сооружений.',
        thumbnail: 'thumbnails/demolition.webp',
        content: demolitionContent,
        images: ['1.avif', '2.avif', '3.avif', '4.avif']
      },
      'Garbage': {
        title: 'Вывоз строй мусора',
        folder: 'Garbage/',
        description: 'Вывоз строительного мусора в Москве и МО.',
        thumbnail: 'thumbnails/garbage.webp',
        content: garbageContent,
        images: ['1.avif', '2.avif', '3.avif', '4.avif']
      },
      'SnowRemoval': {
        title: 'Вывоз снега',
        folder: 'SnowRemoval/',
        description: 'Вывоз снега и уборка территории.',
        thumbnail: 'thumbnails/SnowRemoval.webp',
        content: snowRemovalContent,
        images: ['1.avif', '2.avif', '3.avif', '4.avif', '5.avif']
      },
      'Excavation': {
        title: 'Вывоз грунта',
        folder: 'Excavation/',
        description: 'Вывоз грунта и земляные работы.',
        thumbnail: 'thumbnails/Excavation.webp',
        content: excavationContent,
        images: ['1.avif', '2.avif', '3.avif', '4.avif']
      },
      'Grading': {
        title: '',
        folder: 'Grading/',
        description: '',
        thumbnail: 'thumbnails/grading.webp',
        content: gradingContent,
        images: ['1.avif', '2.avif', '3.avif', '4.avif']
      },
      'Gravelling': {
        title: 'Отсыпка дороги или участка щебнем',
        folder: 'Gravelling/',
        description: 'Отсыпка и выравнивание дорог и участков щебнем различной фракции.',
        thumbnail: 'thumbnails/graveling.webp',
        content: gravelingContent,
        images: ['graveling_1.avif', 'graveling_2.avif', 'graveling_3.avif', 'graveling_4.avif', 'graveling_5.avif']
      },
      'Curb': {
        title: 'Бордюр',
        folder: 'Curb/',
        description: 'Установка бордюров и разделение зон.',
        thumbnail: 'thumbnails/curb.webp',
        content: curbContent,
        images: ['curb_1.avif', 'curb_2.avif', 'curb_3.avif', 'curb_4.avif', 'curb_5.avif', 'curb_6.avif']
      },
      'Drainage': {
        title: 'Дренаж',
        folder: 'Drainage/',
        description: 'Дренажные работы «Под Ключ».',
        thumbnail: 'thumbnails/drainage.webp',
        content: drainageContent,
        images: ['drainage_1.avif', 'drainage_2.avif', 'drainage_3.avif', 'drainage_4.avif', 'drainage_5.avif', 'drainage_6.avif', 'drainage_7.avif']
      },
      'Concreting': {
        title: '',
        folder: 'Concreting/',
        description: '',
        thumbnail: 'thumbnails/concreting.webp',
        content: concretingContent,
        images: ['1.avif','2.avif','3.avif','4.avif','5.avif', '6.avif', '7.avif', '8.avif', '9.avif']
      },
      'Rubber': {
        title: '',
        folder: 'Rubber/',
        description: '',
        thumbnail: 'thumbnails/rubber.webp',
        content: rubberContent,
        images: ['1.avif','2.avif','3.avif','4.avif']
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
      renderClientReviews(galleryReviews, null);
      if(sectionHeading){ sectionHeading.textContent = 'Примеры выполненных нами работ'; sectionHeading.hidden = false; }
      if(title) title.hidden = false;
      if(description) description.hidden = false;
    }

    if(worksGallery){
      var worksCategories = ['Flagstone','Landscape','Lawn','RolledLawn','Curb','Drainage', 'Lighting', 'Steps', 'Pit', 'Apron', 'Grading', 'Pavers', 'Demolition', 'Garbage','Concreting','Rubber', 'Gravelling', 'SnowRemoval', 'Excavation', 'asphaltMillings', 'potholeRepair', 'plotAsphaltPaving', 'asphaltPavingAreas', 'roadAsphaltPaving'];
      var items = [];
      worksCategories.forEach(function(key){
        var cat = categories[key] || asphaltSubcategories[key];
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
        if(sub === 'plotAsphaltPaving' || sub === 'potholeRepair' || sub === 'asphaltPavingAreas' || sub === 'roadAsphaltPaving' || sub === 'asphaltMillings'){
          title.hidden = true;
        } else {
          title.hidden = false;
          title.textContent = currentSub.title;
        }
      }
      if(description){
        if(sub === 'plotAsphaltPaving' || sub === 'potholeRepair' || sub === 'asphaltPavingAreas' || sub === 'roadAsphaltPaving' || sub === 'asphaltMillings'){
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
      if(category === 'Asphalt' || category === 'Curb' || category === 'Pavers' || category === 'Gravelling' || category === 'Lighting' || category === 'Drainage' || category === 'Apron' || category === 'Demolition' || category === 'Garbage' || category === 'SnowRemoval' || category === 'Excavation' || category === 'Flagstone' || category === 'Landscape' || category === 'RolledLawn' || category === 'Concreting' || category === 'Rubber' || category === 'Steps' || category === 'Pit' || category === 'Grading'){
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
        renderClientReviews(galleryReviews, asphaltReviews);
        return;
      }

      clearAsphaltExtras();
      if(galleryContent) galleryContent.innerHTML = current.content || '';
      galleryGrid.innerHTML = renderGalleryImages(current.folder, current.images, current.title);
      if(category === 'Curb') renderClientReviews(galleryReviews, curbReviews);
      if(category === 'Pavers') renderClientReviews(galleryReviews, paversReviews);
      if(category === 'Flagstone') renderClientReviews(galleryReviews, flagstoneReviews);
      if(category === 'Landscape') renderClientReviews(galleryReviews, landscapeReviews);
      if(category === 'RolledLawn') renderClientReviews(galleryReviews, rolledLawnReviews);
      if(category === 'Drainage') renderClientReviews(galleryReviews, drainageReviews);
      if(category === 'Concreting') renderClientReviews(galleryReviews, concretingReviews);
      if(category === 'Gravelling') renderClientReviews(galleryReviews, gravellingReviews);
      if(category === 'Rubber') renderClientReviews(galleryReviews, rubberReviews);
      if(category === 'Lighting') renderClientReviews(galleryReviews, lightingReviews);
      if(category === 'Steps') renderClientReviews(galleryReviews, stepsReviews);
      if(category === 'Pit') renderClientReviews(galleryReviews, pitReviews);
      if(category === 'Apron') renderClientReviews(galleryReviews, apronReviews);
      if(category === 'Demolition') renderClientReviews(galleryReviews, demolitionReviews);
      if(category === 'Garbage') renderClientReviews(galleryReviews, garbageReviews);
      if(category === 'Excavation') renderClientReviews(galleryReviews, excavationReviews);
      if(category === 'Grading') renderClientReviews(galleryReviews, gradingReviews);
      if(category === 'SnowRemoval') renderClientReviews(galleryReviews, snowRemovalReviews);
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
