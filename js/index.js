paceOptions = {
  ajax: true,
  document: true,
  eventLag: false,
};

Pace.on("done", function () {
  gsap.to(".p", 1, {
    opacity: 0,
    y: "-15%",
    stagger: -0.1,
  });

  gsap.to("#preloader", 1.5, {
    y: "-100%",
    ease: "Expo.easeInOut",
    delay: 1,
    onComplete: function () {
      $(".text").each(function () {
        $(this).delay(1200).addClass("reveal");
      });
      $(".img").each(function () {
        $(this).delay(1200).addClass("reveal");
      });

      if (document.querySelector("#index-one")) {
        gsap.to(".new-release", 0, { opacity: 1 });
        $(".new-release").delay(2000).addClass("opacity");
      }

      if (document.querySelector(".fade-in")) {
        gsap.to(".fade-in", 1, { delay: 1, opacity: 1, stagger: 0.4 });
      }

      if (document.querySelector(".opacity-contact")) {
        gsap.to(".opacity-contact", 1, { delay: 1, opacity: 1, stagger: 0.4 });
      }

      $(".menu-bar-line").delay(2000).addClass("opacity");

      $(function () {
        var elements = $(".text-scroll, .img-scroll").toArray();
        $(window).scroll(function () {
          elements.forEach(function (item) {
            if (
              $(this).scrollTop() >=
              $(item).offset().top - window.innerHeight
            ) {
              $(item).addClass("reveal");
            }
          });
        });
        elements.forEach(function (item) {
          if (
            $(this).scrollTop() >=
            $(item).offset().top - window.innerHeight
          ) {
            $(item).addClass("reveal");
          }
        });
      });
      if (document.querySelector(".fade-up")) {
        gsap.to(".fade-up", 1, { opacity: 1, y: 0, delay: 1, stagger: 0.1 });
      }

      if (document.querySelector(".music-indicator")) {
        gsap.to(".music-indicator", 1, { opacity: 1, delay: 1 });
      }
      if (document.querySelector(".scale")) {
        gsap.to(".scale", 1, { opacity: 1, delay: 1, scale: 1, stagger: 0.2 });
      }
    },
  });
});

$(window).scroll(function () {
  var scroll = $(window).scrollTop(),
    dh = $(document).height(),
    wh = $(window).height();
  scrollPercent = (scroll / (dh - wh)) * 100;
  $(".progressbar").css("height", scrollPercent + "%");
});

$(function () {
  TweenMax.set(".project-preview", { width: 0 });

  $(".navigation-content ul li a").on("mouseover", function () {
    gsap.to(".project-preview", 1, { width: "200px", ease: Expo.easeInOut });
  });

  $(".navigation-content ul li a").on("mouseout", function () {
    gsap.to(".project-preview", 1, { width: "0px", ease: Expo.easeInOut });
  });

  $(".navigation-content ul li a").hover(function (e) {
    var img = e.currentTarget.dataset.img;

    $(".project-preview").css({ "background-image": `url(${img}) ` });
  });

  var $img = $(".project-preview");
  function cursormover(e) {
    gsap.to($img, {
      x: e.clientX,
      y: e.clientY,
    });
  }
  $(".navigation-content").on("mousemove", cursormover);
});

$(function () {
  $(".menu-bar").on("click", function () {
    gsap.to(".navigation-content", 1.5, { y: 0, ease: "Expo.easeInOut" });
    gsap.to(".navigation-content ul li", 1, {
      opacity: 1,
      delay: 1,
      stagger: 0.1,
    });
    gsap.to(".navigation-content .opacity", 0.5, {
      opacity: 1,
      stagger: 0.1,
      delay: 1,
    });

    if (document.querySelector(".fade-up")) {
      gsap.to(".fade-up", 1, { backdropFilter: "blur(0px)", delay: 1 });
    }
  });

  $(".navigation-close").on("click", function () {
    gsap.to(".navigation-content ul li", 0.5, { opacity: 0, stagger: -0.1 });
    gsap.to(".navigation-content .opacity", 0.5, { opacity: 0, stagger: 0.1 });
    gsap.to(".navigation-content", 1.5, {
      y: "100%",
      ease: "Expo.easeInOut",
      delay: 0.2,
    });

    if (document.querySelector(".fade-up")) {
      gsap.to(".fade-up", 1, { backdropFilter: "blur(20px)", delay: 0.5 });
    }
  });
});

