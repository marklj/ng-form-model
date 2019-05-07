angular
  .module('app', [])

  .component('formComponent', {
    template: `
      <form name="form" ng-submit="$ctrl.submit(form)">
        <label>First Name</label><br>
        <input type="text" name="firstName" ng-model="firstName">
        <p style="color: red;" ng-repeat="error in $ctrl.nameForm.errors('firstName')">
          {{ error.text }}
        </p>
        <br>
        <label>Last Name</label><br>
        <input type="text" name="lastName" ng-model="lastName2">
        <p style="color: red;" ng-repeat="error in $ctrl.nameForm.errors('lastName')">
          {{ error.text }}
        </p>
        <br><br>
        <button type="submit">Submit</button>
      </form>
    `,
    controller: class {
      submit(form) {
        this.nameForm = new NameForm(form);
        if (this.nameForm.isValid()) {
          console.log('valid... save!');
        } else {
          console.log('invalid... show errors');
          console.log(this.nameForm.errors());
        }
      }
    },
  });
