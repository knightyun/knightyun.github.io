function toggleForked() {
    var forkSwitch = document.querySelector('.fork-switch'),
        forked = document.querySelector('div[id=forked]');

    if (forkSwitch.checked) {
        forked.classList.remove('hidden');
    } else {
        forked.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.geopattern').forEach(el => {
        var pattern = GeoPattern.generate(el.dataset.patternId).toDataUrl();
        el.style.backgroundImage = pattern;
    });
    toggleForked();
})