const text = "The fallen leaves tell a story...";
let i = 0;

function type() {
    if (i < text.length) {
        document.querySelector(".content p").textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
    }
}

const music = document.getElementById("bgm");
const toggleBtn = document.getElementById("music-toggle");

music.volume = 0.1;
music.muted = true;

toggleBtn.addEventListener("click", () => {
    if (music.muted) {
        music.muted = false;
        fadeInAudio(0.03);
        toggleBtn.textContent = "⏸";
    } else {
        music.muted = true;
        fadeOutAudio();
        toggleBtn.textContent = "▶";
    }
});

function fadeInAudio(targetVolume = 0.2, duration = 1000) {
    let step = targetVolume / (duration / 50);
    music.volume = 0;
    music.play();
    const fade = setInterval(() => {
        if (music.volume < targetVolume) {
            music.volume = Math.min(music.volume + step, targetVolume);
        } else {
            clearInterval(fade);
        }
    }, 50);
}

function fadeOutAudio(duration = 1000) {
    const step = music.volume / (duration / 50);
    const fade = setInterval(() => {
        if (music.volume > 0) {
            music.volume = Math.max(music.volume - step, 0);
        } else {
            music.pause();
            clearInterval(fade);
        }
    }, 50);
}

document.addEventListener("visibilitychange", () => {
    if (!music.muted) {
        if (document.visibilityState === "visible") {
            fadeInAudio(0.2);
        } else {
            fadeOutAudio();
        }
    }
});

window.addEventListener("load", () => {
    type();
    if (!music.muted) {
        fadeInAudio(0.2);
    }
});

// 平滑滾動效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = document.body.scrollWidth;
    canvas.height = document.body.scrollHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.2
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.x += star.dx;
        star.y += star.dy;

        // 若超出邊界，重新生成位置
        if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
        }
    }
    requestAnimationFrame(drawStars);
}

createStars(150);
drawStars();

