const nodemailer = require('nodemailer');

// In-memory storage for contact submissions
// Replace with database in production
let contactSubmissions = [];

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email notification
const sendEmailNotification = async (submission) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New ${submission.enquiryType} from ${submission.fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a1a1a; color: #fff; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { color: #333; margin-top: 5px; }
            .project-details { background-color: #fff; padding: 15px; margin-top: 15px; border-left: 4px solid #A3E635; }
            .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Full Name:</div>
                <div class="value">${submission.fullName}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${submission.email}">${submission.email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Enquiry Type:</div>
                <div class="value">${submission.enquiryType}</div>
              </div>
              
              ${submission.enquiryType === 'Freelance Project' ? `
                <div class="project-details">
                  <h3 style="margin-top: 0; color: #333;">Project Details</h3>
                  <div class="field">
                    <div class="label">Project Type:</div>
                    <div class="value">${submission.projectDetails.projectType}</div>
                  </div>
                  <div class="field">
                    <div class="label">Budget Range:</div>
                    <div class="value">${submission.projectDetails.budgetRange}</div>
                  </div>
                  <div class="field">
                    <div class="label">Expected Timeline:</div>
                    <div class="value">${submission.projectDetails.expectedTimeline}</div>
                  </div>
                </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value" style="white-space: pre-wrap;">${submission.message}</div>
              </div>
            </div>
            <div class="footer">
              <p>Submitted on ${new Date(submission.submittedAt).toLocaleString()}</p>
              <p>Submission ID: ${submission.id}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('✅ Email notification sent successfully');
  } catch (error) {
    console.error('❌ Failed to send email notification:', error.message);
    throw error;
  }
};

const contactController = {
  // Handle contact form submission
  submitContact: async (req, res) => {
    try {
      const {
        fullName,
        email,
        enquiryType,
        message,
        projectType,
        budgetRange,
        expectedTimeline
      } = req.body;

      // Validation
      if (!fullName || !email || !enquiryType || !message) {
        return res.status(400).json({
          status: 'error',
          message: 'Please fill in all required fields'
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          status: 'error',
          message: 'Please provide a valid email address'
        });
      }

      // Additional validation for Freelance Project
      if (enquiryType === 'Freelance Project') {
        if (!projectType || !budgetRange || !expectedTimeline) {
          return res.status(400).json({
            status: 'error',
            message: 'Please fill in all project details for freelance enquiry'
          });
        }
      }

      // Create submission object
      const submission = {
        id: Date.now(),
        fullName,
        email,
        enquiryType,
        message,
        ...(enquiryType === 'Freelance Project' && {
          projectDetails: {
            projectType,
            budgetRange,
            expectedTimeline
          }
        }),
        submittedAt: new Date().toISOString(),
        status: 'new'
      };

      // Store submission
      contactSubmissions.push(submission);

      // Log submission (for development)
      console.log('📩 New contact submission received:');
      console.log(JSON.stringify(submission, null, 2));

      // Send email notification
      try {
        await sendEmailNotification(submission);
      } catch (emailError) {
        console.error('Email sending failed, but submission was stored:', emailError.message);
        // Continue even if email fails
      }

      res.status(200).json({
        status: 'success',
        message: 'Your message has been sent successfully!',
        submissionId: submission.id
      });
    } catch (error) {
      console.error('Contact submission error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to submit contact form. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get all contact submissions (for future admin panel)
  getAllSubmissions: (req, res) => {
    try {
      res.status(200).json({
        status: 'success',
        count: contactSubmissions.length,
        data: contactSubmissions
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch submissions',
        error: error.message
      });
    }
  }
};

module.exports = contactController;

/* 
  FUTURE DATABASE INTEGRATION (MongoDB):
  
  const Contact = require('../models/Contact');
  
  submitContact: async (req, res) => {
    try {
      const contact = new Contact(req.body);
      await contact.save();
      
      // Send email notification
      await sendEmailNotification(contact);
      
      res.status(200).json({
        status: 'success',
        message: 'Message sent successfully',
        data: contact
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
  
  FUTURE EMAIL NOTIFICATION:
  
  const nodemailer = require('nodemailer');
  
  const sendEmailNotification = async (submission) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New ${submission.enquiryType} from ${submission.fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${submission.fullName}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Enquiry Type:</strong> ${submission.enquiryType}</p>
        <p><strong>Message:</strong> ${submission.message}</p>
        ${submission.enquiryType === 'Freelance Project' ? `
          <h3>Project Details:</h3>
          <p><strong>Type:</strong> ${submission.projectDetails.projectType}</p>
          <p><strong>Budget:</strong> ${submission.projectDetails.budgetRange}</p>
          <p><strong>Timeline:</strong> ${submission.projectDetails.expectedTimeline}</p>
        ` : ''}
      `
    };
    
    await transporter.sendMail(mailOptions);
  };
*/
