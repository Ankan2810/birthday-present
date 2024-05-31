onload = () => {
  const birthdaySong = document.getElementById('birthdaySong');
  birthdaySong.volume = 0.2;
  birthdaySong.play();
};

function openEnvelope() {
  const envelope = document.getElementById('envelope');
  const letter = document.getElementById('letter');
  const birthdaySong = document.getElementById('birthdaySong');
  const balloon1 = document.getElementById('lBalloon');
  const balloon2 = document.getElementById('rBalloon');


  envelope.style.transform = 'rotateY(180deg)';
  setTimeout(() => {
      envelope.style.display = 'none';
      letter.classList.remove('hidden');
      birthdaySong.play();
      startMicrophone();
      balloon1.classList.remove('hidden');
      balloon2.classList.remove('hidden');
      balloon1.classList.add('visible');
      balloon2.classList.add('visible');
  }, 600); // Thời gian khớp với thời gian chuyển đổi CSS

}

function closeEnvelope() {
  const envelope = document.getElementById('envelope');
  const letter = document.getElementById('letter');
  const birthdaySong = document.getElementById('birthdaySong');
  const balloon1 = document.getElementById('lBalloon');
  const balloon2 = document.getElementById('rBalloon');
  balloon1.classList.remove('visible');
  balloon2.classList.remove('visible');
  balloon1.classList.add('hidden');
  balloon2.classList.add('hidden');

  birthdaySong.pause();
  letter.classList.add('hidden');
  envelope.style.display = 'block';
  setTimeout(() => {
      envelope.style.transform = 'rotateY(0deg)';
  }, 0); // Đặt lại trạng thái envelope
}

function toggleMusic(event) {
  event.stopPropagation(); // Ngăn chặn sự kiện đóng thư
  const birthdaySong = document.getElementById('birthdaySong');
  const toggleMusicBtn = document.getElementById('toggleMusicBtn');

  if (birthdaySong.paused) {
      birthdaySong.play();
      toggleMusicBtn.textContent = 'Pause Music';
  } else {
      birthdaySong.pause();
      toggleMusicBtn.textContent = 'Play Music';
  }
}

// Đảm bảo rằng lá thư vẫn có thể đóng lại bằng cách click vào bên ngoài nút "Pause Music"
document.getElementById('letter').addEventListener('click', function(event) {
  if (event.target.id !== 'toggleMusicBtn') {
      closeEnvelope();
  }
});

function startMicrophone() {
  navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
          const audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          const analyser = audioContext.createAnalyser();
          source.connect(analyser);
          analyser.fftSize = 2048;

          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const detectBlow = () => {
              analyser.getByteFrequencyData(dataArray);
              const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
              const threshold = 43;

              if (average > threshold) {
                  turnOffTheCandle();
              }
          };

          setInterval(detectBlow, 100);
      })
      .catch(error => {
          console.error("Error accessing microphone:", error);
      });
}

function turnOffTheCandle() {
  const candleFlame = document.getElementById('candleFlame');
  candleFlame.style.display = 'none';
}

function relightCandle(event){
  event.stopPropagation(); // Ngăn chặn sự kiện đóng thư
  const candleFlame = document.getElementById('candleFlame');
    if (candleFlame.style.display === 'none') {
        candleFlame.style.display = 'block';
    }
}
