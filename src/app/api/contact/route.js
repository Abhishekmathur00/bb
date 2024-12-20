// import uuid from "uuid";
import nodemailer from "nodemailer";
import pool from "@/helper/db";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(request) {
  try {
    const { name, Email, Phone, Query } = await request.json();
    const unique_id = uuid();
    // Use pool.query with async/await for promises

    const [results] = await pool.query(
      "INSERT INTO form(id, name ,Email ,Phone ,Query) VALUES (?,?,?,?,?)",
      [unique_id, name, Email, Phone, Query]
    );

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    // Send email to admin
    await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      subject: "Dr. Bhupendra Pratap Bharti Form",
      html: `<html>
              <body>
                <h3>You've got a new mail from ${name}, their email is: ✉️${Email} And phone Number is ${Phone} </h3>
                <p>Message:</p>
                <p>${Query}</p>
              </body>
             </html>`,
    });

    // Send confirmation email to the user
    await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: Email,
      subject: "Thank You for contacting Dr. Bhupendra Pratap Bharti!",
      html: `<html>
              <body>
                <h2>Hey ${name}!</h2>
                <p>Your query is noted! Our team will contact you as soon as possible.</p>
              </body>
             </html>`,
    });

    // Return success response
    return NextResponse.json({
      message: "Message Sent",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Failed to send query",
      success: false,
    });
  }
}
