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
    var title = document.getElementById('gallery-title');
    var description = document.getElementById('gallery-description');
    var help = document.getElementById('gallery-help');
    var worksGallery = document.getElementById('works-gallery');

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

    if(category && categories[category]){
      var current = categories[category];
      if(title) title.textContent = current.title + ' — Галерея';
      if(description) description.textContent = current.description;
      if(help) help.innerHTML = '';
      galleryGrid.innerHTML = current.images.map(function(img){
        return '<div class="gallery-item"><img src="' + current.folder + img + '" alt="' + current.title + '"></div>';
      }).join('');
    } else {
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
