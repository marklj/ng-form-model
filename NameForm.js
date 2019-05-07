class NameForm extends BaseForm {
  fields() {
    return {
      firstName: {
        required: true,
        min: 2,
        max: 10,
        pattern: 'a', // requires 'a' char
      },
      lastName: {
        label: 'Surname',
        required: true,
      },
    };
  }
  constructor(ngForm) {
    super(ngForm);
  }
}
