(function () {
	'use strict';

	var CSDD = window.CSDD || {};

	/* ------------------------------------------------------------------ */
	/* FAQ accordion                                                       */
	/* ------------------------------------------------------------------ */
	function initFaq() {
		var items = document.querySelectorAll('.csdd-faq-item');
		items.forEach(function (item) {
			var btn = item.querySelector('.csdd-faq-btn');
			if (!btn) return;
			btn.addEventListener('click', function () {
				var content = btn.nextElementSibling;
				var icon = btn.querySelector('.csdd-faq-icon');
				var isHidden = content.classList.toggle('hidden');
				btn.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
				icon.classList.toggle('rotate-180', !isHidden);
			});
		});
	}

	/* ------------------------------------------------------------------ */
	/* Index: buscador de sesiones                                          */
	/* ------------------------------------------------------------------ */
	function cardMatch(card, q) {
		var keywords = (card.getAttribute('data-keywords') || '') + ' ' + card.innerText.toLowerCase();
		return keywords.indexOf(q) !== -1;
	}

	/*
	 * Solo queda el buscador.
	 *
	 * Aquí también vivía setCategoryFilter(), que leía los atributos
	 * data-period y data-cat de cada tarjeta. Esos atributos ya no los emite
	 * ninguna tarjeta (las pestañas de filtrado se eliminaron del índice), así
	 * que el código era muerto. Peor: como las tarjetas no los llevan, cualquier
	 * cambio futuro que los añadiera activaría un filtrado que nadie pidió, y no
	 * se notaría hasta que faltaran sesiones en pantalla. El JS tiene que
	 * describir el HTML que hay, no el que hubo.
	 *
	 * El comportamiento del buscador no cambia: antes el predicado de filtro
	 * siempre era verdadero porque no había pestañas, así que el resultado es
	 * idéntico.
	 */
	function initSearch() {
		var input = document.getElementById('sessionSearch');
		if (!input) return;
		input.addEventListener('input', function () {
			var q = input.value.toLowerCase().trim();
			document.querySelectorAll('.session-card').forEach(function (card) {
				card.style.display = cardMatch(card, q) ? 'flex' : 'none';
			});
		});
	}

	/* ------------------------------------------------------------------ */
	/* Hero Deep Dive: zoom parallax sobre la imagen de fondo               */
	/* ------------------------------------------------------------------ */
	function initHeroZoom() {
		var hero = document.querySelector('.csdd-hero');
		var img = document.querySelector('.csdd-hero-bg-img');
		if (!hero || !img) return;

		function update() {
			var h = hero.offsetHeight || 1;
			var p = Math.min(1, Math.max(0, window.scrollY / h));
			var s = 1 + 0.25 * p;
			var ty = p * 8;
			img.style.transform = 'scale(' + s + ') translateY(' + ty + '%)';
		}

		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		update();
	}

	function init() {
		initFaq();
		initSearch();
		initHeroZoom();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	window.CSDD = CSDD;
})();