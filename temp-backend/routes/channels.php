<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat', function ($user) {
    return true;
});

// Broadcast::channel('conversation.{user1}.{user2}', function ($user, $user1, $user2) {
//     return (int) $user->id === (int) $user1 || (int) $user->id === (int) $user2;
// });