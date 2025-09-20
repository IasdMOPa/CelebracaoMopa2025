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
    // ATENÇÃO: Verifique os nomes dos arquivos de imagem e das pastas no seu sistema para que correspondam EXATAMENTE
    const albums = [
        {
            title: "Igreja Celebração 30 Anos",
            cover: "igreja_celebracao/igreja_celebracao_capa.jpg", // Imagem de capa
            description: "Registros da celebração de 30 anos da igreja, com momentos marcantes e reformas.",
            images: [
                "igreja_celebracao/igreja_celebracao_capa.jpg",
                "igreja_celebracao/igreja_celebracao_1.jpg",
                "igreja_celebracao/igreja_celebracao_2.jpg",
                // Adicione mais imagens aqui, ex: "igreja_celebracao/igreja_celebracao_3.jpg"
            ]
        },
        {
            title: "Igreja Central Medicilândia",
            cover: "igreja_medicilandia/igreja_medicilandia_capa.jpg",
            description: "Veja as belas obras e a estrutura renovada da Igreja Central de Medicilândia.",
            images: [
                "igreja_medicilandia/igreja_medicilandia_capa.jpg",
                "igreja_medicilandia/igreja_medicilandia_1.jpg",
                "igreja_medicilandia/igreja_medicilandia_2.jpg",
            ]
        },
        {
            title: "Comunidade Sentir Plus",
            cover: "comunidade_sentir/comunidade_sentir_capa.jpg",
            description: "Um olhar sobre o projeto 'Comunidade Sentir Plus' e seu impacto social.",
            images: [
                "comunidade_sentir/comunidade_sentir_capa.jpg",
                "comunidade_sentir/comunidade_sentir_1.jpg",
                "comunidade_sentir/comunidade_sentir_2.jpg",
                "comunidade_sentir/comunidade_sentir_3.jpg",
            ]
        },
        {
            title: "Academia IATAI",
            cover: "academia_iatai/academia_iatai_capa.jpg", // PASTA RENOMEADA: "academia_iatai" sem espaço
            description: "Explore as instalações modernas e equipamentos da Academia IATAI.",
            images: [
                "academia_iatai/academia_iatai_capa.jpg",
                "academia_iatai/academia_aitai_1.jpg", // Verifique se o nome do arquivo está correto
                "academia_iatai/academia_aitai_2.jpg", // Verifique se o nome do arquivo está correto
                "academia_iatai/academia_aitai_3.jpg", // Verifique se o nome do arquivo está correto
            ]
        },
        {
            title: "Conservatório IATAI",
            cover: "conservatorio_iatai/conservatorio_iatai_capa.jpg",
            description: "Aprecie a beleza e a estrutura do novo Conservatório IATAI, dedicado à música e arte.",
            images: [
                "conservatorio_iatai/conservatorio_iatai_capa.jpg",
                "conservatorio_iatai/conservatorio_iatai_1.jpg",
                "conservatorio_iatai/conservatorio_iatai_2.jpg",
                "conservatorio_iatai/conservatorio_iatai_3.jpg",
            ]
        }
    ];

    // Função para renderizar os cards dos álbuns
    function renderAlbums() {
        albums.forEach((album, index) => {
            const albumCard = document.createElement('a');
            albumCard.href = "#"; 
            albumCard.classList.add('album-card');
            albumCard.dataset.albumIndex = index;

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
        modalGalleryImages.innerHTML = ''; 

        currentAlbumImages.forEach((src, idx) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = albums[albumIndex].title + ' - Imagem ' + (idx + 1);
            if (idx === 0) {
                img.classList.add('active'); 
            }
            modalGalleryImages.appendChild(img);
        });

        galleryModal.style.display = 'flex'; 
        showImage(currentImageIndex); 
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
            event.preventDefault(); 
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

    renderAlbums();
});
