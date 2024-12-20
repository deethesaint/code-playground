<?php

namespace App\Mail;
use App\Models\User;
use App\Models\EmailVerifyToken;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailCongratulation extends Mailable
{
    use Queueable, SerializesModels;
    protected EmailVerifyToken $token;
    protected User $user;
    /**
     * Create a new message instance.
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: 'support@code-playground.test',
            subject: '[CodePlayground] Congratulation! Your account has been created successfully.',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content( 
            view: 'mails.company.congratulation-mail',
            with: ['user' => $this->user]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
