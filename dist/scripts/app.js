(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

require('./components/button');

require('./components/modal');

},{"./components/button":2,"./components/modal":3}],2:[function(require,module,exports){
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

var modal = document.querySelector('.modal');
var tabs = Array.from(modal.querySelectorAll('.modal-tab'));
var displays = Array.from(modal.querySelectorAll('.modal-display'));

var _loop = function _loop(tab) {
	tab.addEventListener('click', function (e) {
		e.preventDefault();

		var activeTab = tabs.find(function (e) {
			return e.classList.contains('is-active');
		});
		var activeDisplay = displays.find(function (e) {
			return e.classList.contains('is-active');
		});
		var clickedDisplay = displays.find(function (e) {
			return e.dataset.tab == tab.dataset.tab;
		});

		activeTab.classList.remove('is-active');
		activeDisplay.classList.remove('is-active');
		tab.classList.add('is-active');
		clickedDisplay.classList.add('is-active');
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

},{}]},{},[1])

//# sourceMappingURL=app.js.map
