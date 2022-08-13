(function(window, document) {
	// RESOURCE
	const resource = window.hypermedium?.resource;
	console.log(resource);

	if(resource['@type'] === 'https://schema.org/ProductGroup') {
	}

	// CUSTOM HANDLER CODE
	const chessSetColors = document.getElementsByClassName('chess-etc-set-colors')[0];
	// const chessPiecesLight = chessSetColors.getElementsByClassName('chess-pieces-light')[0];
	// const chessPiecesDark = chessSetColors.getElementsByClassName('chess-pieces-dark')[0];
	// set to custom handler.
	const onSelectOffer = (offer) => {
		// fill out variant 

		const squareColors = [...Array(64).keys()].reduce((obj, n) => {
			const prop = `sq-${n}-color`;
			const value = offer.resource.itemOffered[prop];
			if(value) {
				obj[prop] = value;
			}
			return obj;
		}, {});
		const colors = {
			...squareColors,
			boxColor:
				offer.resource.itemOffered.boxColor ||
				offer.resource.itemOffered.lightColor,
			lidColor:
				offer.resource.itemOffered.lidColor ||
				offer.resource.itemOffered.lightColor,
			chessLightColor:
				offer.resource.itemOffered.chessLightColor ||
				offer.resource.itemOffered.lightColor,
			chessDarkColor:
				offer.resource.itemOffered.chessDarkColor ||
				offer.resource.itemOffered.darkColor,
			checkersLightColor:
				offer.resource.itemOffered.checkersLightColor ||
				offer.resource.itemOffered.lightColor,
			checkersDarkColor:
				offer.resource.itemOffered.checkersDarkColor ||
				offer.resource.itemOffered.darkColor,
			tangramsColor:
				offer.resource.itemOffered.tangramsColor ||
				offer.resource.itemOffered.darkColor,
			diceColor:
				offer.resource.itemOffered.diceColor ||
				offer.resource.itemOffered.darkColor,
			pencilSharpenerColor:
				offer.resource.itemOffered.pencilSharpenerColor ||
				offer.resource.itemOffered.darkColor,
			scorecardColor:
				offer.resource.itemOffered.scorecardColor ||
				offer.resource.itemOffered.darkColor,
			checkerboardLightColor:
				offer.resource.itemOffered.checkerboardLightColor ||
				offer.resource.itemOffered.lightColor,
			checkerboardDarkColor:
				offer.resource.itemOffered.checkerboardDarkColor ||
				offer.resource.itemOffered.darkColor,
		};

		Object.keys(colors).forEach((v) => {
			console.log('--' + v, resource.colors[colors[v]]);
			chessSetColors.style.setProperty('--' + v, resource.colors[colors[v]]);
		});
	};

	// HTML
	const productGroup = document.getElementsByClassName('product-group')[0];
	const priceElement = productGroup.getElementsByClassName('price')[0];

	let selectedOffer = undefined;

	Array.from(document.getElementsByClassName('offers')).forEach((offersContainer) => {
		const offers = Array.from(offersContainer.getElementsByClassName('offer')).map((element) => {
			const offer = resource.offers.find(
				(offer) => offer.itemOffered['@id'] === element.getElementsByClassName('itemOffered')[0].dataset['@id']
			);

			return {
				resource: Object.assign(offer, {itemOffered: Object.assign(Object.create(resource), offer.itemOffered)}),
				element,
			};
		});

		const selectOffer = (offer) => {
			console.log('select offer', offer);
			if(selectedOffer) {
				selectedOffer.element.classList.remove('selected');
			}

			selectedOffer = offer;

			offer.element.classList.add('selected');
			priceElement.textContent = offer.resource.price;

			window.location.hash = offer.resource.itemOffered['@id'];

			onSelectOffer(offer);
		};

		offers.forEach((offer) => {
			const offerUrl = offer?.resource?.url && new URL(offer.resource.url);
			if(window.location.hash !== '' && offerUrl && offerUrl.hash === window.location.hash) {
				selectOffer(offer);
			}
			offer.element.addEventListener('click', (event) => {
				selectOffer(offer);
			});
			window.addEventListener('hashchange', (event) => {
				if(window.location.hash !== '' && offerUrl && offerUrl.hash === window.location.hash) {
					selectOffer(offer);
				}
			});
		});

		if(offers.length > 0 && !selectedOffer) {
			selectOffer(offers[0]);
		}
	});
})(window, window.document);
