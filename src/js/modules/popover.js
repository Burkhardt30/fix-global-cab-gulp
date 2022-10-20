/*
 |  THE TOOLTIP CLASS BELOW IS AN ADAPTED / REDUCED
 |  VERSION FROM OUR FAIL CSS & JS FRAMEWORK
 |  The original version is written as ES6-Module in 
 |  TypeScript (with type definitions) including
 |  some triggers and listeners when a tooltip gets 
 |  shown / hidden (which has been removed below).
 */
class Tooltip {
    /*
     |  CORE :: INSTANCE STORAGE
     */
    static inst = {
        length: 0
    };

    /*
     |  CORE :: UNIQUE TOOLTIP ID
     */
    id = NaN;

    /*
     |  CORE :: SOURCE ELEMENT
     */
    source = null;

    /*
     |  CORE :: INSTANCE CONFIGURATION
     */
    config = {};

    /*
     |  CORE :: IS TOOLTIP VISIBLE
     */
    visible = true;

    /*
     |  CORE :: TOOLTIP DELAY STATE
     */
    state = false;

    /*
     |  CORE :: TOOLTIP DELAY TIMEOUT
     */
    timeout = false;

    /*
     |  CORE :: CONSTRUCTOR
     */
    constructor(source, config) {
        this.id = Tooltip.inst.length++;
        this.source = source;
        this.config = Object.assign({
            animation: this.source.dataset.tooltipAnimation || "fade",
            color: this.source.dataset.tooltipColor || "black",
            delay: this.source.dataset.tooltipDelay || 0,
            in: this.source.dataset.tooltipIn || "mouseenter",
            out: this.source.dataset.tooltipOut || "mouseleave",
            position: this.source.dataset.tooltipPosition || "top"
        }, config);

        // Handle Title
        if (this.source.title !== "") {
            this.source.dataset.jaxTooltipTitle = this.source.title;
            this.source.removeAttribute("title");
        }

        // Add Listener
        if (this.config.in !== "custom") {
            this.source.addEventListener(this.config.in, (event) => {
                event.preventDefault();

                this.state = true;
                if (this.config.delay > 0) {
                    this.timeout = setTimeout(() => this.state ? this.show.call(this, event) : null, this.config.delay);
                } else {
                    this.show.call(this, event);
                }
            }, true);
        }
        if (this.config.out !== "custom") {
            this.source.addEventListener(this.config.out, (event) => {
                event.preventDefault();
                if (this.config.in === this.config.out && !this.visible) {
                    return;
                }

                this.state = false;
                clearTimeout(this.timeout);
                this.hide.call(this, event);
            });
        }

        // Store Instance
        this.source.dataset.jaxTooltipId = (this.id).toString();
        Tooltip.inst[this.id] = this;
    }

    /*
     |  HANDLE :: BUILD TOOLTIP
     */
    build() {
        let tooltip = document.createElement("DIV");
        tooltip.id = `jax-tooltip-${this.id}`;
        tooltip.className = `jax:tooltip tooltip:${this.config.animation} tooltip:${this.config.position} tooltip:${this.config.color}`;
        tooltip.innerText = this.source.dataset.jaxTooltipTitle || this.source.dataset.tooltip;
        document.body.appendChild(tooltip);
        return tooltip;
    }

    /*
     |  HANDLE :: POSITIONATE TOOLTIP
     */
    positionate(tooltip) {
        let rect = ((element) => {
            let position = {
                top: element.offsetTop || 0,
                left: element.offsetLeft || 0,
                width: element.offsetWidth || 0,
                height: element.offsetHeight || 0
            };
            while (element = element.offsetParent) {
                position.top += element.offsetTop;
                position.left += element.offsetLeft;
            }
            return position;
        })(this.source);

        if (this.config.position === "left") {
            tooltip.style.top = (rect.top + rect.height / 2) - tooltip.offsetHeight / 2 + "px";
            tooltip.style.left = rect.left - tooltip.offsetWidth + "px";
        } else if (this.config.position === "right") {
            tooltip.style.top = (rect.top + rect.height / 2) - tooltip.offsetHeight / 2 + "px";
            tooltip.style.left = rect.left + rect.width + "px";
        } else if (this.config.position === "bottom") {
            tooltip.style.top = rect.top + rect.height + "px";
            tooltip.style.left = (rect.left + rect.width / 2) - tooltip.offsetWidth / 2 + "px";
        } else {
            tooltip.style.top = rect.top - tooltip.offsetHeight + "px";
            tooltip.style.left = (rect.left + rect.width / 2) - tooltip.offsetWidth / 2 + "px";
        }
        return tooltip;
    }

    /*
     |  HANDLE :: SHOW TOOLTIP
     */
    show(event) {
        let tooltip = document.querySelector(`#jax-tooltip-${this.id}`);
        if (tooltip) {
            this.visible = true;
            return;
        }
        this.visible = false;
        tooltip = this.build();

        this.positionate(tooltip);
        tooltip.classList.add("tooltip:show");
        return this;
    }

    /*
     |  HANDLE :: HIDE TOOLTIP
     */
    hide(event) {
        let tooltip = document.querySelector(`#jax-tooltip-${this.id}`);
        if (!tooltip) {
            this.visible = false;
            return this;
        }
        this.visible = false;

        tooltip.classList.remove("tooltip:show");
        setTimeout(() => tooltip.remove(), 150);
        return this;
    }
};

/*
 |  TOOLTIP PRIMARY CONSTRUCTOR FUNCTION
 */
export function tooltip(selector, config) {
    if (typeof selector === "string") {
        selector = document.querySelectorAll(selector);
    }

    // Return Factory
    let _return = (element, config) => {
        if ((element.dataset.jaxTooltipId || "") in Tooltip.inst) {
            return Tooltip.inst[element.dataset.jaxTooltipId];
        }
        return new Tooltip(element, config);
    };

    // Handle
    if (selector instanceof HTMLElement) {
        return _return(selector, Object.assign({}, config || {}));
    }
    return [].map.call(selector, (item) => _return(item, Object.assign({}, config || {})));
};