const links = document.querySelectorAll('.js-link');

const content = document.getElementById('content');

for (const link of links) {
    link.addEventListener('click', handleNavigation);
}

window.onpopstate = () => {
    runNavigation(window.location.pathname);
}

const routes = {
    '/': buildHomePage,
    '/latex': buildLatexPage,
    '/robotika': buildRobotikaPage
}

const documentList = [
    'Equations',
    'Graph'
]

function handleNavigation(event) {
    event.preventDefault();

    const url = new URL(event.target.href);
    const pathName = url.pathname;

    runNavigation(pathName);
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

function buildLatexPage(event) {

    cleanUp();

    const list = document.createElement('UL');

    for (const doc of documentList) {

	const listItem = document.createElement('LI');

	listItem.classList.add('document-card');

	const documentName = document.createElement('DIV');

	documentName.textContent = doc;

	const documentLink = document.createElement('A');

	documentLink.setAttribute('href', `/RTR108N/tex/${doc}.pdf`);
	documentLink.setAttribute('target', '_blank');
	documentLink.setAttribute('download', '');
	documentLink.textContent = 'pdf';
	documentLink.classList.add('inline-block', 'document-link');

	const srcLink = document.createElement('A');

	srcLink.setAttribute('href', `/RTR108N/tex/${doc}.tex`);
	srcLink.setAttribute('target', '_blank');
	srcLink.setAttribute('download', '');
	srcLink.textContent = 'src';
	srcLink.classList.add('inline-block', 'document-link');

	listItem.appendChild(documentName);
	listItem.appendChild(documentLink);
	listItem.appendChild(srcLink);

	list.appendChild(listItem);
    }

    content.appendChild(list);
}

function buildHomePage() {
    cleanUp();
}

function buildRobotikaPage() {
    cleanUp();
}

function cleanUp() {

    while (content.firstChild) {
	content.removeChild(content.firstChild);
    }
}
