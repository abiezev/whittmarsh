import { readFileSync, writeFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import CleanCSS from 'clean-css';


run();

/* 
    Nav
    Hero
    whoWeAre
    whoWeWorkWith
    whatWeDo
    whyWeDiff
    callToAction
    Footer
*/


function run() {
    const outputHtml = readFileSync('index.html', 'utf-8');
    const outputDom = new JSDOM(outputHtml);
    const outputDoc = outputDom.window.document;

    const nav = readFileSync('nav.html', 'utf-8');
    const navDom = new JSDOM(nav);
    const navDoc = navDom.window.document;
    const navSection = navDoc.querySelector('section#nav');
    outputDoc.querySelector('section#nav').innerHTML = navSection.innerHTML;
    const navCSS = navDoc.querySelector('style').textContent.trim();
    
    const hero = readFileSync('hero.html', 'utf-8');
    const heroDom = new JSDOM(hero);
    const heroDoc = heroDom.window.document;
    const heroSection = heroDoc.querySelector('section#hero');
    outputDoc.querySelector('section#hero').innerHTML = heroSection.innerHTML;
    const heroCSS = heroDoc.querySelector('style').textContent.trim();

    const whoWeServe = readFileSync('who-we-serve.html', 'utf-8');
    const whoWeServeDom = new JSDOM(whoWeServe);
    const whoWeServeDoc = whoWeServeDom.window.document;
    const whoWeServeSection = whoWeServeDoc.querySelector('section#who-we-serve');
    outputDoc.querySelector('section#who-we-serve').innerHTML = whoWeServeSection.innerHTML;
    const whoWeServeCSS = whoWeServeDoc.querySelector('style').textContent.trim();

    const whoWeAre = readFileSync('who-we-are.html', 'utf-8');
    const whoWeAreDom = new JSDOM(whoWeAre);
    const whoWeAreDoc = whoWeAreDom.window.document;
    const whoWeAreSection = whoWeAreDoc.querySelector('section#who-we-are');
    outputDoc.querySelector('section#who-we-are').innerHTML = whoWeAreSection.innerHTML;
    const whoWeAreCSS = whoWeAreDoc.querySelector('style').textContent.trim();

    const whoWeWorkWith = readFileSync('who-we-work-with.html', 'utf-8');
    const whoWeWorkWithDom = new JSDOM(whoWeWorkWith);
    const whoWeWorkWithDoc = whoWeWorkWithDom.window.document;
    const whoWeWorkWithSection = whoWeWorkWithDoc.querySelector('section#who-we-work-with');
    outputDoc.querySelector('section#who-we-work-with').innerHTML = whoWeWorkWithSection.innerHTML;
    const whoWeWorkWithCSS = whoWeWorkWithDoc.querySelector('style').textContent.trim();

    const whatWeDo = readFileSync('what-we-do.html', 'utf-8');
    const whatWeDoDom = new JSDOM(whatWeDo);
    const whatWeDoDoc = whatWeDoDom.window.document;
    const whatWeDoSection = whatWeDoDoc.querySelector('section#what-we-do');
    outputDoc.querySelector('section#what-we-do').innerHTML = whatWeDoSection.innerHTML;
    const whatWeDoCSS = whatWeDoDoc.querySelector('style').textContent.trim();


    const whyWeDiff = readFileSync('why-we-are-diff.html', 'utf-8');
    const whyWeDiffDom = new JSDOM(whyWeDiff);
    const whyWeDiffDoc = whyWeDiffDom.window.document;
    const whyWeDiffSection = whyWeDiffDoc.querySelector('section#why-we-are-diff');
    outputDoc.querySelector('section#why-we-are-diff').innerHTML = whyWeDiffSection.innerHTML;
    const whyWeDiffCSS = whyWeDiffDoc.querySelector('style').textContent.trim();

    const callToAction = readFileSync('call-to-action.html', 'utf-8');
    const callToActionDom = new JSDOM(callToAction);
    const callToActionDoc = callToActionDom.window.document;
    const callToActionSection = callToActionDoc.querySelector('section#call-to-action');
    outputDoc.querySelector('section#call-to-action').innerHTML = callToActionSection.innerHTML;
    const callToActionCSS = callToActionDoc.querySelector('style').textContent.trim();


    const footer = readFileSync('footer.html', 'utf-8');
    const footerDom = new JSDOM(footer);
    const footerDoc = footerDom.window.document;
    const footerSection = footerDoc.querySelector('section#footer');
    outputDoc.querySelector('section#footer').innerHTML = footerSection.innerHTML;
    const footerCSS = footerDoc.querySelector('style').textContent.trim();

    const universalCss = readFileSync('universal.css', 'utf-8');

    const css = universalCss 
    + '\n' + navCSS
    + '\n' + heroCSS
    + '\n' + whoWeServeCSS
    + '\n' + whoWeAreCSS
    + '\n' + whoWeWorkWithCSS
    + '\n' + whatWeDoCSS
    + '\n' + whyWeDiffCSS
    + '\n' + callToActionCSS
    + '\n' + footerCSS;

    writeFileSync('index.html', outputDom.serialize());
    const minifiedCss = new CleanCSS().minify(css).styles;
    writeFileSync('styles.min.css', minifiedCss, 'utf8');

}

