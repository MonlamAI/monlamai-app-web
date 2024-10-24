import React from 'react'
import Markdown from 'react-markdown'

function Privacy_policy() {
    const markdown=`
    # Privacy Policy for Monlam Translate

Last Updated: 16/10/2024

---

## Introduction

Monlam Translate ("**we**," "**us**," or "**our**") is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our mobile application, **Monlam Translate** (the "**App**"), available on the Android platform.

By using the App, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this Privacy Policy, please do not access the App.

---

## 1. Information We Collect

### a. Personal Information

- **Authentication Data**: When you log in using third-party services like Google or Facebook through Auth0 authentication, we collect your name, email address, and profile picture.

### b. Usage Data

- **Translation Data**: Text, images, and voice inputs that you provide for translation.

### c. Automatically Collected Information

- **Log Data**: We may collect log information when you access the App, such as your IP address, app settings, and interaction with app features.

---

## 2. How We Use Your Information

- **Provide and Improve Services**: To operate and maintain the App's functionalities, including text translation, camera translation, photo translation, and conversational translations.
- **Personalization**: To personalize your experience and deliver content relevant to your interests.
- **Communication**: To send you updates, security alerts, and support messages.
- **Analytics**: To monitor and analyze usage and trends to improve user experience.

---

## 3. Disclosure of Your Information

We do not sell or rent your personal information to third parties. We may share information in the following situations:

- **Service Providers**: With third-party vendors, consultants, and service providers who need access to such information to carry out work on our behalf.
- **Legal Obligations**: To comply with legal processes, respond to claims, or protect the rights, property, or safety of our users.
- **Business Transfers**: In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.

---

## 4. Third-Party Services

The App may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices of such third parties.

### a. Auth0 Authentication

- We use Auth0 for secure authentication. Auth0's Privacy Policy can be found [here](https://auth0.com/privacy).

### b. Google Services

- If you use Google social login or translation services, your information is subject to Google's Privacy Policy, available [here](https://policies.google.com/privacy).

---

## 5. Data Security

We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.

---

## 6. Data Retention

We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

---

## 7. Children's Privacy

Our App is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.

---

## 8. International Data Transfers

Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ.

---

## 9. Your Choices and Rights

- **Access and Correction**: You may access, correct, or delete your personal information by contacting us.
- **Opt-Out**: You may opt out of receiving promotional communications from us by following the unsubscribe instructions.

---

## 10. Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date at the top of this Privacy Policy.

---

## 11. Contact Us

If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:

- **Email**: [tech@monlam.ai](mailto:tech@monlam.ai)
- **Address**: Monlam Translate, Jogiwara Rd, near Tibetan Mentsee Khang, Upmuhal, Dharamshala, Himachal Pradesh 176215

---

## 12. Consent

By using the App, you consent to our collection and use of your personal information as described in this Privacy Policy.

---

## 13. Permissions

The App may request certain permissions that allow it to access your device data:

- **Camera**: For instant camera translation.
- **Microphone**: For voice input in conversational translations.
- **Storage**: To save and import photos for translation.
- **Internet**: To access online translation services and enable connectivity features within the App.
- **Access Fine Location**: To provide precise location-based features or services within the App.
- **Access Coarse Location**: To provide approximate location-based features or services within the App.

---

## 14. Compliance with Laws

We comply with applicable data protection laws, including the General Data Protection Regulation (GDPR) for users in the European Economic Area (EEA).

---

## 15. User Generated Content

Any content you translate using the App remains your responsibility. Please ensure that you have the right to share the content you submit for translation.

---

## 16. Advertising

We do not display third-party advertisements in the App. However, we may promote our own services or features within the App.

---

## 17. Data Processing

We process data through secure servers. Translation data may be sent to and processed by third-party translation services to provide accurate translations.

---

## 18. Cookies and Similar Technologies

We do not use cookies within the App. However, third-party services integrated into the App may use cookies according to their own policies.

---

## 19. External Links

The App may contain links to external websites or services. We are not responsible for the privacy practices or content of these external sites.

---

## 20. Dispute Resolution

Any disputes arising from this Privacy Policy will be resolved through binding arbitration in accordance with [Applicable Law/Arbitration Rules].

---

**Thank you for using Monlam Translate.**

By keeping your information secure and transparent about our data practices, we aim to provide a trustworthy translation experience.

---
`

    return (
        <Markdown>{markdown}</Markdown>

  )
}

export default Privacy_policy