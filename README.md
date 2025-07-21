# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


🏢 StayNest - Apartment Management System
StayNest is a modern, user-friendly apartment management system built for apartment members, renters, and administrators. It offers seamless rent payments, coupon discounts, and a powerful admin dashboard to manage apartments, users, and financials.

🌐 Live Links
🔗 Live link: [[Insert your Client-side Live Link Here](https://staynest-a232a.web.app/)]


✨ Features
👤 Member Features
Dashboard: Personalized view of apartment info, rent status, and announcements.

Rent Payment: Secure online rent payment using Stripe.

Apply Coupon: Add valid discount coupons during rent payment.

Payment History: Track all payments with transaction ID, date, and amount.

Profile Management: View and update personal profile details.

🛠️ Admin Features
User Management: View all users, change roles (user / member / admin), and delete accounts.

Apartment Management: Add, update, or delete apartment data including floor, block, and number.

Coupon Management: Create, update, and deactivate discount coupons.

Payment Monitoring: Monitor all transactions and generate rent reports.

⚙️ General Features
🔐 Authentication: Firebase-based secure login and registration system.

🔒 Role-Based Access: Route-level protection based on user roles.

📱 Responsive Design: Works seamlessly on desktop, tablet, and mobile.

💬 Interactive Alerts: Attractive notifications with SweetAlert2.

🧱 Tech Stack
🔹 Frontend
React.js – Component-based UI library

React Router DOM – Client-side routing

Tailwind CSS – Utility-first CSS framework

DaisyUI – Tailwind-based UI components

React Hook Form – Form handling and validation

React Query (TanStack) – Server state management

Stripe.js & React Stripe.js – Stripe integration for rent payment

SweetAlert2 – Custom alert and notification modals

Firebase Auth – Authentication and user management

React Icons – Icon library

React Helmet Async – Manage page metadata dynamically

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
