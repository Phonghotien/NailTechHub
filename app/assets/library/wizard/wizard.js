class Wizard {
  constructor(a) {
    let b = {
      wz_class: ".wizard",
      wz_nav: ".wizard-nav",
      wz_ori: ".horizontal",
      wz_nav_style: "dots",
      wz_content: ".wizard-content",
      wz_buttons: ".wizard-buttons",
      wz_button: ".wizard-btn",
      wz_button_style: ".btn",
      wz_step: ".wizard-step",
      wz_form: ".wizard-form",
      wz_next: ".next",
      wz_prev: ".prev",
      wz_finish: ".finish",
      wz_highlight: ".highlight",
      nav: !0,
      buttons: !0,
      highlight: !0,
      current_step: 0,
      steps: 0,
      highlight_time: 1e3,
      navigation: "all",
      next: "Next",
      prev: "Prev",
      finish: "Submit",
      highlight_type: {
        error: "error",
        warning: "warning",
        success: "success",
        info: "info",
      },
      i18n: {
        empty_wz: "No item has been found with which to generate the Wizard.",
        empty_nav: "Nav does not exist or is empty.",
        empty_content: "Content does not exist or is empty.",
        empty_html: "Undefined or null content cannot be added.",
        empty_update: "Nothing to update.",
        no_nav:
          "Both the nav and the buttons are disabled, there is no navigation system.",
        form_validation: "One or more of the form fields are invalid.",
        diff_steps: "Discordance between the steps of nav and content.",
        random:
          "There has been a problem, check the configuration and use of the wizard.",
        already_definded: "This item is already defined",
        title: "Step",
      },
    };
    this.prefabOpts(b, a),
      (this.wz_class = this.options.wz_class),
      (this.wz_active = "active"),
      (this.wz_ori = this.options.wz_ori),
      (this.wz_nav = this.options.wz_nav),
      (this.wz_nav_style = this.options.wz_nav_style),
      (this.wz_content = this.options.wz_content),
      (this.wz_buttons = this.options.wz_buttons),
      (this.wz_button = this.options.wz_button),
      (this.wz_button_style = this.options.wz_button_style),
      (this.wz_step = this.options.wz_step),
      (this.wz_form = this.options.wz_form),
      (this.wz_next = this.options.wz_next),
      (this.wz_prev = this.options.wz_prev),
      (this.wz_finish = this.options.wz_finish),
      (this.wz_highlight = this.options.wz_highlight),
      (this.buttons = this.options.buttons),
      (this.nav = this.options.nav),
      (this.highlight = this.options.highlight),
      (this.highlight_time = this.options.highlight_time),
      (this.highlight_type = this.options.highlight_type),
      (this.steps = this.options.steps),
      (this.current_step = this.options.current_step),
      (this.last_step = this.current_step),
      (this.navigation = this.options.navigation),
      (this.prev = this.options.prev),
      (this.next = this.options.next),
      (this.finish = this.options.finish),
      (this.form = !1),
      (this.locked = !1),
      (this.locked_step = null);
  }
  init() {
    try {
      const b = $_.exists(document.querySelector(this.wz_class))
        ? document.querySelector(this.wz_class)
        : $_.throwException(this.options.i18n.empty_wz);
      if (
        $_.str2bool(b.getAttribute("data-wizard")) &&
        b.getAttribute("data-wizard") === this.wz_active
      )
        return (
          console.warn(
            `${this.wz_class} : ${this.options.i18n.already_definded}`
          ),
          !1
        );
      $_.cleanEvents(document.querySelector(this.wz_class), !0);
      const a = $_.exists(document.querySelector(this.wz_class))
        ? document.querySelector(this.wz_class)
        : $_.throwException(this.options.i18n.empty_wz);
      switch (
        ($_.str2bool(this.buttons) === !1 &&
          $_.str2bool(this.nav) === !1 &&
          console.warn(this.options.i18n.no_nav),
        a.classList.add(this.wz_ori.replace(".", "")),
        a.tagName === "FORM" && (this.form = !0),
        this.check2Prepare(a),
        this.navigation)
      ) {
        case "all":
        case "nav":
          this.setNavEvent(), this.setBtnEvent();
          break;
        case "buttons":
          this.setBtnEvent();
          break;
      }
      (a.style.display = $_.hasClass(a, "vertical") ? "flex" : "block"),
        a.setAttribute("data-wizard", this.wz_active),
        document.dispatchEvent(
          new CustomEvent("wz.ready", {
            detail: {
              target: this.wz_class,
              elem: document.querySelector(this.wz_class),
            },
          })
        );
    } catch (a) {
      throw a;
    }
  }
  update() {
    const a = $_.exists(document.querySelector(this.wz_class))
      ? document.querySelector(this.wz_class)
      : $_.throwException(this.options.i18n.empty_wz);
    $_.str2bool(a.getAttribute("data-wizard")) === !1 &&
      a.getAttribute("data-wizard") != this.wz_active &&
      $_.throwException(this.options.i18n.empty_wz),
      this.check2Prepare(a),
      (this.content_update = !1),
      document
        .querySelector(this.wz_class)
        .dispatchEvent(
          new CustomEvent("wz.update", {
            detail: {
              target: this.wz_class,
              elem: document.querySelector(this.wz_class),
            },
          })
        );
  }
  reset() {
    this.setCurrentStep(0);
    const a = document.querySelector(this.wz_class),
      b = a.querySelector(this.wz_nav),
      c = a.querySelector(this.wz_content);
    if ($_.str2bool(this.buttons) !== !1) {
      let b = a.querySelector(this.wz_buttons),
        c = b.querySelector(this.wz_button + this.wz_next),
        d = b.querySelector(this.wz_button + this.wz_prev),
        e = b.querySelector(this.wz_button + this.wz_finish);
      this.checkButtons(c, d, e);
    }
    let d = b.querySelectorAll(this.wz_step);
    $_.removeClassList(d, "active");
    let e = c.querySelectorAll(this.wz_step);
    $_.removeClassList(e, "active"),
      b
        .querySelector(`${this.wz_step}[data-step="${this.getCurrentStep()}"]`)
        .classList.add("active"),
      c
        .querySelector(`${this.wz_step}[data-step="${this.getCurrentStep()}"]`)
        .classList.add("active"),
      a.dispatchEvent(new Event("wz.reset"));
  }
  lock() {
    (this.locked = !0), (this.locked_step = this.getCurrentStep());
  }
  unlock() {
    (this.locked = !1),
      (this.locked_step = null),
      document
        .querySelector(this.wz_class)
        .dispatchEvent(new Event("wz.unlock"));
  }
  prefabSteps(a, d, b) {
    let c = this.getCurrentStep();
    for (let c = 0; c < a.length; c++) {
      let d = a[c];
      d.setAttribute("data-step", c),
        $_.str2bool(this.nav) !== !1 && b[c].setAttribute("data-step", c);
    }
    $_.str2bool(this.nav) !== !1 &&
      ($_.removeClassList(b, "active"),
      b[c].classList.add("active"),
      d.classList.add(this.wz_nav_style)),
      $_.removeClassList(a, "active"),
      a[c].classList.add("active"),
      this.setButtons();
  }
  update2Form() {
    let b = document.querySelector(this.wz_class),
      a = b.querySelector(this.wz_content);
    if (a.tagName !== "FORM") {
      let d = a.getAttribute("class"),
        e = a.innerHTML;
      a.remove();
      const c = document.createElement("form");
      c.setAttribute("method", "POST"),
        c.setAttribute("class", d + " " + this.wz_form.replace(".", "")),
        (c.innerHTML = e),
        b.appendChild(c);
    }
  }
  checkForm() {
    let d = document.querySelector(this.wz_class),
      a = d.querySelector(this.wz_content),
      e = a.querySelectorAll(this.wz_step),
      f = e[this.getCurrentStep()],
      b = !1,
      c = f.querySelectorAll("input,textarea,select");
    return c.length > 0 && (b = this.formValidator(a, c)), b;
  }
  setNav(a) {
    let b = a.querySelector(this.wz_nav);
    if (
      ($_.exists(b) !== !1 &&
        $_.str2bool(this.nav) !== !1 &&
        (b.remove(), (b = a.querySelector(this.wz_nav))),
      $_.exists(b) === !1 && $_.str2bool(this.nav) !== !1)
    ) {
      let c = a.querySelector(this.wz_content),
        d = c.querySelectorAll(this.wz_step);
      const b = document.createElement("ASIDE");
      b.classList.add(this.wz_nav.replace(".", ""));
      const e = c.querySelectorAll(this.wz_step),
        f = e.length;
      for (let a = 0; a < f; a++) {
        const c = document.createElement("DIV");
        let h = d[a].hasAttribute("data-title")
          ? d[a].getAttribute("data-title")
          : `${this.options.i18n.title} ${a}`;
        c.classList.add(this.wz_step.replace(".", "")),
          this.navigation === "buttons" && c.classList.add("nav-buttons");
        const e = document.createElement("SPAN");
        e.classList.add("dot"), c.appendChild(e);
        const g = document.createElement("SPAN");
        (g.innerHTML = h), c.appendChild(g), b.appendChild(c);
      }
      a.prepend(b);
    }
  }
  setButtons() {
    let b = document.querySelector(this.wz_class),
      a = b.querySelector(this.wz_buttons);
    if (
      ($_.exists(a) !== !1 &&
        $_.str2bool(this.buttons) !== !1 &&
        (a.remove(), (a = b.querySelector(this.wz_buttons))),
      $_.exists(a) === !1 && $_.str2bool(this.buttons) !== !1)
    ) {
      const e = document.createElement("ASIDE");
      e.classList.add(this.wz_buttons.replace(".", ""));
      let f = this.wz_button_style.replaceAll(".", "");
      f = f.split(" ");
      const a = document.createElement("BUTTON");
      (a.innerHTML = this.prev),
        a.classList.add(this.wz_button.replace(".", "")),
        a.classList.add(...f),
        a.classList.add(this.wz_prev.replace(".", "")),
        this.navigation === "nav" && (a.style.display = "none"),
        e.appendChild(a);
      const c = document.createElement("BUTTON");
      (c.innerHTML = this.next),
        c.classList.add(this.wz_button.replace(".", "")),
        c.classList.add(...f),
        c.classList.add(this.wz_next.replace(".", "")),
        this.navigation === "nav" && (c.style.display = "none"),
        e.appendChild(c);
      const d = document.createElement("BUTTON");
      (d.innerHTML = this.finish),
        d.classList.add(this.wz_button.replace(".", "")),
        d.classList.add(...f),
        d.classList.add(this.wz_finish.replace(".", "")),
        e.appendChild(d),
        this.checkButtons(c, a, d),
        b.appendChild(e);
    }
  }
  checkButtons(a, b, c) {
    let d = this.getCurrentStep(),
      e = this.steps - 1;
    d == 0 ? b.setAttribute("disabled", !0) : b.removeAttribute("disabled"),
      d == e
        ? (a.setAttribute("disabled", !0), (c.style.display = "block"))
        : ((c.style.display = "none"), a.removeAttribute("disabled"));
  }
  check2Prepare(a) {
    this.setNav(a);
    const f = $_.exists(a.querySelector(this.wz_content))
        ? a.querySelector(this.wz_content)
        : $_.throwException(this.options.i18n.empty_content),
      c = f.querySelectorAll(this.wz_step),
      e =
        c.length > 0
          ? c.length
          : $_.throwException(this.options.i18n.empty_content);
    let d = void 0,
      b = void 0;
    if ($_.str2bool(this.nav) !== !1) {
      (d = $_.exists(a.querySelector(this.wz_nav))
        ? a.querySelector(this.wz_nav)
        : $_.throwException(this.options.i18n.empty_nav)),
        (b = d.querySelectorAll(this.wz_step));
      const c =
        b.length > 0
          ? b.length
          : $_.throwException(this.options.i18n.empty_nav);
      c != e && $_.throwException(this.options.i18n.diff_steps);
    }
    (this.steps = e), this.prefabSteps(c, d, b);
  }
  onClick(h) {
    const b = h,
      c = document.querySelector(this.wz_class);
    if (this.locked && this.locked_step === this.getCurrentStep())
      return c.dispatchEvent(new Event("wz.lock")), !1;
    const d = $_.getParent(b, this.wz_class),
      f = d.querySelector(this.wz_nav),
      g = d.querySelector(this.wz_content),
      i = $_.hasClass(b, this.wz_button),
      j = $_.hasClass(b, this.wz_step);
    let a =
      $_.str2bool(b.getAttribute("data-step")) !== !1
        ? parseInt(b.getAttribute("data-step"))
        : this.getCurrentStep();
    i &&
      ($_.hasClass(b, this.wz_prev)
        ? ((a = a - 1), c.dispatchEvent(new Event("wz.btn.prev")))
        : $_.hasClass(b, this.wz_next) &&
          ((a = a + 1), c.dispatchEvent(new Event("wz.btn.next"))));
    let e = a > this.getCurrentStep();
    if (
      (j &&
        (e
          ? c.dispatchEvent(new Event("wz.nav.forward"))
          : a < this.getCurrentStep() &&
            c.dispatchEvent(new Event("wz.nav.backward"))),
      this.form &&
        this.navigation != "buttons" &&
        e &&
        a !== this.getCurrentStep() + 1 &&
        (a >= this.last_step
          ? (a = this.last_step)
          : (a = this.getCurrentStep() + 1)),
      this.form)
    ) {
      const b = this.checkForm();
      if (b.error === !0) {
        if (
          (e &&
            c.dispatchEvent(
              new CustomEvent("wz.error", {
                detail: {
                  id: "form_validaton",
                  msg: this.options.i18n.form_validation,
                  target: b.target,
                },
              })
            ),
          (this.last_step = this.getCurrentStep()),
          this.getCurrentStep() < a)
        )
          return !1;
      }
    }
    if (
      ($_.str2bool(a) && this.setCurrentStep(a),
      $_.str2bool(this.buttons) !== !1)
    ) {
      const a = d.querySelector(this.wz_buttons),
        b = a.querySelector(this.wz_button + this.wz_next),
        c = a.querySelector(this.wz_button + this.wz_prev),
        e = a.querySelector(this.wz_button + this.wz_finish);
      this.checkButtons(b, c, e);
    }
    if ($_.str2bool(this.nav) !== !1) {
      const a = f.querySelectorAll(this.wz_step);
      $_.removeClassList(a, "active"),
        f
          .querySelector(
            `${this.wz_step}[data-step="${this.getCurrentStep()}"]`
          )
          .classList.add("active");
    }
    const k = g.querySelectorAll(this.wz_step);
    $_.removeClassList(k, "active"),
      g
        .querySelector(`${this.wz_step}[data-step="${this.getCurrentStep()}"]`)
        .classList.add("active");
  }
  onClickFinish(a) {
    if (this.form) {
      const a = this.checkForm();
      a.error !== !0 &&
        document
          .querySelector(this.wz_class)
          .dispatchEvent(new Event("wz.form.submit"));
    } else
      document.querySelector(this.wz_class).dispatchEvent(new Event("wz.end"));
  }
  setCurrentStep(a) {
    this.current_step = this.setStep(a);
  }
  getCurrentStep() {
    return this.current_step;
  }
  setStep(a) {
    let c = document.querySelector(this.wz_class),
      b = c.querySelector(this.wz_content),
      d = b.querySelector(`${this.wz_step}[data-step="${a}"]`);
    if ($_.exists(d) === !1) {
      let c = b.querySelectorAll(this.wz_step).length - 1,
        d = $_.closetNubmer(c, a);
      a = d;
    }
    return (
      (this.last_step = a > this.last_step ? a : this.last_step), parseInt(a)
    );
  }
  setNavEvent() {
    let a = this,
      b = document.querySelector(this.wz_class);
    $_.delegate(b, "click", `${this.wz_nav} ${this.wz_step}`, function (b) {
      b.preventDefault(), a.onClick(this);
    });
  }
  setBtnEvent() {
    let a = this,
      b = document.querySelector(this.wz_class);
    $_.delegate(
      b,
      "click",
      `${this.wz_buttons} ${this.wz_button}`,
      function (b) {
        b.preventDefault(),
          $_.hasClass(b.target, a.wz_finish)
            ? a.onClickFinish(this)
            : a.onClick(this);
      }
    );
  }
  set_options(a) {
    this.options = a;
  }
  prefabOpts(a, b) {
    Object.entries(b).forEach(([c, b]) => {
      typeof b == "object"
        ? Object.entries(b).forEach(([b, d]) => {
            a[c][b] = d;
          })
        : (a[c] = b);
    }),
      this.set_options(a);
  }
  formValidator(c, d) {
    let a = !1,
      b = [];
    for (let e of d)
      if ($_.hasClass(e, "required") || $_.exists(e.getAttribute("required"))) {
        let d = !1;
        switch (e.tagName) {
          case "INPUT":
            d = $_.dispatchInput(c, e);
            break;
          case "SELECT":
          case "TEXTAREA":
            d = $_.isEmpty(e.value);
            break;
        }
        d === !1 &&
          ((a = !0),
          b.push(e),
          $_.str2bool(this.highlight) === !0 &&
            $_.highlight(
              e,
              this.wz_highlight,
              this.highlight_type.error,
              this.highlight_time
            ));
      }
    return { error: a, target: b };
  }
}
const $_ = {
  hasClass: function (b, a) {
    return (
      (a = a.replace(".", "")),
      new RegExp("(\\s|^)" + a + "(\\s|$)").test(b.className)
    );
  },
  getParent: function (a, c) {
    let b = void 0;
    while (a.parentNode.tagName !== "BODY" && b === void 0)
      (a = a.parentNode), a.matches(c) && (b = a);
    return b;
  },
  delegate: function (a, b, c, d) {
    a.addEventListener(b, function (b) {
      let a = b.target;
      while (a && a !== this) a.matches(c) && d.call(a, b), (a = a.parentNode);
    });
  },
  removeClassList: function (a, b) {
    for (let c of a) c.classList.remove(b);
  },
  objToString: function (a, c = ";") {
    let b = "";
    for (const d in a) a.hasOwnProperty(d) && (b += d + ":" + a[d] + c);
    return b;
  },
  isHidden: function (a) {
    const b = window.getComputedStyle(a);
    return b.display === "none";
  },
  str2bool: function (a) {
    const b = String(a);
    switch (b.toLowerCase()) {
      case "false":
      case "no":
      case "n":
      case "":
      case "null":
      case "undefined":
        return !1;
      default:
        return !0;
    }
  },
  exists: function (a) {
    return typeof a != "undefined" && a != null;
  },
  throwException: function (c) {
    let b;
    try {
      throw new Error("wz.error");
    } catch (a) {
      b = a;
    }
    if (!b) return;
    let a = b.stack.split("\n");
    throw (a.splice(0, 2), (a = a.join('\n"')), c + " \n" + a);
  },
  closetNubmer: function (c, a) {
    let b = [];
    for (let a = 0; a <= c; a++) b.push(a);
    let d = b.reduce(function (b, c) {
      return Math.abs(c - a) < Math.abs(b - a) ? c : b;
    });
    return d;
  },
  highlight: function (b, c, d, e) {
    let a = c.replace(".", ""),
      f = `${a}-${d}`;
    b.classList.add(f),
      setTimeout(function () {
        document.querySelectorAll(`[class*="${a}"]`).forEach((b) => {
          for (let c = b.classList.length - 1; c >= 0; c--) {
            let d = b.classList[c];
            d.startsWith(`${a}`) && b.classList.remove(d);
          }
        });
      }, e);
  },
  dispatchInput: function (c, a) {
    let d = a.getAttribute("type"),
      b = !1;
    switch (d) {
      case "email":
        b = $_.isEmail(a.value);
        break;
      case "url":
        b = $_.isValidURL(a.value);
        break;
      case "checkbox":
        let e = a.getAttribute("name");
        e.includes("[]")
          ? ((checkbox_check = c.querySelectorAll(
              `input[type="checkbox"][name="${a.getAttribute("name")}"]:checked`
            )),
            (b = checkbox_check.length > 0))
          : (b = a.checked);
        break;
      case "radio":
        let f = c.querySelectorAll(
          `input[type="radio"][name="${a.getAttribute("name")}"]:checked`
        );
        b = f.length > 0;
        break;
      default:
        b = $_.isEmpty(a.value);
        break;
    }
    return b;
  },
  isEmpty: function (a) {
    return (a = a.trim()), a != void 0 && a != null && a.length > 0;
  },
  isEmail: function (a) {
    const b =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return b.test(a);
  },
  isValidURL: function (b) {
    let a;
    try {
      a = new URL(b);
    } catch (a) {
      return !1;
    }
    return a.protocol === "http:" || a.protocol === "https:";
  },
  cleanEvents: function (a, b = !1) {
    if ($_.exists(a))
      if (b) a.parentNode.replaceChild(a.cloneNode(!0), a);
      else {
        const b = a.cloneNode(!1);
        while (a.hasChildNodes()) b.appendChild(a.firstChild);
        a.parentNode.replaceChild(b, a);
      }
  },
};
