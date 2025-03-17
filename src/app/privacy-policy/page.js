export default function PrivacyPolicy() {
  return (
    <div>
      <div className='py-5  font-bold shadow-lg text-center text-lg text-black'>
        <h3>Zatayo</h3>
      </div>
      <div className='px-10 py-10'>
        <p className='font-bold '>
          Welcome At Zatayo we recognize that privacy is important!!
        </p>
        <p className='pt-5 text-[16px]'>
          This app is owned by Zatayo PROP RAJAN KHANEJA. This Privacy Policy is
          designed to tell you about our practices regarding collection, use,
          and disclosure of information that you may provide via this app.
          Please be sure to read this entire Privacy Policy before using or
          submitting information to this app.
        </p>

        <div className='py-5'>
          <p className=' font-bold'>Consent</p>
          <p className='pt-2'>
            By using this site, you agree to the terms of this Privacy Policy.
            Whenever you submit information via this site, you consent to the
            collection, use and disclosure of the information in accordance with
            this Privacy Policy
          </p>
        </div>

        <div>
          <p className='font-bold'>Information collected</p>
          <p className='pt-3'>
            In general, you can visit this Web site without telling us who you
            are or revealing any information about yourself. Our web servers
            collect the domain names, not the e-mail addresses, of visitors.
            Zatayo may collect personal information from you including your
            first and last name, address, telephone and mobile number(s), email
            address, live location, credit card details and any other
            information, when you knowingly provide us with this information.
            This will generally occur when you either:
          </p>
          <ul class='list-disc px-10 pt-5'>
            <li>
              Phone Number: Collected for user verification via OTP (One-Time
              Password).
            </li>
            <li>
              Camera Access: Camera for user can scan the Qr Code for
              attendance.
            </li>
            <li>Enter into a competition or promotion. Apply for a job.</li>
            <li>Request information regarding our Franchise system.</li>
            <li>Submit website/app feedback</li>
          </ul>
        </div>

        {/* <!-------------  Credit card details -------------> */}

        <div>
          <p className='font-bold pt-5'>Credit Card Details </p>
          <p className='pt-3'>
            Zatayo does not store any of your credit card details{' '}
          </p>
        </div>
        {/* <!-------------  Credit card details -------------> */}

        {/* <!----------------  Security -------------------> */}
        <div className='py-5'>
          <p className='font-bold'> Security</p>
          <p className='pt-3'>
            Zatayo will take reasonable steps to ensure that the personal
            information collected is accurate, complete and up-to-date. You can
            access and request correction of any personal information concerning
            you at any time. You may also request that your personal information
            be deleted at any time. Any such requests should be made directly by
            contacting us.Zatayo will take reasonable steps to protect personal
            information from misuse, loss and unauthorized access, modification
            or disclosure.
          </p>
        </div>
        {/* <!----------------  Security -------------------> */}

        <div>
          <p className='font-bold'> Sensitive Information</p>
          <p className='pt-3'>
            Zatayo will not collect, use or disclose sensitive information
            except with your specific consent.
          </p>
        </div>
        <div className='py-5'>
          <p className='font-bold'> Deleting User Information</p>
          <p className='pt-3'>
            If you would like to delete the personal information/account we have
            collected from you, please write us at "zatayo@gmail.com" or contact
            Zatayo customer care (+91 8766227022).
          </p>
        </div>
        <div className=''>
          <p className='font-bold'> Changes</p>
          <p className='pt-3'>
            If this Privacy Policy is changed, the revised policy will be posted
            on this app. Please check back periodically, and especially before
            you provide any personally identifiable information. This Privacy
            Policy was last updated on Mar 03, 2025.
          </p>
        </div>
      </div>
    </div>
  );
}
