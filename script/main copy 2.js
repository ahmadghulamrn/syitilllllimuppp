document.addEventListener("DOMContentLoaded", () => {
    // Play audio setelah user klik OK di SweetAlert
    Swal.fire({
        title: "Siap-siap 🎉",
        text: "Ada sesuatu yang spesial buat kamu...",
        confirmButtonText: "Lihat yuk!",
        allowOutsideClick: false,
        allowEscapeKey: false,
    }).then(() => {
        const song = document.querySelector(".song");
        song.play().catch(() => {
            console.warn("Autoplay diblokir, user perlu klik manual.");
        });

        startAnimation();
    });

    function startAnimation() {
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

        // STEP 1: Greeting awal
        tl.from(".one h1", { opacity: 0, y: -50, duration: 1 })
            .from(".one .two", { opacity: 0, y: 30, duration: 1 }, "-=0.5")

        // STEP 2: Ucapan birthday
        .from(".three", { opacity: 0, scale: 0.7, duration: 1, ease: "back.out(1.7)" })

        // STEP 3: Chat box typing effect
        .from(".four .text-box", { opacity: 0, y: 50, duration: 1 })
            .from(".four .hbd-chatbox", { opacity: 0, duration: 1 })

        // STEP 4: Idea texts (jadi, enjoy moment, dst.)
        .from(".five .idea-1", { opacity: 0, y: 20, duration: 1 })
            .from(".five .idea-2", { opacity: 0, y: 20, duration: 1 })
            .from(".five .idea-3", { opacity: 0, y: 20, duration: 1 })
            .from(".five .idea-4", { opacity: 0, scale: 0.8, duration: 1, ease: "back.out(1.7)" })
            .from(".five .idea-5", { opacity: 0, y: 20, duration: 1 })
            .from(".five .idea-6 span", {
                opacity: 0,
                scale: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "elastic.out(1, 0.5)",
            })

        // STEP 5: Foto & wish
        .from(".six img", { opacity: 0, scale: 0.8, duration: 1 })
            .from(".six .wish", { opacity: 0, y: 40, duration: 1 })

        // STEP 6: Balon muncul + animasi terbang
        .from(".baloons img", {
            opacity: 0,
            y: 200,
            duration: 2,
            stagger: 0.2,
            ease: "power1.out",
        }, "-=1")

        // STEP 7: Sparkles (lingkaran animasi)
        .to(".eight svg", {
            opacity: 1,
            scale: 1.5,
            duration: 1,
            stagger: 0.2,
            repeat: -1,
            yoyo: true,
        }, "-=2")

        // STEP 8: Ending
        .from(".nine", { opacity: 0, y: 50, duration: 1 });

        // Replay button
        const replay = document.getElementById("replay");
        replay.addEventListener("click", () => {
            tl.restart();
        });
    }
});