class BaseForm {
  constructor(ngForm) {
    this._errors = [];
    let form = this._getFields(ngForm);
    this.validate(form);
  }
  fields() {
    return {};
  }
  isValid() {
    return !this.errors().length;
  }
  isInvalid() {
    return !this.isValid();
  }
  errors(field) {
    if (field) {
      return this._errors.filter((error) => {
        return error.ref === field;
      });
    }
    return this._errors;
  }
  _getFields(ngForm) {
    const fieldNames = Object.keys(this.fields());
    return fieldNames.reduce((fields, name) => {
      fields[name] = ngForm[name].$viewValue ? ngForm[name].$viewValue : '';
      return fields;
    }, {});
  }
  validate(form) {
    const fields = this.fields();
    Object.keys(fields).forEach((fieldName) => {
      Object.keys(fields[fieldName]).forEach((constraint) => {
        if (
          constraint === 'required' &&
          fields[fieldName]['required'] === true &&
          (!form[fieldName] || form[fieldName].length < 1)
        ) {
          this._errors.push(
            new ErrorMessage(
              `${this.getLabel(fieldName)} is required.`,
              fieldName,
            ),
          );
        }
        if (
          constraint === 'min' &&
          (!form[fieldName] &&
            form[fieldName].length < fields[fieldName]['min'])
        ) {
          this._errors.push(
            new ErrorMessage(
              `${this.getLabel(fieldName)} must be greater than ${
                fields[fieldName]['min']
              } characters in length.`,
              fieldName,
            ),
          );
        }
        if (
          constraint === 'pattern' &&
          fields[fieldName]['pattern'].exec(form[fieldName]) === null
        ) {
          this._errors.push(
            new ErrorMessage(
              `${this.getLabel(fieldName)} is not in a valid format.`,
              fieldName,
            ),
          );
        }
      });
    });
  }
  getLabel(fieldName) {
    try {
      if (this.fields()[fieldName].label) {
        return this.fields()[fieldName].label;
      }
      throw new Error();
    } catch (e) {
      // convert to title string
      return (
        fieldName
          .replace(/([A-Z])/g, ' $1')
          // uppercase the first character
          .replace(/^./, function(str) {
            return str.toUpperCase();
          })
      );
    }
  }
}
