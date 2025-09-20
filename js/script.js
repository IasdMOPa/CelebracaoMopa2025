document.addEventListener('DOMContentLoaded', () => {
    const albumsGridContainer = document.getElementById('albums-grid-section');
    const galleryModal = document.getElementById('galleryModal');
    const closeButton = galleryModal.querySelector('.close-button');
    const modalGalleryImages = galleryModal.querySelector('.modal-gallery-images');
    const prevButton = galleryModal.querySelector('.prev-button');
    const nextButton = galleryModal.querySelector('.next-button');

    let currentAlbumImages = [];
    let currentImageIndex = 0;

    // Definição dos álbuns com os caminhos corretos das imagens
    const albums = [
        {
            title: "Igreja Celebração 30 Anos",
            cover: "img/igreja-celebracao/igreja-celebracao-1.jpg", // Imagem de capa
            description: "Registros da celebração de 30 anos da igreja, com momentos marcantes e reformas.",
            images: [
                "img/igreja-celebracao/igreja-celebracao-1.jpg",
                "img/igreja-celebracao/igreja-celebracao-2.jpg",
                // Adicione mais imagens aqui, ex: "img/igreja-celebracao/igreja-celebracao-3.jpg"
            ]
        },
        {
            title: "Igreja Central Medicilândia",
            cover: "img/igreja-medicilandia:/igreja-medicilandia-capa.jpg",
            description: "Veja as belas obras e a estrutura renovada da Igreja Central de Medicilândia.",
            images: [
                "img/igreja-medicilandia:/igreja-medicilandia-capa.jpg",
                "img/igreja-medicilandia:/igreja-medicilandia-1.jpg",
                "img/igreja-medicilandia:/igreja medicilandia 2.jpg",
            ]
        },
        {
            title: "Comunidade Sentir Plus",
            cover: "img/comunidade-sentir/comunidade-sentir-capa.jpg",
            description: "Um olhar sobre o projeto 'Comunidade Sentir Plus' e seu impacto social.",
            images: [
                "img/comunidade-sentir/comunidade-sentir-capa.jpg",
                "img/comunidade-sentir/comunidade-sentir-1.jpg",
                "img/comunidade-sentir/comunidade-sentir-2.jpg",
                "img/comunidade-sentir/comunidade-sentir-3.jpg",
            ]
        },
        {
            title: "Academia IATAI",
            cover: "img/academia-iatai/academia-iatai-capa.jpg",
            description: "Explore as instalações modernas e equipamentos da Academia IATAI.",
            images: [
                "img/academia-iatai/academia-iatai-capa.jpg",
                "img/academia-iatai/academia-iatai-1.jpg",
                "img/academia-iatai/academia-iatai-2.jpg",
                "img/academia-iatai/academia-iatai-3.jpg",
            ]
        },
        {
            title: "Conservatório IATAI",
            cover: "conservatorio iatai:/conservatorio iatai capa.jpg",
            description: "Aprecie a beleza e a estrutura do novo Conservatório IATAI, dedicado à música e arte.",
            images: [
                "img/conservatorio-iatai/conservatorio-iatai-capa.jpg",
                "img/conservatorio-iatai/conservatorio-iatai-1.jpg",
                "img/conservatorio-iatai/conservatorio-iatai-2.jpg",
                "img/conservatorio-iatai/conservatorio-iatai-3.jpg",
            ]
        }
    ];

    // Função para renderizar os cards dos álbuns
    function renderAlbums() {
        albums.forEach((album, index) => {
            const albumCard = document.createElement('a');
            albumCard.href = "#"; // Impede o recarregamento da página
            albumCard.classList.add('album-card');
            albumCard.dataset.albumIndex = index; // Armazena o índice para identificar o álbum clicado

            albumCard.innerHTML = `
                <img src="${album.cover}" alt="${album.title} - Capa" class="album-card-image">
                <div class="album-card-info">
                    <h3>${album.title}</h3>
                </div>
            `;
            albumsGridContainer.appendChild(albumCard);
        });
    }

    // Função para abrir o modal e exibir a galeria de um álbum
    function openModal(albumIndex) {
        currentAlbumImages = albums[albumIndex].images;
        currentImageIndex = 0;
        modalGalleryImages.innerHTML = ''; // Limpa as imagens de galerias anteriores

        currentAlbumImages.forEach((src, idx) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = albums[albumIndex].title + ' - Imagem ' + (idx + 1);
            if (idx === 0) {
                img.classList.add('active'); // A primeira imagem é sempre visível ao abrir
            }
            modalGalleryImages.appendChild(img);
        });

        galleryModal.style.display = 'flex'; // Exibe o modal como flexbox
        showImage(currentImageIndex); // Garante que a imagem correta seja exibida
    }

    // Função para exibir uma imagem específica no modal
    function showImage(index) {
        const images = modalGalleryImages.querySelectorAll('img');
        images.forEach((img, idx) => {
            img.classList.remove('active');
            if (idx === index) {
                img.classList.add('active');
            }
        });
        currentImageIndex = index;

        // Controle da visibilidade dos botões de navegação
        prevButton.style.display = currentImageIndex === 0 ? 'none' : 'flex';
        nextButton.style.display = currentImageIndex === currentAlbumImages.length - 1 ? 'none' : 'flex';
    }

    // Navegação nas imagens do modal
    prevButton.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentImageIndex < currentAlbumImages.length - 1) {
            showImage(currentImageIndex + 1);
        }
    });

    // Event listener para os cliques nos cards dos álbuns
    albumsGridContainer.addEventListener('click', (event) => {
        const albumCard = event.target.closest('.album-card');
        if (albumCard) {
            event.preventDefault(); // Impede que o <a> navegue para outro lugar
            const albumIndex = parseInt(albumCard.dataset.albumIndex);
            openModal(albumIndex);
        }
    });

    // Fechar o modal
    closeButton.addEventListener('click', () => {
        galleryModal.style.display = 'none';
    });

    // Fechar o modal ao clicar fora da área de conteúdo (no overlay)
    window.addEventListener('click', (event) => {
        if (event.target === galleryModal) {
            galleryModal.style.display = 'none';
        }
    });

    // Inicializa a renderização dos álbuns quando a página é carregada
    renderAlbums();
});
