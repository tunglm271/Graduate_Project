<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use App\Models\chat\Conversation;
use Illuminate\Http\Request;
use App\Models\chat\Message;
use App\Models\User;

class ChatController extends Controller
{
    public function getMessages(Request $request)
    {
        $user = $request->user();
        $contact = $request->query('contact');
        $conversation = Conversation::where(function ($query) use ($user, $contact) {
            $query->where('user_id', $user->id)
                  ->where('contact_id', $contact);
        })->orWhere(function ($query) use ($user, $contact) {
            $query->where('user_id', $contact)
                  ->where('contact_id', $user->id);
        })->first();

        if (!$conversation) {
            return response()->json(['messages' => []]);
        }
        $messages = $conversation->messages()->with('user')->get()->map(function ($message) {
            return [
                'message' => $message->content,
                'username' => $message->user->name,
                'avatar' => $message->user->avatar,
                'user_id' => $message->user->id,
                'sent_at' => $message->created_at->format('H:i')
            ];
        });
        return response()->json(['messages' => $messages]);
    }

    public function sendMessage(Request $request)
    {
        $messageContent = $request->input('message');
        $contact = $request->input('contact');
        $user = $request->user();

        $conversation = Conversation::where(function ($query) use ($user, $contact) {
            $query->where('user_id', $user->id)
                  ->where('contact_id', $contact);
        })->orWhere(function ($query) use ($user, $contact) {
            $query->where('user_id', $contact)
                  ->where('contact_id', $user->id);
        })->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'user_id' => $user->id,
                'contact_id' => $contact,
            ]);
        }

        $message = $conversation->messages()->create([
            'content' => $messageContent,
            'user_id' => $user->id,
        ]);

        $data = [
            'message' => $messageContent,
            'username' => $request->user()->name,
            'avatar' => $request->user()->avatar,
            'user_id' => $request->user()->id,
            'sent_at' => $message->created_at->format('H:i')
        ];

        event(new MessageEvent( json_encode($data), $user->id, $contact));

        return response()->json(['message' => $data, 'user' => $request->user()]);
    }
}
