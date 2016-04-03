'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint esnext: true */

var MagicZoom = function (_React$Component) {
    _inherits(MagicZoom, _React$Component);

    function MagicZoom(props) {
        _classCallCheck(this, MagicZoom);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MagicZoom).call(this, props));

        _this.$image = undefined;
        _this.$imageFrame = undefined;
        _this.$imageReflection = undefined;
        _this.$imageWrapper = undefined;

        _this.handleImageLoad = _this.handleImageLoad.bind(_this);
        _this.handleMouseMoveOnImage = _this.handleMouseMoveOnImage.bind(_this);
        _this.handleMouseLeaveFromImage = _this.handleMouseLeaveFromImage.bind(_this);
        _this.handleMouseEnterOnImage = _this.handleMouseEnterOnImage.bind(_this);

        _this.state = {

            // temporary for testing
            options: {

                cursorFrame: {
                    // can be {heigth: int, width: int} or auto string
                    size: 'auto',

                    // ablility of frame moving out of original image
                    overflow: true
                },

                reflection: {

                    // Value:   'auto' - clone of original image
                    //          {heigth: int, width: int} - dimention
                    size: 'auto',

                    // Value:   'left', 'right', 'top', 'bottom' - position of
                    //                                              reflection
                    position: 'left',

                    // Value: @flaot - scale coefficient
                    scale: 2
                }
            },

            elementsState: {
                imageWrapper: {
                    style: {}
                },

                reflection: {
                    size: {
                        height: 0,
                        width: 0
                    },

                    position: {},

                    background: {
                        position: {
                            x: 0,
                            y: 0
                        }
                    },

                    disabled: true
                },

                cursorFrame: {
                    //default
                    type: 'default',

                    overflow: false,

                    size: {
                        height: 0,
                        width: 0
                    },

                    position: {
                        x: 0,
                        y: 0,
                        offsetX: 0,
                        offsetY: 0
                    }
                }
            }
        };
        return _this;
    }

    _createClass(MagicZoom, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initializeComponentState();

            this.setState(this.state);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'initializeComponentState',
        value: function initializeComponentState() {
            var state = this.state;

            if (this.props.cursorFrame) {
                if (typeof this.props.cursorFrame.size === 'string' || _typeof(this.props.cursorFrame.size) === 'object') {

                    // check params
                    state.options.cursorFrame.size = this.props.cursorFrame.size;
                }

                if (typeof this.props.cursorFrame.overflow === 'boolean') {

                    // check params
                    state.options.cursorFrame.overflow = this.props.cursorFrame.overflow;
                }
            }

            if (this.props.reflection) {
                if (typeof this.props.reflection.size === 'string' || _typeof(this.props.reflection.size) === 'object') {

                    // check params
                    state.options.reflection.size = this.props.reflection.size;
                }

                if (typeof this.props.reflection.scale === 'number') {

                    // check params
                    state.options.reflection.scale = this.props.cursorFrame.scale;
                }

                if (typeof this.props.reflection.position === 'string') {

                    // check params
                    state.options.reflection.position = this.props.cursorFrame.position;
                }
            }

            this.setState(state);
        }
    }, {
        key: 'initializeReflection',
        value: function initializeReflection() {
            if (this.state.options.reflection.size == 'auto' && this.$image) {
                var state = this.state;

                state.elementsState.reflection.size.height = this.$image.height;
                state.elementsState.reflection.size.width = this.$image.width;
                state.elementsState.imageWrapper.style = {
                    heigth: this.$image.height,
                    width: this.$image.width
                };
                this.setState(state);
            }
        }
    }, {
        key: 'initializeCursorFrame',
        value: function initializeCursorFrame() {
            var state = this.state,
                cursorFrameProps = this.props.cursorFrame,
                cursorFrameState = state.elementsState.cursorFrame;

            if (cursorFrameProps) {
                if (cursorFrameProps.type) {
                    cursorFrameState.type = cursorFrameProps.type;
                }
            }

            if (cursorFrameState.type === 'default') {
                cursorFrameState.position = {
                    x: 0,
                    y: 0,
                    offsetX: -80,
                    offsetY: -80
                };

                cursorFrameState.size = {
                    height: 160,
                    width: 160
                };
            } else if (cursorFrameState.type === 'auto') {
                cursorFrameState.size = {
                    height: this.$image.height / this.state.options.reflection.scale,
                    width: this.$image.width / this.state.options.reflection.scale
                };

                cursorFrameState.position = {
                    x: 0,
                    y: 0,
                    offsetX: cursorFrameState.size.width / 2,
                    offsetY: cursorFrameState.size.height / 2
                };
            }

            state.elementsState.cursorFrame = cursorFrameState;
            this.setState(state);
        }
    }, {
        key: 'handleImageLoad',
        value: function handleImageLoad(event) {
            if (event.target.tagName.toLowerCase() === 'img') {
                var state = this.state;

                this.$image = event.target;
                this.initializeCursorFrame();

                // ToDo: fix issue
                // if (userAgent.isDesktopAgent())
                //     this.initializeReflection();
                this.setState(state);
            }
        }
    }, {
        key: 'handleMouseMoveOnImage',
        value: function handleMouseMoveOnImage(event) {
            var state = this.state,
                nativeEvent = event.nativeEvent,
                reflectionElement = this.getReflectionImageDOM(),
                cursorFrame = this.getCursorFrameDOM();

            if (event.target === this.$image) {
                this.calculateMouseAndCursorPositionByImage(state, nativeEvent, reflectionElement, cursorFrame);
            } else if (cursorFrame === event.target) {
                this.calculateMouseAndCursorPositionByCursorFrame(state, nativeEvent, cursorFrame);
            }

            this.setState(state);
        }
    }, {
        key: 'calculateMouseAndCursorPositionByImage',
        value: function calculateMouseAndCursorPositionByImage(state, nativeEvent, reflectionElement, cursorFrame) {
            state.elementsState.reflection.background.position.x = -(nativeEvent.offsetX * state.options.reflection.scale - reflectionElement.offsetWidth / 2);
            state.elementsState.reflection.background.position.y = -(nativeEvent.offsetY * state.options.reflection.scale - reflectionElement.offsetHeight / 2);

            // frame
            if (!state.elementsState.cursorFrame.overflow) {
                this.calculateCursorPositionByClosestBorder(state, nativeEvent, {
                    x: nativeEvent.offsetX,
                    y: nativeEvent.offsetY
                }, {
                    width: this.$image ? this.$image.width : 0,
                    height: this.$image ? this.$image.height : 0
                });
            } else if (cursorFrame) {
                state.elementsState.cursorFrame.position.y = nativeEvent.offsetY;
                state.elementsState.cursorFrame.position.x = nativeEvent.offsetX;
            }
        }
    }, {
        key: 'calculateMouseAndCursorPositionByCursorFrame',
        value: function calculateMouseAndCursorPositionByCursorFrame(state, nativeEvent, cursorFrame) {
            var cursorRelatedPosition = {},
                imageSize = {};

            // check if cursor out of $image
            cursorRelatedPosition.x = nativeEvent.target.offsetLeft + nativeEvent.offsetX;
            cursorRelatedPosition.y = nativeEvent.target.offsetTop + nativeEvent.offsetY;

            imageSize = {
                width: this.$image ? this.$image.width : 0,
                height: this.$image ? this.$image.height : 0
            };

            if (cursorRelatedPosition.x > imageSize.width || cursorRelatedPosition.x < 0 || cursorRelatedPosition.y > imageSize.height || cursorRelatedPosition.y < 0) {
                state.elementsState.reflection.disabled = true;
            } else {

                if (!state.elementsState.cursorFrame.overflow) {
                    this.calculateCursorPositionByClosestBorder(state, nativeEvent, cursorRelatedPosition, imageSize);
                } else {
                    if (cursorFrame) {
                        state.elementsState.cursorFrame.position.x = nativeEvent.target.offsetLeft + nativeEvent.offsetX;
                        state.elementsState.cursorFrame.position.y = nativeEvent.target.offsetTop + nativeEvent.offsetY;
                    }
                }

                state.elementsState.reflection.background.position.x = -(cursorRelatedPosition.x * state.options.reflection.scale - this.state.elementsState.reflection.size.width / 2);

                state.elementsState.reflection.background.position.y = -(cursorRelatedPosition.y * state.options.reflection.scale - this.state.elementsState.reflection.size.height / 2);
            }
        }
    }, {
        key: 'calculateCursorPositionByClosestBorder',
        value: function calculateCursorPositionByClosestBorder(state, nativeEvent, cursorRelatedPosition, imageSize) {
            if (cursorRelatedPosition.x + state.elementsState.cursorFrame.size.width / 2 >= imageSize.width || cursorRelatedPosition.x - state.elementsState.cursorFrame.size.width / 2 <= 0) {

                if (cursorRelatedPosition.x + state.elementsState.cursorFrame.size.width / 2 >= imageSize.width) {
                    state.elementsState.cursorFrame.position.x = imageSize.width - state.elementsState.cursorFrame.size.width / 2;
                }

                if (cursorRelatedPosition.x - state.elementsState.cursorFrame.size.width / 2 <= 0) {
                    state.elementsState.cursorFrame.position.x = state.elementsState.cursorFrame.size.width / 2;
                }
            } else {
                state.elementsState.cursorFrame.position.x = nativeEvent.target.offsetLeft + nativeEvent.offsetX;
            }

            if (!state.elementsState.cursorFrame.overflow && cursorRelatedPosition.y + state.elementsState.cursorFrame.size.height / 2 >= imageSize.height || cursorRelatedPosition.y - state.elementsState.cursorFrame.size.height / 2 <= 0) {

                if (cursorRelatedPosition.y + state.elementsState.cursorFrame.size.height / 2 >= imageSize.height) {
                    state.elementsState.cursorFrame.position.y = imageSize.height - state.elementsState.cursorFrame.size.height / 2;
                }

                if (cursorRelatedPosition.y - state.elementsState.cursorFrame.size.height / 2 <= 0) {
                    state.elementsState.cursorFrame.position.y = state.elementsState.cursorFrame.size.height / 2;
                }
            } else {
                state.elementsState.cursorFrame.position.y = nativeEvent.target.offsetTop + nativeEvent.offsetY;
            }
        }
    }, {
        key: 'handleMouseLeaveFromImage',
        value: function handleMouseLeaveFromImage(event) {
            var state = this.state;
            state.elementsState.reflection.disabled = true;
            this.setState(state);
        }
    }, {
        key: 'handleMouseEnterOnImage',
        value: function handleMouseEnterOnImage(event) {
            var state = this.state;
            state.elementsState.reflection.disabled = false;

            // should update cursor postion

            this.setState(state);
        }
    }, {
        key: 'getReflectionImageDOM',
        value: function getReflectionImageDOM() {
            return _reactDom2.default.findDOMNode(this.refs.imageReflection);
        }
    }, {
        key: 'getCursorFrameDOM',
        value: function getCursorFrameDOM() {
            return _reactDom2.default.findDOMNode(this.refs.cursorFrame);
        }
    }, {
        key: 'getCursorFrameElement',
        value: function getCursorFrameElement() {
            var cursorFrameSettings = this.state.elementsState.cursorFrame,
                classNames = 'magic-zoom__cursor-frame',
                style = {},
                element;

            if (this.state.elementsState.reflection.disabled) {
                return null;
            }

            if (cursorFrameSettings.type === 'default') {
                classNames += ' magic-zoom__cursor-frame--default';
            } else if (cursorFrameSettings.type === 'auto') {
                classNames += ' magic-zoom__cursor-frame--auto';
                style = {
                    width: cursorFrameSettings.size.width + 'px',
                    height: cursorFrameSettings.size.height + 'px'
                };
            }

            style.top = cursorFrameSettings.position.y - cursorFrameSettings.position.offsetY + 'px';
            style.left = cursorFrameSettings.position.x - cursorFrameSettings.position.offsetX + 'px';

            element = _react2.default.createElement('div', { ref: 'cursorFrame',
                className: classNames,
                style: style
            });

            return element;
        }
    }, {
        key: 'getImageReflection',
        value: function getImageReflection() {
            var reflectionSettings = this.state.elementsState.reflection,
                style = {
                height: reflectionSettings.size.height + 'px',
                width: reflectionSettings.size.width + 'px',
                left: '110%',
                top: 0
            },
                element;

            if (reflectionSettings.disabled) {
                return null;
            }

            if (this.$image) {

                style.backgroundImage = 'url(' + this.$image.src + ')';
                style.backgroundSize = reflectionSettings.size.width * this.state.options.reflection.scale + 'px ' + reflectionSettings.size.height * this.state.options.reflection.scale + 'px';
                style.backgroundPosition = reflectionSettings.background.position.x + 'px ' + reflectionSettings.background.position.y + 'px';
            }

            element = _react2.default.createElement('div', {
                style: style,
                className: 'magic-zoom__reflection',
                ref: 'imageReflection'
            });

            return element;
        }
    }, {
        key: 'render',
        value: function render() {
            var cursorFrame = this.getCursorFrameElement(),
                imageReflection = this.getImageReflection(),
                wrapperStyle = this.state.elementsState.imageWrapper.style;

            return _react2.default.createElement(
                'div',
                {
                    ref: 'zoomWrapper',
                    className: 'magic-zoom__wrapper',
                    onLoad: this.handleImageLoad,
                    onMouseMove: this.handleMouseMoveOnImage,
                    onMouseEnter: this.handleMouseEnterOnImage,
                    onMouseLeave: this.handleMouseLeaveFromImage,
                    style: wrapperStyle
                },
                this.props.children,
                cursorFrame,
                imageReflection
            );
        }
    }]);

    return MagicZoom;
}(_react2.default.Component);

exports.default = MagicZoom;


MagicZoom.propTypes = {
    children: _react2.default.PropTypes.node.isRequired
};