window.onload = function () {
  $(".play-song img").on("click", function (e) {
    var song = e.currentTarget.dataset.song;

    var songtoplay = document.querySelector(`[data-audio="${song}"]`);

    if (songtoplay.duration > 0 && !songtoplay.paused) {
      songtoplay.pause();

      songtoplay.classList.remove("playing");

      this.src = "../images/play.png";

      var sondindicator = document.querySelectorAll(".music-indicator-span");

      sondindicator.forEach((a) => a.classList.remove("animating"));
    } else {
      if ($(".playing") && $(".playing-symbol")) {
        var playing = document.querySelectorAll(".playing");
        playing.forEach((a) => a.pause());
        playing.forEach((a) => a.classList.remove("playing"));

        var playingsymbol = document.querySelectorAll(".playing-symbol");
        playingsymbol.forEach((a) => (a.src = "../images/play.png"));
        playingsymbol.forEach((a) => a.classList.remove("playing-symbol"));
      }

      songtoplay.play();

      var sondindicator = document.querySelectorAll(".music-indicator-span");

      sondindicator.forEach((a) => a.classList.add("animating"));

      songtoplay.classList.add("playing");
      this.classList.add("playing-symbol");

      this.src = "../images/pause.png";
    }
  });

  const player = document.querySelector("#music");
  const currentTime = document.querySelector("#currentTime");
  const duration = document.querySelector("#duration");
  const progressBar = document.querySelector(".progress-bar");
  const progress = document.querySelector(".progress");
  player.ontimeupdate = () => updateTime();
  const updateTime = () => {
  const seekbar = document.querySelector("#seekbar");
  seekbar.max = player.duration;
  seekbar.value = player.currentTime;
  player.ontimeupdate = () => {
    seekbar.value = player.currentTime;
    updateTime();
  };
  seekbar.oninput = () => {
    player.currentTime = seekbar.value;

    const restartImage = document.querySelector("#restart-image");
    const playPauseButton = document.querySelector("#play");

    restartImage.onclick = () => {
      player.currentTime = 0;
      seekbar.value = 0;
      player.play();
      playPauseButton.src = "../images/pause.png";
    };
  };
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);
    const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);
    const progressWidth = durationFormatted
      ? (player.currentTime / durationFormatted) * 100
      : 0;
    progress.style.width = progressWidth + "%";
  };
  const formatZero = (n) => (n < 10 ? "0" + n : n);
  progressBar.onclick = (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
    player.currentTime = newTime;
  };


  const player1 = document.querySelector("#music1");
  const currentTime1 = document.querySelector("#currentTime1");
  const duration1 = document.querySelector("#duration1");
  const progressBar1 = document.querySelector(".progress-bar1");
  const progress1 = document.querySelector(".progress1");
  player1.ontimeupdate = () => updateTime1();
  const updateTime1 = () => {
    const seekbar1 = document.querySelector("#seekbar1");
    seekbar1.max = player1.duration;
    seekbar1.value = player1.currentTime;
    player.ontimeupdate = () => {
      seekbar1.value = player1.currentTime;
      updateTime1();
    };
    seekbar1.oninput = () => {
      player1.currentTime = seekbar1.value;
  
      const restartImage = document.querySelector("#restart-image1");
      const playPauseButton1 = document.querySelector("#play1");
  
      restartImage.onclick = () => {
        player1.currentTime = 0;
        seekbar1.value = 0;
        player1.play();
        playPauseButton1.src = "images/pause1.png";
      };
    };
    const currentMinutes = Math.floor(player1.currentTime / 60);
    const currentSeconds = Math.floor(player1.currentTime % 60);
    currentTime1.textContent =
      currentMinutes + ":" + formatZero1(currentSeconds);
    const durationFormatted = isNaN(player1.duration) ? 0 : player1.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration1.textContent =
      durationMinutes + ":" + formatZero1(durationSeconds);
    const progressWidth = durationFormatted
      ? (player1.currentTime / durationFormatted) * 100
      : 0;
    progress1.style.width = progressWidth + "%";
  };
  const formatZero1 = (n) => (n < 10 ? "0" + n : n);
  progressBar1.onclick = (e) => {
    const newTime = (e.offsetX / progressBar1.offsetWidth) * player1.duration;
    player1.currentTime = newTime;
  };


  const player2 = document.querySelector("#music2");
  const currentTime2 = document.querySelector("#currentTime2");
  const duration2 = document.querySelector("#duration2");
  const progressBar2 = document.querySelector(".progress-bar2");
  const progress2 = document.querySelector(".progress2");
  player2.ontimeupdate = () => updateTime2();
  const updateTime2 = () => {
    const seekbar2 = document.querySelector("#seekbar2");
    seekbar2.max = player2.duration;
    seekbar2.value = player2.currentTime;
    player.ontimeupdate = () => {
      seekbar2.value = player2.currentTime;
      updateTime();
    };
    seekbar2.oninput = () => {
      player2.currentTime = seekbar2.value;
  
      const restartImage = document.querySelector("#restart-image2");
      const playPauseButton1 = document.querySelector("#play2");
  
      restartImage.onclick = () => {
        player2.currentTime = 0;
        seekbar2.value = 0;
        player2.play();
        playPauseButton1.src = "images/pause2.png";
      };
    };
    const currentMinutes = Math.floor(player2.currentTime / 60);
    const currentSeconds = Math.floor(player2.currentTime % 60);
    currentTime2.textContent =
      currentMinutes + ":" + formatZero2(currentSeconds);
    const durationFormatted = isNaN(player2.duration) ? 0 : player2.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration2.textContent =
      durationMinutes + ":" + formatZero2(durationSeconds);
    const progressWidth = durationFormatted
      ? (player2.currentTime / durationFormatted) * 100
      : 0;
    progress2.style.width = progressWidth + "%";
  };
  const formatZero2 = (n) => (n < 10 ? "0" + n : n);
  progressBar2.onclick = (e) => {
    const newTime = (e.offsetX / progressBar2.offsetWidth) * player2.duration;
    player2.currentTime = newTime;
  };


  const player3 = document.querySelector("#music3");
  const currentTime3 = document.querySelector("#currentTime3");
  const duration3 = document.querySelector("#duration3");
  const progressBar3 = document.querySelector(".progress-bar3");
  const progress3 = document.querySelector(".progress3");
  player3.ontimeupdate = () => updateTime3();
  const updateTime3 = () => {
    const seekbar3 = document.querySelector("#seekbar3");
    seekbar3.max = player3.duration;
    seekbar3.value = player3.currentTime;
    player.ontimeupdate = () => {
      seekbar3.value = player3.currentTime;
      updateTime();
    };
    seekbar3.oninput = () => {
      player3.currentTime = seekbar3.value;
  
      const restartImage = document.querySelector("#restart-image3");
      const playPauseButton3 = document.querySelector("#play3");
  
      restartImage.onclick = () => {
        player3.currentTime = 0;
        seekbar3.value = 0;
        player3.play();
        playPauseButton3.src = "images/pause3.png";
      };
    };
    const currentMinutes = Math.floor(player3.currentTime / 60);
    const currentSeconds = Math.floor(player3.currentTime % 60);
    currentTime3.textContent =
      currentMinutes + ":" + formatZero3(currentSeconds);
    const durationFormatted = isNaN(player3.duration) ? 0 : player3.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration3.textContent =
      durationMinutes + ":" + formatZero3(durationSeconds);
    const progressWidth = durationFormatted
      ? (player3.currentTime / durationFormatted) * 100
      : 0;
    progress3.style.width = progressWidth + "%";
  };
  const formatZero3 = (n) => (n < 10 ? "0" + n : n);
  progressBar3.onclick = (e) => {
    const newTime = (e.offsetX / progressBar3.offsetWidth) * player3.duration;
    player3.currentTime = newTime;
  };


  const player4 = document.querySelector("#music4");
  const currentTime4 = document.querySelector("#currentTime4");
  const duration4 = document.querySelector("#duration4");
  const progressBar4 = document.querySelector(".progress-bar4");
  const progress4 = document.querySelector(".progress4");
  player4.ontimeupdate = () => updateTime4();
  const updateTime4 = () => {
    const seekbar4 = document.querySelector("#seekbar4");
    seekbar4.max = player4.duration;
    seekbar4.value = player4.currentTime;
    player.ontimeupdate = () => {
      seekbar4.value = player4.currentTime;
      updateTime();
    };
    seekbar4.oninput = () => {
      player4.currentTime = seekbar4.value;
  
      const restartImage = document.querySelector("#restart-image4");
      const playPauseButton4 = document.querySelector("#play4");
  
      restartImage.onclick = () => {
        player4.currentTime = 0;
        seekbar4.value = 0;
        player4.play();
        playPauseButton4.src = "images/pause4.png";
      };
    };
    const currentMinutes = Math.floor(player4.currentTime / 60);
    const currentSeconds = Math.floor(player4.currentTime % 60);
    currentTime4.textContent =
      currentMinutes + ":" + formatZero4(currentSeconds);
    const durationFormatted = isNaN(player4.duration) ? 0 : player4.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration4.textContent =
      durationMinutes + ":" + formatZero4(durationSeconds);
    const progressWidth = durationFormatted
      ? (player4.currentTime / durationFormatted) * 100
      : 0;
    progress4.style.width = progressWidth + "%";
  };
  const formatZero4 = (n) => (n < 10 ? "0" + n : n);
  progressBar4.onclick = (e) => {
    const newTime = (e.offsetX / progressBar4.offsetWidth) * player4.duration;
    player4.currentTime = newTime;
  };


  const player5 = document.querySelector("#music5");
  const currentTime5 = document.querySelector("#currentTime5");
  const duration5 = document.querySelector("#duration5");
  const progressBar5 = document.querySelector(".progress-bar5");
  const progress5 = document.querySelector(".progress5");
  player5.ontimeupdate = () => updateTime5();
  const updateTime5 = () => {
    const seekbar5 = document.querySelector("#seekbar5");
    seekbar5.max = player5.duration;
    seekbar5.value = player5.currentTime;
    player.ontimeupdate = () => {
      seekbar5.value = player5.currentTime;
      updateTime();
    };
    seekbar5.oninput = () => {
      player5.currentTime = seekbar5.value;
  
      const restartImage = document.querySelector("#restart-image5");
      const playPauseButton5 = document.querySelector("#play5");
  
      restartImage.onclick = () => {
        player5.currentTime = 0;
        seekbar5.value = 0;
        player5.play();
        playPauseButton5.src = "images/pause5.png";
      };
    };
    const currentMinutes = Math.floor(player5.currentTime / 60);
    const currentSeconds = Math.floor(player5.currentTime % 60);
    currentTime5.textContent =
      currentMinutes + ":" + formatZero5(currentSeconds);
    const durationFormatted = isNaN(player5.duration) ? 0 : player5.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration5.textContent =
      durationMinutes + ":" + formatZero5(durationSeconds);
    const progressWidth = durationFormatted
      ? (player5.currentTime / durationFormatted) * 100
      : 0;
    progress5.style.width = progressWidth + "%";
  };
  const formatZero5 = (n) => (n < 10 ? "0" + n : n);
  progressBar5.onclick = (e) => {
    const newTime = (e.offsetX / progressBar5.offsetWidth) * player5.duration;
    player5.currentTime = newTime;
  };


  const player6 = document.querySelector("#music6");
  const currentTime6 = document.querySelector("#currentTime6");
  const duration6 = document.querySelector("#duration6");
  const progressBar6 = document.querySelector(".progress-bar6");
  const progress6 = document.querySelector(".progress6");
  player6.ontimeupdate = () => updateTime6();
  const updateTime6 = () => {
    const seekbar6 = document.querySelector("#seekbar6");
    seekbar6.max = player6.duration;
    seekbar6.value = player6.currentTime;
    player.ontimeupdate = () => {
      seekbar6.value = player6.currentTime;
      updateTime();
    };
    seekbar6.oninput = () => {
      player6.currentTime = seekbar6.value;
  
      const restartImage = document.querySelector("#restart-image6");
      const playPauseButton6 = document.querySelector("#play6");
  
      restartImage.onclick = () => {
        player6.currentTime = 0;
        seekbar6.value = 0;
        player6.play();
        playPauseButton6.src = "images/pause6.png";
      };
    };
    const currentMinutes = Math.floor(player6.currentTime / 60);
    const currentSeconds = Math.floor(player6.currentTime % 60);
    currentTime6.textContent =
      currentMinutes + ":" + formatZero6(currentSeconds);
    const durationFormatted = isNaN(player6.duration) ? 0 : player6.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration6.textContent =
      durationMinutes + ":" + formatZero6(durationSeconds);
    const progressWidth = durationFormatted
      ? (player6.currentTime / durationFormatted) * 100
      : 0;
    progress6.style.width = progressWidth + "%";
  };
  const formatZero6 = (n) => (n < 10 ? "0" + n : n);
  progressBar6.onclick = (e) => {
    const newTime = (e.offsetX / progressBar6.offsetWidth) * player6.duration;
    player6.currentTime = newTime;
  };


  const player7 = document.querySelector("#music7");
  const currentTime7 = document.querySelector("#currentTime7");
  const duration7 = document.querySelector("#duration7");
  const progressBar7 = document.querySelector(".progress-bar7");
  const progress7 = document.querySelector(".progress7");
  player7.ontimeupdate = () => updateTime7();
  const updateTime7 = () => {
    const seekbar7 = document.querySelector("#seekbar7");
    seekbar7.max = player7.duration;
    seekbar7.value = player7.currentTime;
    player.ontimeupdate = () => {
      seekbar7.value = player7.currentTime;
      updateTime();
    };
    seekbar7.oninput = () => {
      player7.currentTime = seekbar7.value;
  
      const restartImage = document.querySelector("#restart-image7");
      const playPauseButton7 = document.querySelector("#play7");
  
      restartImage.onclick = () => {
        player7.currentTime = 0;
        seekbar7.value = 0;
        player7.play();
        playPauseButton7.src = "images/pause7.png";
      };
    };
    const currentMinutes = Math.floor(player7.currentTime / 60);
    const currentSeconds = Math.floor(player7.currentTime % 60);
    currentTime7.textContent =
      currentMinutes + ":" + formatZero7(currentSeconds);
    const durationFormatted = isNaN(player7.duration) ? 0 : player7.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration7.textContent =
      durationMinutes + ":" + formatZero7(durationSeconds);
    const progressWidth = durationFormatted
      ? (player7.currentTime / durationFormatted) * 100
      : 0;
    progress7.style.width = progressWidth + "%";
  };
  const formatZero7 = (n) => (n < 10 ? "0" + n : n);
  progressBar7.onclick = (e) => {
    const newTime = (e.offsetX / progressBar7.offsetWidth) * player7.duration;
    player7.currentTime = newTime;
  };


  const player8 = document.querySelector("#music8");
  const currentTime8 = document.querySelector("#currentTime8");
  const duration8 = document.querySelector("#duration8");
  const progressBar8 = document.querySelector(".progress-bar8");
  const progress8 = document.querySelector(".progress8");
  player8.ontimeupdate = () => updateTime8();
  const updateTime8 = () => {
    const seekbar8 = document.querySelector("#seekbar8");
    seekbar8.max = player8.duration;
    seekbar8.value = player8.currentTime;
    player.ontimeupdate = () => {
      seekbar8.value = player8.currentTime;
      updateTime();
    };
    seekbar8.oninput = () => {
      player8.currentTime = seekbar8.value;
  
      const restartImage = document.querySelector("#restart-image8");
      const playPauseButton8 = document.querySelector("#play8");
      restartImage.onclick = () => {
        player8.currentTime = 0;
        seekbar8.value = 0;
        player8.play();
        playPauseButton8.src = "images/pause8.png";
      };
    };
    const currentMinutes = Math.floor(player8.currentTime / 60);
    const currentSeconds = Math.floor(player8.currentTime % 60);
    currentTime8.textContent =
      currentMinutes + ":" + formatZero8(currentSeconds);
    const durationFormatted = isNaN(player8.duration) ? 0 : player8.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration8.textContent =
      durationMinutes + ":" + formatZero8(durationSeconds);
    const progressWidth = durationFormatted
      ? (player8.currentTime / durationFormatted) * 100
      : 0;
    progress8.style.width = progressWidth + "%";
  };
  const formatZero8 = (n) => (n < 10 ? "0" + n : n);
  progressBar8.onclick = (e) => {
    const newTime = (e.offsetX / progressBar8.offsetWidth) * player8.duration;
    player8.currentTime = newTime;
  };


  const player9 = document.querySelector("#music9");
  const currentTime9 = document.querySelector("#currentTime9");
  const duration9 = document.querySelector("#duration9");
  const progressBar9 = document.querySelector(".progress-bar9");
  const progress9 = document.querySelector(".progress9");
  player9.ontimeupdate = () => updateTime9();
  const updateTime9 = () => {
    const seekbar9 = document.querySelector("#seekbar9");
    seekbar9.max = player9.duration;
    seekbar9.value = player9.currentTime;
    player.ontimeupdate = () => {
      seekbar9.value = player9.currentTime;
      updateTime();
    };
    seekbar9.oninput = () => {
      player9.currentTime = seekbar9.value;
  
      const restartImage = document.querySelector("#restart-image9");
      const playPauseButton9 = document.querySelector("#play9");
      restartImage.onclick = () => {
        player9.currentTime = 0;
        seekbar9.value = 0;
        player9.play();
        playPauseButton9.src = "images/pause9.png";
      };
    };
    const currentMinutes = Math.floor(player9.currentTime / 60);
    const currentSeconds = Math.floor(player9.currentTime % 60);
    currentTime9.textContent =
      currentMinutes + ":" + formatZero9(currentSeconds);
    const durationFormatted = isNaN(player9.duration) ? 0 : player9.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration9.textContent =
      durationMinutes + ":" + formatZero9(durationSeconds);
    const progressWidth = durationFormatted
      ? (player9.currentTime / durationFormatted) * 100
      : 0;
    progress9.style.width = progressWidth + "%";
  };
  const formatZero9 = (n) => (n < 10 ? "0" + n : n);
  progressBar9.onclick = (e) => {
    const newTime = (e.offsetX / progressBar9.offsetWidth) * player9.duration;
    player9.currentTime = newTime;
  };


  const player10 = document.querySelector("#music10");
  const currentTime10 = document.querySelector("#currentTime10");
  const duration10 = document.querySelector("#duration10");
  const progressBar10 = document.querySelector(".progress-bar10");
  const progress10 = document.querySelector(".progress10");
  player10.ontimeupdate = () => updateTime10();
  const updateTime10 = () => {
    const seekbar10 = document.querySelector("#seekbar10");
    seekbar10.max = player10.duration;
    seekbar10.value = player10.currentTime;
    player.ontimeupdate = () => {
      seekbar10.value = player10.currentTime;
      updateTime();
    };
    seekbar10.oninput = () => {
      player10.currentTime = seekbar10.value;
  
      const restartImage = document.querySelector("#restart-image10");
      const playPauseButton10 = document.querySelector("#play10");
      restartImage.onclick = () => {
        player10.currentTime = 0;
        seekbar10.value = 0;
        player10.play();
        playPauseButton10.src = "images/pause10.png";
      };
    };
    const currentMinutes = Math.floor(player10.currentTime / 60);
    const currentSeconds = Math.floor(player10.currentTime % 60);
    currentTime10.textContent =
      currentMinutes + ":" + formatZero10(currentSeconds);
    const durationFormatted = isNaN(player10.duration) ? 0 : player10.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration10.textContent =
      durationMinutes + ":" + formatZero10(durationSeconds);
    const progressWidth = durationFormatted
      ? (player10.currentTime / durationFormatted) * 100
      : 0;
    progress10.style.width = progressWidth + "%";
  };
  const formatZero10 = (n) => (n < 10 ? "0" + n : n);
  progressBar10.onclick = (e) => {
    const newTime = (e.offsetX / progressBar10.offsetWidth) * player10.duration;
    player10.currentTime = newTime;
  };
};

if (document.querySelector("#rotated")) {
  $(function () {
    var circleType = new CircleType(document.getElementById("rotated")).radius(
      0
    );
  });
}

if (document.querySelector(".swiper-container")) {
  new Swiper(".swiper-container", {
    slidesPerView: "auto",
    speed: 500,
    spaceBetween: 30,
    centeredSlides: true,
    loop: false,
    grabCursor: true,
    autoplay: {
      delay: 6500,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: "#next",
      prevEl: "#prev",
    },
    pagination: {
      el: ".progress-bar-container-swiper",
      type: "progressbar",
    },
    mousewheel: true,
    observer: true,
    observeParents: true,
  });
}
