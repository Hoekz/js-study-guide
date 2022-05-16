class Basic extends ParentClass {
  prop1 = 'prop';

  constructor(arg1, arg2) {
    this.arg1 = arg1;
  }

  get prop() {
    return this.arg1;
  }

  set prop(value) {
    this.arg1 = value;
  }

  doStuff(factor) {
    return this.arg1 * factor + this.arg2;
  }
}
