(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

require('./components/button');

require('./components/carousel');

require('./components/lazyload');

require('./components/modal');

require('./components/wysiwyg');

require('./components/scroll');

},{"./components/button":2,"./components/carousel":3,"./components/lazyload":5,"./components/modal":6,"./components/scroll":8,"./components/wysiwyg":11}],2:[function(require,module,exports){
'use strict';

var buttons = Array.from(document.querySelectorAll('.button'));

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var button = _step.value;

		button.addEventListener('click', function (e) {
			e.preventDefault();
		});
	}
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}

},{}],3:[function(require,module,exports){
'use strict';

var _lazyload = require('./lazyload');

var carousel = document.querySelector('.carousel');
var group = carousel.querySelector('.carousel-group');
var quote = group.querySelector('.carousel-quote');
var label = group.querySelector('.carousel-label');
var thumbnail = carousel.querySelector('.carousel-thumbnail');
var mask = carousel.querySelector('.carousel-mask');

var delay = 10000;
var duration = 1500;

var windowWidth = window.innerWidth;
var offsetRight = windowWidth - thumbnail.offsetLeft - thumbnail.offsetWidth;

var loadPromise = new Promise(function (resolve) {
	thumbnail.style.transform = 'translateX(' + offsetRight + 'px)';
	resolve();
});

loadPromise.then(function () {
	thumbnail.classList.add('is-active');
}).then((0, _lazyload.load)(_lazyload.lazyloads)).then(function () {
	fetch('data/quotes.json').then(function (response) {
		return response.json();
	}).then(function (json) {
		var step = 0;
		var intervalPromise = new Promise(function (resolve) {
			resolve();
		});

		window.setInterval(function () {
			step = (step + 1) % json.quotes.length;
			var img = thumbnail.querySelector('img');
			intervalPromise.then(function () {
				quote.style.opacity = '0';
				label.style.opacity = '0';
				img.style.opacity = '0';
			}).then(function () {
				setTimeout(function () {
					quote.textContent = json.quotes[step].quote;
					label.textContent = json.quotes[step].label;
					img.src = 'images/' + json.quotes[step].image;
				}, duration);
			}).then(function () {
				setTimeout(function () {
					quote.style.opacity = '1';
					label.style.opacity = '1';
					img.style.opacity = '1';
				}, duration);
			});
		}, delay);
	});
});

window.addEventListener('resize', function () {
	windowWidth = window.innerWidth;
	offsetRight = windowWidth - thumbnail.offsetLeft - thumbnail.offsetWidth;
	thumbnail.style.transform = 'translateX(' + offsetRight + 'px)';
});

mask.addEventListener('contextmenu', function (e) {
	e.preventDefault();
});

},{"./lazyload":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var header = document.querySelector('.header');

var titles = exports.titles = header.querySelector('.header-titles');

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var lazyloads = exports.lazyloads = document.querySelectorAll('.lazyload');

var load = exports.load = function load(lazyloadsElements) {
	var _loop = function _loop(lazyload) {
		var img = lazyload.querySelector('img');
		var newImg = document.createElement('img');

		newImg.addEventListener('load', function () {
			lazyload.classList.add('loaded');
		});

		newImg.src = img.src;
	};

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = lazyloadsElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var lazyload = _step.value;

			_loop(lazyload);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
};

},{}],6:[function(require,module,exports){
'use strict';

var modal = document.querySelector('.modal');
var tabs = Array.from(modal.querySelectorAll('.modal-tab'));
var blocks = Array.from(modal.querySelectorAll('.modal-block'));

var _loop = function _loop(tab) {
	tab.addEventListener('click', function (e) {
		e.preventDefault();

		var activeTab = tabs.find(function (e) {
			return e.classList.contains('is-active');
		});
		var activeBlock = blocks.find(function (e) {
			return e.classList.contains('is-active');
		});
		var clickedBlock = blocks.find(function (e) {
			return e.dataset.tab == tab.dataset.tab;
		});

		activeTab.classList.remove('is-active');
		activeBlock.classList.remove('is-active');
		tab.classList.add('is-active');
		clickedBlock.classList.add('is-active');
	});
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var tab = _step.value;

		_loop(tab);
	}
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var post = exports.post = document.querySelector('.post');

},{}],8:[function(require,module,exports){
'use strict';

var _header = require('./header');

var _topbar = require('./topbar');

var _post = require('./post');

var _shape = require('./shape');

var _wysiwyg = require('./wysiwyg');

var windowHeight = window.innerHeight;

window.addEventListener('resize', function () {
	windowHeight = window.innerHeight;
});

window.addEventListener('scroll', function () {
	_header.titles.style.transform = 'translateY(-' + window.scrollY / 5 + 'px)';

	if (window.scrollY > _topbar.heightTopbar) {
		_topbar.topbar.classList.remove('is-hidden');
	} else {
		_topbar.topbar.classList.add('is-hidden');
	}

	var wysiwygTop = _wysiwyg.wysiwyg.getBoundingClientRect().top;
	var postTop = _post.post.getBoundingClientRect().top;

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = _shape.shapes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var shape = _step.value;

			if (shape.classList.contains('shape--article')) {
				if (wysiwygTop - _topbar.heightTopbar < 0 && postTop - windowHeight / 2 > 0) {
					shape.classList.add('is-active');
				} else {
					shape.classList.remove('is-active');
				}
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
});

},{"./header":4,"./post":7,"./shape":9,"./topbar":10,"./wysiwyg":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var shapes = exports.shapes = Array.from(document.querySelectorAll('.shape'));

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var topbar = exports.topbar = document.querySelector('.topbar');
var heightTopbar = exports.heightTopbar = topbar.offsetHeight;

var buttons = Array.from(topbar.querySelectorAll('.topbar-button'));

var _loop = function _loop(button) {
	var target = document.querySelector('.' + button.dataset.target);

	button.addEventListener('click', function (e) {
		e.preventDefault();
		window.scroll({
			top: target.offsetTop - heightTopbar,
			left: 0,
			behavior: 'smooth'
		});
	});
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var button = _step.value;

		_loop(button);
	}
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.wysiwyg = undefined;

var _shape = require('./shape');

var wysiwyg = exports.wysiwyg = document.querySelector('.wysiwyg');

var content = wysiwyg.querySelector('.wysiwyg-content');
var buttons = Array.from(wysiwyg.querySelectorAll('.wysiwyg-button'));
var articles = Array.from(wysiwyg.querySelectorAll('.wysiwyg-article'));
var width = content.offsetWidth;

var _loop = function _loop(button) {
	button.addEventListener('click', function () {
		var activeArticle = articles.find(function (e) {
			return e.classList.contains('is-active');
		});
		var activeButton = buttons.find(function (e) {
			return e.classList.contains('is-active');
		});
		var article = articles.find(function (e) {
			return e.dataset.article == button.getAttribute('title');
		});

		activeButton.classList.remove('is-active');
		activeArticle.classList.remove('is-active');
		button.classList.add('is-active');
		article.classList.add('is-active');

		content.style.transform = 'translateX(-' + width * buttons.indexOf(button) + 'px)';
	});
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {

	for (var _iterator = buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var button = _step.value;

		_loop(button);
	}
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}

var _loop2 = function _loop2(shape) {
	if (shape.classList.contains('shape--article')) {
		shape.addEventListener('click', function () {
			var button = buttons.find(function (e) {
				return e.getAttribute('title') == shape.dataset.article;
			});
			button.click();
		});
	}
};

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
	for (var _iterator2 = _shape.shapes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
		var shape = _step2.value;

		_loop2(shape);
	}
} catch (err) {
	_didIteratorError2 = true;
	_iteratorError2 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion2 && _iterator2.return) {
			_iterator2.return();
		}
	} finally {
		if (_didIteratorError2) {
			throw _iteratorError2;
		}
	}
}

},{"./shape":9}]},{},[1])

//# sourceMappingURL=app.js.map
