import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!(name && email && message)) {
      return Response.json(
        { error: "Datos insuficientes" },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);

    const { data, error } = await resend.emails.send({
      from: `${name} <onboarding@resend.devtuweb.com>`,
      to: process.env.CONTACT_EMAIL!,
      subject: "Correo de contacto – Portfolio",
      html: `
        <p><strong>Nuevo mensaje desde el portfolio</strong></p>
        <hr />
        <p>Nombre: <strong>${name}</strong></p>
        <p>Email: <strong>${email}</strong></p>
        <p>Mensaje:</p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
