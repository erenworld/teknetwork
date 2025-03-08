document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".btn");
    const jsConfetti = new JSConfetti();

    btn.addEventListener("click", () => {
        jsConfetti.addConfetti({ 
            confettiNumber: 100, 
            confettiRadius: 6,
            confettiColors: ['#0D6EFD', '#FFD700', '#FF5733', '#00FF00']
        });
    });
});
