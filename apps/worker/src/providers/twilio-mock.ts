export type MockTwilioSendResult = {
  sid: string;
  to: string;
  status: "queued";
};

export async function sendViaMockTwilio(input: {
  to: string;
  body: string;
  senderId: string;
}): Promise<MockTwilioSendResult> {
  return {
    sid: `SM-${Buffer.from(input.to).toString("hex").slice(0, 10)}`,
    to: input.to,
    status: "queued"
  };
}

