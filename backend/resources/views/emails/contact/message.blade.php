<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nuevo Mensaje de Contacto</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F3F4F6; padding: 30px; margin: 0;">

    <table max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; margin: 0 auto; width: 100%; max-width: 600px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        
        <tr>
            <td style="background-color: #1A3626; padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">TENRI</h1>
                <p style="color: #88C0A0; margin: 5px 0 0 0; font-size: 14px;">Nuevo requerimiento desde el sitio web</p>
            </td>
        </tr>

        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="color: #1A3626; font-size: 20px; margin-top: 0; margin-bottom: 20px;">Detalles del Contacto</h2>
                
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 15px; color: #4b5563; line-height: 1.6;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;" width="30%"><strong>Nombre:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">{{ $data['nombre'] }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><strong>Correo:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #4A8B63;">
                            <a href="mailto:{{ $data['email'] }}" style="color: #4A8B63; text-decoration: none;">{{ $data['email'] }}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><strong>Teléfono:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">{{ $data['telefono'] ?? 'No proporcionado' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><strong>Asunto:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; text-transform: capitalize;">{{ $data['asunto'] }}</td>
                    </tr>
                </table>

                <h3 style="color: #1A3626; font-size: 16px; margin-top: 30px; margin-bottom: 10px;">Mensaje:</h3>
                <div style="background-color: #F5F0E6; padding: 20px; border-radius: 8px; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">{{ $data['mensaje'] }}</div>
            </td>
        </tr>

        <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #f3f4f6;">
                <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                    Este mensaje fue enviado desde el formulario de contacto de la página web de TENRI.<br>
                    No respondas directamente a este correo, haz clic en el correo del cliente arriba.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>