// trigger saat halaman load
window.addEventListener('load', () => {
    const now = new Date();
    const currentHour = now.getHours(); // ambil jam saat ini
    console.log(currentHour);

    // kalau masih jam 00:00 - 15:59 → langsung mulai animasi
    if (currentHour < 20) {
        startSweetAlert();
        return;
    }

    // kalau sudah jam 16:00 ke atas → cek menuju 00:00
    const target = new Date();
    target.setHours(0, 0, 0, 0); // target jam 00:00 hari ini

    if (now > target) {
        target.setDate(target.getDate() + 1); // kalau sudah lewat 00:00, target ke besok
    }

    const diff = target - now;
    const waktuMundur = 120 * 60 * 1000;

    if (diff > waktuMundur) {
        showWaitBox(target, waktuMundur);
    } else {
        startCountdown(target);
    }
});


// =====================
// Tampilkan pesan tunggu
// =====================
function showWaitBox(target, waktuMundur) {
    const waitBox = document.createElement("div");
    waitBox.id = "waitBox";
    waitBox.style.position = "fixed";
    waitBox.style.top = "50%";
    waitBox.style.left = "50%";
    waitBox.style.transform = "translate(-50%, -50%)";
    waitBox.style.fontSize = "1.0rem";
    waitBox.style.background = "rgba(0,0,0,0.7)";
    waitBox.style.color = "#fff";
    waitBox.style.padding = "10px 10px";
    waitBox.style.borderRadius = "15px";
    waitBox.style.zIndex = "9999";
    document.body.appendChild(waitBox);

    const updateWaitBox = () => {
        const now = new Date();
        const diff = target - now;
        const hours = Math.floor(diff / 1000 / 60 / 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);

        // waitBox.innerHTML = Tunggu sampai jam 00:00 <br>tunggu ${hours} jam ${minutes} menit;
        const hh = now.getHours().toString().padStart(2, "0");
        const mm = now.getMinutes().toString().padStart(2, "0");
        const ss = now.getSeconds().toString().padStart(2, "0");

        waitBox.innerHTML = `Tunggu sampai jam 00:00 <br>
                            tunggu ${hours} jam ${minutes} menit<br>
                            Sekarang: ${hh}:${mm}:${ss}`;

        if (diff <= waktuMundur) {
            clearInterval(timer);
            document.body.removeChild(waitBox);
            startCountdown(target);
        }
    };

    updateWaitBox(); // isi pertama kali
    const timer = setInterval(updateWaitBox, 1000);
}


// =====================
// Countdown 3 menit terakhir
// =====================
function startCountdown(target) {
    const countdownBox = document.createElement("div");
    countdownBox.id = "countdown";
    countdownBox.style.position = "fixed";
    countdownBox.style.top = "50%";
    countdownBox.style.left = "50%";
    countdownBox.style.transform = "translate(-50%, -50%)";
    countdownBox.style.fontSize = "1rem";
    countdownBox.style.background = "rgba(0,0,0,0.7)";
    countdownBox.style.color = "#fff";
    countdownBox.style.padding = "10px 10px";
    countdownBox.style.borderRadius = "15px";
    countdownBox.style.zIndex = "9999";
    document.body.appendChild(countdownBox);

    const timer = setInterval(() => {
        const now = new Date();
        const diff = target - now;

        if (diff <= 0) {
            clearInterval(timer);
            document.body.removeChild(countdownBox);
            startSweetAlert();
        } else {
            const minutes = Math.floor(diff / 1000 / 60);
            const seconds = Math.floor((diff / 1000) % 60);
            countdownBox.textContent = `Hitung mundur ke 00: 00[$ { minutes }: $ {
                        seconds.toString().padStart(2, "
                            0 ") }]`;
        }
    }, 1000);
}


// =====================
// SweetAlert sebelum animasi
// =====================
function startSweetAlert() {
    Swal.fire({
        title: 'Siap-siap 🎉',
        text: "Ada sesuatu yang spesial buat kamu...",
        confirmButtonText: "Lihat yuk!",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('.song').play();
            animationTimeline();
        } else {
            animationTimeline();
        }
    });
}


// =====================
// Animation Timeline
// =====================
const animationTimeline = () => {
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    const tl = new TimelineMax();

    tl.to(".container", 0.6, { visibility: "visible" })
        .from(".one", 0.7, { opacity: 0, y: 10 })
        .from(".two", 0.4, { opacity: 0, y: 10 })
        .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.5")
        .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
        .from(".three", 0.7, { opacity: 0, y: 10 })
        .to(".three", 0.7, { opacity: 0, y: 10 }, "+=3")
        .from(".four", 0.7, { scale: 0.2, opacity: 0 })
        .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
        .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
        .to(".fake-btn", 0.1, { backgroundColor: "rgba(242, 134, 215, 1)" }, "+=4")
        .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
        .from(".idea-1", 0.7, ideaTextTrans)
        .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-2", 0.7, ideaTextTrans)
        .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-3", 0.7, ideaTextTrans)
        .to(".idea-3 strong", 0.5, {
            scale: 1.1,
            x: 10,
            backgroundColor: "rgba(241, 98, 206, 1)",
            color: "#fff",
        })
        .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-4", 0.7, ideaTextTrans)
        .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-5", 0.7, {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
        }, "+=1.5")
        .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=1.4")
        .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
        .staggerFrom(".idea-6 span", 0.8, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut,
        }, 0.2)
        .staggerTo(".idea-6 span", 0.8, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut,
        }, 0.2, "+=1.5")
        .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
        .from(".profile-picture", 0.5, {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
        }, "-=2")
        .from(".hat", 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })
        .staggerFrom(".wish-hbd span", 0.7, {
            opacity: 0,
            y: -50,
            rotation: 150,
            skewX: "30deg",
            ease: Elastic.easeOut.config(1, 0.5),
        }, 0.1)
        .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, {
            scale: 1,
            rotationY: 0,
            color: "#ff69b4",
            ease: Expo.easeOut,
        }, 0.1, "party")
        .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
        .staggerTo(".eight svg", 1.5, {
            visibility: "visible",
            opacity: 0,
            scale: 80,
            repeat: 3,
            repeatDelay: 1.4,
        }, 0.3)
        .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })
        .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
        .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

    // Restart Animation on click
    const replyBtn = document.getElementById("replay");
    if (replyBtn) {
        replyBtn.addEventListener("click", () => {
            tl.restart();
        });
    }
};