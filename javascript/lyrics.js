const hide_lyrics_btn = document.querySelector("#hide-lyrics");
const show_lyrics_btn = document.querySelector("#lyrics-btn");

hide_lyrics_btn.addEventListener('click', () => {
    document.querySelector("#lyrics-btn").style.display = "block";
    document.querySelector(".lyrics-container").style.display = "none";
});

show_lyrics_btn.addEventListener('click', () => {
        document.querySelector("#lyrics-btn").style.display = "none";
        document.querySelector(".lyrics-container").style.display = "block";
});