const page = (function() {

    const elements = {};

    const routes = {
	'/': buildHomePage,
	'/latex': buildLatexPage,
	'/robotika': buildRobotikaPage
    }

    const text = {
	roboParagraph: 'Vivamus non pulvinar orci. Curabitur volutpat augue est, at condimentum magna mollis ac. Proin odio lorem, tincidunt a enim pulvinar, sollicitudin commodo libero',
	videoParagraph: 'Morbi consectetur id neque ac gravida. Nulla pulvinar ornare sagittis. Phasellus vitae mattis nisl',
	latexIntro: 'Semestra laikā sagatavotie LaTex dokumenti',
	robotikaIntro: 'Atskats uz Robotika 2019',
	btn: 'Skatīt video no pasākuma'
    }

    const documentList = [
	{
	    title: 'Vienādojumi',
	    fileName: 'equations',
	},
	{
	    title: 'Funkciju grafiska attēlošana',
	    fileName: 'graph'
	},
	{
	    title: 'Tāfeles skice',
	    fileName: 'blackboard'
	},
	{
	    title: 'Klases uzdevumus',
	    fileName: 'class_assignmen'
	},
	{
	    title: 'Matemātikas grāmatas izvilkums',
	    fileName: 'math_book_excerpt'
	},
	{
	    title: 'Angļu valodas kursa mājasdarbs',
	    fileName: 'eng_homework'
	}
    ]

    let currentPath = '';

    function init() {

	const links = document.querySelectorAll('.js-link');

	elements.content = document.getElementById('content');

	for (const link of links) {
	    link.addEventListener('click', handleNavigation);
	}

	window.onpopstate = () => {
	    runNavigation(window.location.pathname);
	}
    }

    function handleNavigation(event) {
	event.preventDefault();

	const url = new URL(event.target.href);
	const pathName = url.pathname;

	if (pathName !== currentPath) {
	    currentPath = pathName;

	    cleanUp();

	    runNavigation(pathName);
	}
    }

    function runNavigation(pathName) {

	routes[pathName]();

	pathName = `/RTR108N${pathName}`;

	window.history.pushState(
	    {},
	    pathName,
	    window.location.origin + pathName
	);
    }

    function cleanUp() {

	while (elements.content.firstChild) {
	    elements.content.removeChild(elements.content.firstChild);
	}
    }

    function buildLatexPage(event) {

	elements.content.appendChild(createHeading(text.latexIntro));

	const list = document.createElement('ul');

	list.classList.add('grid-container');

	for (const doc of documentList) {

	    const listItem = document.createElement('li');

	    listItem.classList.add('card', 'w-100');

	    const documentName = document.createElement('div');

	    documentName.textContent = doc.title;

	    listItem.appendChild(documentName);
	    listItem.appendChild(createDocumentLink(doc.fileName, 'pdf', 'pdf'));
	    listItem.appendChild(createDocumentLink(doc.fileName, 'tex', 'src'));

	    list.appendChild(listItem);
	}

	elements.content.appendChild(list);
    }

    function buildHomePage() {
    }

    function buildRobotikaPage() {

	elements.content.appendChild(createHeading(text.robotikaIntro));

	const wrap = document.createElement('div');

	wrap.classList.add('grid-container');

	wrap.appendChild(createFirstColumn());
	wrap.appendChild(createSecondColumn());

	elements.content.appendChild(wrap);
    }

    function createDocumentLink(fileName, extension, text) {

	const documentLink = document.createElement('a');

	documentLink.setAttribute('href', `/RTR108N/tex/${fileName}.${extension}`);
	documentLink.setAttribute('target', '_blank');
	documentLink.setAttribute('download', '');
	documentLink.textContent = text;
	documentLink.classList.add('inline-block', 'document-link');

	return documentLink;
    }

    function createFirstColumn() {

	const colOne = document.createElement('div');

	colOne.classList.add('card');
	colOne.appendChild(createParagraph(text.roboParagraph));

	const picture = document.createElement('picture');

	picture.classList.add('block', 'm-center', 'w-100', 'max-560');

	const webpSource = document.createElement('source');

	webpSource.setAttribute('srcset', `/RTR108N/img/robotika_2019.webp`);
	webpSource.setAttribute('type', 'image/webp');
	picture.appendChild(webpSource);

	const defaultSource = document.createElement('img');
	defaultSource.setAttribute('src', '/RTR108N/img/robotika_2019.jpg');
	defaultSource.setAttribute('alt', `Robotika 2019`);
	defaultSource.classList.add('w-100');
	picture.appendChild(defaultSource);

	colOne.appendChild(picture);

	return colOne;
    }

    function createSecondColumn() {

	const colTwo = document.createElement('div');

	colTwo.classList.add('card');

	colTwo.appendChild(createParagraph(text.videoParagraph));

	const lazyBtn = document.createElement('button');

	lazyBtn.addEventListener('click', embedVideo);
	lazyBtn.classList.add('btn', 'fs-16');
	lazyBtn.textContent = text.btn;

	elements.colTwo = colTwo;
	elements.lazyBtn = lazyBtn;

	colTwo.appendChild(lazyBtn);

	return colTwo;
    }

    function embedVideo() {

	const video = document.createElement('iframe');

	video.setAttribute('src', 'https://www.youtube-nocookie.com/embed/xtLkeXj2gRA?rel=0&amp;showinfo=0');
	video.setAttribute('width', '560');
	video.setAttribute('height', '315');
	video.setAttribute('frameborder', '0');
	video.classList.add('block', 'm-center', 'w-100','max-560');

	elements.colTwo.removeChild(elements.lazyBtn);

	elements.colTwo.appendChild(video);
    }

    function createParagraph(text) {

	const paragraph = document.createElement('p');

	paragraph.classList.add('text');
	paragraph.textContent = text;

	return paragraph;
    }

    function createHeading(text) {

	const heading = document.createElement('h2');

	heading.classList.add('secondary-title');
	heading.textContent = text;

	return heading;
    }

    return {
	init
    }

}());

page.init();