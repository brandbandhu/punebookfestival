(() => {
    const bar = document.querySelector('.festival-countdown');
    const timer = document.getElementById('festival-countdown-timer');
    const start = Date.parse(bar.querySelector('time').dateTime);
    const units = { days: 86400, hours: 3600, minutes: 60, seconds: 1 };
    const counters = Array.from(timer.querySelectorAll('[data-unit]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function updateCountdown() {
        let remaining = Math.ceil((start - Date.now()) / 1000);
        if (remaining <= 0) {
            document.getElementById('festival-countdown-label').textContent = 'Festival start date';
            timer.hidden = true;
            return;
        }

        for (const counter of counters) {
            const unit = units[counter.dataset.unit];
            const nextValue = String(Math.floor(remaining / unit)).padStart(2, '0');
            if (counter.textContent !== nextValue) {
                const previousValue = counter.textContent;
                counter.textContent = nextValue;
                if (previousValue && !reducedMotion.matches) {
                    counter.animate(
                        [{ transform: 'rotateX(-40deg) translateY(-0.15em)', opacity: 0.55 },
                         { transform: 'rotateX(0) translateY(0)', opacity: 1 }],
                        { duration: 280, easing: 'ease-out' }
                    );
                }
            }
            remaining %= unit;
        }
        timer.setAttribute('aria-label', counters.map(counter =>
            `${Number(counter.textContent)} ${counter.dataset.unit}`
        ).join(', '));
        timer.hidden = false;
        window.setTimeout(updateCountdown, 1000);
    }

    updateCountdown();
})();
