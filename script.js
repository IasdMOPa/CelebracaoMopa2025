document.addEventListener('DOMContentLoaded', () => {
    const albumsSection = document.getElementById('albums-section');
    const modal = document.getElementById('gallery-modal');
    const closeButton = modal.querySelector('.close-button');
    const modalGallery = modal.querySelector('.modal-gallery');
    const prevButton = modal.querySelector('.prev-button');
    const nextButton = modal.querySelector('.next-button');

    let currentAlbumImages = [];
    let currentImageIndex = 0;

    const albums = [
        {
            title: "Igreja Celebração 30 Anos",
            cover: "img/igreja-celebracao/igreja-celebracao-1.jpg",
            description: "Registros da celebração de 30 anos da igreja, com momentos marcantes e reformas.",
            images: [
                "img/igreja-celebracao/igreja-celebracao-1.jpg",
                "img/igreja-celebracao/igreja-celebracao-2.jpg"
                // Adicione mais imagens conforme necessário
            ]
        },
        {
            title: "Igreja Central Medicilândia",
            cover: "img/igreja-medicilandia/igreja-medicilandia-capa.jpg",
            description: "Veja as belas obras e a estrutura renovada da Igreja Central de Medicilândia.",
            images: [
                "img/igreja-medicilandia/igreja-medicilandia-capa.jpg",
                "img/igreja-medicilandia/igreja-medicilandia-1.jpg",
                "img/igreja-medicilandia/igreja-medicilandia-2.jpg"
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
                "img/comunidade-sentir/comunidade-sentir-3.jpg"
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
                "img/academia-iatai/academia-iatai-3.jpg"
            ]
        },
        {
            title: "Conservatório IATAI",
            cover: "img/conservatorio-iatai/conservatorio-iatai-capa.jpg",
            description: "Aprecie a beleza e a estrutura do novo Conservatório IATAI, dedicado à música e arte.",
            images: [
                "img/conservatorio-iatai/conservatorio-iatai-capa.jpg",
                "img/conservatorio-iatai/conservatorio-iatai-1.jpg",
                "img/conservatorio-iatai/conservatorio-iatai-2.jpg",
                "img/conservatorio-iatai/conservatorio-iatai-3.jpg"
            ]
        }
    ];

    // Função para renderizar os álbuns
    function renderAlbums() {
        albums.forEach((album, index) => {
            const albumCard = document.createElement('a'); // Usamos <a> para que seja clicável como um link
            albumCard.href = "#"; // Evita que a página recarregue
            albumCard.classList.add('album-card');
            albumCard.dataset.albumIndex = index; // Para identificar qual álbum foi clicado

            albumCard.innerHTML = `
                <img src="${album.cover}" alt="${album.title} - Capa">
                <div class="album-info">
                    <h3>${album.title}</h3>
                </div>
            `;
            albumsSection.appendChild(albumCard);
        });
    }

    // Função para abrir o modal e exibir a galeria do álbum
    function openModal(albumIndex) {
        currentAlbumImages = albums[albumIndex].images;
        currentImageIndex = 0;
        modalGallery.innerHTML = ''; // Limpa galerias anteriores

        currentAlbumImages.forEach((src, idx) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = albums[albumIndex].title + ' - Imagem ' + (idx + 1);
            if (idx === 0) {
                img.classList.add('active'); // Mostra a primeira imagem
            }
            modalGallery.appendChild(img);
        });

        modal.style.display = 'flex';
        showImage(currentImageIndex);
    }

    // Função para mostrar uma imagem específica na galeria do modal
    function showImage(index) {
        const images = modalGallery.querySelectorAll('img');
        images.forEach((img, idx) => {
            img.classList.remove('active');
            if (idx === index) {
                img.classList.add('active');
            }
        });
        currentImageIndex = index;

        // Esconder/mostrar botões de navegação se for a primeira/última imagem
        prevButton.style.display = currentImageIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentImageIndex === currentAlbumImages.length - 1 ? 'none' : 'block';
    }

    // Navegação na galeria do modal
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

    // Event listener para os cards dos álbuns
    albumsSection.addEventListener('click', (event) => {
        const albumCard = event.target.closest('.album-card');
        if (albumCard) {
            event.preventDefault(); // Evita o comportamento padrão do link
            const albumIndex = parseInt(albumCard.dataset.albumIndex);
            openModal(albumIndex);
        }
    });

    // Fechar o modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fechar o modal ao clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Inicializar a renderização dos álbuns
    renderAlbums();
});
