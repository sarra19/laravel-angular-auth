<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification
{
    public $token;
    public $frontendUrl;

    public function __construct($token)
    {
        $this->token = $token;
        $this->frontendUrl = env('FRONTEND_URL', 'http://localhost:4200'); // Angular URL
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $link = $this->frontendUrl . '/reset-password?token=' . $this->token . '&email=' . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject('Reset Your Password')
            ->line('You requested a password reset.')
            ->action('Reset Password', $link)
            ->line('If you did not request this, no further action is required.');
    }
}
