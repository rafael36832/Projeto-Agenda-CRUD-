// Load for promises, async, await
import 'core-js/stable'
import 'regenerator-runtime/runtime';
// Load for CSS
import './assets/css/style.css';

import LoginValidator from "./assets/js/modules/loginUserForm"
import RegisterValitor from "./assets/js/modules/registerUserForm"
import ContactValidator from './assets/js/modules/contactForm';

// Load form's validator listeners
new LoginValidator()
new RegisterValitor()
new ContactValidator()

