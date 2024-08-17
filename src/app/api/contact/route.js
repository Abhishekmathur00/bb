// import uuid from "uuid";
import nodemailer from "nodemailer";
import connection from "@/helper/db";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
export async function POST(request) {
  try {
    const { name, Email, Phone, Query } = await request.json();
    const unique_id = uuid();
     {console.log({ name, Email, Phone, Query })}
    // Insert data into the database
    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO form(id, name ,Email ,Phone ,Query) VALUES (?, ?, ?, ?, ? )",
        [unique_id, name, Email, Phone, Query],
        (err, results, fields) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "abhi.gmail.com",
      secure: true,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,

      text: `name: ${name} \nEmail: ${Email} \nPhone: ${Phone}  \nQuery: ${Query}`,
    };

    transporter.sendMail(mailOptions);

    // Return success response

    return NextResponse.json({
      message: "Query Sent",
      success: true,
    });
  } catch (error) {
    console.log("Error: " + error.message);

    // Return error response
    return NextResponse.json({
      message: "Failed to send query",
      success: false,
    });
  }
}