'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timer = function (_Component) {
  _inherits(Timer, _Component);

  function Timer(props) {
    _classCallCheck(this, Timer);

    var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this, props));

    _this.tick = function () {
      _this.setState({ remaining: _this.state.remaining - 1 }, _this.updateTimeDifference);
    };

    _this.state = {
      remaining: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    };
    return _this;
  }

  _createClass(Timer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var remaining = Math.floor((Date.parse(this.props.endTime) - Date.now()) / 1000);

      this.setState({ remaining: remaining }, this.updateTimeDifference);

      this.ticker = setInterval(this.tick, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.ticker);
    }
  }, {
    key: 'updateTimeDifference',
    value: function updateTimeDifference() {
      var remaining = this.state.remaining;

      var result = void 0;

      result = this.divmod(remaining, 86400);
      var days = this.pad(result[0]);

      result = this.divmod(result[1], 3600);
      var hours = this.pad(result[0]);

      result = this.divmod(result[1], 60);
      var minutes = this.pad(result[0]);
      var seconds = this.pad(result[1]);

      this.setState({ days: days, hours: hours, minutes: minutes, seconds: seconds });
    }
  }, {
    key: 'divmod',
    value: function divmod(x, y) {
      var div = Math.floor(x / y);
      var rem = x % y;

      return [div, rem];
    }
  }, {
    key: 'pad',
    value: function pad(number) {
      return ('0' + number).slice(-2);
    }
  }, {
    key: 'renderSeparator',
    value: function renderSeparator(type) {
      var separators = Object.assign({ day: ':', hour: ':', minute: ':', second: '' }, this.props.separators || {});

      return _react2.default.createElement(
        'span',
        { className: 'separator ' + type },
        separators[type]
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          days = _state.days,
          hours = _state.hours,
          minutes = _state.minutes,
          seconds = _state.seconds;


      return _react2.default.createElement(
        'div',
        { className: 't-minus-timer' },
        _react2.default.createElement(
          'span',
          { className: 'day' },
          days
        ),
        this.renderSeparator('day'),
        _react2.default.createElement(
          'span',
          { className: 'hour' },
          hours
        ),
        this.renderSeparator('hour'),
        _react2.default.createElement(
          'span',
          { className: 'minute' },
          minutes
        ),
        this.renderSeparator('minute'),
        _react2.default.createElement(
          'span',
          { className: 'second' },
          seconds
        ),
        this.renderSeparator('second')
      );
    }
  }]);

  return Timer;
}(_react.Component);

Timer.propTypes = {
  endTime: _propTypes2.default.string.isRequired,
  separators: _propTypes2.default.shape({
    day: _propTypes2.default.string,
    hour: _propTypes2.default.string,
    minute: _propTypes2.default.string,
    second: _propTypes2.default.string
  })
};
exports.default = Timer;