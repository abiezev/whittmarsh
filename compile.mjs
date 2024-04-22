import { readFileSync, writeFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import CleanCSS from 'clean-css';


run();

/* 
    Nav
    Hero
    Steps
    Value Prop
    Tailor Income
    Product
    Risk
    Why Bonds
    Final CTA
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

    const steps = readFileSync('steps.html', 'utf-8');
    const stepsDom = new JSDOM(steps);
    const stepsDoc = stepsDom.window.document;
    const stepsSection = stepsDoc.querySelector('section#steps');
    outputDoc.querySelector('section#steps').innerHTML = stepsSection.innerHTML;
    const stepsCSS = stepsDoc.querySelector('style').textContent.trim();

    const tailor = readFileSync('tailor-income.html', 'utf-8');
    const tailorDom = new JSDOM(tailor);
    const tailorDoc = tailorDom.window.document;
    const tailorSection = tailorDoc.querySelector('section#tailor');
    outputDoc.querySelector('section#tailor').innerHTML = tailorSection.innerHTML;
    const tailorCSS = tailorDoc.querySelector('style').textContent.trim();

    const valueProp = readFileSync('value-prop.html', 'utf-8');
    const valuePropDom = new JSDOM(valueProp);
    const valuePropDoc = valuePropDom.window.document;
    const valuePropSection = valuePropDoc.querySelector('section#value-prop');
    outputDoc.querySelector('section#value-prop').innerHTML = valuePropSection.innerHTML;
    const valuePropCSS = valuePropDoc.querySelector('style').textContent.trim();

    const product = readFileSync('product.html', 'utf-8');
    const productDom = new JSDOM(product);
    const productDoc = productDom.window.document;
    const productSection = productDoc.querySelector('section#product');
    outputDoc.querySelector('section#product').innerHTML = productSection.innerHTML;
    const productCSS = productDoc.querySelector('style').textContent.trim();

    const contrast = readFileSync('contrast.html', 'utf-8');
    const contrastDom = new JSDOM(contrast);
    const contrastDoc = contrastDom.window.document;
    const contrastSection = contrastDoc.querySelector('section#contrast');
    outputDoc.querySelector('section#contrast').innerHTML = contrastSection.innerHTML;
    const contrastCSS = contrastDoc.querySelector('style').textContent.trim();

    const risks = readFileSync('risks.html', 'utf-8');
    const risksDom = new JSDOM(risks);
    const risksDoc = risksDom.window.document;
    const risksSection = risksDoc.querySelector('section#risks');
    outputDoc.querySelector('section#risks').innerHTML = risksSection.innerHTML;
    const risksCSS = risksDoc.querySelector('style').textContent.trim();

    // const disclaimer = readFileSync('disclaimer.html', 'utf-8');
    // const disclaimerDom = new JSDOM(disclaimer);
    // const disclaimerDoc = disclaimerDom.window.document;
    // const disclaimerSection = disclaimerDoc.querySelector('section#disclaimer');
    // outputDoc.querySelector('section#disclaimer').innerHTML = disclaimerSection.innerHTML;
    // const disclaimerCSS = disclaimerDoc.querySelector('style').textContent.trim();

    const finalCta = readFileSync('final-cta.html', 'utf-8');
    const finalCtaDom = new JSDOM(finalCta);
    const finalCtaDoc = finalCtaDom.window.document;
    const finalCtaSection = finalCtaDoc.querySelector('section#final-cta');
    outputDoc.querySelector('section#final-cta').innerHTML = finalCtaSection.innerHTML;
    const finalCtaCSS = finalCtaDoc.querySelector('style').textContent.trim();


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
    + '\n' + stepsCSS
    + '\n' + valuePropCSS
    + '\n' + tailorCSS
    + '\n' + productCSS
    + '\n' + contrastCSS
    + '\n' + risksCSS
    // + '\n' + disclaimerCSS
    + '\n' + finalCtaCSS
    + '\n' + footerCSS;

    writeFileSync('index.html', outputDom.serialize());
    const minifiedCss = new CleanCSS().minify(css).styles;
    writeFileSync('styles.min.css', minifiedCss, 'utf8');

}

