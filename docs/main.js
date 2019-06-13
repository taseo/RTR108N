const page = (function() {

    const elements = {};

    const routes = {
	'/': buildHomePage,
	'/latex': buildLatexPage,
	'/robotika': buildRobotikaPage
    }

    const text = {
	roboIntro: 'Vivamus non pulvinar orci. Curabitur volutpat augue est, at condimentum magna mollis ac. Proin odio lorem, tincidunt a enim pulvinar, sollicitudin commodo libero',
	roboVideo: 'Morbi consectetur id neque ac gravida. Nulla pulvinar ornare sagittis. Phasellus vitae mattis nisl'
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

	const list = document.createElement('ul');

	for (const doc of documentList) {

	    const listItem = document.createElement('li');

	    listItem.classList.add('document-card');

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

	elements.content.appendChild(createParagraph(text.roboIntro));

	const picture = document.createElement('picture');

	picture.classList.add('block', 'm-center', 'image')

	const webpSource = document.createElement('source');

	webpSource.setAttribute('srcset', `/RTR108N/img/robotika_2019.webp`);
	webpSource.setAttribute('type', 'image/webp');
	picture.appendChild(webpSource);

	const defaultSource = document.createElement('img');
	defaultSource.setAttribute('src', '/RTR108N/img/robotika_2019.jpg');
	defaultSource.setAttribute('alt', `Robotika 2019`);
	defaultSource.classList.add('w-100');
	picture.appendChild(defaultSource);

	elements.content.appendChild(picture);

	elements.content.appendChild(createParagraph(text.roboVideo));

	const lazyBtn = document.createElement('button');

	lazyBtn.addEventListener('click', embedVideo);
	lazyBtn.textContent = 'Skatīt video no pasākuma';

	elements.lazyBtn = lazyBtn;

	elements.content.appendChild(lazyBtn);
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

    function embedVideo() {

	const video = document.createElement('iframe');

	video.setAttribute('src', 'https://www.youtube-nocookie.com/embed/xtLkeXj2gRA?rel=0&amp;showinfo=0');
	video.setAttribute('width', '560');
	video.setAttribute('height', '315');
	video.setAttribute('frameborder', '0');
	video.classList.add('block', 'm-center');

	elements.content.removeChild(elements.lazyBtn);

	elements.content.appendChild(video);
    }

    function createParagraph(text) {

	const paragraph = document.createElement('p');
	paragraph.textContent = text;

	return paragraph;
    }

    return {
	init
    }

}());

page.init();