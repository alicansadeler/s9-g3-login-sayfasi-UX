import { beforeEach, expect, test } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import App from '../App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { server } from '../mocks/server';
import 'mutationobserver-shim';
import fs from 'fs';
import path from 'path';

const loginPage = fs
  .readFileSync(path.resolve(__dirname, '../components-1/Login.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

let dom, container;

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  document.body.innerHTML = '';
  localStorage.clear();
});
beforeEach(() => {
  dom = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  container = dom.container;
});

test('Başarılı login girişinde localStoragea email adresini kaydediyor.', async () => {
  localStorage.clear();
  const user = userEvent.setup();

  const email = screen.getByPlaceholderText(/Enter your email/i);
  const password = screen.getByPlaceholderText(/Enter your password/i);
  const loginButton = screen.getByText('Sign In');

  await user.type(email, 'erdem.guntay@wit.com.tr');
  await user.type(password, '9fxIH0GXesEwH_I');
  await user.click(loginButton);

  const readMail = localStorage.getItem('email');
  expect(
    readMail === '"erdem.guntay@wit.com.tr"' ||
      readMail === 'erdem.guntay@wit.com.tr'
  ).toBe(true);
});

test('localStorageda kayıtlı email adresini email inputuna ekleyerek form açılıyor.', async () => {
  const user = userEvent.setup();

  let login = screen.getByText('Login');
  await user.click(login);

  const email = screen.getByPlaceholderText(/Enter your email/i);
  const password = screen.getByPlaceholderText(/Enter your password/i);
  const loginButton = screen.getByText('Sign In');

  await user.type(email, 'erdem.guntay@wit.com.tr');
  await user.type(password, '9fxIH0GXesEwH_I');
  await user.click(loginButton);

  login = screen.getByText('Login');
  await user.click(login);

  const input = await screen.findByTestId('email-input');
  expect(input).toHaveValue('erdem.guntay@wit.com.tr');
});

test('localStorageda kayıtlı email adresi yoksa focus email inputunda açılıyor', async () => {
  const user = userEvent.setup();

  let login = screen.getByText('Login');
  await user.click(login);

  const email = screen.getByPlaceholderText(/Enter your email/i);
  const password = screen.getByPlaceholderText(/Enter your password/i);
  const loginButton = screen.getByText('Sign In');

  await user.type(email, 'erdem.gunta@wit.com.tr');
  await user.type(password, '9fxIH0GXesEwH_I');
  await user.click(loginButton);

  login = screen.getByText('Login');
  await user.click(login);
  const input = await screen.findByTestId('email-input');
  expect(input).toHaveFocus();
});

test('localStorageda kayıtlı email adresi varsa focus password inputunda açılıyor', async () => {
  const user = userEvent.setup();

  let login = screen.getByText('Login');
  await user.click(login);

  const email = screen.getByPlaceholderText(/Enter your email/i);
  const password = screen.getByPlaceholderText(/Enter your password/i);
  const loginButton = screen.getByText('Sign In');

  await user.type(email, 'erdem.guntay@wit.com.tr');
  await user.type(password, '9fxIH0GXesEwH_I');
  await user.click(loginButton);

  login = screen.getByText('Login');
  await user.click(login);
  const input = await screen.findByTestId('password-input');
  expect(input).toHaveFocus();
});
