    // grabs info
    const container = document.querySelector(".container");
    const song_image = document.querySelector(".song-image");
    const song_title = document.querySelector(".song-title");
    const song_artist = document.querySelector(".song-artist");

    // grabs buttons
    const show_playlists_btn = document.getElementById('show-playlists-btn');

    // grabs actions
    const previous_btn = document.getElementById('previous-song');
    const play_pause_btn = document.getElementById('play-song');
    const next_btn = document.getElementById('next-song');
    const audio = document.getElementById('audio');
    const show_songs_btn = document.getElementById('show-songs-btn');
    const show_volume = document.getElementById('show-volume');
    const volume_controller = document.getElementById('volume-controller');

    let current_song_index;
    let previous_song_index;
    let next_song_index;
    let timer;

    // playlists
    let songs = [
        {
            song: "Mad World",
            artist: "cover by Imagine Dragons",
            song_path: "../songs/katty/mad world.mp3",
            image_path: "../images/katty/imagine_dragons.jpg"
        },

        {
            song: "Jar of Hearts",
            artist: "cover by Dave Winkler",
            song_path: "../songs/katty/jar of hearts.mp3",
            image_path: "../images/katty/dave_winkler.jpg"
        },

        {
            song: "Teardrops on my guitar",
            artist: "Taylor Swift",
            song_path: "../songs/katty/teardrops on my guitar.mp3",
            image_path: "../images/katty/taylor_swift.jpg"
        },

        {
            song: "Never be me",
            artist: "Miley Cyrus",
            song_path: "../songs/katty/never be me.mp3",
            image_path: "../images/katty/miley_cyrus.jpg"
        },

        {
            song: "Born without a heart",
            artist: "Faozia",
            song_path: "../songs/katty/born without a heart.mp3",
            image_path: "../images/katty/faozia.jpg"
        },

        {
            song: "Try",
            artist: "P!nk",
            song_path: "../songs/katty/try.mp3",
            image_path: "../images/katty/pink.jpg"
        },

        {
            song: "Dance in the dark",
            artist: "Au/Ra",
            song_path: "../songs/katty/dance in the dark.mp3",
            image_path: "../images/katty/aura.jpg"
        },

        {
            song: "Reasons to stay",
            artist: "Kate Vogel",
            song_path: "../songs/katty/reasons to stay.mp3",
            image_path: "../images/katty/kate_vogel.jpg"
        },

        {
            song: "Torn",
            artist: "cover by Dave Winkler",
            song_path: "../songs/katty/torn.mp3",
            image_path: "../images/katty/dave_winkler.jpg"
        },

        {
            song: "When we're high",
            artist: "LP",
            song_path: "../songs/katty/when we're high.mp3",
            image_path: "../images/katty/lp.jpg"
        },

        {
            song: "Ice In My Rosé",
            artist: "Aisha Dee",
            song_path: "../songs/katty/Ice In My Rosé.mp3",
            image_path: "../images/katty/aisha_dee.jpg"
        },

        {
            song: "Falling like the stars",
            artist: "James Arthur",
            song_path: "../songs/katty/falling like the stars.mp3",
            image_path: "../images/katty/james_arthur.jpg"
        },

        {
            song: "Angels like you",
            artist: "Miley Cyrus",
            song_path: "../songs/katty/angels like you.mp3",
            image_path: "../images/katty/miley_cyrus.jpg"
        },

        {
            song: "The fixer",
            artist: "Brent Morgan",
            song_path: "../songs/katty/the fixer.mp3",
            image_path: "../images/katty/brent_morgan.jpg"
        }
    ];

    let scoala = [
        {
            song: "Bara Bere",
            artist: "Michel Teló",
            song_path: "../songs/scoala/bara bere.mp3",
        },  // 1

        {
            song: "Call me maybe",
            artist: "Carly Rae Jepsen",
            song_path: "../songs/scoala/call me maybe.mp3"
        },  // 2

        {
            song: "Can't hold us",
            artist: "Macklemore & Ryan Lewis",
            song_path: "../songs/scoala/cant hold us.mp3"
        },  // 3

        {
            song: "Dance monkey",
            artist: "Tones & I",
            song_path: "../songs/scoala/dance monkey.mp3"
        },  // 4

        {
            song: "Danza kuduro",
            artist: "Don Omar",
            song_path: "../songs/danza juduro.mp3"
        },  // 5

        {
            song: "Despacito",
            artist: "Luis Fonsi",
            song_path: "../songs/scoala/despacito.mp3"
        },  // 6

        {
            song: "Echame la pulpa",
            artist: "Demi Lovato & Luis Fonsi",
            song_path: "../songs/scoala/echme la pulpa.mp3"
        },  // 7

        {
            song: "Hips don't lie",
            artist: "Shakira",
            song_path: "../songs/scoala/hips don't lie"
        },  // 8

        {
            song: "Iarna pe val",
            artist: "Cabron, What's up & Jon Baiat Bun",
            song_path: "../songs/scoala/iarna pe val.mp3"
        },  // 9

        {
            song: "It's my life",
            artist: "Bon Jovi",
            song_path: "../songs/scoala/its my life.mp3"
        },  // 10

        {
            song: "Makeba",
            artist: "Jain",
            song_path: "../songs/scoala/makeba.mp3"
        },

        {
            song: "One more night",
            artist: "Maroon 5",
            song_path: "../songs/scoala/one more night.mp3"
        },  // 11

        {
            song: "Oops.. I did it again",
            artist: "Britney Spears",
            song_path: "../songs/scoala/oops i did it again.mp3"
        },  // 12

        {
            song: "Perfect fara tine",
            artist: "Vama Veche",
            song_path: "../songs/scoala/perfect fara tine.mp3"
        },  // 13

        {
            song: "Rockabye",
            artist: "Clean Bandit",
            song_path: "../songs/scoala/rockabye.mp3"
        },  // 14

        {
            song: "Rolling in the deep",
            artist: "Adela",
            song_path: "../songs/scoala/rolling in the deep.mp3"
        },  // 15

        {
            song: "Sa nu-mi iei niciodata dragostea",
            artist: "Holograf",
            song_path: "../songs/scoala/sa nu'mi iei dragostea.mp3"
        },  // 16

        {
            song: "Shallow",
            artist: "Lady Gaga & Bradley Cooper",
            song_path: "../songs/scoala/shallow.mp3"
        },  // 17

        {
            song: "Smells like teen spirit",
            artist: "Nirvana",
            song_path: "../songs/scoala/smells like teen spirit.mp3"
        },  // 18

        {
            song: "Thumbs",
            artist: "Sabrina Carpenter",
            song_path: "../songs/scoala/thumbs.mp3"
        },  // 19

        {
            song: "Waka waka",
            artist: "Shakira",
            song_path: "../songs/scoala/waka waka.mp3"
        },  // 20

        {
            song: "Wake me up",
            artist: "Avicii",
            song_path: "../songs/scoala/wake me up.mp3"
        }  // 21
    ];

        for ( let image = 0; image < scoala.length; image++ ) {
            scoala[image].image_path = "../images/elevi.jpg";
        }   // sets the same image to all songs from scoala[]

        songs.push(scoala[15]);
        songs.push(scoala[17]);
        songs.push(scoala[19]);
        songs.push(scoala[21]);

    let studying = [
        {
            song: "Wake me up",
            song_path: "../songs/scoala/wake me up.mp3"
        }
    ];  // NEEDS SMALL FILES

        for ( let artist_image = 0; artist_image < studying.length; artist_image++ ) {
            studying[artist_image].artist = "";
            studying[artist_image].image_path = "../images/studying/studying.jpg";
        }   // sets same artist and image for all studying files

    let katty = songs;


    // show songs
    const songs_div = document.createElement('div');
    container.parentNode.appendChild(songs_div);
    songs_div.setAttribute('class', 'songs-div');
    let songs_array = [];
    songs_div.style.display = "none";
    const playlists_div = document.getElementById('playlists-div');
    playlists_div.style.display = "none";    // playlists list

    const songs_ul = document.createElement('ul');
    songs_ul.setAttribute('class', 'songs-ul');
    songs_div.appendChild(songs_ul);
    let el_index = 0;
    let el;

    songs.forEach(function(element) {
        el = document.createElement('li');
        el.innerHTML = element.song;  // the title of the song
        songs_ul.appendChild(el);
        songs_array.push(el);

        el.addEventListener('click', function(){    // when a title of a song from the songs' div is clicked, that song will play
            current_song_index = songs_array.indexOf(this);  // "this" represents the clicked element
            updatePlayer();
            togglePlayPause();
            audio.play();
        });
    });

    show_songs_btn.addEventListener('click', function(){
            songs_div.style.display = "block";
            songs_div.classList.remove('hide-songs');
            songs_div.classList.add('show-songs');
            show_songs_btn.style.display = "none";
            const hide_songs_btn = document.createElement('button');
            hide_songs_btn.title = "hide songs";
            hide_songs_btn.textContent = "X";
            songs_div.appendChild(hide_songs_btn);
            hide_songs_btn.setAttribute('id', 'hide-songs');

            hide_songs_btn.addEventListener('click', function() {
                // songs_div.style.display = "none";
                songs_div.classList.remove('show-songs');
                songs_div.classList.add('hide-songs');
                show_songs_btn.style.display = "block";
            });
    });

    // show playlists
    show_playlists_btn.addEventListener('click', function() {
        playlists_div.style.display = "block";
        playlists_div.classList.remove('hide-playlists');
        playlists_div.classList.add('show-playlists');
        show_playlists_btn.style.display = "none";

        const hide_playlists_btn = document.createElement('button');
        hide_playlists_btn.title = "hide playlists";
        hide_playlists_btn.textContent = "X";
        playlists_div.appendChild(hide_playlists_btn);
        hide_playlists_btn.setAttribute('id', 'hide-playlists');

        hide_playlists_btn.addEventListener('click', function() {
            playlists_div.classList.remove('show-playlists');
            playlists_div.classList.add('hide-playlists');
            show_playlists_btn.style.display = "block";
        });
    });

    initPlay();

    // functions
    function togglePlayPause() {
        if (audio.paused || audio.ended) {
            play_pause_btn.title = "pause";
            play_pause_btn.innerHTML = "&#10074;&#10074;";
            play_pause_btn.style.fontSize = "30px";
            audio.play();
        } else {
            audio.title = "play";
            play_pause_btn.title = "play";
            play_pause_btn.innerHTML = "&#9658;";
            play_pause_btn.style.fontSize = "40px";
            audio.pause();
        }
    }


    function initPlay() {
        current_song_index = 0;     // first song
        next_song_index = current_song_index + 1;
        previous_song_index = current_song_index - 1;
        updatePlayer();
    }

    function updatePlayer(){
        let song = songs[current_song_index];

        song_image.src = song.image_path;
        song_title.innerText = song.song;
        song_artist.innerText = song.artist;
        audio.src = song.song_path;
        document.title = "🎶 " + song.song;
        document.querySelector('#favicon').setAttribute('href', song.image_path);

        songs_array[current_song_index].style.color = "rgb(214, 127, 127)";
        $(songs_array).not(songs_array[current_song_index]).css("color", "#d3d3d3");

        timer = setInterval(range_slider, 1000);
    }

    // go to next song
    function nextSong() {
        current_song_index++;
        next_song_index = current_song_index + 1;

        if ( current_song_index > songs.length - 1 ) {  // after the last song, the next one is the first song again
            current_song_index = 0;
            next_song_index = current_song_index + 1;
        }

        if ( next_song_index > songs.length - 1 ) {
            next_song_index = 0;
        }

        if ( document.getElementById('shuffle').classList.contains('shuffle-on') )  {
            randomSong();
        }

        updatePlayer();
        togglePlayPause();
    }

    // go to previous song
    function previousSong() {
        current_song_index--;
        previous_song_index = current_song_index + 1;

        if ( current_song_index < 0 ) { // if the button is clicked on the first song, the previous song would be the last one in the array
            current_song_index = songs.length - 1;
            previous_song_index = 0;
        }

        if ( document.getElementById('shuffle').classList.contains('shuffle-on') )  {
            current_song_index = randomSong();
        }

        updatePlayer();
        togglePlayPause();
    }

    // more actions
    const more_actions_btn = document.getElementById('more-actions-btn');
    const more_actions_div = document.getElementById('more-actions');
    more_actions_btn.addEventListener('click', function() {
        if ( more_actions_div.classList.contains('more-actions-div') ) {
            more_actions_div.classList.remove('more-actions-div');
            more_actions_div.classList.remove('hide-more-actions');
            more_actions_div.classList.add('show-more-actions');
            more_actions_btn.style.transform = "rotate(180deg)";
            more_actions_btn.style.top = "0px";
            more_actions_btn.title = "hide more actions";
        } else {
            more_actions_div.classList.remove('show-more-actions');
            more_actions_div.classList.add('more-actions-div');
            more_actions_div.classList.add('hide-more-actions');
            more_actions_btn.style.transform = "rotate(360deg)";
            more_actions_btn.style.top = "13px";
            more_actions_btn.title = "more actions";
        }
    });

    // control volume
    show_volume.addEventListener('mouseover', function(){
        volume_controller.style.display = "block";

        volume_controller.addEventListener('change', function(e){
            audio.volume = e.currentTarget.value / 100;

            if ( audio.volume == 0 ) {
                show_volume.textContent = "❌";
            } else {
                show_volume.textContent = "🔊";
            }
        });

        if ( songs_div.style.height <= '400px' ) {
            volume_controller.style.transform = "rotate(360deg)";
            volume_controller.style.top = "70px";
            volume_controller.style.left = "290px";
        }
    });

    // mute with click
    function mute(e) {
        if ( audio.volume != 0 ) {
            audio.volume = 0;
            show_volume.innerHTML = "&#128263;";
            show_volume.title = "muted";
        } else {
            audio.volume = 1;
            show_volume.textContent = "🔊";
            show_volume.title = "volume";
        }
    }

    volume_controller.addEventListener('mouseleave', function() {
        volume_controller.style.display = "none";
    });


    // backward / forward
    let interval;
    $('#forwards').mousedown(function(event) {
        audio.pause();
        interval = setInterval(() => {
            audio.currentTime += 10;   // increases current time
        }, 50);
        togglePlayPause();
        // audio.play();
        // console.log(audio.currentTime);
    }).mouseup(function() {
        clearInterval(interval);
        audio.play();
    });

    $('#backwards').mousedown( function() {
        audio.pause();
        interval = setInterval(() => {
            audio.currentTime -= 10; // decreases current time
        }, 50);
    }).mouseup( function() {
        clearInterval(interval);
        togglePlayPause();
        // audio.play();
    });

    // slider
    let slider_position;
    const slider = document.getElementById('slider');

    function change_currentTime() {
        slider_position = audio.duration * ( slider.value / 100 );
        audio.currentTime = slider_position;
    }

    function range_slider() {
        let position = 0;

        if ( !isNaN( audio.duration ) ) {
            position = audio.currentTime * ( 100 / audio.duration );
            slider.value = position;
        }
    }


    // random song
    function randomSong(e) {
        song = songs_array[Math.floor(Math.random() * songs_array.length)];     // randomly chooses a song
        current_song_index = songs_array.indexOf(song);     // the random song becomes the playing one
        updatePlayer();
        togglePlayPause();  // the song plays automatically
    }


    // shuffle
    const shuffle_btn = document.getElementById('shuffle');
    function shuffle() {
        if (shuffle_btn.classList.contains('shuffle-off')) {
            shuffle_btn.classList.remove('shuffle-off');
            shuffle_btn.classList.add('shuffle-on');
            shuffle_btn.title = "shuffle on";
            randomSong();
        } else {
            shuffle_btn.classList.remove('shuffle-on');
            shuffle_btn.classList.add('shuffle-off');
            shuffle_btn.title = "shuffle off";
            updatePlayer();
            return;
        }
    }

    // repeat song
    const repeat_btn = document.getElementById('repeat');
    function repeat() {
        audio.addEventListener('ended', function () {
            current_song_index -= 1;
            updatePlayer();
            togglePlayPause();
        });
    }
    function repeatSong() {
        if ( repeat_btn.classList.contains('repeat-off') ) {
            repeat_btn.classList.remove('repeat-off');
            repeat_btn.classList.add('repeat-on');
            repeat_btn.title = "repeat on";
            repeat();

            previous_btn.addEventListener('click', function() {
                repeat_btn.classList.remove('repeat-on');
                repeat_btn.classList.add('repeat-off');
                repeat_btn.title = "repeat off";
                updatePlayer();
                togglePlayPause();
            });

            next_btn.addEventListener('click', function() {
                repeat_btn.classList.remove('repeat-on');
                repeat_btn.classList.add('repeat-off');
                repeat_btn.title = "repeat off";
                updatePlayer();
                togglePlayPause();
            });
        } else {
            repeat_btn.classList.remove('repeat-on');
            repeat_btn.classList.add('repeat-off');
            repeat_btn.title = "repeat is off";
            return;
        }
    }

    // playlists
    let playlists = [
        'Katty',
        'IX A',
        'Studying music'
    ];  // array of playlists

    playlists.forEach( function( element ) {
        playlist = document.createElement('li');
        playlist.innerHTML = element;   // playlist's name
        document.getElementById('playlists-ul').appendChild(playlist);    // adds li to ul of playlist

        playlist.addEventListener('click', function() {
            $(this).css('color', 'rgb(214, 127, 127');  // current playlist will have pinkish color
            $('#playlists-ul li').not(this).css('color', '#d3d3d3');    // the other playlists will have whiteish color

            switch ( playlists.indexOf(element) ) {
                case 1:     // 'IX A' playlist
                    songs = scoala;
                    current_song_index = 0;
                    changePlaylist();
                    updatePlayer();
                    togglePlayPause();
                    break;

                case 2:     // 'Studying music' playlist
                    songs = studying;
                    current_song_index = 0;
                    changePlaylist();
                    updatePlayer();
                    togglePlayPause();
                    break;

                default:    // 'Katty' playlist
                    songs = katty;
                    document.querySelector('#playlists-ul li').style.color = "rgb(214, 127, 127";
                    current_song_index = 0;
                    changePlaylist();
                    updatePlayer();
                    togglePlayPause();
                    break;
            }
        });
    });

    function changePlaylist(e) {
        songs_array.splice(0, songs_array.length);

        while ( songs_ul.firstChild ) {
            songs_ul.removeChild(songs_ul.lastChild);
        }

        songs.forEach(function(element) {
            el = document.createElement('li');
            el.innerHTML = element.song;  // the title of the song
            songs_ul.appendChild(el);
            songs_array.push(el);

            el.addEventListener('click', function(){    // when a title of a song from the songs' div is clicked, that song will play
                current_song_index = songs_array.indexOf(this);  // "this" represents the clicked element
                updatePlayer();
                togglePlayPause();
                audio.play();
            });
        });

        updatePlayer();
        togglePlayPause();
    }
