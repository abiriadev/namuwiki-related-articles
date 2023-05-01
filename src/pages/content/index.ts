type Score = {
	name: string
	count: number
}

const findAllLinks = () =>
	[
		...(document
			.querySelector('article')
			?.getElementsByTagName('a') ?? []),
	]
		.filter(({ href }) =>
			/^https:\/\/namu\.wiki\/w\//.test(href),
		)
		.filter(({ title }) => title !== '')
		.map(({ title }) => title)

const scoring = (links: string[]): Score[] =>
	Object.entries(
		links.reduce(
			(p: { [k: string]: number }, n) => ({
				...p,
				[n]: 1 + (p[n] ?? 0),
			}),
			{},
		),
	)
		.sort(([, a], [, b]) => b - a)
		.map(([k, v]) => ({
			name: k,
			count: v,
		}))

const tag = (
	name: string,
	innerText: string,
	attrs: Record<string, string> = {},
) => {
	const elem = document.createElement(name)
	elem.innerText = innerText
	for (const [attr, v] of Object.entries(attrs))
		elem.setAttribute(attr, v)
	return elem
}

const tagc = (
	name: string,
	children: Element[],
	attrs: Record<string, string> = {},
) => {
	const elem = document.createElement(name)
	for (const child of children) elem.appendChild(child)
	for (const [attr, v] of Object.entries(attrs))
		elem.setAttribute(attr, v)
	return elem
}

const render = (scores: Score[]) =>
	tagc(
		'div',
		[
			tag('h2', 'Related Articles'),
			tagc('table', [
				tagc('thead', [
					tagc('tr', [
						tag('td', 'Total'),
						tag('td', scores.length.toString()),
					]),
				]),
				tagc(
					'tbody',
					scores.map(({ name, count }) =>
						tagc('tr', [
							tagc('a', [tag('td', name)], {
								href: `/w/${encodeURIComponent(
									name,
								)}`,
							}),
							tag('td', count.toString()),
						]),
					),
				),
			]),
		],
		{ id: 'related-articles' },
	)

const initContentScript = async () => {
	try {
		const sidebar = document.querySelector('aside')
		if (!sidebar)
			return new Error('aside element does not exist')

		const links = findAllLinks()
		if (!links)
			return new Error(
				'article element does not exist',
			)

		const relatedArticles = scoring(links)

		const raElem = document.getElementById(
			'related-articles',
		)
		const rendered = render(relatedArticles)

		if (raElem)
			raElem.parentNode?.replaceChild(
				rendered,
				raElem,
			)
		else
			sidebar.insertAdjacentElement(
				'afterbegin',
				rendered,
			)
	} catch (e) {
		console.error(e)
	}
}

const addLocationObserver = (callback: () => void) =>
	new MutationObserver(callback).observe(document.body, {
		attributes: false,
		childList: true,
		subtree: false,
	})

const observerCallback = () =>
	window.location.href.startsWith(
		'https://namu.wiki/w/',
	) && initContentScript()

// debugging purpose
console.log('start initial content script', new Date())

addLocationObserver(observerCallback)
observerCallback()
