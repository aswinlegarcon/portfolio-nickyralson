# Portfolio (React + Vite)

Portfolio site with Home, Work, Gallery, and Contact pages.

## Run locally

```bash
npm install
npm run dev
```

## Contact form email setup (EmailJS - free)

The Contact page (`/contact`) is wired with `@emailjs/browser`.

### 1) Create your free EmailJS account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up / log in

### 2) Add an email service

1. In EmailJS dashboard, open **Email Services**
2. Click **Add New Service**
3. Choose Gmail / Outlook / other provider
4. Complete provider login/authorization
5. Copy the generated **Service ID**

### 3) Create an email template

1. Open **Email Templates**
2. Create a template and include variables used by this project:
	- `{{from_name}}`
	- `{{reply_to}}`
	- `{{message}}`
	- `{{to_name}}`
3. Set your destination email as the template receiver
4. Copy the **Template ID**

### 4) Get public key

1. Open **Account** (or **Integration**) in EmailJS
2. Copy your **Public Key**

### 5) Add environment variables

Create a `.env` file in project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 6) Test form

1. Run `npm run dev`
2. Open `/contact`
3. Fill the form and click **Send Message**
4. Check your inbox for the email

## Notes

- If sending fails, verify IDs/keys exactly match EmailJS dashboard.
- Vite env variables must start with `VITE_`.
# portfolio-nickyralson
