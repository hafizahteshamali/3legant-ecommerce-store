const OtpTemplate = (otp) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">Your OTP Code</h2>
  
      <p style="font-size: 16px; color: #555; text-align: center;">
        Use the following OTP to complete your action:
      </p>
  
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 28px; letter-spacing: 5px; font-weight: bold; background-color: #eee; padding: 10px 25px; border-radius: 5px;">
          ${otp}
        </span>
      </div>
  
      <p style="font-size: 14px; color: #777; text-align: center;">
        This OTP is valid for 5 minutes. If you did not request this, please ignore this email.
      </p>
  
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
  
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        &copy; ${new Date().getFullYear()} Portal. All rights reserved.
      </p>
    </div>
    `;
  };
  
  export default OtpTemplate;
  