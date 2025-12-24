"use client";

import { motion } from "framer-motion";

import { PageHeader } from "@/components/ui/page-header";
import { SectionTitle } from "@/components/ui/section-title";

export default function TermsConditionsPage() {
  const lastUpdated = "May 15, 2023";

  return (
    <main>
      <PageHeader
        subtitle="Please read these terms carefully before using our services"
        title="Terms & Conditions"
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-10">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10 rounded-lg bg-gray-50 p-6">
              <p className="text-gray-600">
                <strong>Last Updated:</strong> {lastUpdated}
              </p>
              <p className="mt-2 text-gray-600">
                These Terms and Conditions ("Terms") govern your access to and
                use of the Devun website and services. By accessing or using our
                services, you agree to be bound by these Terms. If you do not
                agree to these Terms, please do not use our services.
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <SectionTitle title="Acceptance of Terms" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    By accessing or using our services, you acknowledge that you
                    have read, understood, and agree to be bound by these Terms,
                    as well as our Privacy Policy. These Terms constitute a
                    legal agreement between you and Devun.
                  </p>
                </div>
              </div>

              <div>
                <SectionTitle title="Services Description" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    Devun provides various IT services, including but not
                    limited to web and mobile application development, UI/UX
                    design, digital marketing, cybersecurity, and cloud
                    computing solutions. The specific services provided to you
                    will be outlined in a separate agreement or statement of
                    work.
                  </p>
                  <p>
                    We reserve the right to modify, suspend, or discontinue any
                    part of our services at any time without prior notice. We
                    shall not be liable to you or any third party for any
                    modification, suspension, or discontinuation of our
                    services.
                  </p>
                </div>
              </div>

              <div>
                <SectionTitle title="User Accounts" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    Some of our services may require you to create an account.
                    When you create an account, you agree to provide accurate,
                    current, and complete information and to update such
                    information to keep it accurate, current, and complete.
                  </p>
                  <p>
                    You are responsible for safeguarding your account
                    credentials and for all activities that occur under your
                    account. You agree to notify us immediately of any
                    unauthorized use of your account or any other breach of
                    security.
                  </p>
                </div>
              </div>

              <div>
                <SectionTitle title="Intellectual Property Rights" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    All content, features, and functionality of our services,
                    including but not limited to text, graphics, logos, icons,
                    images, audio clips, digital downloads, data compilations,
                    and software, are the exclusive property of Devun or our
                    licensors and are protected by copyright, trademark, and
                    other intellectual property laws.
                  </p>
                  <p>
                    Unless explicitly stated, nothing in these Terms shall be
                    construed as conferring any license to intellectual property
                    rights, whether by estoppel, implication, or otherwise. Any
                    use of our services not expressly permitted by these Terms
                    is a breach of these Terms and may violate copyright,
                    trademark, and other laws.
                  </p>
                </div>
              </div>

              <div>
                <SectionTitle title="User Content" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    You retain ownership of any content you submit, post, or
                    display on or through our services ("User Content"). By
                    submitting User Content, you grant us a worldwide,
                    non-exclusive, royalty-free license to use, reproduce,
                    modify, adapt, publish, translate, distribute, and display
                    such User Content in connection with providing our services.
                  </p>
                  <p>
                    You represent and warrant that you own or have the necessary
                    rights to the User Content you submit and that such User
                    Content does not violate the rights of any third party,
                    including intellectual property rights and privacy rights.
                  </p>
                </div>
              </div>

              <div>
                <SectionTitle title="Prohibited Conduct" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    You agree not to engage in any of the following prohibited
                    activities:
                  </p>
                  <ul>
                    <li>
                      Violating any applicable law, regulation, or these Terms
                    </li>
                    <li>
                      Infringing on the intellectual property rights of others
                    </li>
                    <li>
                      Uploading or transmitting viruses, malware, or other
                      malicious code
                    </li>
                    <li>
                      Attempting to gain unauthorized access to our systems or
                      networks
                    </li>
                    <li>
                      Interfering with or disrupting our services or servers
                    </li>
                    <li>
                      Collecting or harvesting any personally identifiable
                      information
                    </li>
                    <li>
                      Using our services for any illegal or unauthorized purpose
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <SectionTitle title="Payment Terms" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    For paid services, you agree to pay all fees in accordance
                    with the payment terms specified in your service agreement
                    or statement of work. All payments are non-refundable unless
                    otherwise specified.
                  </p>
                  <p>
                    We may change our fees at any time, but any changes will not
                    apply to services already purchased. You are responsible for
                    all taxes associated with your use of our services.
                  </p>
                </div>
              </div>

              <div>
                <SectionTitle title="Limitation of Liability" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    To the maximum extent permitted by law, in no event shall
                    Devun, its directors, employees, partners, agents,
                    suppliers, or affiliates be liable for any indirect,
                    incidental, special, consequential, or punitive damages,
                    including without limitation, loss of profits, data, use,
                    goodwill, or other intangible losses, resulting from:
                  </p>
                  <ul>
                    <li>
                      Your access to or use of or inability to access or use our
                      services
                    </li>
                    <li>
                      Any conduct or content of any third party on our services
                    </li>
                    <li>Any content obtained from our services</li>
                    <li>
                      Unauthorized access, use, or alteration of your
                      transmissions or content
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <SectionTitle title="Disclaimer of Warranties" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    Our services are provided on an "as is" and "as available"
                    basis. Devun expressly disclaims all warranties of any kind,
                    whether express or implied, including but not limited to the
                    implied warranties of merchantability, fitness for a
                    particular purpose, and non-infringement.
                  </p>
                  <p>
                    We do not warrant that our services will be uninterrupted,
                    timely, secure, or error-free, or that any defects will be
                    corrected. We do not make any warranties or representations
                    regarding the use of the materials in our services in terms
                    of their correctness, accuracy, reliability, or otherwise.
                  </p>
                </div>
              </div>

              <div>
                <SectionTitle title="Indemnification" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    You agree to defend, indemnify, and hold harmless Devun, its
                    directors, employees, partners, agents, suppliers, and
                    affiliates from and against any claims, liabilities,
                    damages, judgments, awards, losses, costs, expenses, or fees
                    (including reasonable attorneys' fees) arising out of or
                    relating to your violation of these Terms or your use of our
                    services.
                  </p>
                </div>
              </div>

              <div>
                <SectionTitle title="Governing Law and Jurisdiction" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    These Terms shall be governed by and construed in accordance
                    with the laws of the State of California, without regard to
                    its conflict of law provisions. You agree to submit to the
                    personal and exclusive jurisdiction of the courts located in
                    San Francisco, California for the resolution of any disputes
                    arising from these Terms or your use of our services.
                  </p>
                </div>
              </div>

              <div>
                <SectionTitle title="Changes to Terms" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    We reserve the right to modify these Terms at any time. We
                    will provide notice of any material changes by posting the
                    updated Terms on our website and updating the "Last Updated"
                    date. Your continued use of our services after such changes
                    constitutes your acceptance of the new Terms.
                  </p>
                </div>
              </div>

              <div>
                <SectionTitle title="Contact Information" />
                <div className="prose prose-blue max-w-none">
                  <p>
                    If you have any questions about these Terms, please contact
                    us at:
                  </p>
                  <p>
                    <strong>Email:</strong> legal@devun.com
                    <br />
                    <strong>Address:</strong> 123 Business Avenue, Tech Park,
                    Suite 101, San Francisco, CA 94107
                    <br />
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
