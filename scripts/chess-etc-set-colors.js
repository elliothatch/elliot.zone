(function(window, document) {
	const root = document.getElementsByClassName('chess-etc-set-colors')[0];

	const checkerboard = root.getElementsByClassName('checkerboard');
	if(checkerboard.length > 0) {
		const squares = [];
		for(let i = 0; i < 64; i++) {
			const sq = checkerboard[0].getElementsByClassName('sq-' + i);
			squares.push(sq.length == 0? null: sq[0]);
		}
		const setCheckerboardColor = (light, dark) => {
			squares.forEach((square, i) => {
				if(i % 2 === 0) {
					square.styles.color = light;
				}
				else {
					square.styles.color = dark;
				}
			});
		}
	}



})(window, window.document);
