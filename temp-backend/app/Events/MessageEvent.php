<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $first_user_id;
    public $second_user_id;

    /**
     * Create a new event instance.
     */
    public function __construct($message, $first_user_id, $second_user_id)
    {
        $this->message = $message;
        $this->first_user_id =  $first_user_id;
        $this->second_user_id = $second_user_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        $users = [$this->first_user_id, $this->second_user_id];
        sort($users);
        return [
           'conversation.' . $users[0] . '.' . $users[1],
           'chat'
        ];
    }

    public function broadcastAs()
    {
        return 'message';
    }
}
