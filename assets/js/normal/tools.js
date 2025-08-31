document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.geopattern').forEach(el => {
        var pattern = GeoPattern.generate(el.dataset.patternId).toDataUrl();
        el.style.backgroundImage = pattern;
    });
});