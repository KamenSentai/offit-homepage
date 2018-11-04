(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

require('./components/button');

require('./components/modal');

require('./components/wysiwyg');

require('./components/scroll');

},{"./components/button":2,"./components/modal":4,"./components/scroll":6,"./components/wysiwyg":9}],2:[function(require,module,exports){
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
var header = document.querySelector('.header');

var titles = exports.titles = header.querySelector('.header-titles');

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var post = exports.post = document.querySelector('.post');

},{}],6:[function(require,module,exports){
'use strict';

var _header = require('./header');

var _topbar = require('./topbar');

var _post = require('./post');

var _shape = require('./shape');

var _wysiwyg = require('./wysiwyg');

var heightTopbar = _topbar.topbar.offsetHeight;
var windowHeight = window.innerHeight;

window.addEventListener('resize', function () {
	windowHeight = window.innerHeight;
});

window.addEventListener('scroll', function () {
	_header.titles.style.transform = 'translate(-50%, calc(-50% - ' + window.scrollY + 'px / 5))';

	if (window.scrollY > heightTopbar) {
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

			if (shape.classList.contains('shape--1')) {
				if (wysiwygTop - heightTopbar < 0 && postTop - windowHeight / 2 > 0) {
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

},{"./header":3,"./post":5,"./shape":7,"./topbar":8,"./wysiwyg":9}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var shapes = exports.shapes = Array.from(document.querySelectorAll('.shape'));

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var topbar = exports.topbar = document.querySelector('.topbar');

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

},{}]},{},[1])

//# sourceMappingURL=app.js.map
