    // grabs info
    const container = document.querySelector(".container");
    let song_image = document.querySelector(".song-image");
    let song_title = document.querySelector(".song-title");
    let song_artist = document.querySelector(".song-artist");

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
    audio.volume = 0.2;


    // 
    const songs_div = document.getElementById('songsDiv');
    document.querySelector("main").appendChild(songs_div);
    songs_div.setAttribute('class', 'songs-div');
    songs_div.style.display = "none";
    // songs_div.style.borderRight = "none";
    const playlists_div = document.getElementById('playlists-div');
    playlists_div.style.display = "none";    // playlists list
    
    const songs_ul = document.createElement('ul');
    songs_ul.setAttribute('class', 'songs-ul');
    songs_div.appendChild(songs_ul);
    let el_index = 0;
    let el;
    let searchResult;
    
    const lyrics_container = document.querySelector('.lyrics-container');

    if ( window.innerWidth < 728 ) {
        lyrics_container.style.display = "none";
        // show_lyrics_btn.style.display = "block";
    }

    const hide_lyrics_btn = document.querySelector("#hide-lyrics");
    const show_lyrics_btn = document.querySelector(".lyrics-btn");

    function showHideLyrics() {
        if ( lyrics_container.style.display != "none" ) {
            lyrics_container.style.display = "none";
            document.querySelector('.showLyrics').style.display = "block";
        }
    }

    function showHideSongs() { 
        if ( songs_div.style.display != "none" ) {
            songs_div.style.display = "none";
            show_songs_btn.style.display = "block";
        }
     }

    let current_song_index;
    let previous_song_index;
    let next_song_index;
    let timer;

    let filteredCharacters;

    // functions
    function togglePlayPause() {
        if (audio.paused || audio.ended) {
            play_pause_btn.innerHTML = `
            <svg class="action-btn" title="pause" onclick="togglePlayPause()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
            </svg>
            `;
            // play_pause_btn.style.fontSize = "30px";
            audio.play();
        } else {
            audio.title = "play";
            play_pause_btn.innerHTML = `
            <svg id="play-song" class="action-btn" title="play" onclick="togglePlayPause()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
            </svg>
            `;
            // play_pause_btn.style.fontSize = "40px";
            audio.pause();
        }
    }

    // control volume
    show_volume.addEventListener('mouseover', function(){
        volume_controller.style.display = "block";
    
        volume_controller.addEventListener('change', function(e){
                audio.volume = e.currentTarget.value / 100;
    
                if ( audio.volume == 0 ) {
                    show_volume.innerHTML = `
                        <svg class="action-btn" onclick="toggleMute()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-mute" viewBox="0 0 16 16">
                            <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    `;
                } else {
                    show_volume.innerHTML = `
                        <svg class="action-btn" id="show-volume" title="volume" onclick="toggleMute()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
                            <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                            <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>
                        </svg>
                `;
    
                }
            });
        });

    function toggleMute() {
        if ( audio.volume != 0 ) {
            audio.volume = 0;
            show_volume.innerHTML = `
            <svg class="action-btn" onclick="toggleMute()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-mute" viewBox="0 0 16 16">
                <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
            </svg>
            `;
            volume_controller.value = 0;
        } else {
            audio.volume = 0.2;
            volume_controller.value = 20;
            show_volume.innerHTML = `
                <svg class="action-btn" id="show-volume" title="volume" onclick="toggleMute()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
                    <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                    <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>
                </svg>
            `;
        }
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

    // repeat song
    let will_repeat = false;
    const repeat_btn = document.getElementById('repeat');
    function repeat() {
        if ( !will_repeat ) {
            audio.addEventListener('ended', function() {
                current_song_index += 1;
                updatePlayer();
                togglePlayPause();
            });
        } else {
            audio.addEventListener('ended', function () {
                current_song_index -= 1;
                updatePlayer();
                togglePlayPause();
            });    
        }
    }
                
    $("#repeat").click( () => {
        if ( will_repeat == false ) {
            will_repeat = true;
            repeat_btn.classList.remove('repeat-off');
            repeat_btn.classList.add('repeat-on');
            repeat_btn.title = "repeat on";
            repeat();
        } else {
            will_repeat = false;
            repeat_btn.classList.remove('repeat-on');
            repeat_btn.classList.add('repeat-off');
            repeat_btn.title = "repeat is off";
            repeat();
        }
    });
    
    
        // backward / forward
        let interval;
        $('#forwards').mousedown(function(event) {
            audio.pause();
            interval = setInterval(() => {
                audio.currentTime += 10;   // increases current time
            }, 50);
            togglePlayPause();
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

    fetch ( '../javascript/playlists.json' )
        .then ( response => response.json() )
        .then( all_playlists => {
            let katty = all_playlists.katty;
            let songs = katty;
            let school = all_playlists.school;
            let studying = all_playlists.studying;

            for ( let image = 0; image < school.length; image++ ) {
                school[image].image_path = "../images/logo.png";
            }   // sets the same image to all songs from school[]
    
            // songs.push(school[15]);
            // songs.push(school[17]);
            // songs.push(school[19]);
            // songs.push(school[21]);
    
    
            for ( let artist_image = 0; artist_image < studying.length; artist_image++ ) {
                studying[artist_image].artist = "";
                studying[artist_image].image_path = "../images/logo.png";
            }   // sets same artist and image for all studying files
    

            // show songs
            let songs_array = [];

            searchResult = document.createElement('li');

            // SEARCHBAR
            const searchbar = document.getElementById('searchbar-input');
            searchbar.addEventListener('keypress', function(e) {
                if ( e.keyCode == 13 || e.which == 13) {
                    songs_ul.style.display = "none";
                    const searchString = e.target.value.toLowerCase(); 

                    filteredCharacters = songs_array.filter( searched => {
                       return searched.innerHTML.toLowerCase().includes(searchString);
                    }); // returns array of songs that contain the search
                    
                    const searchResultUl = document.createElement('ul');
                    searchResultUl.setAttribute('class', 'songs-ul');
                    songs_div.appendChild(searchResultUl);
                    searchResultUl.appendChild(searchResult);

                    if ( filteredCharacters.length == 0 ) { // if no results
                        // console.log(`No results for: "${searchString}" 😥`);
                        searchResult.innerHTML = `No results for: "${searchString}" 😥`;  // a text is added to announce that there are no results
                    } else {    // if there is at least one result
                        for ( let search_counter = 0; search_counter < filteredCharacters.length; search_counter++ ) {  // it goes through all the filtered songs
                            if ( searchString == filteredCharacters[0].innerHTML.toLowerCase() ) {  // and if the searched song ( for now it needs to be searched by its full name ) matches the first item of that list, so basically the song name itself
                                searchResult.innerHTML = filteredCharacters[0].innerHTML;   // then it is added to the screen

                                searchResult.addEventListener('click', function() {
                                    for ( search_counter = 0; search_counter < songs.length; search_counter++ ) {
                                        if ( searchString == songs[search_counter].song.toLowerCase() ) {
                                            // console.log(songs[search_counter].song);
                                            song_title.innerHTML = songs[search_counter].song;
                                            song_image.src = songs[search_counter].image_path;
                                            song_artist.innerText = songs[search_counter].artist;
                                            audio.src = songs[search_counter].song_path;

                                            togglePlayPause();
                                            audio.play();

                                            searchResultUl.style.display = "none";
                                            songs_ul.style.display = "block";
                                            songs_ul.firstChild.style.color = "rgb(197, 191, 191)";

                                            for ( search_counter = 0; search_counter < songs_ul.children.length; search_counter++ ) {
                                                if ( song_title.innerHTML == songs_ul.children[search_counter].innerHTML ) {
                                                    songs_ul.children[search_counter].style.color = "rgb(214, 127, 127)";
                                                    current_song_index = search_counter;
                                                }
                                            }
                                        }
                                    }
                                    
                                    // console.log(lyrics_container.children[2].firstChild.innerHTML);
                                    // if ( lyrics_container.children[2].firstChild.innerHTML !=  "This song does not have any lyrics to show.") {
                                        while ( lyrics_container.children[2].firstChild ) {                                            
                                            lyrics_container.children[2].removeChild(lyrics_container.children[2].firstChild);
                                        }
                                    // }
                                    lyrics();
                                    console.log(lyrics_container.children[2]);
                                    
                                    $(songs_array).not(songs_array[current_song_index]).css("color", "#d3d3d3");
                                });
                            }
                        }
                    }

                    searchbar.value = "";
                }     
            });


            
            songs.forEach( element => showSongs(element));

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

                // checking if the songs div and the playlist div would be on top of each other
                if ( songs_div.style.display != "none" && songs_div.style.left == "0px" ) {
                    songs_div.style.display = "none";
                    show_songs_btn.style.display = "block";
                }

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
                document.title = `playing: ${song.song}`;

                songs_array[current_song_index].style.color = "rgb(214, 127, 127)";
                $(songs_array).not(songs_array[current_song_index]).css("color", "#d3d3d3");

                document.querySelector("#next-song").addEventListener('click', nextSong);
                document.querySelector("#previous-song").addEventListener('click', previousSong);
                document.querySelector("#randomSong").addEventListener('click', randomSong);
                document.querySelector("#shuffle").addEventListener('click', shuffle);

                // slider.addEventListener('change', change_currentTime);
                document.querySelector('.lyrics-container h2').innerHTML = `Lyrics - '${songs[current_song_index].song}'`;
                lyrics();

                audio.addEventListener('timeupdate', range_slider);
            }   

            // show songs list
            function showSongs(element) {
                el = document.createElement('li');
                el.setAttribute('class', 'song-li')
                songs_ul.appendChild(el);
                el.innerHTML = element.song;  // the title of the song
                songs_array.push(el);

                el.addEventListener('click', function(){    // when a title of a song from the songs' div is clicked, that song will play
                    current_song_index = songs_array.indexOf(this);  // "this" represents the clicked element
                    updatePlayer();
                    togglePlayPause();
                    audio.play();
                });
            }

            // go to next song
            audio.addEventListener('ended', nextSong);
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
                song_image.classList.toggle('rotate');
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

            // random song
            function randomSong(e) {
                song = songs_array[Math.floor(Math.random() * songs_array.length)];     // randomly chooses a song
                current_song_index = songs_array.indexOf(song);     // the random song becomes the playing one
                updatePlayer();
                togglePlayPause();  // the song plays automatically
            }

            // shuffle
            function shuffle() {
                shuffle_btn = document.querySelector("#shuffle");
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
                    $(this).css('color', 'rgb(214, 127, 127)');  // current playlist will have pinkish color
                    $('#playlists-ul li').not(this).css('color', '#d3d3d3');    // the other playlists will have whiteish color

                    switch ( playlists.indexOf(element) ) {
                        case 1:     // 'IX A' playlist
                            songs = school;
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

            // LYRICS PART

            hide_lyrics_btn.addEventListener('click', () => {
                document.querySelector(".showLyrics").style.display = "block";
                $(lyrics_container).slideUp('slow');
                
                if ( window.innerWidth < 728 ) {
                    container.style.display = "block";
                    // lyrics_container.style.display = "none";
                }
            });

            document.querySelector('.showLyrics').addEventListener('click', () => {
                    // alert('clicked')
                    document.querySelector(".showLyrics").style.display = "none";
                    $(lyrics_container).slideDown('slow');
                    document.querySelector('.lyrics-container h2').innerHTML = 'Lyrics - ' + song_title.innerHTML;

                    if ( window.innerWidth < 728 ) {
                        container.style.display = "none";
                        songs_div.style.display = "none";
                        playlists_div.style.display = "none";
                        lyrics_container.classList.add('full-lyrics');
                    }
            });          


            function lyrics() {
                if ( !katty[current_song_index].lyrics ) {
                    // console.log( `"${katty[current_song_index].song}"  does not have any lyrics`);
                    document.querySelector(".lyrics").innerHTML = "<p>This song does not have any lyrics to show.";
                    return;
                }
                for ( let p = 0; p < katty[current_song_index].lyrics.length; p++ ) {
                    let lyric_p = document.createElement('p');
                    lyric_p.textContent = katty[current_song_index].lyrics[p];
                    document.querySelector(".lyrics").appendChild(lyric_p);
    
                    if ( lyric_p.textContent == " " ) {
                        document.querySelector(".lyrics").appendChild(document.createElement('br'));
                    }

                    document.querySelector("audio").addEventListener('ended', changeLyrics);
                    document.querySelector("#previous-song").addEventListener('click', changeLyrics);
                    document.querySelector("#next-song").addEventListener('click', changeLyrics);
                    songs_ul.addEventListener('click', changeLyrics);
                }

                function changeLyrics() {
                    for ( let remove = katty[current_song_index].lyrics.length; remove >= 0; remove-- ) {
                        document.querySelector(".lyrics").innerHTML = "";
                        lyrics();
                    }
                }
            }
        })
        .catch ( error => {
            console.log( "found error :/" );
            console.error( error );
        });