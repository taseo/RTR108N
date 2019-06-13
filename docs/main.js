const page = (function() {

    const elements = {};

    const routes = {
	'/': buildHomePage,
	'/latex': buildLatexPage,
	'/robotika': buildRobotikaPage
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

	const list = document.createElement('UL');

	for (const doc of documentList) {

	    const listItem = document.createElement('LI');

	    listItem.classList.add('document-card');

	    const documentName = document.createElement('DIV');

	    documentName.textContent = doc.title;

	    const documentLink = document.createElement('A');

	    documentLink.setAttribute('href', `/RTR108N/tex/${doc.fileName}.pdf`);
	    documentLink.setAttribute('target', '_blank');
	    documentLink.setAttribute('download', '');
	    documentLink.textContent = 'pdf';
	    documentLink.classList.add('inline-block', 'document-link');

	    const srcLink = document.createElement('A');

	    srcLink.setAttribute('href', `/RTR108N/tex/${doc.fileName}.tex`);
	    srcLink.setAttribute('target', '_blank');
	    srcLink.setAttribute('download', '');
	    srcLink.textContent = 'src';
	    srcLink.classList.add('inline-block', 'document-link');

	    listItem.appendChild(documentName);
	    listItem.appendChild(documentLink);
	    listItem.appendChild(srcLink);

	    list.appendChild(listItem);
	}

	elements.content.appendChild(list);
    }

    function buildHomePage() {
    }

    function buildRobotikaPage() {
    }

    return {
	init
    }
}());

page.init();