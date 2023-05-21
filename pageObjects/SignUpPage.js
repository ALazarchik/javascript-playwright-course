export class SignUpPage {

    constructor(page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('E-Mail');
        this.passwordInput = page.getByPlaceholder('Password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
    }

    async submitRegistrationForm(email, password) {
        await this.emailInput.waitFor();
        await this.emailInput.fill(email);
        await this.passwordInput.waitFor();
        await this.passwordInput.fill(password);
        await this.registerButton.waitFor();
        await this.registerButton.click();
        await this.page.waitForURL('/delivery-details');
    }
}
