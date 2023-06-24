import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { LargeText, MediumText, Spacer, VeryLargeText } from '../components';

const PrivacyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(VeryLargeText)`
  text-align: center;
`;

export const PrivacyPage = (): ReactElement => {
  return (
    <PrivacyPageContainer>
      <Title>Privacy Policy</Title>
      <Spacer vertical={20} />

      <MediumText faint>
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our app.
        Please read this Privacy Policy carefully. By accessing or using the app, you acknowledge that you have read,
        understood, and agree to be bound by the terms of this Privacy Policy.
      </MediumText>
      <Spacer vertical={20} />

      <LargeText bold>Information We Collect</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        The app collects and stores the email address provided by users during the registration process. We value your
        privacy and only collect the necessary information required for the app's functionality. We do not collect any
        other personal information, such as your name, address, or phone number.
      </MediumText>
      <Spacer vertical={10} />

      <LargeText bold>How We Use Your Information</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        The email address collected is solely used for the purpose of providing access to the app and delivering
        important notifications or updates related to the app's functionality. We do not use your email address for
        marketing purposes or share it with any third-party services.
      </MediumText>
      <Spacer vertical={10} />

      <LargeText bold>Data Storage and Security</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        We take the security of your information seriously. The email addresses collected are securely stored using
        industry-standard measures to protect them from unauthorized access, disclosure, alteration, or destruction. We
        employ encryption and secure transmission protocols to ensure the confidentiality and integrity of your data.
        Rest assured, we do not store any passwords, cookies, or any personal data used in third-party apps.
      </MediumText>
      <Spacer vertical={10} />

      <LargeText bold>Third-Party Services</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        We understand the importance of your privacy and do not share your personal information with any third-party
        services or entities. We believe in maintaining strict control over your data to ensure it remains confidential
        and secure.
      </MediumText>
      <Spacer vertical={10} />

      <LargeText bold>Children's Privacy</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        The app is not intended for use by children under the age of 13. We do not knowingly collect personal
        information from children under 13. If you are a parent or guardian and believe we have inadvertently collected
        personal information from a child under 13, please contact us immediately, and we will take steps to remove that
        information from our systems.
      </MediumText>
      <Spacer vertical={10} />

      <LargeText bold>Changes to This Privacy Policy</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        We reserve the right to update or modify this Privacy Policy at any time. Any changes or updates will be
        effective upon posting the revised version on our website or within the app. It is your responsibility to review
        this Privacy Policy periodically to stay informed of any updates.
      </MediumText>
    </PrivacyPageContainer>
  );
};
