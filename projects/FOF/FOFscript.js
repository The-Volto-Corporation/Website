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
            image: "./images/concept1.png",
            title: "Ramon Face Concepts",
            description: "When designing Roman’s face I tried to aim for the feeling of someone soft that didn’t allow the cruel world to turn him stone cold. Even with his sharp features I kept the eyes soft and tired to convey his kindness. I also wanted to show how the two years of the apocalypse have changed him as a person."
        },
        {
            image: "./images/concept2.png",
            title: "Owen Face Concepts",
            description: "The strong leader of the group of survivors the player meets. I wanted his face to be square with more manly features to give off that unmovable wall vibe. I also wanted to show how he cares much more about his duty than himself by giving him a lot more hair to show that he doesn’t really focus on his appearance."
        },
        {
            image: "./images/concept3.png",
            title: "Audrey Face Concepts",
            description: "A true soul untamed. I wanted Audrey to be wild, carefree and someone that finds a thrill that finds in killing the undead. I made her hair messy and wild with a smirk constantly on her face. I wanted to create someone who thrived in the new world and creating her was the perfect way to show a much more wild charter in this world."
        },
        {
            image: "./images/concept4.png",
            title: "Olivia Face Concepts",
            description: "Soft and gentle. That is how I wanted Olivia’s personality to be and how she conveys herself as a person. Giving her softer features and a cute hairstyle to show that she isn’t a threat to anyone. I designed her features around the fact that she is the nurse of the survival group and softer features give of a caretaker personality. "
        },
        {
            image: "./images/concept5.png",
            title: "Lonan Face Concepts",
            description: "Lonan was supposed to look as if the apocalypse hadn't affected him. Not in a way that makes him handle it with ease. I wanted him to be pretty and well kept as if the apocalypse has never happened and hasn't really changed what he does everyday."
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