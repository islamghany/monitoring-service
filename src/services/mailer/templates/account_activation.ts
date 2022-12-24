export const accoutnActivationTemp = (
  userID: number,
  activationToken: string,
  tokenExpirationTime: string
) => `
<p>Hi,</p>
<p>Thanks for signing up for our Monitoring service account. We're excited to have you on board!</p>
<p>For future reference, your user ID number is ${userID}.</p>
<p>to activate your account please go this link below.<p>
<p>${activationToken}</p>
<p>Please note that this is a one-time use token and it will expire in ${tokenExpirationTime}</p>
<p>Thanks,</p>
<p>The Monitoring Service Team</p>
`;
