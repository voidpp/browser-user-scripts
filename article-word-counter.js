// ==UserScript==
// @name         cikk szó számláló
// @version      0.1
// @description  Megszámolja hány szó van a cikkben, és kiírja hogy kb hány perc elolvasni. Jelenleg 300 szó/perc van bedrótozva
// @author       Lajos Sánta
// @match        https://index.hu/*
// @match        https://444.hu/*
// @match        https://www.portfolio.hu/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(() => {
        let wordsPerMinute = 300;
        let selectors = [
            '.cikk-torzs',       // index.hu
            '#content-main',     // 444.hu
            '.smscontent',       // portfolio.hu
        ];
        let elements = $(selectors.join(', '));
        if (elements.length == 1) {
            console.log('article word counter found an element!');
            let origArticle = $(elements[0]);
            let article = origArticle.clone();
            // remove all unreadable tags
            article.find('script').remove();
            article.find('img').remove();
            let wordCount = article.text().split(/\s+/).length;
            let mins = Math.ceil(wordCount / wordsPerMinute);
            //let hours = parseInt(mins / 60);
            origArticle.prepend($(`<p>⏱ <i>${mins} perc (${wordCount} szó)</i></p>`));
        }
    });
})();
