import React from 'react';
import Markdown from 'react-markdown';

function Policy({ productName }) {
    const markdown = `
# Privacy Policy for ${productName}
Last Updated: 16/10/2024

## Introduction
${productName} ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our mobile application, ${productName} ("the App"), available on Android and iOS platforms.

By using the App, you consent to the collection and use of information in accordance with this policy. If you disagree with the terms of this Privacy Policy, please do not access or use the App.

## 1. Information We Collect
### a. Personal Information
The App does not require you to create an account or provide personal information to use its basic features. However, you may have the option to save searches or access specific features requiring login. In such cases, we may collect basic information, such as your name and email address, if you choose to register.

### b. Usage Data
To improve the App's performance, we may collect anonymous data about your interactions with the App, including the frequency of searches, popular terms, and features used.

### c. Automatically Collected Information
We may collect device information, such as your IP address, operating system, and device type, to ensure compatibility and optimize user experience.

## 2. How We Use Your Information
- **Enhance User Experience:** To personalize the App and provide relevant dictionary content and resources.
- **Improve Services:** To monitor performance, analyze usage trends, and improve the App’s features.
- **Security and Support:** To safeguard data and respond to user queries or feedback.

## 3. Disclosure of Your Information
We do not sell, rent, or share your personal information with third parties. We may share your information only in the following cases:

- **Service Providers:** With vendors and service providers assisting with app maintenance and analytics.
- **Legal Compliance:** To comply with legal obligations, respond to claims, or protect the safety and rights of our users.

## 4. Third-Party Services
The App may contain links to third-party websites or services that are not under our control. We are not responsible for the privacy practices of such third-party services.

## 5. Data Security
We employ reasonable security measures to protect your information from unauthorized access or disclosure. However, no internet transmission or storage method is entirely secure.

## 6. Data Retention
We retain your data only for as long as necessary to provide and improve our services or as required by law.

## 7. Children's Privacy
The App is not intended for individuals under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that a child has provided personal information, we will delete it promptly.

## 8. International Data Transfers
Your information may be transferred to and maintained on servers located outside your country of residence, where data protection laws may differ.

## 9. Your Choices and Rights
- **Access and Correction:** You may request access to, correction, or deletion of your personal information by contacting us.
- **Opt-Out:** You may opt out of receiving promotional messages by following the unsubscribe instructions or contacting us.

## 10. Changes to This Privacy Policy
We may update this Privacy Policy periodically. We will notify you of any changes by updating the "Last Updated" date at the top of this policy.

## 11. Contact Us
For questions or concerns regarding this Privacy Policy or our data practices, please contact us:

Email: tech@monlam.ai  
Address: ${productName}, Jogiwara Rd, near Tibetan Mentsee Khang, Upmuhal, Dharamshala, Himachal Pradesh 176215

...

This policy provides a straightforward overview of data practices for the ${productName} app, with privacy, security, and user rights prioritized.
    `;

    return <Markdown>{markdown}</Markdown>;
}

export default Policy;
