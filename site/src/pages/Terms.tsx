import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { LargeText, MediumText, Spacer, VeryLargeText } from '../components';

const TermsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(VeryLargeText)`
  text-align: center;
`;

export const TermsPage = (): ReactElement => {
  return (
    <TermsPageContainer>
      <Title>Terms and Conditions</Title>
      <Spacer vertical={20} />

      <MediumText faint>
        These Terms of Service govern your use of the app. Please read these Terms carefully. By accessing or using the
        app, you acknowledge that you have read, understood, and agree to be bound by the terms and conditions set forth
        in these Terms.
      </MediumText>
      <Spacer vertical={20} />

      <LargeText bold>Acceptance of Terms</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        By using the app, you agree to comply with and be bound by these Terms. If you do not agree with these Terms,
        please do not access or use the app.
      </MediumText>
      <Spacer vertical={10} />

      <LargeText bold>Use of the app</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        The app is provided for your personal and non-commercial use. You may only use the app in accordance with these
        Terms and applicable laws and regulations. You are responsible for maintaining the confidentiality of your
        account information and for all activities that occur under your account.
      </MediumText>
      <Spacer vertical={10} />

      <LargeText bold>Intellectual Property Rights</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        The app and all its contents, including but not limited to text, graphics, images, logos, icons, software, and
        audio or video clips, are the property of Switch or its licensors and are protected by applicable intellectual
        property laws. You may not use, reproduce, modify, distribute, or display any portion of the app without the
        prior written consent of Switch.
      </MediumText>
      <Spacer vertical={10} />

      <LargeText bold>User Conduct</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        Comply with all applicable laws and regulations. Use the app in a manner consistent with its intended purpose.
        Not engage in any activity that may interfere with or disrupt the functioning of the app or its associated
        systems. Not attempt to gain unauthorized access to any accounts, networks, or systems related to the app. Not
        use the app for any unlawful, harmful, or objectionable purpose.
      </MediumText>
      <Spacer vertical={10} />

      <LargeText bold>Limitation of Liability</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        To the fullest extent permitted by law, Switch shall not be liable for any direct, indirect, incidental,
        consequential, or special damages arising out of or in connection with the use of the app, even if advised of
        the possibility of such damages. This limitation of liability applies to all claims, whether based on warranty,
        contract, tort, or any other legal theory.
      </MediumText>
      <Spacer vertical={10} />

      <LargeText bold>Modifications and Termination</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        Switch reserves the right to modify, suspend, or terminate the app or any part thereof, at any time and for any
        reason, without prior notice. We may also modify these Terms from time to time. It is your responsibility to
        review these Terms periodically for any changes. Continued use of the app after such modifications shall
        constitute your acceptance of the modified Terms.
      </MediumText>
      <Spacer vertical={10} />

      <LargeText bold>Governing Law and Jurisdiction</LargeText>
      <Spacer vertical={5} />
      <MediumText faint>
        These Terms shall be governed by and construed in accordance with the laws of the United Kingdom. Any dispute
        arising out of or relating to these Terms or the use of the app shall be subject to the exclusive jurisdiction
        of the courts of the United Kingdom.
      </MediumText>
    </TermsPageContainer>
  );
};
