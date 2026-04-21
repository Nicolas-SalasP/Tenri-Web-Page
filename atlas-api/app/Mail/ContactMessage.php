<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('no-reply@tenri.cl', 'Sitio Web TENRI'),
            replyTo: [
                new Address($this->data['email'], $this->data['nombre']),
            ],
            subject: 'Nuevo mensaje web: ' . ucfirst($this->data['asunto']),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact.message',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}