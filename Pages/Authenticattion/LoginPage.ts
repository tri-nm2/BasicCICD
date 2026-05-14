import { Page, Locator } from "playwright";
import { Messages } from "../Common/Messages";

export class LoginPage {
    //Environment variables
    readonly baseURL = process.env.BASE_URL as string;
    readonly errorEmptyEmail: string = Messages.ERROR_EMPTY_EMAIL;
    readonly errorWrongEmailFormat: string = Messages.ERROR_WRONG_EMAIL_FORMAT;
    readonly errorEmptyPassword: string = Messages.ERROR_EMPTY_PASSWORD;
    readonly errorWrongPasswordCharacterLimit: string = Messages.ERROR_WRONG_PASSWORD_CHARACTER_LIMIT;
    readonly errorWrongEmailOrPassword = Messages.ERROR_WRONG_EMAIL_OR_PASSWORD;
    readonly messageLoginSuccessful: string = Messages.MESSAGE_LOGIN_SUCCESSFUL;
    readonly messageLoginRequire: string = Messages.MESSAGE_LOGIN_REQUIRE;
    
    //Page and locators
    readonly page: Page;
    readonly txtEmail: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;
    readonly linkSignin: Locator;
    readonly lbEmptyEmail: Locator
    readonly lbWrongEmailFormat: Locator;
    readonly lbEmptyPassword: Locator;
    readonly lbWrongPasswordCharacterLimit: Locator;
    readonly popupWrongEmailOrPassword: Locator;
    readonly popupLoginSuccessful: Locator;
    readonly popupLoginRequire: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtEmail = this.page.locator("//input[@name='email']");
        this.txtPassword = this.page.locator("//input[@name='password']");
        this.btnLogin = this.page.locator("//button[@type='submit']");
        this.linkSignin = this.page.locator("//nav[@class='header_navbar']/ul/li[6]");
        this.lbEmptyEmail = this.page.locator(`//span[@class='text-danger' and text()='${this.errorEmptyEmail}']`);
        this.lbWrongEmailFormat = this.page.locator(`//span[@class='text-danger' and text()='${this.errorWrongEmailFormat}']`);
        this.lbEmptyPassword = this.page.locator(`//span[@class='text-danger' and text()='${this.errorEmptyPassword}']`);
        this.lbWrongPasswordCharacterLimit = this.page.locator(`//span[@class='text-danger' and text()='${this.errorWrongPasswordCharacterLimit}']`);
        this.popupLoginSuccessful = this.page.locator(`//div[text()='${this.messageLoginSuccessful}']`);
        this.popupWrongEmailOrPassword = this.page.locator(`//div[text()='${this.errorWrongEmailOrPassword}']`);
        this.popupLoginRequire = this.page.locator(`//div[text()='${this.messageLoginRequire}']`);
    }

    
    async loginWithURL(email: string, password: string): Promise<void> {
        await this.page.goto(`${this.baseURL}/login`);

        await this.txtEmail.waitFor({state: "visible", timeout: 30000});
        await this.txtEmail.fill(email);

        await this.txtPassword.waitFor({state: "visible", timeout: 30000});
        await this.txtPassword.fill(password);

        await this.btnLogin.waitFor({state: "visible", timeout: 30000});
        await this.btnLogin.click();
    }

    async loginFromHomePage(email: string, password: string): Promise<void> {
        await this.page.goto(this.baseURL);

        await this.linkSignin.waitFor({state: "visible", timeout: 30000});
        await this.linkSignin.click();

        await this.txtEmail.waitFor({state: "visible", timeout: 30000});
        await this.txtEmail.fill(email);

        await this.txtPassword.waitFor({state: "visible", timeout: 30000});
        await this.txtPassword.fill(password);

        await this.btnLogin.waitFor({state: "visible", timeout: 30000});
        await this.btnLogin.click();
    }

    async loginWithEmptyEmail(): Promise<void> {
        await this.page.goto(this.baseURL);

        await this.linkSignin.waitFor({state: "visible", timeout: 30000});
        await this.linkSignin.click();

        await this.txtEmail.waitFor({state: "visible", timeout: 30000});
        await this.txtEmail.focus();
        await this.txtEmail.blur();
    }

    async loginWithWrongEmailFormat(): Promise<void> {
        await this.page.goto(this.baseURL);

        await this.linkSignin.waitFor({state: "visible", timeout: 30000});
        await this.linkSignin.click();

        await this.txtEmail.waitFor({state: "visible", timeout: 30000});
        await this.txtEmail.fill("q");
        await this.txtEmail.blur();
    }

    async loginWithEmptyPassword(email: string): Promise<void> {
        await this.page.goto(this.baseURL);

        await this.linkSignin.waitFor({state: "visible", timeout: 30000});
        await this.linkSignin.click();

        await this.txtEmail.waitFor({state: "visible", timeout: 30000});
        await this.txtEmail.fill(email);

        await this.txtPassword.waitFor({state: "visible", timeout: 30000});
        await this.txtPassword.focus();
        await this.txtPassword.blur();
    }

    async loginWithPasswordCharaterLessThanLimit(email: string): Promise<void> {
        await this.page.goto(this.baseURL);

        await this.linkSignin.waitFor({state: "visible", timeout: 30000});
        await this.linkSignin.click();

        await this.txtEmail.waitFor({state: "visible", timeout: 30000});
        await this.txtEmail.fill(email);

        await this.txtPassword.waitFor({state: "visible", timeout: 30000});
        await this.txtPassword.fill("0123");
        await this.txtPassword.blur();
    }

    async loginWithPasswordCharaterGreaterThanLimit(email: string): Promise<void> {
        await this.page.goto(this.baseURL);

        await this.linkSignin.waitFor({state: "visible", timeout: 30000});
        await this.linkSignin.click();

        await this.txtEmail.waitFor({state: "visible", timeout: 30000});
        await this.txtEmail.fill(email);

        await this.txtPassword.waitFor({state: "visible", timeout: 30000});
        await this.txtPassword.fill("0123456789012345678901234567890123456789");
        await this.txtPassword.blur();
    }

    async logout(): Promise<void> {
        await this.page.evaluate(() => localStorage.clear());
    }
}