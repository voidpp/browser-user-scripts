// ==UserScript==
// @name         cikk szó számláló
// @version      1.1
// @description  Megszámolja hány szó van a cikkben, és kiírja hogy kb hány perc elolvasni. Jelenleg 300 szó/perc van bedrótozva. Egyelőre csak a index.hu, 444.hu, portfolio.hu oldalakon működik.
// @author       Lajos Sánta
// @match        https://index.hu/*
// @match        https://444.hu/*
// @match        https://www.portfolio.hu/*
// ==/UserScript==

(function() {
    'use strict';

    function removeByTagName(element, name) {
        for (let child of element.getElementsByTagName(name)) {
            child.parentElement.removeChild(child);
        }
    }

    window.addEventListener('load', function() {
        let wordsPerMinute = 300;
        let selectors = [
            '.cikk-torzs',       // index.hu
            '#content-main',     // 444.hu
            '.smscontent',       // portfolio.hu
        ];
        let elements = document.querySelectorAll(selectors.join(', '));
        if (elements.length == 1) {
            console.log('article word counter found an element!');
            let origArticle = elements[0];
            let article = origArticle.cloneNode(true);
            // remove all unreadable tags
            removeByTagName(article, 'script');
            removeByTagName(article, 'img');
            let wordCount = article.textContent.split(/\s+/).length;
            let mins = Math.ceil(wordCount / wordsPerMinute);
            let feedback = document.createElement('p');
            feedback.innerHTML = `⏱ <i>${mins} perc (${wordCount} szó)</i>`;
            origArticle.insertBefore(feedback, origArticle.childNodes[0]);
        }
    }, true);
})();
