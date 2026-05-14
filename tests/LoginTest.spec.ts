import { test, expect } from "playwright/test";
import { LoginPage } from "../Pages/Authenticattion/LoginPage";

let loginPage: LoginPage;
const baseURL = process.env.BASE_URL as string;
const email = process.env.EMAIL as string;
const password = process.env.PASSWORD as string;

test.describe("Test login page functions", () => {
    test("Test login successful with username and password incase directly enter the login page link", async ({page}) => {
        loginPage = new LoginPage(page);

        await loginPage.loginWithURL(email, password);

        await expect(loginPage.popupLoginSuccessful).toBeVisible();
        await expect(page).toHaveURL(/.*profile.*/);
    });

    test("Test login successful with username and password incase go to home page and click on signin", async ({page}) => {
        loginPage = new LoginPage(page);

        await loginPage.loginFromHomePage(email, password);

        await expect(loginPage.popupLoginSuccessful).toBeVisible();
        await expect(page).toHaveURL(/.*profile.*/);
    });

    test("Test error message when logging in with empty email", async ({page}) => {
        loginPage = new LoginPage(page);

        await loginPage.loginWithEmptyEmail();

        await expect(loginPage.lbEmptyEmail).toBeVisible();
    });

    test("Test error message when logging in with wrong email format", async ({page}) => {
        loginPage = new LoginPage(page);

        await loginPage.loginWithWrongEmailFormat();

        await expect(loginPage.lbWrongEmailFormat).toBeVisible();
    });

    test("Test error message when logging in with empty password", async ({page}) => {
        loginPage = new LoginPage(page);

        await loginPage.loginWithEmptyPassword(email);

        await expect(loginPage.lbEmptyPassword).toBeVisible();
    });

    test("Test error message when logging in with password character greater than maximun limit", async ({page}) => {
        loginPage = new LoginPage(page);
        
        await loginPage.loginWithPasswordCharaterLessThanLimit(email);

        await expect(loginPage.lbWrongPasswordCharacterLimit).toBeVisible();
    });

    test("Test error message when logging in with password character less than minimun limit", async ({page}) => {
        loginPage = new LoginPage(page);

        await loginPage.loginWithPasswordCharaterGreaterThanLimit(email);

        await expect(loginPage.lbWrongPasswordCharacterLimit).toBeVisible();
    });

    test("Test login unsuccessfully login with invalid credential", async ({page}) => {
        loginPage = new LoginPage(page);

        await loginPage.loginFromHomePage("cyka@blyat.ru", "123456");

        await expect(loginPage.popupWrongEmailOrPassword).toBeVisible();
        await expect(page).not.toHaveURL(/.*profile.*/);
    });

    test("Test logout by trick", async ({page}) => {
        loginPage = new LoginPage(page);

        await loginPage.loginFromHomePage(email, password);
        await page.waitForURL(`${baseURL}/profile`);
        await loginPage.logout();
        await page.reload();

        await expect(loginPage.popupLoginRequire).toBeVisible();
        await expect(page).toHaveURL(/.*login.*/);
    });
});