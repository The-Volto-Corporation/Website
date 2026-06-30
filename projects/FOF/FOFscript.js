document.addEventListener("DOMContentLoaded", () => {

    const mainImage = document.getElementById("mainImage");
    const imageTitle = document.getElementById("imageTitle");
    const imageDescription = document.getElementById("imageDescription");
    const thumbnailPanel = document.querySelector(".thumbnail-panel");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const conceptArt = [
        {
            image: "images/concept1.png",
            title: "Ramon Face Concepts",
            description: "Desciption"
        },
        {
            image: "images/concept2.jpg",
            title: "Mountain",
            description: "Desciprtion"
        },
        {
            image: "images/concept3.jpg",
            title: "Snow",
            description: "Description"
        }
    ];

    let currentImage = 0;

    function displayImage(index){

        mainImage.classList.add("fade-out");

        setTimeout(() => {

            mainImage.src = conceptArt[index].image;

            imageTitle.textContent = conceptArt[index].title;
            imageDescription.textContent = conceptArt[index].description;

            const thumbnails = document.querySelectorAll(".thumbnail");

            thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle("active", i === index);
            });

            mainImage.classList.remove("fade-out");

            centerActiveThumbnail(index);

        }, 150);

    }

    function nextImage(){
        currentImage++;
        if(currentImage >= conceptArt.length) currentImage = 0;
        displayImage(currentImage);
    }

    function prevImage(){
        currentImage--;
        if(currentImage < 0) currentImage = conceptArt.length - 1;
        displayImage(currentImage);
    }

    prevBtn.addEventListener("click", prevImage);
    nextBtn.addEventListener("click", nextImage);

    document.addEventListener("keydown", (e) => {
        if(e.key === "ArrowLeft") prevImage();
        if(e.key === "ArrowRight") nextImage();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    function handleSwipe(){
        const swipeDistance = touchEndX - touchStartX;
        if(swipeDistance < -50) nextImage();
        if(swipeDistance > 50) prevImage();
    }

    mainImage.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    mainImage.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function createThumbnails() {

        thumbnailPanel.innerHTML = "";

        conceptArt.forEach((art, index) => {

            const thumb = document.createElement("img");

            thumb.src = art.image;
            thumb.classList.add("thumbnail");

            thumb.addEventListener("click", () => {
                currentImage = index;
                displayImage(currentImage);
            });

            thumbnailPanel.appendChild(thumb);

        });

    }

    function centerActiveThumbnail(index){

        const thumbnails = document.querySelectorAll(".thumbnail");

        const activeThumb = thumbnails[index];

        if(!activeThumb) return;

        activeThumb.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest"
        });

    }

    mainImage.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = conceptArt[currentImage].image;
    });

    lightbox.addEventListener("click", (e) => {
        if(e.target === lightbox){
            lightbox.style.display = "none";
        }
    });

    createThumbnails();
    displayImage(currentImage);

});