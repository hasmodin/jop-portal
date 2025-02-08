// import { Webhook } from "svix";

// import User from "../models/user.js";

// //API controller function to manage Clerk User with Database
// export const clerkWebhooks = async (req, res) => {
//   try {
//     //create a Svix instace with clerk webhook secret.
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     //veryfying headers

//     await whook.verify(JSON.stringify(req.body), {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "webhook-signature": req.headers["svix-signature"],
//     });
//     console.log(req.headers);

//     //getting data from request body
//     const { data, type } = req.body;
//     console.log(req.body);
//     console.log("Type:", type);

//     //Switch Cases for different Events

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           image: data.image_url,
//           resume: "",
//         };
//         await User.create(userData);
//         res.json({});
//         break;
//       }
//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           image: data.image_url,
//         };
//         await User.findByIdAndUpdate(data.id, userData);
//         res.json({});
//         break;
//       }

//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         res.json({});
//         break;
//       }
//       default:
//         break;
//     }
//   } catch (error) {
//     console.log("Error Message :", error);
//     res.json({ success: false, message: error.message });
//   }
// };

import { Webhook } from "svix";
import User from "../models/user.js";
export const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Log headers and body data for debugging
    console.log("Request Headers: ", req.headers);
    console.log("Request Body: ", req.body);

    // Verifying headers
    console.log("Verifying webhook signature...");
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "webhook-signature": req.headers["svix-signature"],
    });
    console.log("Webhook verified successfully!");

    // Getting data from the request body
    const { data, type } = req.body;
    console.log("Webhook Data: ", data);
    console.log("Webhook Type: ", type);

    console.log("Webhook Event Type:", type);
    if (type !== "user.created") {
      console.log("Not a user.created event, skipping...");
      return res
        .status(400)
        .json({ success: false, message: "Not the right event type" });
    }

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };

        console.log("User data to save: ", userData);

        const newUser = await User.create(userData);
        console.log("User created: ", newUser);

        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };

        console.log("Updating user data: ", userData);

        const updatedUser = await User.findByIdAndUpdate(data.id, userData);
        console.log("Updated User: ", updatedUser);

        res.json({});
        break;
      }

      case "user.deleted": {
        console.log("Deleting user: ", data.id);

        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        res.json({ success: false, message: "Unknown event type" });
        break;
    }
  } catch (error) {
    console.log("Error in webhook handling:", error.message);
    res.status(500).json({ success: false, message: "Webhooks Error" });
  }
};
