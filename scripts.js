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
        images: ['AsphaltPavingAreas.png']
      },
      plotAsphaltPaving: {
        title: 'Асфальтирование участков',
        folder: 'asphaltSubCategory/plotAsphaltPaving/',
        thumbnail: 'asphaltSubCategory/plotAsphaltPaving/PlotAsphaltPaving.png',
        description: 'Асфальтирование частных дворов, подъездных путей и придомовых участков — аккуратно, с подготовкой основания и качественной укладкой.',
        images: ['PlotAsphaltPaving.png']
      },
      potholeRepair: {
        title: 'Ямочный ремонт',
        folder: 'asphaltSubCategory/potholeRepair/',
        thumbnail: 'asphaltSubCategory/potholeRepair/PotholeRepair.png',
        description: 'Локальный ремонт ям, выбоин и разрушенных участков асфальтового покрытия для восстановления ровной и безопасной поверхности.',
        images: ['PotholeRepair.png']
      },
      asphaltMillings: {
        title: 'Укладка асфальтной крошки',
        folder: 'asphaltSubCategory/asphaltMillings/',
        thumbnail: 'asphaltSubCategory/asphaltMillings/asphaltMillings.png',
        description: 'Укладка и уплотнение асфальтной крошки для подъездных путей, парковок и временных покрытий — экономичное и практичное решение.',
        images: ['asphaltMillings.png']
      },
      graveling: {
        title: 'Отсыпка дороги или участка щебнем',
        folder: 'asphaltSubCategory/graveling/',
        thumbnail: 'asphaltSubCategory/graveling/graveling.png',
        description: 'Отсыпка и выравнивание дорог и участков щебнем различной фракции с формированием прочного основания под дальнейшее покрытие.',
        images: ['graveling.png']
      }
    };

    var categories = {
      'Pavers': {
        title: 'Брусчатка',
        folder: 'Pavers/',
        description: 'Работы по укладке брусчатки.',
        thumbnail: 'thumbnails/Брусчатка.png',
        images: ['pavers1.jpeg','pavers2.jpeg','pavers3.jpeg','pavers4.jpeg','pavers5.jpeg','pavers6.jpeg','pavers7.jpeg','pavers8.jpeg']
      },
      'Asphalt': {
        title: 'Асфальт',
        folder: 'Asphalt/',
        description: 'Примеры асфальтирования дворов и участков.',
        thumbnail: 'thumbnails/Асфальт.png',
        images: ['Asphalt1.jpg']
      },
      'Landscape': {
        title: 'Ландшафт',
        folder: 'Landscape/',
        description: 'Ландшафтный дизайн и оформление участка.',
        thumbnail: 'thumbnails/Ландшафт.png',
        images: ['Landscape1.jpg']
      },
      'Lawn': {
        title: 'Газон и полив',
        folder: 'Lawn/',
        description: 'Устройство газона и систем полива.',
        thumbnail: 'thumbnails/Газон и полив.png',
        images: ['Lawn1.jpg']
      },
      'Flagstone': {
        title: 'Дикий камень',
        folder: 'Flagstone/',
        description: 'Укладка дикого камня и декоративный камень.',
        thumbnail: 'thumbnails/Дикий камень.png',
        images: ['Flagstone1.jpeg','Flagstone2.jpeg']
      },
      'Curb': {
        title: 'Бордюр',
        folder: 'Curb/',
        description: 'Установка бордюров и разделение зон.',
        thumbnail: 'thumbnails/бордюр.png',
        images: ['curb1.jpeg']
      },
      'Drainage': {
        title: 'Дренаж и септик',
        folder: 'Drainage/',
        description: 'Дренажные системы и септики.',
        thumbnail: 'thumbnails/Дренаж и септик.png',
        images: ['Drainage.jpg']
      },
      'Tile laying': {
        title: 'Укладка плитки',
        folder: 'Tile laying/',
        description: 'Укладка плитки и тротуарной плитки.',
        thumbnail: 'thumbnails/Укладка плитки.png',
        images: ['Tile laying.jpeg']
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
      if(sectionHeading) sectionHeading.hidden = true;
    }

    if(worksGallery){
      var worksCategories = ['Pavers','Asphalt','Landscape','Lawn','Flagstone','Curb','Drainage'];
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
      if(title) title.textContent = currentSub.title;
      if(description) description.textContent = currentSub.description;
      if(galleryContent) galleryContent.innerHTML = currentSub.content || '';
      if(help) help.innerHTML = '';
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
      if(title) title.textContent = current.title + ' — Галерея';
      if(description) description.textContent = current.description;
      if(help) help.innerHTML = '';

      if(category === 'Asphalt'){
        if(galleryBack) galleryBack.innerHTML = '';
        if(subcategoriesEl){
          subcategoriesEl.innerHTML = Object.keys(asphaltSubcategories).map(function(key){
            var subCat = asphaltSubcategories[key];
            return '<a class="card" href="gallery.html?category=Asphalt&amp;sub=' + key + '"><figure><img src="' + subCat.thumbnail + '" alt="' + subCat.title + '"><figcaption>' + subCat.title + '</figcaption></figure></a>';
          }).join('');
        }
        if(sectionHeading) sectionHeading.hidden = false;
        var roadGallery = asphaltSubcategories.roadAsphaltPaving;
        galleryGrid.innerHTML = renderGalleryImages(current.folder, current.images, current.title) +
          renderGalleryImages(roadGallery.folder, roadGallery.images, roadGallery.title);
        return;
      }

      clearAsphaltExtras();
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
