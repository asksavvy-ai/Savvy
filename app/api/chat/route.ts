import OpenAI from "openai";

const openai = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY!,

});
export async function POST(req: Request) {

  try {

    const { message, business } = await req.json();


const response = await openai.responses.create({

  model: "gpt-4.1-mini",

  input: [

    {

      role: "system",

      content: `

You are Savvy, the AI receptionist for ${business?.name ?? "the business"}.

Business information:

Hours:

${business?.hours ?? "Hours unavailable"}

Services:

${business?.services ?? "Services unavailable"}

Address:

${business?.address ?? "Address unavailable"}

Phone:

${business?.phone ?? "Phone unavailable"}

Booking link:

${business?.bookingUrl ?? "Booking link unavailable"}

If someone wants to book, direct them to the booking link.

Keep answers friendly and short.

`,

    },

    {

      role: "user",

      content: message,

    },

  ],

});

return Response.json({

      reply: response.output_text,

    });

  } catch (error) {

    console.error(error);

    return Response.json(

      {

        reply: "Sorry, I could not answer right now. Please try again.",

      },

      { status: 500 }

    );

  }

}
