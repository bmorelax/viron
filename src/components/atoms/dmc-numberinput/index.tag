dmc-numberinput.Numberinput
  .Numberinput__label(if="{ !!opts.label }") { opts.label }
  form.Numberinput__form(onSubmit="{ handleFormSubmit }" onKeyDown="{ handleFormKeyDown }")
    input.Numberinput__input(ref="input" value="{ opts.number || '' }" placeholder="{ opts.placeholder || '' }" onInput="{ handleInputInput }" onChange="{ handleInputChange }")
    .Numberinput__handler
      .Numberinput__handler__button(onTap="handleIncreaseButtonPat" ref="touch" disabled="{opts.number >= opts.max}") ▲
      .Numberinput__handler__button(onTap="handleDecreaseButtonPat" ref="touch" disabled="{opts.number <= opts.min}") ▼

  script.
    import script from './index';
    this.external(script);